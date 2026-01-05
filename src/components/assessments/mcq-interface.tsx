'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Clock, ArrowRight, Flag, Lightbulb, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export interface Question {
  id: string;
  question: string;
  options: string[];
  answer?: string; // Optional for psycho tests
  hint?: string;
}

interface MCQInterfaceProps {
  questions: Question[];
  onComplete: (score: number) => void;
  title: string;
}

export function MCQInterface({ questions, onComplete, title }: MCQInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(30 * questions.length); // 30 seconds per question
  const [showHint, setShowHint] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [questions.length]);

  const handleOptionSelect = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].id]: value,
    }));
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
        setShowHint(false);
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          handleSubmit();
        }
        setIsTransitioning(false);
    }, 300); // Wait for exit animation
  };

  const handleSubmit = () => {
    // Calculate score
    let score = 0;
    questions.forEach((q) => {
      if (q.answer && answers[q.id] === q.answer) {
        score++;
      }
    });
    onComplete(score);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header Stat Bar */}
      <div className="flex items-center justify-between gap-3 bg-card/80 backdrop-blur-md p-3 rounded-lg border shadow-sm sticky top-4 z-20">
        <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-2.5 py-0.5 text-xs font-semibold border-primary/20 bg-primary/5 uppercase tracking-wide">
                {title}
            </Badge>
            <div className="h-3 w-px bg-border/50" />
            <span className="text-xs text-muted-foreground font-medium">
              <span className="text-foreground font-semibold">{currentQuestionIndex + 1}</span>
              <span className="mx-1">/</span>
              {questions.length}
            </span>
        </div>
        
         <div className={cn(
            "flex items-center gap-1.5 font-mono text-sm font-semibold px-3 py-1.5 rounded-md border transition-all duration-300",
            timeLeft < 30 ? "bg-red-500/10 text-red-600 border-red-500/30 animate-pulse" : "bg-muted/50 text-foreground/80 border-transparent"
         )}>
             <Clock className={cn("h-3.5 w-3.5", timeLeft < 30 && "animate-spin-slow")} />
             {formatTime(timeLeft)}
        </div>
      </div>

      <div className="space-y-1.5 px-1">
        <Progress value={progress} className="h-1.5 rounded-full transition-all duration-1000 bg-muted/40" />
      </div>

      {/* Main Question Card */}
      <Card className={cn(
          "mt-4 border shadow-xl bg-background/60 backdrop-blur-3xl overflow-hidden transition-all duration-300 transform",
          isTransitioning ? "opacity-0 translate-x-8 scale-95" : "opacity-100 translate-x-0 scale-100"
      )}>
        <CardHeader className="pb-4 pt-6 px-6">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2 flex-1">
                <CardDescription className="text-xl font-semibold text-foreground leading-snug tracking-tight">
                    {currentQuestion.question}
                </CardDescription>
            </div>
            {currentQuestion.hint && (
                 <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowHint(!showHint)} 
                    className="shrink-0 h-8 w-8 rounded-full text-muted-foreground hover:bg-yellow-100/50 hover:text-yellow-600 transition-colors"
                >
                    <Lightbulb className={cn("h-4 w-4", showHint && "fill-yellow-400 text-yellow-500")} />
                </Button>
            )}
          </div>
           {showHint && currentQuestion.hint && (
              <Alert className="mt-3 bg-yellow-50/50 border-yellow-100/50 py-2 animate-in fade-in zoom-in-95">
                <Lightbulb className="h-3.5 w-3.5 text-yellow-600 mt-0.5" />
                <div className="ml-2">
                    <AlertTitle className="text-xs font-bold text-yellow-800 mb-0.5">Hint</AlertTitle>
                    <AlertDescription className="text-xs text-yellow-700/90 leading-normal">
                    {currentQuestion.hint}
                    </AlertDescription>
                </div>
              </Alert>
            )}
        </CardHeader>

        <CardContent className="pb-6 px-6 space-y-4">
          <RadioGroup
            value={answers[currentQuestion.id] || ''}
            onValueChange={handleOptionSelect}
            className="grid gap-2.5 sm:grid-cols-1"
          >
            {currentQuestion.options.map((option, idx) => {
                const isSelected = answers[currentQuestion.id] === option;
                return (
                  <div
                    key={idx}
                    className={cn(
                        "group relative flex items-center space-x-3 border rounded-lg p-3.5 cursor-pointer transition-all duration-200 ease-out",
                        isSelected 
                            ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20 z-10" 
                            : "border-muted/60 bg-card hover:bg-muted/30 hover:border-primary/30"
                    )}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <div className={cn(
                        "h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300",
                        isSelected ? "border-primary bg-primary scale-100" : "border-muted-foreground/30 group-hover:border-primary/50"
                    )}>
                        {isSelected && <div className="h-2 w-2 rounded-full bg-primary-foreground animate-in zoom-in" />}
                    </div>
                    <RadioGroupItem value={option} id={`opt-${idx}`} className="sr-only" />
                    <div className="flex-1">
                        <Label htmlFor={`opt-${idx}`} className="cursor-pointer text-sm font-medium text-foreground/90 group-hover:text-foreground leading-relaxed">
                            {option}
                        </Label>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground/40 font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute right-3 top-3.5">
                        {String.fromCharCode(65 + idx)}
                    </span>
                  </div>
                );
            })}
          </RadioGroup>
        </CardContent>

        <CardFooter className="flex justify-between py-4 px-6 border-t bg-muted/10">
             <Button 
                variant="ghost" 
                size="sm"
                disabled={currentQuestionIndex === 0} 
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)} 
                className="text-muted-foreground hover:text-foreground pl-0 hover:bg-transparent"
            >
                Back
             </Button>

             <Button 
                size="sm"
                onClick={handleNext} 
                disabled={!answers[currentQuestion.id]} 
                className={cn(
                    "gap-1.5 px-6 font-medium shadow-md transition-all hover:translate-y-[-1px] active:translate-y-[1px]",
                    isLastQuestion ? "bg-green-600 hover:bg-green-700 shadow-green-900/10" : ""
                )}
            >
                {isLastQuestion ? 'Submit' : 'Next'}
                <ArrowRight className="h-4 w-4" />
             </Button>
        </CardFooter>
      </Card>
      
      {/* Footer Controls */}
      <div className="flex justify-center pt-2">
        <Button variant="link" className="text-muted-foreground/60 hover:text-destructive text-xs h-auto p-0" onClick={() => setShowExitConfirm(true)}>
            Quit Assessment
        </Button>
      </div>

       <Dialog open={showExitConfirm} onOpenChange={setShowExitConfirm}>
        <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
            <DialogTitle>Quit Assessment?</DialogTitle>
            <DialogDescription>
                Progress will be lost. Are you sure?
            </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setShowExitConfirm(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => window.location.href = '/dashboard'}>Yes, Quit</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>

    </div>
  );
}
