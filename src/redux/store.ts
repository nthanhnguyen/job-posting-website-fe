import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import accountReducer from './slice/accountSlide';
import companyReducer from './slice/companySlide';
import userReducer from './slice/userSlide';
import jobReducer from './slice/jobSlide';
import resumeReducer from './slice/resumeSlide';
import permissionReducer from './slice/permissionSlide';
import roleReducer from './slice/roleSlide';

import jobHrReducer from './slice/jobHrSlide';
import resumeHrReducer from './slice/resumeHrSlide';
import companyHrReducer from './slice/companyHrSlide';
import employerRegistrationReducer from './slice/employerRegistrationSlide';


export const store = configureStore({
  reducer: {
    account: accountReducer,
    company: companyReducer,
    user: userReducer,
    job: jobReducer,
    resume: resumeReducer,
    permission: permissionReducer,
    role: roleReducer,
    company_hr: companyHrReducer,
    job_hr: jobHrReducer,
    resume_hr: resumeHrReducer,
    employer_registration: employerRegistrationReducer,

  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;