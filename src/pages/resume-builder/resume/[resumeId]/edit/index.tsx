import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/pages/resume-builder/context/ResumeInfoContext';
import dummy from '@/pages/resume-builder/data/dummy';
import { IResumeInfo } from '@/types/backend';
import { callFetchUserResumesById } from '@/config/api';
import { useAppSelector } from '@/redux/hooks';

function EditResume() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [resumeInfo, setResumeInfo] = useState<IResumeInfo | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useAppSelector(state => state.account.user);

  useEffect(() => {
    GetResumesById();
  }, [user, resumeId]);

  const GetResumesById = async () => {
    setIsLoading(true);
    if (user && resumeId) {  // Ensure resumeId is not undefined
      const res = await callFetchUserResumesById(resumeId);
      setResumeInfo(res.data);
      setIsLoading(false);
    }
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        {/* Form Section  */}
        <FormSection />
        {/* Preview Section  */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume