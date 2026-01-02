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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Clock } from 'lucide-react';

const iqQuestions = [
  {
    id: 'q1',
    question:
      'Which number should come next in the pattern? 37, 34, 31, 28, ...',
    options: ['25', '26', '22', '24'],
  },
  {
    id: 'q2',
    question:
      'Find the answer that best completes the analogy: Book is to Reading as Fork is to...',
    options: ['drawing', 'writing', 'eating', 'stirring'],
  },
  {
    id: 'q3',
    question:
      'The day after tomorrow is four days before my birthday. If today is May 20th, when is my birthday?',
    options: ['May 24', 'May 25', 'May 26', 'May 28'],
  },
  {
    id: 'q4',
    question: 'What is the missing number in the sequence: 4, 8, 16, __, 64?',
    options: ['24', '32', '40', '48'],
  },
  {
    id: 'q5',
    question:
      'A is B’s sister. C is B’s mother. D is C’s father. E is D’s mother. Then, how is A related to D?',
    options: ['Grandfather', 'Grandmother', 'Daughter', 'Granddaughter'],
  },
];

const TIME_LIMIT = 5 * 60; // 5 minutes

export default function IQAssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<
    Record<string, string>
  >({});
  const [timeLeft, setTimeLeft] = React.useState(TIME_LIMIT);

  React.useEffect(() => {
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
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    alert(
      'Assessment submitted!\nYour answers: ' +
        JSON.stringify(selectedAnswers, null, 2)
    );
  };

  const handleNext = () => {
    if (currentQuestion < iqQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / iqQuestions.length) * 100;
  const question = iqQuestions[currentQuestion];

  return (
    <PageWrapper
      title="IQ Test Assessment"
      description="Evaluate your logical reasoning skills under time pressure."
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Progress value={progress} className="w-full mr-4" />
          <Alert className="w-auto py-2 px-4">
            <Clock className="h-4 w-4" />
            <AlertTitle className="sr-only">Time</AlertTitle>
            <AlertDescription className="font-bold">
              {formatTime(timeLeft)}
            </AlertDescription>
          </Alert>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>
              Question {currentQuestion + 1} of {iqQuestions.length}
            </CardTitle>
            <CardDescription>{question.question}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              value={selectedAnswers[question.id]}
            >
              {question.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleNext}>
              {currentQuestion < iqQuestions.length - 1
                ? 'Next Question'
                : 'Submit Assessment'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageWrapper>
  );
}
