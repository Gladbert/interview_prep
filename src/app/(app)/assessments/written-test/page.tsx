
'use client';

import React, { Suspense } from 'react';
import WrittenTestAssessment from './written-test-assessment';

export default function WrittenTestAssessmentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WrittenTestAssessment />
    </Suspense>
  );
}
