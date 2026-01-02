
'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { PageWrapper } from '@/components/shared/page-wrapper';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileText, Clock } from 'lucide-react';

const testDetails = {
  'Software Engineer': {
    title: 'Software Engineer Written Assessment',
    description:
      'This test assesses your problem-solving and coding abilities.',
    scenario:
      'You are tasked with designing a caching mechanism for a high-traffic web service. Describe your approach, including data structures, eviction policies, and considerations for concurrency.',
    timeLimit: 30, // minutes
  },
  'Product Manager': {
    title: 'Product Manager Case Study Assessment',
    description:
      'This case study evaluates your product thinking and strategy skills.',
    scenario:
      "A social media app is seeing a decline in user engagement. Propose a new feature to address this. Outline the problem, your proposed solution, key metrics for success, and a go-to-market plan.",
    timeLimit: 45,
  },
  'Data Scientist': {
    title: 'Data Scientist Technical Challenge Assessment',
    description:
      'This challenge will test your data analysis and modeling skills.',
    scenario:
      "You are given a dataset of customer transactions. Describe how you would build a model to predict customer churn. What features would you engineer? Which models would you try? How would you evaluate the model's performance?",
    timeLimit: 60,
  },
};

type JobRole = keyof typeof testDetails;

export default function WrittenTestAssessment() {
  const searchParams = useSearchParams();
  const job = searchParams.get('job') as JobRole | null;
  const [answer, setAnswer] = React.useState('');
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [isStarted, setIsStarted] = React.useState(false);

  const details =
    job && testDetails[job] ? testDetails[job] : testDetails['Software Engineer'];

  const startTest = () => {
    setIsStarted(true);
    setTimeLeft(details.timeLimit * 60);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = () => {
    alert(
      `Assessment Submitted!\nYour answer for ${details.title}:\n\n${answer}`
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  if (!isStarted) {
    return (
      <PageWrapper title={details.title} description={details.description}>
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <CardTitle>You are about to begin your assessment.</CardTitle>
            <CardDescription>
              You will have {details.timeLimit} minutes to complete the task.
              The timer will start once you click the button below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" onClick={startTest}>
              Start Written Assessment
            </Button>
          </CardContent>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={details.title} description={details.description}>
      <div className="max-w-4xl mx-auto">
        <Alert className="mb-6">
          <Clock className="h-4 w-4" />
          <AlertTitle>Time Remaining</AlertTitle>
          <AlertDescription className="text-xl font-bold">
            {formatTime(timeLeft)}
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <CardTitle>Assessment Task</CardTitle>
            </div>
            <CardDescription className="pt-2">
              {details.scenario}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write your response here..."
              className="min-h-[30vh] sm:min-h-[400px]"
            />
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSubmit}
              className="w-full md:w-auto ml-auto"
              disabled={timeLeft === 0}
            >
              Submit Assessment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageWrapper>
  );
}
