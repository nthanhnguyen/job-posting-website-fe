import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ResumeInfoContext } from '@/pages/resume-builder/context/ResumeInfoContext'
import { callUpdateUserResumes } from '@/config/api'
import { IResumeInfo } from '@/types/backend'
function Skills() {

    const [skillsList, setSkillsList] = useState([{
        name: '',
        rating: 0
    }])
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    useEffect(() => {
        resumeInfo && setSkillsList(resumeInfo?.skills)
    }, [])

    const handleChange = (index: number, name: 'name' | 'rating', value: string | number) => {
        const newEntries = skillsList.slice();

        (newEntries[index] as any)[name] = value;
        setSkillsList(newEntries);
    }

    const AddNewSkills = () => {
        setSkillsList([...skillsList, {
            name: '',
            rating: 0
        }])
    }
    const RemoveSkills = () => {
        setSkillsList(skillsList => skillsList.slice(0, -1))
    }

    const onSave = async () => {
        setLoading(true);
        console.log(skillsList);
        const data = { data: { skills: skillsList } };

        try {
            const res = await callUpdateUserResumes(data, String(params.resumeId));
            if (res) {
                console.log(res);
                toast('Details updated');
            }
        } catch (error) {
            console.error('Error saving Education:', error);
            toast.error('Failed to update details.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        } as IResumeInfo)
    }, [skillsList])
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add Your top professional key skills</p>

            <div>
                {skillsList.map((item, index) => (
                    <div className='flex justify-between mb-2 border rounded-lg p-3 '>
                        <div>
                            <label className='text-xs'>Name</label>
                            <Input className="w-full"
                                defaultValue={item.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)} />
                        </div>
                        <Rating style={{ maxWidth: 120 }} value={item.rating}
                            onChange={(value: number) => handleChange(index, 'rating', value)} />

                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
                    <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>

                </div>
                <Button disabled={loading} onClick={() => onSave()}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    )
}

export default Skills