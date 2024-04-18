import { createContext, useContext, useState } from "react";

type OptionsProviderProps = {
  children: React.ReactNode;
  defaultStatus?: string;
};

type OptionsProviderState = {
  cat: string;
  diff: string;
  setCat: (status: string) => void;
  setDiff: (status: string) => void;
};

const initialState: OptionsProviderState = {
  cat: "",
  diff: "",
  setCat: () => null,
  setDiff: () => null,
};

const OptionsProviderContext =
  createContext<OptionsProviderState>(initialState);

export function OptionsProvider({
  children,
  defaultStatus = "false",
  ...props
}: OptionsProviderProps) {
  const [cat, setCat] = useState<string>("");
  const [diff, setDiff] = useState<string>("");

  const value = {
    cat,
    diff,
    setCat: (newCat: string) => {
      setCat(newCat);
    },
    setDiff: (newDiff: string) => {
      setDiff(newDiff);
    },
  };

  return (
    <OptionsProviderContext.Provider {...props} value={value}>
      {children}
    </OptionsProviderContext.Provider>
  );
}

export const useOptions = () => {
  const context = useContext(OptionsProviderContext);

  if (context === undefined)
    throw new Error("useOption must be used within a OptionsProvider");

  return context;
};
