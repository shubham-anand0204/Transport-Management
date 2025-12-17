// Industry-standard real-time location service
class LocationTrackingService {
  constructor() {
    this.socket = null;
    this.locationBuffer = [];
    this.updateInterval = null;
  }

  // Batched location updates (reduces server load)
  startTracking() {
    this.updateInterval = setInterval(() => {
      if (this.locationBuffer.length > 0) {
        this.sendBatchedUpdates();
        this.locationBuffer = [];
      }
    }, 5000); // Send every 5 seconds instead of real-time
  }

  // Adaptive update frequency based on speed
  addLocation(location) {
    const speed = this.calculateSpeed(location);
    const frequency = speed > 50 ? 2000 : 5000; // Faster updates when moving fast
    
    this.locationBuffer.push({
      ...location,
      timestamp: Date.now(),
      accuracy: location.accuracy
    });
  }

  // Geohashing for efficient location queries
  getGeohash(lat, lng) {
    return geohash.encode(lat, lng, 8);
  }
}

// WebSocket with reconnection and fallback
class RealtimeConnection {
  constructor(url) {
    this.url = url;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.connect();
  }

  connect() {
    this.socket = new WebSocket(this.url);
    
    this.socket.onopen = () => {
      console.log('Connected');
      this.reconnectAttempts = 0;
    };

    this.socket.onerror = () => {
      this.reconnect();
    };

    this.socket.onclose = () => {
      this.reconnect();
    };
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        this.reconnectAttempts++;
        this.connect();
      }, Math.pow(2, this.reconnectAttempts) * 1000); // Exponential backoff
    } else {
      // Fallback to HTTP polling
      this.startPolling();
    }
  }

  startPolling() {
    setInterval(async () => {
      try {
        const response = await fetch('/api/location-updates');
        const data = await response.json();
        this.handleLocationUpdates(data);
      } catch (error) {
        console.error('Polling failed:', error);
      }
    }, 10000);
  }
}