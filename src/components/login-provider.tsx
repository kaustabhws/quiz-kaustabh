import { createContext, useContext, useState } from "react";

type LoginProviderProps = {
  children: React.ReactNode;
  defaultStatus?: string;
  storageKey?: string;
};

type LoginProviderState = {
  status: string;
  setStatus: (status: string) => void;
};

const initialState: LoginProviderState = {
  status: 'false',
  setStatus: () => null,
};

const LoginProviderContext = createContext<LoginProviderState>(initialState);

export function LoginProvider({
  children,
  defaultStatus = 'false',
  storageKey = "login-status",
  ...props
}: LoginProviderProps) {
  const [status, setStatus] = useState<string>(
    () => localStorage.getItem(storageKey) || defaultStatus
  );

  const value = {
    status,
    setStatus: (newStatus: string) => {
      localStorage.setItem(storageKey, newStatus);
      setStatus(newStatus);
    },
  };

  return (
    <LoginProviderContext.Provider {...props} value={value}>
      {children}
    </LoginProviderContext.Provider>
  );
}

export const useLogin = () => {
  const context = useContext(LoginProviderContext);

  if (context === undefined)
    throw new Error("useLogin must be used within a LoginProvider");

  return context;
};
