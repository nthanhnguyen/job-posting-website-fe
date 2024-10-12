import { createContext } from "react";
import { IResumeInfo } from "../resume/[resumeId]/edit";

// Define type for ResumeContextType
interface ResumeContextType {
  resumeInfo: IResumeInfo | undefined;
  setResumeInfo: React.Dispatch<React.SetStateAction<IResumeInfo | undefined>>;
}

// Create type with default value
export const ResumeInfoContext = createContext<ResumeContextType | undefined>(undefined);