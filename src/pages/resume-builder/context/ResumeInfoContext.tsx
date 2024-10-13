import { IResumeInfo } from "@/types/backend";
import { createContext } from "react";

// Define type for ResumeContextType
interface ResumeContextType {
  resumeInfo: IResumeInfo | undefined;
  setResumeInfo: React.Dispatch<React.SetStateAction<IResumeInfo | undefined>>;
}

// Provide default values
export const ResumeInfoContext = createContext<ResumeContextType>({
  resumeInfo: undefined,
  setResumeInfo: () => { },
});