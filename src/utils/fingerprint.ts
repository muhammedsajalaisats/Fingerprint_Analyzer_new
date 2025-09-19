import { DeviceInfo } from '../types';

export const generateDeviceFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Device fingerprint', 2, 2);
  }
  const canvasFingerprint = canvas.toDataURL();
  
  // Type-safe way to access navigator properties
  const nav = navigator as any;
  const deviceMemory = nav.deviceMemory || 'unknown';
  
  const fingerprint = btoa([
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    canvasFingerprint.slice(0, 50),
    (navigator.hardwareConcurrency || 'unknown'),
    deviceMemory
  ].join('|')).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
  
  return fingerprint;
};

export const getIPAddress = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.warn('Could not fetch IP address:', error);
    return 'unknown';
  }
};

export const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';

  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    browserName = 'Chrome';
    const match = userAgent.match(/Chrome\/(\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.includes('Firefox')) {
    browserName = 'Firefox';
    const match = userAgent.match(/Firefox\/(\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browserName = 'Safari';
    const match = userAgent.match(/Safari\/(\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  } else if (userAgent.includes('Edg')) {
    browserName = 'Edge';
    const match = userAgent.match(/Edg\/(\d+)/);
    browserVersion = match ? match[1] : 'Unknown';
  }

  return `${browserName} ${browserVersion}`;
};

export const getIndianTime = (): string => {
  const date = new Date();
  const indianTimeStr = date.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  const indianTime = new Date(indianTimeStr);
  const offset = 330;
  indianTime.setMinutes(indianTime.getMinutes() + offset);
  return indianTime.toISOString();
};

export const getDeviceInfo = async (): Promise<DeviceInfo> => {
  const deviceId = generateDeviceFingerprint();
  const ipAddress = await getIPAddress();
  const userAgent = navigator.userAgent;
  const browserInfo = getBrowserInfo();
  const timestamp = getIndianTime();

  return {
    deviceId,
    ipAddress,
    userAgent,
    browserInfo: {
      name: browserInfo.split(' ')[0],
      version: browserInfo.split(' ')[1] || 'Unknown',
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    timestamp
  };
};