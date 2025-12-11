from django.contrib import admin
from .models import (
    # Your existing models
    PhoneOTP,
    PersonalDetails,
    GSTDetails,
    DocumentsUpload,
    BankDetails,
    
    # New vehicle management models
    Driver,
    Conductor,
    Bus,
    Car,
    Bike,
    BusRuntimeData,
    CarRuntimeData,
    BikeRuntimeData,
    BusRoute,
    BusCheckpoint,
    CarRoute,
 
    BikeRoute,
   
    BusRuntimeData,
    CarRuntimeData,
    BikeRuntimeData,
    BookingRequest
    
)

# Register all models with basic admin interface
admin.site.register(PhoneOTP)
admin.site.register(PersonalDetails)
admin.site.register(GSTDetails)
admin.site.register(DocumentsUpload)
admin.site.register(BankDetails)
admin.site.register(Driver)
admin.site.register(Conductor)
admin.site.register(Bus)
admin.site.register(Car)
admin.site.register(Bike)
admin.site.register(BusRuntimeData)
admin.site.register(CarRuntimeData)
admin.site.register(BikeRuntimeData)
admin.site.register(BusRoute)
admin.site.register(CarRoute)
admin.site.register(BikeRoute)
admin.site.register(BusCheckpoint)
admin.site.register(BookingRequest)

