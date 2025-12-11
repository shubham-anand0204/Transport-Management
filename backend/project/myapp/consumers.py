import json
from channels.generic.websocket import AsyncWebsocketConsumer

class BikeLocationConsumer(AsyncWebsocketConsumer):
    groups = ["location_updates"]
    
    # Class-level storage for recent updates
    recent_updates = []  # Now using a list to store all updates
    
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("location_updates", self.channel_name)
        await self.send(json.dumps({
            "type": "connection_established",
            "message": "You are now connected!",
            "data": self.recent_updates  # Send existing data immediately
        }))

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            print("📩 Received data:", data)
            
            # Validate incoming data
            if all(key in data for key in ['id', 'vehicle_type', 'latitude', 'longitude']):
                # Update existing entry if id exists, otherwise append
                existing_index = next(
                    (i for i, item in enumerate(self.recent_updates) 
                     if item['id'] == data['id']), 
                    None
                )
                
                if existing_index is not None:
                    self.recent_updates[existing_index] = data
                else:
                    self.recent_updates.append(data)
                
                # Always broadcast the complete array
                await self.channel_layer.group_send(
                    "location_updates",
                    {
                        "type": "batch_location_update",
                        "data": self.recent_updates
                    }
                )
                
        except json.JSONDecodeError as e:
            print(f"❌ JSON decode error: {str(e)}")
            await self.send(json.dumps({
                "error": "Invalid JSON format",
                "details": str(e)
            }))

    async def batch_location_update(self, event):
        """Handler for sending combined location updates"""
        await self.send(json.dumps({
            "type": "batch_location_update",
            "data": event["data"]  # This is already an array
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("location_updates", self.channel_name)