'use client';

import React from 'react';
import { PageWrapper } from '@/components/shared/page-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, Video, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const mockEvents = [
    {
        id: 1,
        title: 'Mock Interview with AI',
        date: 'Today, Oct 24',
        time: '14:00 - 15:00',
        type: 'Interview',
        status: 'upcoming',
        location: 'Virtual Meeting'
    },
    {
        id: 2,
        title: 'IQ Assessment Review',
        date: 'Tomorrow, Oct 25',
        time: '10:00 - 11:30',
        type: 'Assessment',
        status: 'pending',
        location: 'Assessment Center'
    },
    {
        id: 3,
        title: 'Group Discussion',
        date: 'Fri, Oct 27',
        time: '16:00 - 17:00',
        type: 'Workshop',
        status: 'confirmed',
        location: 'Room 302'
    }
];

export default function SchedulePage() {
    return (
        <PageWrapper
            title="Schedule"
            description="Manage your interviews and training sessions."
        >
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                {/* Calendar Placeholder */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                             <h2 className="text-lg font-semibold flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5 text-primary" />
                                October 2026
                             </h2>
                             <div className="flex bg-secondary rounded-md p-1">
                                 <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
                                 <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
                             </div>
                        </div>
                        {/* Simplified Month Grid Mockup */}
                        <div className="grid grid-cols-7 text-center gap-y-4 text-sm">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="text-muted-foreground font-medium">{day}</div>
                            ))}
                            {/* Days */}
                            {Array.from({ length: 31 }).map((_, i) => (
                                <div key={i} className={cn(
                                    "h-10 w-10 flex items-center justify-center rounded-full mx-auto cursor-pointer hover:bg-accent",
                                    i + 1 === 24 && "bg-primary text-primary-foreground hover:bg-primary font-bold shadow-lg"
                                )}>
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Upcoming Events</h3>
                        {mockEvents.map(event => (
                            <Card key={event.id} className="group hover:border-primary/50 transition-colors">
                                <CardContent className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                                        <div className="text-center leading-tight">
                                            <div className="text-[10px] font-bold uppercase">{event.date.split(',')[0]}</div>
                                            <div className="text-lg font-bold">{event.date.split(' ')[2]}</div>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold">{event.title}</h4>
                                            <Badge variant={event.status === 'confirmed' ? "default" : "secondary"}>{event.status}</Badge>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {event.time}</span>
                                            <span className="flex items-center gap-1"><Video className="h-3.5 w-3.5" /> {event.location}</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full sm:w-auto mt-2 sm:mt-0">Details</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                     <Card className="bg-gradient-to-br from-primary/5 to-secondary/10 border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>Quick Schedule</CardTitle>
                            <CardDescription>Need to arrange a new session?</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full justify-start" variant="outline">
                                <Video className="mr-2 h-4 w-4" /> Mock Interview
                            </Button>
                            <Button className="w-full justify-start" variant="outline">
                                <MapPin className="mr-2 h-4 w-4" /> On-site Visit
                            </Button>
                        </CardContent>
                     </Card>
                </div>
            </div>
        </PageWrapper>
    );
}
