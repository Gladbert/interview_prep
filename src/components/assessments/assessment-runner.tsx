'use client';

import React, { useState } from 'react';
import { GreenRoom } from './green-room';
import { CompletionScreen } from './completion-screen';
import { MCQInterface, Question } from './mcq-interface';
import { PageWrapper } from '@/components/shared/page-wrapper';
import { VideoInterviewInterface } from './video-interview-interface';
import { WrittenTestInterface } from './written-test-interface';

type AssessmentPhase = 'green-room' | 'active' | 'completion';

interface AssessmentRunnerProps {
  title: string;
  description: string;
  type: 'IQ' | 'Personality' | 'Interview' | 'Written';
  questions: Question[]; // Using generic Question type for now
  onExit?: () => void;
}

export function AssessmentRunner({ title, description, type, questions }: AssessmentRunnerProps) {
  const [phase, setPhase] = useState<AssessmentPhase>('green-room');
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);

  const startAssessment = () => {
    setPhase('active');
  };

  const handleComplete = (score: number) => {
    setResult({ score, total: type === 'IQ' || type === 'Personality' ? questions.length : 100 });
    setPhase('completion');
  };

  const handleRetry = () => {
    setResult(null);
    setPhase('green-room');
  };

  return (
    <PageWrapper title={phase === 'green-room' ? title : (phase === 'active' ? 'Assessment in Progress' : 'Assessment Complete')} description={phase === 'green-room' ? description : ''}>
      {phase === 'green-room' && (
        <GreenRoom
          title={title}
          instructions={`You are about to start the ${title}. This session will last approximately ${questions.length * 30 / 60} minutes. Please ensure you are in a quiet environment.`}
          onStart={startAssessment}
        />
      )}

      {phase === 'active' && type === 'IQ' && (
        <MCQInterface
          questions={questions}
          onComplete={handleComplete}
          title={title}
        />
      )}
      
       {/* Reusing MCQ Interface for Personality for now, simpler logic usually but visual is similar */}
       {phase === 'active' && type === 'Personality' && (
        <MCQInterface
          questions={questions}
          onComplete={handleComplete}
          title={title}
        />
      )}

      {phase === 'active' && type === 'Interview' && (
         <VideoInterviewInterface 
            onComplete={handleComplete} 
            questions={questions}
         />
      )}

      {phase === 'active' && type === 'Written' && (
         <WrittenTestInterface 
            onComplete={handleComplete} 
            title={title}
         />
      )}

      {phase === 'completion' && (
        <CompletionScreen
          score={result?.score}
          total={result?.total}
          onRetry={handleRetry}
          type={type}
        />
      )}
    </PageWrapper>
  );
}
