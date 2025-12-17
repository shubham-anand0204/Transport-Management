// Industry-standard state management for real-time transport apps

// ❌ Your Current: Basic Redux
const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: { vehicles: [] },
  reducers: {
    setVehicles: (state, action) => {
      state.vehicles = action.payload;
    }
  }
});

// ✅ Industry Standard: Normalized State + Real-time Updates
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createEntityAdapter } from '@reduxjs/toolkit';

// Normalized entity management
const vehiclesAdapter = createEntityAdapter({
  selectId: (vehicle) => vehicle.id,
  sortComparer: (a, b) => a.lastUpdated.localeCompare(b.lastUpdated),
});

// RTK Query for real-time data
const transportApi = createApi({
  reducerPath: 'transportApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Vehicle', 'Trip', 'Driver'],
  endpoints: (builder) => ({
    // Streaming endpoint for real-time updates
    getVehicleUpdates: builder.query({
      query: () => 'vehicles/stream',
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // WebSocket connection for real-time updates
        const ws = new WebSocket('ws://localhost:8000/ws/vehicles/');
        
        try {
          await cacheDataLoaded;
          
          const listener = (event) => {
            const data = JSON.parse(event.data);
            updateCachedData((draft) => {
              // Update normalized state
              vehiclesAdapter.upsertOne(draft, data);
            });
          };
          
          ws.addEventListener('message', listener);
        } catch {
          // Handle error
        }
        
        await cacheEntryRemoved;
        ws.close();
      },
    }),
    
    // Optimistic updates for booking
    createBooking: builder.mutation({
      query: (booking) => ({
        url: 'bookings',
        method: 'POST',
        body: booking,
      }),
      // Optimistic update
      async onQueryStarted(booking, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          transportApi.util.updateQueryData('getBookings', undefined, (draft) => {
            draft.unshift({ ...booking, id: 'temp', status: 'pending' });
          })
        );
        
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

// Location-aware selectors
const selectVehiclesNearLocation = createSelector(
  [selectAllVehicles, (state, location) => location],
  (vehicles, location) => {
    if (!location) return [];
    
    return vehicles
      .filter(vehicle => {
        const distance = calculateDistance(
          location,
          vehicle.currentLocation
        );
        return distance <= 5; // 5km radius
      })
      .sort((a, b) => {
        const distA = calculateDistance(location, a.currentLocation);
        const distB = calculateDistance(location, b.currentLocation);
        return distA - distB;
      });
  }
);

// Performance optimized map component
const OptimizedVehicleMap = React.memo(({ vehicles, onVehicleSelect }) => {
  const [visibleVehicles, setVisibleVehicles] = useState([]);
  const mapRef = useRef();

  // Viewport-based filtering
  const handleMapChange = useCallback((bounds) => {
    const visible = vehicles.filter(vehicle => 
      isInBounds(vehicle.location, bounds)
    );
    setVisibleVehicles(visible);
  }, [vehicles]);

  // Clustering for performance
  const clusters = useMemo(() => {
    return clusterVehicles(visibleVehicles, mapRef.current?.getZoom());
  }, [visibleVehicles]);

  return (
    <GoogleMap
      ref={mapRef}
      onBoundsChanged={handleMapChange}
      onZoomChanged={handleMapChange}
    >
      {clusters.map(cluster => (
        cluster.isCluster ? (
          <ClusterMarker key={cluster.id} cluster={cluster} />
        ) : (
          <VehicleMarker 
            key={cluster.vehicle.id} 
            vehicle={cluster.vehicle}
            onClick={onVehicleSelect}
          />
        )
      ))}
    </GoogleMap>
  );
});

export { transportApi, selectVehiclesNearLocation, OptimizedVehicleMap };