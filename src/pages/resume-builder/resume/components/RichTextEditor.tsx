import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, ContentEditableEvent, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { toast } from 'sonner';
import { ResumeInfoContext } from '../../context/ResumeInfoContext';
import { AIChatSession } from '@/config/ai-api';
import { notification } from 'antd';

const PROMPT = 'position titile: {positionTitle} , Depends on position title give me 5-7 points for my experience in resume (Please do not add experience level and No JSON array) , give me result in HTML tags.';

interface IProps {
  onRichTextEditorChange: (event: ContentEditableEvent) => void;
  index: number;
  defaultValue: string;
}

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }: IProps) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);


  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      notification.error({
        message: 'Có lỗi xảy ra',
        description: 'Xin hãy thêm title cho Experience!',
      });
      return;
    }
    setLoading(true);
    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      let resp = await result.response.text();

      let cleanedResp = resp
        .replace('{"bulletPoints": ["', '')
        .replace('"]}', '')
        .split('", "')
        .map(item => item.trim())
        .filter(item => item !== '')
        .join('\n');

      await setValue(cleanedResp);
    } catch (error) {
      notification.error({
        message: 'Có lỗi xảy ra',
        description: 'Có lỗi trong quá trình tạo summary, xin hãy thử lại!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summary</label>
        <Button variant="outline" size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary">
          {loading ?
            <LoaderCircle className='animate-spin' /> :
            <>
              <Brain className='h-4 w-4' /> Generate from AI
            </>
          }
        </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={(e: ContentEditableEvent) => {
          setValue(e.target.value);
          onRichTextEditorChange(e)
        }}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />


          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor