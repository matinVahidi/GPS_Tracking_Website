// models/Device.js

export class Device {
  constructor(
    id,
    model,
    name = `device_${id}`,
    {
      latitude = undefined,
      longitude = undefined,
      timestamp = undefined,
      accuracy = undefined,
      altitude = undefined,
      speed = undefined,
      heading = undefined,
      battery = undefined,
      status = 'inactive',
      userId = undefined 
    } = {}
  ) {
    this.id = id;
    this.model = model;
    this.name = name;

    this.latitude = latitude;
    this.longitude = longitude;
    this.timestamp = timestamp ? new Date(timestamp) : undefined;
    this.accuracy = accuracy;
    this.altitude = altitude;
    this.speed = speed;
    this.heading = heading;
    this.battery = battery;
    this.status = status;
    this.userId = userId;
  }
}

// Devices that have been purchased (deviceId → Device instance)
export const soldDeviceMap = new Map(); // Map<string, Device>

let nextDeviceId = 1;

export function createDevice(userId, name) {
  const id = `dev00${nextDeviceId++}`;
  return {
    id,
    name,
    userId,
    latitude: undefined,
    longitude: undefined,
    status: 'inactive',
    timestamp: undefined
  };
}

