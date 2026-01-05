'use client';

import React from 'react';
import { AssessmentRunner } from '@/components/assessments/assessment-runner';

const answerOptions = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
];

const psychoQuestions = [
  {
    id: 'pq1',
    question: 'You are at a social event. You are more likely to:',
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
  {
      id: 'pq4',
      question: 'You find it easy to stay relaxed and focused even when there is some pressure.',
      options: answerOptions,
  },
  {
      id: 'pq5',
      question: 'You rarely do something just out of sheer curiosity.',
      options: answerOptions,
  }
];

export default function PsychoTrainingPage() {
  return (
    <AssessmentRunner
      title="Psycho-Test Training"
      description="Understand your personality traits and work style to better prepare for behavioral interviews."
      type="Personality"
      questions={psychoQuestions}
    />
  );
}
