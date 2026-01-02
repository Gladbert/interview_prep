
'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { PageWrapper } from '@/components/shared/page-wrapper';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users, User, Video, Mic, VideoOff } from 'lucide-react';

const interviewDetails = {
  'UX/UI Designer': {
    title: 'User Interview Practice for UX/UI Designer',
    description:
      'Practice conducting a user interview to gather feedback on a new prototype.',
    scenario:
      'You are a UX designer at a company that is building a new mobile app for budget tracking. You are about to interview a potential user to understand their needs and pain points regarding personal finance management.',
    persona: {
      name: 'Alex',
      bio: 'Alex is a 30-year-old freelance graphic designer. They struggle to keep track of variable monthly income and expenses and are looking for a simple, visual way to manage their finances.',
    },
  },
  'Product Manager': {
    title: 'User Interview Practice for Product Manager',
    description:
      'Practice conducting a user interview to validate a new feature idea.',
    scenario:
      'You are a Product Manager for an e-commerce platform. You are considering a "group-buy" feature. You are interviewing a user to see if this is a feature they would use.',
    persona: {
      name: 'Sarah',
      bio: 'Sarah is a 25-year-old student who often shops online with her friends. She looks for deals and enjoys collaborative shopping experiences.',
    },
  },
  'Software Engineer': {
    title: 'Technical Interview Practice for Software Engineer',
    description: 'Practice a mock technical interview to sharpen your skills.',
    scenario:
      'You are a senior software engineer conducting a preliminary technical screen. You need to assess a candidate’s problem-solving approach and communication skills on a common data structure problem.',
    persona: {
      name: 'Candidate',
      bio: 'A mid-level software engineer candidate with experience in web development, looking to join your team.',
    },
  },
};

type JobRole = keyof typeof interviewDetails;

export default function UserInterviewTraining() {
  const searchParams = useSearchParams();
  const job = searchParams.get('job') as JobRole | null;

  const details =
    job && interviewDetails[job]
      ? interviewDetails[job]
      : interviewDetails['UX/UI Designer'];

  return (
    <PageWrapper title={details.title} description={details.description}>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="relative aspect-video bg-secondary rounded-lg flex items-center justify-center">
                <Video className="w-12 h-12 text-muted-foreground" />
                <p className="absolute bottom-2 left-2 text-xs text-background/80 bg-black/20 px-1 rounded">
                  AI Interviewer
                </p>
                <div className="absolute top-4 right-4 w-1/4 aspect-[3/4] bg-background rounded-md overflow-hidden border-2 border-background">
                  <div className="w-full h-full object-cover flex items-center justify-center bg-secondary">
                    <p className="text-xs text-muted-foreground">You</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-2 mt-4">
                <Button variant="outline" size="icon">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <VideoOff className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                <CardTitle>Interview Scenario</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {details.scenario}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-primary" />
                <CardTitle>Interviewee Persona: {details.persona.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {details.persona.bio}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
