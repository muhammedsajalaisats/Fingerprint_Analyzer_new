import React from 'react';
import { DeviceInfo } from '../types';
import { Monitor, Globe, Clock, Smartphone } from 'lucide-react';

interface DeviceInfoCardProps {
  deviceInfo: DeviceInfo;
}

export const DeviceInfoCard: React.FC<DeviceInfoCardProps> = ({ deviceInfo }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-4xl mx-auto animate-fadeIn">
      {deviceInfo.employeeId && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Monitor className="text-blue-600" size={18} />
            <h3 className="font-semibold text-blue-800">Employee ID</h3>
          </div>
          <p className="text-blue-700 font-mono text-lg">{deviceInfo.employeeId}</p>
        </div>
      )}
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <Smartphone className="text-blue-600" size={28} />
        Device Fingerprint Details
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="text-blue-600" size={18} />
              <h3 className="font-semibold text-blue-800">Device ID</h3>
            </div>
            <p className="text-blue-700 font-mono text-sm break-all">{deviceInfo.deviceId}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="text-green-600" size={18} />
              <h3 className="font-semibold text-green-800">IP Address</h3>
            </div>
            <p className="text-green-700 font-mono">{deviceInfo.ipAddress}</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="text-purple-600" size={18} />
              <h3 className="font-semibold text-purple-800">Timestamp (IST)</h3>
            </div>
            <p className="text-purple-700 font-mono">{deviceInfo.timestamp}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-800 mb-3">Browser Information</h3>
            {typeof deviceInfo.browserInfo === 'string' ? (
              <p className="text-orange-700 font-medium">{deviceInfo.browserInfo}</p>
            ) : (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Browser:</span>
                  <span className="text-orange-700 font-medium">{deviceInfo.browserInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Version:</span>
                  <span className="text-orange-700 font-medium">{deviceInfo.browserInfo.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform:</span>
                  <span className="text-orange-700 font-medium">{deviceInfo.browserInfo.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language:</span>
                  <span className="text-orange-700 font-medium">{deviceInfo.browserInfo.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Screen:</span>
                  <span className="text-orange-700 font-medium">{deviceInfo.browserInfo.screenResolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timezone:</span>
                  <span className="text-orange-700 font-medium">{deviceInfo.browserInfo.timezone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cookies:</span>
                  <span className="text-orange-700 font-medium">
                    {deviceInfo.browserInfo.cookieEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">User Agent</h3>
            <p className="text-gray-700 text-xs font-mono break-all leading-relaxed">
              {deviceInfo.userAgent}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};