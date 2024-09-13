import { createContext } from 'react';

const SetNameContext = createContext<React.Dispatch<
  React.SetStateAction<string>
> | null>(null);
const SetPasswordContext = createContext<React.Dispatch<
  React.SetStateAction<string>
> | null>(null);

const IsValidNameContext = createContext<boolean | null>(null);
const IsValidPasswordContext = createContext<boolean | null>(null);

export {
  SetNameContext,
  SetPasswordContext,
  IsValidNameContext,
  IsValidPasswordContext,
};
