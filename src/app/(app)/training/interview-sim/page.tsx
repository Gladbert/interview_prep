
'use client';

import React from 'react';
import { PageWrapper } from '@/components/shared/page-wrapper';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bot, Mic, Video, VideoOff } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';

export default function InterviewSimTrainingPage() {
  return (
    <PageWrapper
      title="HRD Interview Training"
      description="Practice with our AI Interviewer for common HRD questions."
    >
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
              <CardTitle>AI Interviewer</CardTitle>
              <CardDescription>Role: HRD Manager</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center gap-4">
              <Avatar className="h-24 w-24">
                <div className="bg-secondary rounded-full w-full h-full flex items-center justify-center">
                  <Bot className="h-12 w-12 text-muted-foreground" />
                </div>
              </Avatar>
              <p className="text-muted-foreground text-sm">
                The AI is ready to start the interview.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
