
'use client';

import React, { Suspense } from 'react';
import WrittenTestTraining from './written-test-training';

export default function WrittenTestTrainingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WrittenTestTraining />
    </Suspense>
  );
}
