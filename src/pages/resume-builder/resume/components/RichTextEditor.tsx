import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, ContentEditableEvent, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { toast } from 'sonner';
import { ResumeInfoContext } from '../../context/ResumeInfoContext';
import { AIChatSession } from '@/config/ai-api';

const PROMPT = 'position title: {positionTitle},  Give me 5-7 bullet points describing relevant experience for this position.';

interface IProps {
  onRichTextEditorChange: (event: ContentEditableEvent) => void;
  index: number;
  defaultValue: string;
}

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }: IProps) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  // const GenerateSummeryFromAI = async () => {

  //   if (!resumeInfo?.experience[index]?.title) {
  //     toast('Please Add Position Title');
  //     return;
  //   }
  //   setLoading(true)
  //   const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
  //   console.log('resumeInfo.experience[index].title :>> ', resumeInfo.experience[index].title);
  //   console.log("prompt: ", prompt);
  //   const result = await AIChatSession.sendMessage(prompt);
  //   console.log("check: ", result.response.text());
  //   console.log('check 22:>> ', result);
  //   const resp = result.response.text();

  //   setValue(resp.replace('[', '').replace(']', ''));
  //   setLoading(false);
  // }

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      toast('Please Add Position Title');
      return;
    }
    setLoading(true);
    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
    console.log('prompt:', prompt);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      let resp = await result.response.text();

      //Clean up the response - remove extra whitespace and create an unordered list
      resp = resp.trim();
      const bulletPoints = resp.split('\n').map(item => item.trim()).filter(item => item !== ''); //remove empty lines

      //Convert bullet points to HTML unordered list
      const htmlList = `<ul>${bulletPoints.map(item => `<li>${item}</li>`).join('')}</ul>`;

      // await setValue(htmlList);
      setValue('11')
      console.log('value :>> ', htmlList);
    } catch (error) {
      console.error('Error generating summary:', error);
      toast.error('Failed to generate summary.');
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