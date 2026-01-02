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
      'You are at a social event. You are more likely to:',
    options: [
      'Interact with many, including strangers',
      'Interact with a few, known people',
    ],
  },
  {
    id: 'pq2',
    question: 'When making decisions, you prefer to:',
    options: [
      'First look at logic and consistency',
      'First look at the people and special circumstances',
    ],
  },
  {
    id: 'pq3',
    question: 'Your travel plans are more likely to be:',
    options: ['Carefully planned', 'Spontaneous and flexible'],
  },
];

const answerOptions = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
];

export default function PsychoTrainingPage() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const handleNext = () => {
    if (currentQuestion < psychoQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(
        'Training session completed!\nYour answers: ' +
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
      title="Psycho-Test Training"
      description="Understand your personality traits better."
    >
      <div className="max-w-2xl mx-auto">
        <Progress value={progress} className="mb-6" />
        <Card>
          <CardHeader>
            <CardTitle>
              Question {currentQuestion + 1} of {psychoQuestions.length}
            </CardTitle>
            <CardDescription>{question.question}</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              value={answers[question.id]}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose your response" />
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
                : 'Finish Training'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageWrapper>
  );
}
