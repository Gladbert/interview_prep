import {
    ArrowRight,
    BarChart,
    BrainCircuit,
    CheckCircle,
    Clock,
    Presentation,
    TrendingUp,
  } from 'lucide-react';
  import Link from 'next/link';
  import { cn } from '@/lib/utils';
  import {
    mockInsights,
    mockUpcomingSessions,
    mockUser,
  } from '@/lib/placeholder-data';
  import { PageWrapper } from '@/components/shared/page-wrapper';
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { Button } from '@/components/ui/button';
  import { Progress } from '@/components/ui/progress';
  import { Separator } from '@/components/ui/separator';
  import { Badge } from '@/components/ui/badge';
  import type { Session } from '@/lib/types';
  
  const statCards = [
    {
      title: 'Overall Score',
      value: '9,150',
      icon: TrendingUp,
      change: '+12%',
      changeType: 'increase',
      description: 'from last month',
    },
    {
      title: 'Tests Completed',
      value: '28',
      icon: CheckCircle,
      change: '+3',
      changeType: 'increase',
      description: 'from last week',
    },
    {
      title: 'Avg. Time',
      value: '12m 45s',
      icon: Clock,
      change: '-30s',
      changeType: 'decrease',
      description: 'per test',
    },
    {
      title: 'Current Rank',
      value: `#${mockUser.rank}`,
      icon: BarChart,
      change: '-2',
      changeType: 'decrease',
      description: 'from yesterday',
    },
  ];
  
  const SessionIcon = ({ type }: { type: Session['type'] }) => {
    switch (type) {
      case 'IQ Test':
        return <BrainCircuit className="h-4 w-4 text-muted-foreground" />;
      case 'Psycho-Test':
        return <BarChart className="h-4 w-4 text-muted-foreground" />;
      case 'Interview':
        return <Presentation className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };
  
  export default function DashboardPage() {
    return (
      <PageWrapper
        title="Dashboard"
        description={`Welcome back, ${
          mockUser.name.split(' ')[0]
        }! Ready to ace your next interview?`}
      >
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-background border p-6 sm:p-10">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your daily goal is almost reached!</h2>
                        <p className="text-muted-foreground max-w-lg text-base sm:text-lg">
                            You've completed 80% of your weekly training. Keep keeping up the momentum!
                        </p>
                        <div className="pt-4 flex gap-3 justify-center md:justify-start">
                             <Button size="lg" className="shadow-lg shadow-primary/20 hover:scale-105 transition-transform w-full sm:w-auto" asChild>
                                 <Link href="/assessments">
                                    Start Training <ArrowRight className="ml-2 h-4 w-4" />
                                 </Link>
                             </Button>
                        </div>
                    </div>
                    {/* Progress Circle Mockup */}
                     <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex items-center justify-center shrink-0">
                         <div className="absolute inset-0 rounded-full border-8 border-primary/20" />
                         <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent animate-spin-slow-reverse" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }} />
                        <div className="text-xl sm:text-2xl font-bold">80%</div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card) => (
                <Card key={card.title} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-none bg-card/50 backdrop-blur-sm shadow-sm ring-1 ring-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                    <div className="p-2 rounded-full bg-primary/10">
                         <card.icon className="h-4 w-4 text-primary" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <span
                        className={cn(
                        "font-medium px-1.5 py-0.5 rounded text-[10px]",
                        card.changeType === 'increase'
                            ? 'text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
                            : 'text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
                        )}
                    >
                        {card.change}
                    </span>{' '}
                    {card.description}
                    </p>
                </CardContent>
                </Card>
            ))}
            </div>
    
            <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-3">
                {/* Upcoming Sessions */}
                <Card className="lg:col-span-2 shadow-sm border-none ring-1 ring-border/50">
                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-xl">Upcoming Sessions</CardTitle>
                            <CardDescription>
                                Your scheduled training and assessments.
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
                            <Link href="/schedule">View Calendar</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-6">
                        {mockUpcomingSessions.map((session, index) => (
                        <div key={session.id} className="relative pl-6 border-l-2 border-muted hover:border-primary/50 transition-colors group">
                            <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-background bg-muted group-hover:bg-primary transition-colors" />
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 -mt-1">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-semibold text-lg">{session.title}</p>
                                        <Badge variant="secondary" className="text-[10px] font-normal">{session.type}</Badge>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            {session.time}
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="w-full sm:w-auto gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all" asChild>
                                    <Link href="/training">
                                        Join Now <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        ))}
                    </div>
                    </CardContent>
                </Card>
        
                {/* Insights and Quick Actions */}
                <div className="flex flex-col gap-6">
                    <Card className="shadow-sm border-none ring-1 ring-border/50 bg-gradient-to-b from-card to-secondary/20">
                        <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                             <BrainCircuit className="h-5 w-5 text-primary" />
                             Insights
                        </CardTitle>
                        <CardDescription>AI-driven performance signals.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                        {mockInsights.map((insight) => (
                            <div key={insight.id} className="flex gap-3 p-3 rounded-lg bg-background/50 border hover:bg-background transition-colors cursor-default">
                                <div className="shrink-0 mt-0.5">
                                     <insight.icon className="h-4 w-4 text-primary" />
                                </div>
                                <p className="text-sm text-foreground/80 leading-snug">{insight.text}</p>
                            </div>
                        ))}
                        </CardContent>
                        <CardFooter>
                        <Button className="w-full" variant="secondary" asChild>
                            <Link href="/journey">
                                View Detailed Analysis
                            </Link>
                        </Button>
                        </CardFooter>
                    </Card>

                    <Link href="/recruitment" className="block">
                        <Card className="shadow-sm border-dashed border-2 bg-transparent text-center p-6 flex flex-col items-center justify-center gap-2 hover:bg-accent/10 transition-colors cursor-pointer group h-full">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Presentation className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold">Schedule Mock Interview</h3>
                            <p className="text-sm text-muted-foreground">Practice with peers or AI interactively.</p>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
      </PageWrapper>
    );
  }
  