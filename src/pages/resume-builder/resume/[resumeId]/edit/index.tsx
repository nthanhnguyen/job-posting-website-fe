import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/pages/resume-builder/context/ResumeInfoContext';
import dummy from '@/pages/resume-builder/data/dummy';
import { IResumeInfo } from '@/types/backend';

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState<IResumeInfo | undefined>(undefined);
  useEffect(() => {
    setResumeInfo(dummy);
    // console.log(resumeInfo);
  }, [])

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