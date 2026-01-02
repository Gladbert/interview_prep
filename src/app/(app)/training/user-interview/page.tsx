
'use client';

import React, { Suspense } from 'react';
import UserInterviewTraining from './user-interview-training';

export default function UserInterviewTrainingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserInterviewTraining />
    </Suspense>
  );
}
