import React from 'react'
import { IResumeInfo } from '../../[resumeId]/edit';

interface IProps {
  resumeInfo?: IResumeInfo;
}

function SummeryPreview(props: IProps) {
  const { resumeInfo } = props

  return (
    <p className='text-xs'>
      {resumeInfo?.summery}
    </p>
  )
}

export default SummeryPreview