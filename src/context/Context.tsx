import { createContext } from 'react';

const TokenContext = createContext<string | null>(null);

const SetNameContext = createContext<React.Dispatch<
  React.SetStateAction<string>
> | null>(null);
const SetPasswordContext = createContext<React.Dispatch<
  React.SetStateAction<string>
> | null>(null);

const IsValidNameContext = createContext<boolean | null>(null);
const IsValidPasswordContext = createContext<boolean | null>(null);

export {
  TokenContext,
  SetNameContext,
  SetPasswordContext,
  IsValidNameContext,
  IsValidPasswordContext,
};
