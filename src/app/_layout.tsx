import { Slot } from "expo-router";
import { SessionProvider } from "../Context/AuthContext";

export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
