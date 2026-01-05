'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, RotateCcw, Home, BarChart2 } from 'lucide-react';
import Link from 'next/link';

interface CompletionScreenProps {
  score?: number;
  total?: number;
  onRetry: () => void;
  type: 'IQ' | 'Personality' | 'Interview' | 'Written';
}

export function CompletionScreen({ score, total, onRetry, type }: CompletionScreenProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center animate-in fade-in zoom-in duration-500">
      
      <div className="mb-8 flex justify-center">
        <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 animate-bounce">
            <CheckCircle2 className="h-12 w-12" />
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-4 font-headline">Assessment Submitted!</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
        Great job! Your responses have been recorded and are currently being analyzed by our AI.
      </p>

      {(score !== undefined && total !== undefined) && (
        <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader>
                <CardTitle className="text-primary">Preliminary Result</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="text-5xl font-bold font-headline">
                    {score} <span className="text-xl text-muted-foreground font-normal">/ {total}</span>
                 </div>
                 <p className="text-sm text-muted-foreground mt-2">Questions Answered Correctly</p>
            </CardContent>
        </Card>
      )}

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button variant="outline" size="lg" onClick={onRetry} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Try Again
        </Button>
        <Button variant="default" size="lg" asChild className="gap-2">
            <Link href="/dashboard">
                <Home className="h-4 w-4" />
                Return to Dashboard
            </Link>
        </Button>
         <Button variant="ghost" size="lg" className="sm:col-span-2 gap-2 text-muted-foreground" asChild>
            <Link href="/leaderboard">
                <BarChart2 className="h-4 w-4" />
                View Leaderboard
            </Link>
        </Button>
    </div>

    </div>
  );
}
