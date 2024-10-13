import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React, { useContext, useEffect, useState, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { ResumeInfoContext } from '@/pages/resume-builder/context/ResumeInfoContext';
import { IResumeInfo } from '@/types/backend';
import { callUpdateUserResumes } from '@/config/api';
import { AIChatSession } from '@/config/ai-api';

const promptTemplate = `Job Title: {jobTitle}, Depends on job title give me list of summary for 3 experience levels: Mid Level and Fresher in 3-4 lines, in array format, with summary and experience_level fields in JSON format`;

interface IProps {
  enabledNext: (v: any) => void;
}

interface SummaryItem {
  summary: string;
  experience_level: string;
}

function Summary(props: IProps) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState<string | undefined>(resumeInfo?.summary);
  const [loading, setLoading] = useState(false);
  const { enabledNext } = props;
  const params = useParams();

  // Use a specific type for aiGeneratedSummaryList state
  const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState<SummaryItem[] | null>(null);

  useEffect(() => {
    if (summary) {
      setResumeInfo({
        ...resumeInfo,
        summary,
      } as IResumeInfo);
    }
  }, [summary]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const jobTitle = resumeInfo?.jobTitle || 'General'; // Fallback to 'General' if jobTitle is undefined
    const PROMPT = promptTemplate.replace('{jobTitle}', jobTitle);
    console.log(PROMPT);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const parsedResult = JSON.parse(await result.response.text()) as SummaryItem[];
      console.log(parsedResult);
      setAiGenerateSummaryList(parsedResult);
    } catch (error) {
      console.error('Error generating summary:', error);
      toast.error('Failed to generate summary.');
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = { data: { summary } };

    try {
      const res = await callUpdateUserResumes(data, String(params.resumeId));
      if (res) {
        console.log(res);
        enabledNext(true);
        toast('Details updated');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Failed to update details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSummaryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value); // Correct type assignment
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add a summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label>Add Summary</label>
            <Button variant="outline" onClick={() => GenerateSummaryFromAI()}
              type="button" size="sm" className="border-primary text-primary flex gap-2">
              <Brain className='h-4 w-4' />  Generate from AI</Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summary}
            defaultValue={resumeInfo?.summary}
            onChange={handleSummaryChange}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList.map((item: SummaryItem, index: number) => (
            <div
              key={index}
              onClick={() => setSummary(item.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">Level: {item.experience_level}</h2>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
