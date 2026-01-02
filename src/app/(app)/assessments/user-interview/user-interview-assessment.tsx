
'use client';

import React, { useEffect, useRef, useState } from 'react';
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
import { Users, Video, Mic, VideoOff } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const interviewDetails = {
  'UX/UI Designer': {
    title: 'User Interview Assessment for UX/UI Designer',
    description:
      'Conduct a user interview to gather feedback on a new prototype.',
    scenario:
      'You are a UX designer at a company that is building a new mobile app for budget tracking. You are about to interview a potential user to understand their needs and pain points regarding personal finance management.',
    persona: {
      name: 'Alex',
      bio: 'Alex is a 30-year-old freelance graphic designer. They struggle to keep track of variable monthly income and expenses and are looking for a simple, visual way to manage their finances.',
    },
  },
  'Product Manager': {
    title: 'User Interview Assessment for Product Manager',
    description:
      'Conduct a user interview to validate a new feature idea.',
    scenario:
      'You are a Product Manager for an e-commerce platform. You are considering a "group-buy" feature. You are interviewing a user to see if this is a feature they would use.',
    persona: {
      name: 'Sarah',
      bio: 'Sarah is a 25-year-old student who often shops online with her friends. She looks for deals and enjoys collaborative shopping experiences.',
    },
  },
  'Software Engineer': {
    title: 'Technical Interview Assessment for Software Engineer',
    description:
      'Conduct a technical interview to assess problem-solving skills.',
    scenario:
      'You are a senior software engineer conducting a preliminary technical screen. You need to assess a candidate’s problem-solving approach and communication skills on a common data structure problem.',
  },
};

type JobRole = keyof typeof interviewDetails;

export default function UserInterviewAssessment() {
  const searchParams = useSearchParams();
  const job = searchParams.get('job') as JobRole | null;
  const [isStarted, setIsStarted] = React.useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const details =
    job && interviewDetails[job]
      ? interviewDetails[job]
      : interviewDetails['Software Engineer'];
      
  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description:
            'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    if (isStarted) {
      getCameraPermission();
    }
  }, [isStarted, toast]);


  if (!isStarted) {
    return (
      <PageWrapper title={details.title} description={details.description}>
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <CardTitle>User Interview Assessment</CardTitle>
            <CardDescription>
              You will simulate a user interview based on the provided scenario.
              Your goal is to ask insightful questions to uncover user needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" onClick={() => setIsStarted(true)}>
              Begin Interview
            </Button>
          </CardContent>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={details.title} description="Live interview session.">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="relative aspect-video bg-secondary rounded-lg flex items-center justify-center">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover rounded-lg"
                  autoPlay
                  muted
                />
                {!hasCameraPermission && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-lg">
                    <Video className="w-12 h-12 text-muted-foreground" />
                    <p className="text-muted-foreground mt-2">Camera is off</p>
                  </div>
                )}
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
              {!hasCameraPermission && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera access to use this feature.
                  </AlertDescription>
                </Alert>
              )}
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
        </div>
      </div>
    </PageWrapper>
  );
}
