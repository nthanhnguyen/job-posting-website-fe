import { Loader2Icon, MoreVertical, Notebook } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
import { callDeleteUserResumes } from '@/config/api'
import { message, notification } from 'antd'

interface IProps {
  resume: any;
  refreshData: any;
}

function ResumeCardItem(props: IProps) {
  const { resume, refreshData } = props;
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  // const onMenuClick=(url)=>{
  //   navigation(url)
  // }
  // console.log(resume);

  const handleDeleteRole = async (_id: string | undefined) => {
    if (_id) {
        const res = await callDeleteUserResumes(_id);
        if (res && res.data) {
            message.success('Xóa resume thành công');
            refreshData();
            setLoading(false);
            setOpenAlert(false);
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            });
        }
    }
}
  return (

    <div className=''>
      <Link to={"/resume-builder/resume/" + resume._id + "/edit"}>
        <div className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200
          h-[280px] rounded-t-lg border-t-4 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 group-hover:bg-opacity-90"
        style={{
          borderColor: resume?.themeColor
        }}
        >
          <div className='flex 
        items-center justify-center h-[180px] '>
            {/* <Notebook/> */}
            <img src="/src/img/cv.png" width={80} height={80} />
          </div>
        </div>
      </Link>
      <div className='border p-3 flex justify-between  text-white rounded-b-lg shadow-lg'
        style={{
          background: resume?.themeColor
        }}>
        <h2 className='text-sm'>{resume.jobTitle}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-4 w-4 cursor-pointer'/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>

            <DropdownMenuItem onClick={() => navigation("/resume-builder/resume/" + resume._id + "/edit")}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation("/my-resume/" + resume._id + "/view")}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation("/my-resume/" + resume._id + "/view")}>Download</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDeleteRole(resume._id)}
                disabled={loading}>
                {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>

  )
}

export default ResumeCardItem