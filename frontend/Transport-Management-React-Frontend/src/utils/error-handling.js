// Industry-standard error handling and resilience patterns

// 1. Circuit Breaker Pattern for API calls
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.threshold = threshold;
    this.timeout = timeout;
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
  }

  async call(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
    }
  }
}

// 2. Retry with Exponential Backoff
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = Math.min(1000 * Math.pow(2, i), 10000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// 3. Graceful Degradation for Maps
class MapFallbackHandler {
  constructor() {
    this.fallbackMode = false;
    this.staticMapUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static';
  }

  handleMapError() {
    console.warn('Google Maps failed, switching to fallback mode');
    this.fallbackMode = true;
    
    // Show static map or list view
    this.renderFallbackUI();
  }

  renderFallbackUI() {
    // Render list of vehicles instead of map
    return (
      <div className="fallback-container">
        <div className="alert alert-warning">
          Map is temporarily unavailable. Showing list view.
        </div>
        <VehicleList vehicles={this.vehicles} />
      </div>
    );
  }
}

// 4. Offline Support
class OfflineHandler {
  constructor() {
    this.isOnline = navigator.onLine;
    this.offlineQueue = [];
    
    window.addEventListener('online', this.handleOnline.bind(this));
    window.addEventListener('offline', this.handleOffline.bind(this));
  }

  handleOffline() {
    this.isOnline = false;
    console.log('App is offline, queuing requests');
  }

  async handleOnline() {
    this.isOnline = true;
    console.log('App is back online, processing queued requests');
    
    // Process queued requests
    const promises = this.offlineQueue.map(request => 
      this.makeRequest(request)
    );
    
    await Promise.allSettled(promises);
    this.offlineQueue = [];
  }

  async makeRequest(requestConfig) {
    if (!this.isOnline) {
      this.offlineQueue.push(requestConfig);
      return Promise.reject(new Error('Offline'));
    }

    return fetch(requestConfig.url, requestConfig.options);
  }
}

// 5. Location Permission Handling
class LocationPermissionHandler {
  constructor() {
    this.permission = null;
    this.fallbackLocation = { lat: 28.6139, lng: 77.2090 }; // Delhi fallback
  }

  async requestLocation() {
    try {
      // Check current permission
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      this.permission = permission.state;

      if (permission.state === 'denied') {
        return this.handlePermissionDenied();
      }

      return await this.getCurrentLocation();
    } catch (error) {
      console.error('Geolocation error:', error);
      return this.fallbackLocation;
    }
  }

  async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        error => {
          console.warn('Location error:', error.message);
          resolve(this.fallbackLocation); // Graceful fallback
        },
        {
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
          enableHighAccuracy: true
        }
      );
    });
  }

  handlePermissionDenied() {
    // Show user-friendly message
    const message = `
      Location access is required for the best experience.
      Please enable location permissions in your browser settings.
      Using default location: Delhi, India
    `;
    
    console.warn(message);
    return this.fallbackLocation;
  }
}

export { 
  CircuitBreaker, 
  retryWithBackoff, 
  MapFallbackHandler, 
  OfflineHandler, 
  LocationPermissionHandler 
};