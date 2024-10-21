import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ResumeInfoContext } from '@/pages/resume-builder/context/ResumeInfoContext';
import { IResumeInfo } from '@/types/backend';
import { callUpdateUserResumes } from '@/config/api';
import { toast } from 'sonner';

interface IProps {
    enabledNext: (v: any) => void;
}

function PersonalDetail(props: IProps) {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { enabledNext } = props;
    // Initialize formData as an empty object
    const [formData, setFormData] = useState({
        firstName: resumeInfo?.firstName ?? '',
        lastName: resumeInfo?.lastName ?? '',
        jobTitle: resumeInfo?.jobTitle ?? '',
        address: resumeInfo?.address ?? '',
        phone: resumeInfo?.phone ?? '',
        email: resumeInfo?.email ?? '',
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData({
            firstName: resumeInfo?.firstName ?? '',
            lastName: resumeInfo?.lastName ?? '',
            jobTitle: resumeInfo?.jobTitle ?? '',
            address: resumeInfo?.address ?? '',
            phone: resumeInfo?.phone ?? '',
            email: resumeInfo?.email ?? '',
        })
    }, [resumeInfo]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        enabledNext(false);
        const { name, value } = e.target;

        // Update formData safely with spread operator
        setFormData({
            ...formData,
            [name]: value,
        });

        // Update resumeInfo safely
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        } as IResumeInfo);
    };

    const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            data: formData,
        };

        const res = await callUpdateUserResumes(data, String(params?.resumeId));
        if (res) {
            enabledNext(true);
            setLoading(false);
            toast("Personal Detail updated");
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Personal Detail</h2>
            <p>Get Started with the basic information</p>

            <form onSubmit={onSave}>
                <div className="grid grid-cols-2 mt-5 gap-3">
                    <div>
                        <label className="text-sm">First Name</label>
                        <Input
                            name="firstName"
                            defaultValue={formData.firstName}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm">Last Name</label>
                        <Input
                            name="lastName"
                            defaultValue={formData.lastName}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="text-sm">Job Title</label>
                        <Input
                            name="jobTitle"
                            defaultValue={formData.jobTitle}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="text-sm">Address</label>
                        <Input
                            name="address"
                            defaultValue={formData.address}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm">Phone</label>
                        <Input
                            name="phone"
                            defaultValue={formData.phone}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm">Email</label>
                        <Input
                            name="email"
                            defaultValue={formData.email}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="mt-3 flex justify-end">
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetail;
