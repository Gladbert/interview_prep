
'use client';

import React, { Suspense } from 'react';
import UserInterviewAssessment from './user-interview-assessment';

export default function UserInterviewAssessmentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserInterviewAssessment />
    </Suspense>
  );
}
