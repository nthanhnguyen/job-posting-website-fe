import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  useEffect(() => {

    console.log(resumeId);
  }, [])

  return (
    <div>Edit resume</div>
  )
}

export default EditResume