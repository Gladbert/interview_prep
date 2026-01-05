'use client';

import React from 'react';
import { AssessmentRunner } from '@/components/assessments/assessment-runner';

const iqQuestions = [
  {
    id: 'q1',
    question: 'Which number should come next in the pattern? 37, 34, 31, 28, ...',
    options: ['25', '26', '22', '24'],
    answer: '25',
    hint: 'Subtract 3 from the previous number.',
  },
  {
    id: 'q2',
    question: 'Find the answer that best completes the analogy: Book is to Reading as Fork is to...',
    options: ['drawing', 'writing', 'eating', 'stirring'],
    answer: 'eating',
  },
  {
    id: 'q3',
    question: 'The day after tomorrow is four days before my birthday. If today is May 20th, when is my birthday?',
    options: ['May 24', 'May 25', 'May 26', 'May 28'],
    answer: 'May 26',
    hint: 'Identify "tomorrow" first (May 21st). "The day after tomorrow" is May 22nd. May 22nd is 4 days before birthday.',
  },
  {
      id: 'q4',
      question: 'Identify the next number in the series: 2, 6, 12, 20, 30, ...',
      options: ['40', '42', '44', '46'],
      answer: '42',
      hint: 'The differences between terms are 4, 6, 8, 10. The next difference should be 12.'
  },
  {
      id: 'q5',
      question: 'Which word does not belong in the following group?',
      options: ['Apple', 'Grape', 'Banana', 'Carrot'],
      answer: 'Carrot',
      hint: 'Think about food categories.'
  }
];

export default function IQTrainingPage() {
  return (
    <AssessmentRunner
      title="IQ Test Training"
      description="Practice your logical, spatial, and mathematical reasoning skills with this timed assessment. Focus on accuracy and speed."
      type="IQ"
      questions={iqQuestions}
    />
  );
}
