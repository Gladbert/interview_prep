'use client';

import React from 'react';
import { AssessmentRunner } from '@/components/assessments/assessment-runner';

const iqQuestions = [
  {
    id: 'q1',
    question:
      'Which number should come next in the pattern? 37, 34, 31, 28, ...',
    options: ['25', '26', '22', '24'],
    answer: '25'
  },
  {
    id: 'q2',
    question:
      'Find the answer that best completes the analogy: Book is to Reading as Fork is to...',
    options: ['drawing', 'writing', 'eating', 'stirring'],
    answer: 'eating'
  },
  {
    id: 'q3',
    question:
      'The day after tomorrow is four days before my birthday. If today is May 20th, when is my birthday?',
    options: ['May 24', 'May 25', 'May 26', 'May 28'],
    answer: 'May 26'
  },
  {
    id: 'q4',
    question: 'What is the missing number in the sequence: 4, 8, 16, __, 64?',
    options: ['24', '32', '40', '48'],
    answer: '32'
  },
  {
    id: 'q5',
    question:
      'A is B’s sister. C is B’s mother. D is C’s father. E is D’s mother. Then, how is A related to D?',
    options: ['Grandfather', 'Grandmother', 'Daughter', 'Granddaughter'],
    answer: 'Granddaughter'
  },
];

export default function IQAssessmentPage() {
  return (
    <AssessmentRunner
      title="IQ Test Assessment"
      description="Evaluate your logical reasoning skills under time pressure."
      type="IQ"
      questions={iqQuestions}
    />
  );
}
