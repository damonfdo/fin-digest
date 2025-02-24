// ref https://docs.expo.dev/router/reference/authentication/#using-react-context-and-route-groups
import React, {
  useContext,
  createContext,
  useState,
  type PropsWithChildren,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext<{
  signIn: (firstName: string, lastName: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useLocalStorage("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: (firstName: string, lastName: string) => {
          setSession(`${firstName}-${lastName}`);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
