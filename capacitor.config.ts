import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bj.hotel',
  appName: 'BJ Hotel',
  webDir: 'dist',
   plugins: {
    LiveUpdates: {
      appId: '60e4b0ee',
      channel: 'Production',
      autoUpdateMethod: 'background',
      maxVersions: 2
    }
  } 
};

export default config;
