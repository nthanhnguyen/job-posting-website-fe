import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/pages/resume-builder/context/ResumeInfoContext'
import { callUpdateUserResumes } from '@/config/api'
import { IResumeInfo } from '@/types/backend'
import RichTextEditor from '../RichTextEditor'
import { ContentEditableEvent } from 'react-simple-wysiwyg'

interface ExperienceEntry {
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  workSummary: string;
}

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  currentlyWorking: false,
  workSummary: '',
}

function Experience() {
  const [experienceList, setExperienceList] = useState<ExperienceEntry[]>([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.experience && resumeInfo.experience.length > 0) {
      setExperienceList(resumeInfo.experience);
    }
  }, [resumeInfo]);

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newEntries = [...experienceList];
    (newEntries[index] as any)[name] = value; // need to review
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {

    setExperienceList([...experienceList, formField])
  }

  const RemoveExperience = () => {
    setExperienceList(experienceList => experienceList.slice(0, -1))
  }

  const handleRichTextEditor = (
    event: ContentEditableEvent,
    name: keyof ExperienceEntry,
    index: number
  ) => {
    const newEntries = [...experienceList];
    newEntries[index] = {
      ...newEntries[index],
      [name]: event.target.value,
    };
    setExperienceList(newEntries);
  };

  useEffect(() => {
    if (experienceList) {
      setResumeInfo({
        ...resumeInfo,
        experience: experienceList
      } as IResumeInfo);
    }
  }, [experienceList]);


  const onSave = async () => {
    setLoading(true)

    console.log(experienceList);
    const data = { data: { experience: experienceList } };

    try {
      const res = await callUpdateUserResumes(data, String(params.resumeId));
      if (res) {
        console.log(res);
        toast('Details updated');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Failed to update details.');
    } finally {
      setLoading(false);
    }

  }
  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Position Title</label>
                  <Input name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                  />
                </div>
                <div>
                  <label className='text-xs'>Company Name</label>
                  <Input name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName} />
                </div>
                <div>
                  <label className='text-xs'>City</label>
                  <Input name="city"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.city} />
                </div>
                <div>
                  <label className='text-xs'>State</label>
                  <Input name="state"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.state}
                  />
                </div>
                <div>
                  <label className='text-xs'>Start Date</label>
                  <Input type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.startDate} />
                </div>
                <div>
                  <label className='text-xs'>End Date</label>
                  <Input type="date" name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.endDate}
                  />
                </div>
                <div className='col-span-2'>
                  {/* Work Summary  */}
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummary}
                    onRichTextEditorChange={(event: ContentEditableEvent) => handleRichTextEditor(event, 'workSummary', index)} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
            <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>

          </div>
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Experience