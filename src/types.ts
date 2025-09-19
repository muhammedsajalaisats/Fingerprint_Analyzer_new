export interface DeviceInfo {
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  browserInfo: string | {
    name: string;
    version: string;
    platform: string;
    language: string;
    cookieEnabled: boolean;
    screenResolution: string;
    timezone: string;
  };
  timestamp: string;
  employeeId?: string;
}