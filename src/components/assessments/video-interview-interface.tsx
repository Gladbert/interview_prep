'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface VideoInterviewInterfaceProps {
  onComplete: (score: number) => void;
  questions: any[]; // Using any for mock flexibility
}

export function VideoInterviewInterface({ onComplete }: VideoInterviewInterfaceProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  // Mock conversation flow
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleNext = () => {
    setIsRecording(false);
    setTimer(0);
    if (currentQuestion < 2) { // 3 mock questions
      setCurrentQuestion(curr => curr + 1);
    } else {
      onComplete(85); // Mock score
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)] min-h-[600px]">
      {/* Sidebar: Persona Card */}
      <Card className="w-full lg:w-80 flex-shrink-0 flex flex-col">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 relative">
             <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse" />
             <Avatar className="h-24 w-24 border-4 border-background relative z-10">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026703b" />
                <AvatarFallback>AI</AvatarFallback>
             </Avatar>
             <Badge className="absolute bottom-0 right-0 bg-green-500 hover:bg-green-600">Online</Badge>
          </div>
          <h2 className="text-xl font-bold">Alex Chen</h2>
          <p className="text-sm text-muted-foreground">Senior Product Manager</p>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-4">
           <div className="bg-secondary/50 p-3 rounded-lg text-sm">
              <p className="font-semibold mb-1">Bio</p>
              <p className="text-muted-foreground">Alex has 10 years of experience in SaaS products. He values clear communication and user-centric thinking. Expect behavioral questions.</p>
           </div>
           
           <div className="space-y-2">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Session Status</p>
              <div className="flex justify-between text-sm">
                  <span>Question</span>
                  <span>{currentQuestion + 1} / 3</span>
              </div>
              <Progress value={((currentQuestion) / 3) * 100} className="h-2" />
           </div>
        </CardContent>
        <CardFooter>
            <Button variant="outline" className="w-full gap-2">
                <MessageSquare className="h-4 w-4" />
                Show Transcript
            </Button>
        </CardFooter>
      </Card>

      {/* Main Stage */}
      <Card className="flex-1 flex flex-col overflow-hidden bg-black/90 border-0 shadow-2xl">
         {/* Live Area */}
         <div className="flex-1 relative p-4 flex items-center justify-center">
             {/* AI Waveform Visualization */}
             <div className="flex items-center justify-center gap-1 h-32 w-full max-w-md opacity-80">
                 {[...Array(10)].map((_, i) => (
                    <div 
                        key={i} 
                        className="w-3 bg-primary rounded-full animate-bounce" 
                        style={{ 
                            height: isRecording ? `${Math.random() * 100}%` : '20%',
                            animationDuration: `${0.5 + Math.random() * 0.5}s`,
                            animationPlayState: isRecording ? 'running' : 'paused'
                        }} 
                    />
                 ))}
             </div>
             <p className="absolute bottom-1/2 translate-y-20 text-white/50 font-mono text-sm">
                {isRecording ? "LISTENING..." : "AI SPEAKING..."}
             </p>

             {/* User PIP */}
             <div className="absolute top-4 right-4 w-48 aspect-video bg-zinc-800 rounded-lg border border-white/10 shadow-xl overflow-hidden">
                {cameraOn ? (
                    <div className="w-full h-full bg-zinc-700 flex items-center justify-center relative">
                        <span className="text-xs text-white/50">YOU</span>
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                        <VideoOff className="h-6 w-6 text-white/30" />
                    </div>
                )}
                {!micOn && (
                     <div className="absolute top-2 right-2 bg-red-500/80 p-1 rounded-full">
                        <MicOff className="h-3 w-3 text-white" />
                     </div>
                )}
             </div>
         </div>

         {/* Controls Bar */}
         <div className="h-20 bg-zinc-900/50 backdrop-blur-md border-t border-white/10 flex items-center justify-between px-6">
            <div className="flex items-center gap-2 text-white font-mono">
                <div className={`h-3 w-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-zinc-600'}`} />
                {isRecording ? (
                    <span>REC {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</span>
                ) : (
                    <span>STANDBY</span>
                )}
            </div>

            <div className="flex items-center gap-4">
                <Button 
                    variant={micOn ? "secondary" : "destructive"} 
                    size="icon" 
                    className="rounded-full h-12 w-12"
                    onClick={() => setMicOn(!micOn)}
                >
                    {micOn ? <Mic /> : <MicOff />}
                </Button>
                <Button 
                    variant={cameraOn ? "secondary" : "destructive"} 
                    size="icon" 
                    className="rounded-full h-12 w-12"
                    onClick={() => setCameraOn(!cameraOn)}
                >
                     {cameraOn ? <Video /> : <VideoOff />}
                </Button>
                <Button 
                    variant="destructive" 
                    size="icon" 
                    className="rounded-full h-12 w-12 ml-4"
                    onClick={() => onComplete(0)} // Force end for demo
                >
                     <PhoneOff />
                </Button>
            </div>

            <Button onClick={isRecording ? handleNext : toggleRecording} size="lg" className={isRecording ? "bg-green-600 hover:bg-green-700" : "bg-primary"}>
                {isRecording ? "Submit Answer" : "Start Answer"}
            </Button>
         </div>
      </Card>
    </div>
  );
}
