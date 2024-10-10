import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useAppSelector } from "@/redux/hooks";
import ResumeCardItem from "./components/ResumeCardItem";
import { callFetchUserResumesByUserEmail } from "@/config/api";
import { IUserResume } from "@/types/backend";

const ResumeBuilderPage = () => {
  const user = useAppSelector(state => state.account.user);
  const [resumeList, setResumeList] = useState<IUserResume[]>([]);
  useEffect(() => {
    GetResumesList()
    // console.log(resumeList);
  }, [user])

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList = async () => {
    if (user) {
      const res = await callFetchUserResumesByUserEmail(user.email);
      const list = res.data?.result || [];  // Ensure list is not undefined
      setResumeList(list);  // Assign the fetched list to state
    }
  }

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>
      <div className='grid grid-cols-2 
    md:grid-cols-3 lg:grid-cols-5 gap-5
    mt-10
    '>
        <AddResume />
        {!!user && resumeList.length > 0 ? resumeList.map((resume, index) => (
          <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
        )) :
          [1, 2, 3, 4].map((item, index) => (
            <div className='h-[280px] rounded-lg bg-slate-200 animate-pulse'>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ResumeBuilderPage;