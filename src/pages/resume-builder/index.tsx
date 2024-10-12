import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useAppSelector } from "@/redux/hooks";
import ResumeCardItem from "./components/ResumeCardItem";
import { callFetchUserResumesByUserEmail } from "@/config/api";
import { IUserResume } from "@/types/backend";
import { Spin } from "antd";

const ResumeBuilderPage = () => {
  const user = useAppSelector(state => state.account.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [resumeList, setResumeList] = useState<IUserResume[]>([]);
  useEffect(() => {
    GetResumesList()
    // console.log(resumeList);
  }, [user])

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList = async () => {
    setIsLoading(true);
    if (user) {
      const res = await callFetchUserResumesByUserEmail(user.email);
      const list = res.data?.result || [];  // Ensure list is not undefined
      setResumeList(list);  // Assign the fetched list to state
      setIsLoading(false);
    }
  }

  return (
    <Spin spinning={isLoading} tip="Loading...">
      <div className='p-10 md:px-20 lg:px-32'>
        <h2 className='font-bold text-3xl'>My Resume</h2>
        <p>Start Creating AI resume to your next Job role</p>
        <div className='grid grid-cols-2 
    md:grid-cols-3 lg:grid-cols-5 gap-5
    mt-10
    '>
          <AddResume />
          {
            resumeList.map((resume, index) => (
              <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
            ))
          }
        </div>
      </div>
    </Spin>
  )
}

export default ResumeBuilderPage;