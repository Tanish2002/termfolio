import { Provider } from "jotai";

import UserSettingsProvider from "@/providers/UserSettingsProvider";

import NavigationProvider from "./NavigationProvider";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider>
      <NavigationProvider />
      <UserSettingsProvider>{children}</UserSettingsProvider>
    </Provider>
  );
};

export default Providers;
