import { IResumeInfo } from '@/types/backend';
import React from 'react'

interface IProps {
  resumeInfo?: IResumeInfo;
}

function SummaryPreview(props: IProps) {
  const { resumeInfo } = props

  return (
    <p className='text-xs'>
      {resumeInfo?.summary}
    </p>
  )
}

export default SummaryPreview