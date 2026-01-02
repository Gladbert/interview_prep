
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
import { Award, Mic, Video, VideoOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const interviewData = {
  CTO: {
    role: 'Chief Technology Officer (CTO)',
    questions: [
      'Given our goal to expand into the European market, what would be your 90-day strategic plan for the engineering department?',
      'Describe a time you had to lead your team through a significant technical crisis. What was the outcome?',
      'How do you balance the need for rapid innovation with the need for stable, scalable systems?',
    ],
    briefing: {
      company: 'QuantumLeap AI',
      situation:
        'QuantumLeap AI is a Series C startup aiming for an IPO in the next 18-24 months. The current platform is monolithic and struggling with scalability. Your role is to modernize the tech stack and prepare the company for public-market levels of scrutiny and reliability.',
    },
  },
  CFO: {
    role: 'Chief Financial Officer (CFO)',
    questions: [
      'How would you prepare our company financially for a potential IPO in the next 18-24 months?',
      'Describe your experience with M&A. How would you evaluate a potential acquisition target for our company?',
      'What is your strategy for managing cash flow and optimizing our capital structure in a high-growth startup environment?',
    ],
    briefing: {
      company: 'InnovateNext Inc.',
      situation:
        'InnovateNext Inc. is a fast-growing SaaS company that has just secured Series B funding. The company needs to establish rigorous financial controls and strategic planning to ensure sustainable growth and profitability.',
    },
  },
  CEO: {
    role: 'Chief Executive Officer (CEO)',
    questions: [
      'What is your vision for this company in the next five years?',
      'How would you foster a culture of innovation while ensuring operational efficiency?',
      'Describe a time you had to make a difficult decision that had a major impact on the company. What was your process?',
    ],
    briefing: {
      company: 'Global Solutions Ltd.',
      situation:
        'Global Solutions Ltd. is a market leader facing increasing competition and technological disruption. The board is looking for a new CEO to drive transformation, expand into new markets, and redefine the company’s strategic direction.',
    },
  },
};

type CLevelRole = keyof typeof interviewData;

export default function CLevelInterviewAssessment() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('job') as CLevelRole | null;
  const selectedRole: CLevelRole =
    roleParam && interviewData[roleParam] ? roleParam : 'CTO';

  const [isStarted, setIsStarted] = React.useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const { role, questions, briefing } = interviewData[selectedRole];

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
        title="C-Level Interview Assessment"
        description={`Prepare for your assessment for the ${role} role.`}
      >
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <CardTitle>Welcome to the Executive Interview</CardTitle>
            <CardDescription>
              {briefing.situation} You will be asked {questions.length}{' '}
              strategic questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="font-semibold text-lg">
              You are being assessed for the role of: {role}
            </p>
            <Button size="lg" onClick={() => setIsStarted(true)}>
              Begin Assessment
            </Button>
          </CardContent>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title="C-Level Interview Assessment"
      description="Articulate your strategic vision and leadership capabilities."
    >
      <div className="grid lg:grid-cols-3 gap-8">
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
                <Award className="w-6 h-6 text-primary" />
                <CardTitle>Briefing</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-semibold">
                {role} at {briefing.company}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {briefing.situation}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
