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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      card.changeType === 'increase'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {card.change}
                  </span>{' '}
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
  
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>
                Your scheduled training and assessments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUpcomingSessions.map((session, index) => (
                  <div key={session.id}>
                    <div className="flex items-center space-x-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                        <SessionIcon type={session.type} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{session.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.time}
                        </p>
                      </div>
                      <Badge variant="outline">{session.type}</Badge>
                      <Button variant="ghost" size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    {index < mockUpcomingSessions.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle>Personalized Insights</CardTitle>
              <CardDescription>AI-powered feedback on your progress.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {mockInsights.map((insight) => (
                <div key={insight.id} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <insight.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.text}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                View All Insights
              </Button>
            </CardFooter>
          </Card>
        </div>
      </PageWrapper>
    );
  }
  