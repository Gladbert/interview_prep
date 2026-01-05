'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Camera, Mic, Settings, AlertCircle, CheckCircle2, MicOff, VideoOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GreenRoomProps {
  onStart: () => void;
  title: string;
  instructions: string;
}

export function GreenRoom({ onStart, title, instructions }: GreenRoomProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);

  // Simulate audio level
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (micEnabled && hasPermissions) {
        interval = setInterval(() => {
            setAudioLevel(Math.random() * 100);
        }, 100);
    } else {
        setAudioLevel(0);
    }
    return () => clearInterval(interval);
  }, [micEnabled, hasPermissions]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let isActive = true;

    const startCamera = async () => {
      try {
        if (!cameraEnabled) {
             if (videoRef.current) videoRef.current.srcObject = null;
             // Don't revoke permissions, just stop stream locally if functionality was real
             // For mock, we just don't request if disabled, or clear srcObject
             return;
        }

        // In a real app, we would request permissions once then toggle tracks.
        // For this demo, we simulate the "request" phase.
        // Mocking successful stream for browser compatibility in constrained envs is hard,
        // so we'll check if navigator.mediaDevices exists.
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
             stream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: true, // Request both to simulate full permissions
            });
            
            if (isActive && videoRef.current) {
              videoRef.current.srcObject = stream;
            }
            if (isActive) setHasPermissions(true);
            if (isActive) setError('');
        } else {
            // Fallback for environments without media devices (like some CI/CD or server-renders)
             console.warn("Media devices not found, simulating success for demo.");
             if (isActive) setHasPermissions(true);
        }

      } catch (err) {
        console.error('Error accessing media devices:', err);
        if (isActive) {
             setHasPermissions(false);
             setError('Could not access camera/mic. Allow permissions to continue.');
        }
      }
    };

    startCamera();

    return () => {
      isActive = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraEnabled]); // Re-run if camera toggle changes (simplified for demo)

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left Column: Instructions & Checks */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{title}</h1>
            <p className="text-muted-foreground text-lg">System Check & Instructions</p>
          </div>

          <Card className="border-l-4 border-l-primary shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="h-5 w-5 text-primary" />
                Session Briefing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {instructions}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
             <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Device Settings</CardTitle>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Settings className="h-4 w-4" />
                                Configure
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Audio & Video Settings</DialogTitle>
                                <DialogDescription>Select your input devices.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Camera Input</Label>
                                    <Select defaultValue="default">
                                        <SelectTrigger><SelectValue placeholder="Select Camera" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="default">FaceTime HD Camera (Built-in)</SelectItem>
                                            <SelectItem value="ext">External Webcam</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Microphone Input</Label>
                                    <Select defaultValue="default">
                                        <SelectTrigger><SelectValue placeholder="Select Microphone" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="default">MacBook Pro Microphone</SelectItem>
                                            <SelectItem value="ext">External USB Mic</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
             </CardHeader>
             <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${cameraEnabled ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {cameraEnabled ? <Camera className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                        </div>
                        <div className="flex flex-col">
                             <Label htmlFor="camera-toggle" className="font-semibold cursor-pointer">Camera</Label>
                             <span className="text-xs text-muted-foreground">{cameraEnabled ? 'On' : 'Off'}</span>
                        </div>
                    </div>
                    <Switch id="camera-toggle" checked={cameraEnabled} onCheckedChange={setCameraEnabled} />
                </div>
                 <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                    <div className="flex items-center gap-3">
                         <div className={`p-2 rounded-full ${micEnabled ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                        </div>
                        <div className="flex flex-col">
                            <Label htmlFor="mic-toggle" className="font-semibold cursor-pointer">Microphone</Label>
                             <span className="text-xs text-muted-foreground">{micEnabled ? 'On' : 'Off'}</span>
                        </div>
                    </div>
                    <Switch id="mic-toggle" checked={micEnabled} onCheckedChange={setMicEnabled} />
                </div>
                
                {/* Audio Visualizer */}
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Mic Input Level</span>
                        <span>{micEnabled ? 'Active' : 'Muted'}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden flex gap-0.5">
                        {[...Array(20)].map((_, i) => (
                            <div 
                                key={i}
                                className={`flex-1 rounded-full transition-all duration-75 ${
                                    micEnabled && i < (audioLevel / 5) 
                                    ? (i > 15 ? 'bg-red-500' : i > 12 ? 'bg-yellow-500' : 'bg-green-500') 
                                    : 'bg-transparent'
                                }`}
                                style={{
                                    opacity: micEnabled && i < (audioLevel / 5) ? 1 : 0.2
                                }}
                            />
                        ))}
                    </div>
                 </div>

             </CardContent>
          </Card>
        </div>

        {/* Right Column: Video Preview */}
        <div className="space-y-6">
          <Card className="overflow-hidden bg-black border-4 border-zinc-800 shadow-2xl relative group">
            <CardContent className="p-0 relative aspect-video flex items-center justify-center bg-zinc-900">
                {!cameraEnabled ? (
                     <div className="flex flex-col items-center gap-4 text-zinc-500">
                        <VideoOff className="h-16 w-16 opacity-50" />
                        <p className="font-mono text-sm">CAMERA DISABLED</p>
                     </div>
                ) : hasPermissions ? (
                     <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover transform scale-x-[-1]"
                      />
                ) : (
                    <div className="text-center p-6 text-zinc-400">
                        {error ? (
                            <div className="flex flex-col items-center gap-2 text-red-500">
                                <AlertCircle className="h-10 w-10" />
                                <p>{error}</p>
                            </div>
                        ) : (
                             <div className="flex flex-col items-center gap-2">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                <p className="text-xs uppercase tracking-widest mt-2">Initializing System...</p>
                            </div>
                        )}
                    </div>
                )}
             
                {/* HUD Elements */}
                <div className="absolute inset-0 border-2 border-white/10 pointer-events-none rounded-sm m-4" />
                <div className="absolute top-8 left-8 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-mono text-white/80">
                    <div className={`h-2 w-2 rounded-full ${hasPermissions && cameraEnabled ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    {hasPermissions ? (cameraEnabled ? 'REC' : 'VIDEO OFF') : 'OFFLINE'}
                </div>

                {hasPermissions && cameraEnabled && (
                  <div className="absolute inset-0 pointer-events-none">
                     {/* Face Mockup Frame */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 border border-white/20 rounded-[3rem] opacity-50" />
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-46 h-60 border border-white/10 rounded-[2.5rem] opacity-30" />
                  </div>
                )}
             
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white/90 text-xs font-mono">
                <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-2">
                     <Volume2 className="h-3 w-3" />
                     <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white transition-all duration-75" style={{ width: `${audioLevel}%`}} />
                     </div>
                   </div>
                   <span>AI CO-PILOT: ACTIVE</span>
                </div>
                <div className="text-right">
                    <p>720p 60fps</p>
                    <p className="text-white/50">LATENCY: 24ms</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full gap-2 text-lg h-16 shadow-lg shadow-primary/25 transition-all hover:scale-[1.02]" 
                onClick={onStart}
                disabled={!hasPermissions}
              >
                I'm Ready, Start Session
                <CheckCircle2 className="h-6 w-6" />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                By clicking start, you agree to our 2.0 performance analysis recording standards.
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}
