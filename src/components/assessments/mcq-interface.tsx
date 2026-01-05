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
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Header Stat Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/50 backdrop-blur-sm p-4 rounded-xl border shadow-sm sticky top-20 z-10">
        <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1 h-8 text-sm font-medium border-primary/20 bg-primary/5">
                {title}
            </Badge>
            <div className="h-4 w-px bg-border" />
            <span className="text-sm text-muted-foreground font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
        </div>
        
         <div className={cn(
            "flex items-center gap-2 font-mono text-xl font-bold px-5 py-2 rounded-lg border transition-all duration-300",
            timeLeft < 30 ? "bg-red-500/10 text-red-600 border-red-500/50 animate-pulse shadow-red-500/20 shadow-lg" : "bg-secondary/50 text-foreground shadow-sm"
         )}>
             <Clock className={cn("h-5 w-5", timeLeft < 30 && "animate-spin-slow")} />
             {formatTime(timeLeft)}
        </div>
      </div>

      <div className="space-y-2 px-2">
        <Progress value={progress} className="h-2 rounded-full transition-all duration-1000" />
      </div>

      {/* Main Question Card */}
      <Card className={cn(
          "mt-6 border-0 shadow-2xl bg-gradient-to-br from-card to-secondary/10 overflow-hidden transition-all duration-300 transform",
          isTransitioning ? "opacity-0 translate-x-10 scale-95" : "opacity-100 translate-x-0 scale-100"
      )}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-4 flex-1">
                <CardDescription className="text-2xl sm:text-3xl font-bold text-foreground leading-tight tracking-tight">
                    {currentQuestion.question}
                </CardDescription>
            </div>
            {currentQuestion.hint && (
                 <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setShowHint(!showHint)} 
                    className="shrink-0 rounded-full hover:bg-yellow-100 hover:text-yellow-700 hover:border-yellow-300 transition-colors"
                >
                    <Lightbulb className={cn("h-5 w-5", showHint && "fill-yellow-400 text-yellow-500")} />
                </Button>
            )}
          </div>
           {showHint && currentQuestion.hint && (
              <Alert className="mt-4 bg-yellow-50/80 border-yellow-200 animate-in fade-in slide-in-from-top-2">
                <Lightbulb className="h-4 w-4 text-yellow-600" />
                <AlertTitle className="text-yellow-800">Hint</AlertTitle>
                <AlertDescription className="text-yellow-700/90 font-medium">
                  {currentQuestion.hint}
                </AlertDescription>
              </Alert>
            )}
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <RadioGroup
            value={answers[currentQuestion.id] || ''}
            onValueChange={handleOptionSelect}
            className="grid gap-3 sm:grid-cols-1"
          >
            {currentQuestion.options.map((option, idx) => {
                const isSelected = answers[currentQuestion.id] === option;
                return (
                  <div
                    key={idx}
                    className={cn(
                        "group relative flex items-center space-x-4 border-2 rounded-xl p-5 cursor-pointer transition-all duration-200 ease-out",
                        isSelected 
                            ? "border-primary bg-primary/5 shadow-md scale-[1.01] z-10" 
                            : "border-muted/40 bg-card hover:bg-accent/50 hover:border-accent-foreground/30 hover:shadow-sm"
                    )}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <div className={cn(
                        "h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300",
                        isSelected ? "border-primary bg-primary scale-110" : "border-muted-foreground/30 group-hover:border-primary/50"
                    )}>
                        {isSelected && <CheckCircle2 className="h-full w-full text-primary-foreground p-0.5 animate-in zoom-in" />}
                    </div>
                    <RadioGroupItem value={option} id={`opt-${idx}`} className="sr-only" />
                    <div className="flex-1">
                        <Label htmlFor={`opt-${idx}`} className="cursor-pointer font-medium text-lg text-foreground/90 group-hover:text-foreground">
                            {option}
                        </Label>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground/30 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        OPT {String.fromCharCode(65 + idx)}
                    </span>
                  </div>
                );
            })}
          </RadioGroup>
        </CardContent>

        <CardFooter className="flex justify-between pt-8 pb-8 border-t bg-muted/20">
             <Button 
                variant="ghost" 
                disabled={currentQuestionIndex === 0} 
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)} 
                className="hover:bg-background text-muted-foreground hover:text-foreground"
            >
                Previous
             </Button>

             <Button 
                onClick={handleNext} 
                disabled={!answers[currentQuestion.id]} 
                className={cn(
                    "gap-2 px-8 h-12 text-lg font-semibold shadow-xl transition-all hover:scale-105 active:scale-95",
                    isLastQuestion ? "bg-green-600 hover:bg-green-700 shadow-green-900/20" : "bg-primary hover:bg-primary/90 shadow-primary/20"
                )}
            >
                {isLastQuestion ? 'Submit Assessment' : 'Next Question'}
                <ArrowRight className="h-5 w-5" />
             </Button>
        </CardFooter>
      </Card>
      
      {/* Footer Controls */}
      <div className="flex justify-center">
        <Button variant="link" className="text-muted-foreground text-xs" onClick={() => setShowExitConfirm(true)}>
            Quit Assessment
        </Button>
      </div>

       <Dialog open={showExitConfirm} onOpenChange={setShowExitConfirm}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Quit Assessment?</DialogTitle>
            <DialogDescription>
                Your progress will be lost and this session will be marked as incomplete.
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
            <Button variant="outline" onClick={() => setShowExitConfirm(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => window.location.href = '/dashboard'}>Yes, Quit</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>

    </div>
  );
}
