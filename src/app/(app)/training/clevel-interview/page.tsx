
'use client';

import React, { Suspense } from 'react';
import CLevelInterviewTraining from './clevel-interview-training';

export default function CLevelInterviewTrainingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CLevelInterviewTraining />
    </Suspense>
  );
}
