'use client';

import React from 'react';
import { AssessmentRunner } from '@/components/assessments/assessment-runner';

const psychoQuestions = [
  {
    id: 'pq1',
    question:
      'You find it takes effort to introduce yourself to other people.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'pq2',
    question: 'You often get so lost in thought that you ignore or forget your surroundings.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'pq3',
    question: 'You prefer to do things in a planned, organized way rather than spontaneously.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
  {
    id: 'pq4',
    question: 'Your emotions control you more than you control them.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
   {
    id: 'pq5',
    question: 'At social events, you are more likely to be found on the sidelines than in the center of the action.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  },
];

export default function PsychoAssessmentPage() {
  return (
    <AssessmentRunner
      title="Personality Assessment"
      description="Complete this assessment to gain insights into your personality profile."
      type="Personality"
      questions={psychoQuestions}
    />
  );
}
