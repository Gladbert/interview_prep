
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
import { Award, Mic, Video, VideoOff } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const interviewData = {
  CTO: {
    role: 'Vice President of Engineering',
    company: 'InnovateNext Inc.',
    situation:
      'The company has just secured Series B funding and is planning to double its customer base in 12 months. The engineering team needs to scale rapidly while maintaining product quality and velocity.',
    keyChallenges: [
      'Scaling infrastructure to handle increased load.',
      'Hiring and onboarding top talent quickly.',
      'Maintaining a strong, positive engineering culture during rapid growth.',
      'Balancing new feature development with technical debt.',
    ],
    initialQuestion:
      "Welcome. We're looking for our next VP of Engineering. Let's begin. What is your leadership philosophy?",
  },
  CFO: {
    role: 'Chief Financial Officer',
    company: 'FinTech Innovators',
    situation:
      'After a successful Series C funding round, the company is preparing for a potential IPO within the next 2 years. The finance department must be built out to meet public company standards.',
    keyChallenges: [
      'Implementing SOX compliance.',
      'Developing a long-range financial forecast.',
      'Managing investor relations and preparing for roadshows.',
      'Optimizing the capital structure for public markets.',
    ],
    initialQuestion:
      'Welcome. We are seeking a CFO to guide us to the public markets. To start, how would you approach building a finance team from the ground up?',
  },
  CEO: {
    role: 'Chief Executive Officer',
    company: 'Legacy Systems Corp.',
    situation:
      'A long-standing industry player is facing market share erosion from agile, digital-native competitors. The board is seeking a transformative leader to modernize the company.',
    keyChallenges: [
      'Driving digital transformation across the organization.',
      'Pivoting the business model towards recurring revenue.',
      'Re-energizing the company culture and attracting new talent.',
      'Making strategic acquisitions to gain new capabilities.',
    ],
    initialQuestion:
      "Welcome. We're at a pivotal moment in our company's history. What is your framework for leading a large-scale business transformation?",
  },
};

type CLevelRole = keyof typeof interviewData;

export default function CLevelInterviewTraining() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('job') as CLevelRole | null;
  const selectedRole: CLevelRole =
    roleParam && interviewData[roleParam] ? roleParam : 'CTO';

  const { role, company, situation, keyChallenges, initialQuestion } =
    interviewData[selectedRole];

  return (
    <PageWrapper
      title="Head (C-Level) Interview Training"
      description="Prepare for executive-level interviews and strategic discussions."
    >
      <div className="grid lg:grid-cols-3 gap-8">
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
                <Award className="w-6 h-6 text-primary" />
                <CardTitle>The Situation Room</CardTitle>
              </div>
              <CardDescription>
                You are interviewing for the {role} role at {company}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>View Full Briefing</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4 text-muted-foreground text-sm">
                      {situation}
                    </p>
                    <h4 className="font-semibold mb-2 text-sm">
                      Key Challenges:
                    </h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                      {keyChallenges.map((challenge, i) => (
                        <li key={i}>{challenge}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Initial Question</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground text-sm">
                      {initialQuestion}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
