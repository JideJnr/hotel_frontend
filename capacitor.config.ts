import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.bjstarter",
  appName: "BJ-Hotels",
  webDir: "dist",
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      enabled: true,
      presentationOptions: ["badge", "sound", "alert"]

    },
  },
};

export default config;
