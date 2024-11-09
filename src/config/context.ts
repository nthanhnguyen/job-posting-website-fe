import { createContext } from "react";

export interface IRegisterContext {
  step: number;
  setStep: Function;
}
export const RegisterContext = createContext<IRegisterContext>({
  step: 0,
  setStep: () => {},
});