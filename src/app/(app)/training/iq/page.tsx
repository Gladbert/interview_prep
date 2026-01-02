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
import { Lightbulb } from 'lucide-react';

const iqQuestions = [
  {
    id: 'q1',
    question:
      'Which number should come next in the pattern? 37, 34, 31, 28, ...',
    options: ['25', '26', '22', '24'],
    answer: '25',
  },
  {
    id: 'q2',
    question:
      'Find the answer that best completes the analogy: Book is to Reading as Fork is to...',
    options: ['drawing', 'writing', 'eating', 'stirring'],
    answer: 'eating',
  },
  {
    id: 'q3',
    question:
      'The day after tomorrow is four days before my birthday. If today is May 20th, when is my birthday?',
    options: ['May 24', 'May 25', 'May 26', 'May 28'],
    answer: 'May 26',
  },
];

export default function IQTrainingPage() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<
    Record<string, string>
  >({});
  const [showHint, setShowHint] = React.useState(false);

  const handleNext = () => {
    setShowHint(false);
    if (currentQuestion < iqQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Handle submission
      alert(
        'Training session completed!\nYour answers: ' +
          JSON.stringify(selectedAnswers, null, 2)
      );
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const progress = ((currentQuestion + 1) / iqQuestions.length) * 100;
  const question = iqQuestions[currentQuestion];

  return (
    <PageWrapper
      title="IQ Test Training"
      description="Practice your logical reasoning skills."
    >
      <div className="max-w-2xl mx-auto">
        <Progress value={progress} className="mb-6" />
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
          <CardFooter className="flex flex-col items-start gap-4">
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={() => setShowHint(!showHint)}>
                <Lightbulb className="mr-2 h-4 w-4" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </Button>
              <Button onClick={handleNext}>
                {currentQuestion < iqQuestions.length - 1
                  ? 'Next Question'
                  : 'Finish Training'}
              </Button>
            </div>
            {showHint && (
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Hint</AlertTitle>
                <AlertDescription>
                  Look for the pattern in the sequence of numbers. How much does
                  it decrease each time?
                </AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </Card>
      </div>
    </PageWrapper>
  );
}
