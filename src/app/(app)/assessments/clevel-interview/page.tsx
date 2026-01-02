
'use client';

import React, { Suspense } from 'react';
import CLevelInterviewAssessment from './clevel-interview-assessment';

export default function CLevelInterviewAssessmentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CLevelInterviewAssessment />
    </Suspense>
  );
}
