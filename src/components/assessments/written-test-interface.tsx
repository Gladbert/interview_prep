'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, AlertTriangle, Send } from 'lucide-react';

interface WrittenTestInterfaceProps {
  onComplete: (score: number) => void;
  title: string;
}

export function WrittenTestInterface({ onComplete, title }: WrittenTestInterfaceProps) {
  const [answer, setAnswer] = useState('');
  
  const handleSubmit = () => {
    // Mock scoring based on length
    const score = Math.min(100, Math.max(50, answer.length / 10));
    onComplete(Math.round(score));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] min-h-[600px] gap-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-md">
                <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h2 className="font-bold text-lg">{title}</h2>
                <p className="text-xs text-muted-foreground">Case Study #CS-2024-X</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-mono bg-secondary px-3 py-1 rounded text-sm font-medium">
                <Clock className="h-4 w-4" />
                <span>45:00</span>
            </div>
            <Button onClick={handleSubmit} className="gap-2">
                Submit Response
                <Send className="h-4 w-4" />
            </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Case Material */}
        <Card className="flex flex-col overflow-hidden border-2">
            <div className="bg-muted/50 p-2 border-b flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider pl-2">Case Materials</span>
                <Tabs defaultValue="prompt" className="w-[200px]">
                    <TabsList className="h-8">
                        <TabsTrigger value="prompt" className="text-xs">Prompt</TabsTrigger>
                        <TabsTrigger value="data" className="text-xs">Data</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <ScrollArea className="flex-1 p-6">
                <div className="prose dark:prose-invert max-w-none">
                    <h3>Scenario: The Failing Launch</h3>
                    <p>
                        You are the Lead Product Manager for a new B2B SaaS analytics tool "MetricFlow".
                        The product launched 3 months ago but retention is only 15% (industry benchmark 40%).
                    </p>
                    <p>
                        <strong>Your Task:</strong>
                        <br/>
                        Analyze the situation and propose a turnaround strategy.
                    </p>
                    <h4>Key Constraints</h4>
                    <ul>
                        <li>Budget is limited to $50k for the next quarter.</li>
                        <li>Engineering team is fully booked with bug fixes.</li>
                        <li>Only 2 marketing channels are currently active (LinkedIn, Email).</li>
                    </ul>
                    <h4>Requirements</h4>
                    <p>Please structure your response to cover:</p>
                    <ol>
                        <li>Problem Diagnosis (Root Cause Analysis)</li>
                        <li>Proposed Solution (MVP feature or Process change)</li>
                        <li>Success Metrics (KPIs)</li>
                    </ol>
                </div>
            </ScrollArea>
        </Card>

        {/* Right: Editor */}
        <Card className="flex flex-col shadow-lg border-2 border-primary/20">
             <div className="bg-muted/50 p-2 border-b flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider pl-2">Response Editor</span>
                 <div className="flex items-center gap-2 text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded border border-yellow-200">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Focus Mode Active</span>
                </div>
            </div>
            <div className="flex-1 p-0 relative">
                <Textarea 
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Start typing your analysis here..."
                    className="h-full w-full resize-none p-6 border-0 focus-visible:ring-0 font-mono text-base leading-relaxed"
                />
            </div>
            <div className="border-t p-2 text-xs text-muted-foreground flex justify-between px-4">
                <span>{answer.length} characters</span>
                <span>{answer.split(/\s+/).filter(w => w.length > 0).length} words</span>
            </div>
        </Card>
      </div>
    </div>
  );
}
