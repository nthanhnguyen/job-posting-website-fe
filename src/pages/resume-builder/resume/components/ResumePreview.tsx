import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '../../context/ResumeInfoContext'
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummeryPreview from './preview/SummeryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';

function ResumePreview() {
  const context = useContext(ResumeInfoContext);
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
      style={{
        borderColor: context?.resumeInfo?.themeColor
      }}>
      {/* Personal Detail  */}
      <PersonalDetailPreview resumeInfo={context?.resumeInfo} />
      {/* Summery  */}
      <SummeryPreview resumeInfo={context?.resumeInfo} />
      {/* Professional Experience  */}
      {context?.resumeInfo?.experience && <ExperiencePreview resumeInfo={context?.resumeInfo} />}
      {/* Educational  */}
      {context?.resumeInfo?.education && <EducationalPreview resumeInfo={context?.resumeInfo} />}
      {/* Skilss  */}
      {context?.resumeInfo?.skills && <SkillsPreview resumeInfo={context?.resumeInfo} />}
    </div>
  )
}

export default ResumePreview