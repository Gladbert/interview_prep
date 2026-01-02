'use client';

import React from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const psychoQuestions = [
  {
    id: 'pq1',
    question:
      'You find it takes effort to introduce yourself to other people.',
  },
  {
    id: 'pq2',
    question: 'You often get so lost in thought that you ignore or forget your surroundings.',
  },
  {
    id: 'pq3',
    question: 'You prefer to do things in a planned, organized way rather than spontaneously.',
  },
  {
    id: 'pq4',
    question: 'Your emotions control you more than you control them.',
  },
   {
    id: 'pq5',
    question: 'At social events, you are more likely to be found on the sidelines than in the center of the action.',
  },
];

const answerOptions = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
];

export default function PsychoAssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const handleNext = () => {
    if (currentQuestion < psychoQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(
        'Assessment submitted!\nYour answers: ' +
          JSON.stringify(answers, null, 2)
      );
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const progress = ((currentQuestion + 1) / psychoQuestions.length) * 100;
  const question = psychoQuestions[currentQuestion];

  return (
    <PageWrapper
      title="Psycho-Test Assessment"
      description="Complete this assessment to gain insights into your personality profile."
    >
      <div className="max-w-2xl mx-auto">
        <Progress value={progress} className="mb-6" />
        <Card>
          <CardHeader>
            <CardTitle>
              Question {currentQuestion + 1} of {psychoQuestions.length}
            </CardTitle>
            <CardDescription className="text-lg pt-2">{question.question}</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              value={answers[question.id]}
            >
              <SelectTrigger>
                <SelectValue placeholder="How much do you agree?" />
              </SelectTrigger>
              <SelectContent>
                {answerOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleNext}>
              {currentQuestion < psychoQuestions.length - 1
                ? 'Next Question'
                : 'Submit Assessment'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageWrapper>
  );
}
