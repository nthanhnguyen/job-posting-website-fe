import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, ContentEditableEvent, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { ResumeInfoContext } from '../../context/ResumeInfoContext';
import { AIChatSession, AIChatSessionForExperience } from '@/config/ai-api';
import { notification } from 'antd';

const PROMPT = 'position title: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array) , give me result in HTML tags';

interface IProps {
  onRichTextEditorChange: (event: ContentEditableEvent) => void;
  index: number;
  defaultValue: string;
}

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }: IProps) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const generateHTMLFromParsedResult = (parsedResult: string[]): string => {
    const ulItems = parsedResult.map(item => `<li>${item}</li>`).join('');
    return `<li>${ulItems}</li>`;
  };

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
    console.log('prompt :>> ', prompt);

    try {
      const result = await AIChatSessionForExperience.sendMessage(prompt);


      // const parsedResult = JSON.parse(await result.response.text())

      const parsedResult = JSON.parse(await result.response.text());
      console.log('parsedResult :>> ', parsedResult.bulletPoints);
      const htmlContent = generateHTMLFromParsedResult(parsedResult.bulletPoints);
      // console.log('htmlContent :>> ', htmlContent);
      // console.log('parsedResult :>> ', parsedResult);
      setValue(htmlContent);

      // await setValue(htmlContent);
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