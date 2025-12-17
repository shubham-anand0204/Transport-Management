// Quick test to check Google Maps API functionality
export const testGoogleMapsAPI = () => {
  if (!window.google) {
    console.error('Google Maps API not loaded');
    return false;
  }
  
  console.log('Google Maps API is loaded');
  
  // Test Geocoding Service
  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ address: 'New Delhi, India' }, (results, status) => {
    if (status === 'OK') {
      console.log('✅ Geocoding API working:', results[0]);
    } else {
      console.error('❌ Geocoding API failed:', status);
    }
  });
  
  // Test Places Service (requires a map element)
  try {
    const placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
    console.log('✅ Places API service created');
  } catch (error) {
    console.error('❌ Places API failed:', error);
  }
  
  return true;
};