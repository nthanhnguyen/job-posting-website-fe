import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '@/redux/hooks'
import { callFetchUserResumesById } from '@/config/api'
import { IResumeInfo } from '@/types/backend'
import { ResumeInfoContext } from '@/pages/resume-builder/context/ResumeInfoContext'
import ResumePreview from '@/pages/resume-builder/resume/components/ResumePreview'
import { RWebShare } from 'react-web-share'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState<IResumeInfo | undefined>(undefined);
  const { resumeId } = useParams<{ resumeId: string }>();
  const user = useAppSelector(state => state.account.user);

  useEffect(() => {
    GetResumesById();
  }, [user, resumeId]);

  const GetResumesById = async () => {
    if (user && resumeId) {
      const res = await callFetchUserResumesById(resumeId);
      setResumeInfo(res.data);
    }
  }

  const handleDownload = () => {
    window.print();
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">

        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <h2 className='text-center text-2xl font-medium'>
          Xin chúc mừng! CV của bạn đã sẵn sàng! </h2>
          {/* <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique
            resume url with your friends and family </p> */}
          <div className='flex justify-between px-44 my-10'>
            <Button onClick={handleDownload}>Download</Button>
            <Link to={"/resume-builder"}>
             <Button><Home /></Button>
            </Link>
            {/* <Button>Share</Button> */}
            {/* <RWebShare
              data={{
                text: "Hello Everyone, This is my resume please open url to see it",
                url: import.meta.env.VITE_BASE_URL_RESUME + "/my-resume/" + resumeId + "/view",
                title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume",
              }}
              onClick={() => console.log("shared successfully!")}
            > <Button>Share</Button>
            </RWebShare> */}
          </div>
        </div>

      </div>
      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div id="print-area" >
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume