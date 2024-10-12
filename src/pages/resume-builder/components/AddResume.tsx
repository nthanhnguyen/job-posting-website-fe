import { FaPlusSquare } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Input from "antd/lib/input";
import { callCreateUserResume } from "@/config/api";
import { notification } from "antd";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [resumeTitle, setResumeTitle] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    console.log(resumeTitle);
    const res = await callCreateUserResume(resumeTitle);
    if (res.data) {
      setLoading(false);
      navigation('/resume-builder/resume/' + res.data._id + "/edit");
    } else {
      notification.error({
        message: 'Có lỗi xảy ra',
        description: res.message
      });
    }


  }

  return (
    <div >
      <div className='p-14 py-24 border 
        items-center flex 
        justify-center bg-secondary
        rounded-lg h-[280px]
        hover:scale-105 transition-all hover:shadow-md
        cursor-pointer border-dashed'
        onClick={() => setOpenDialog(true)}
      >
        <FaPlusSquare />
      </div>
      <Dialog open={openDialog}>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input className="my-2"
                placeholder="Ex.Full Stack resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className='flex justify-end gap-5'>
              <Button onClick={() => setOpenDialog(false)} variant="ghost">Cancel</Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}>
                {loading ?
                  <Loader2 className='animate-spin' /> : 'Create'
                }
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddResume