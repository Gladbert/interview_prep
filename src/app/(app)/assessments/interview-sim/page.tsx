
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PageWrapper } from '@/components/shared/page-wrapper';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mic, Video, VideoOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const interviewDetails = {
  role: 'HRD Interview',
  questions: [
    'How do you handle conflict resolution between employees?',
    'Describe your experience with employee onboarding and training programs.',
    'How do you ensure compliance with labor laws and regulations?',
  ],
};

export default function InterviewSimAssessmentPage() {
  const [isStarted, setIsStarted] = React.useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const details = interviewDetails;

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
      <PageWrapper
        title="HRD Interview Assessment"
        description={`Prepare to be assessed for the ${details.role}.`}
      >
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <CardTitle>You are about to begin your assessment.</CardTitle>
            <CardDescription>
              You will be asked {details.questions.length} questions. Please
              answer them clearly. The session is timed. Good luck.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" onClick={() => setIsStarted(true)}>
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title={`${details.role} Assessment`}
      description="Answer the questions as you would in a real interview."
    >
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
              <CardTitle>Interview Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{details.role}</p>
              <p className="text-sm text-muted-foreground">
                You will be asked {details.questions.length} questions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
