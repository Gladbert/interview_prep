
'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  mockLeaderboard,
  mockJobRoles,
  mockCLevelRoles,
} from '@/lib/placeholder-data';
import { PageWrapper } from '@/components/shared/page-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Crown, ArrowUp, ArrowDown } from 'lucide-react';
import type { User } from '@/lib/types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const allJobRoles = ['Overall', ...mockJobRoles, ...mockCLevelRoles];

const segments = [
  'Overall',
  'IQ Test',
  'Psycho-Test',
  'HRD Interview',
  'User Interview',
  'C-Level Interview',
  'Written Test',
];

const getRankColor = (rank: number) => {
  if (rank === 1) return 'text-yellow-500';
  if (rank === 2) return 'text-gray-400';
  if (rank === 3) return 'text-yellow-700';
  return 'text-muted-foreground';
};

const RankChangeIndicator = ({ user }: { user: User }) => {
  // Use a deterministic "random" value based on user ID to avoid hydration mismatch
  const change = useMemo(() => {
     const seed = user.id.charCodeAt(user.id.length - 1);
     // Simulate range -1 to 1
     return (seed % 3) - 1; 
  }, [user.id]);

  if (change > 0) {
    return (
      <span className="flex items-center text-green-500">
        <ArrowUp className="h-3 w-3 mr-1" />
        {change}
      </span>
    );
  }
  if (change < 0) {
    return (
      <span className="flex items-center text-red-500">
        <ArrowDown className="h-3 w-3 mr-1" />
        {Math.abs(change)}
      </span>
    );
  }
  return <span className="text-muted-foreground">-</span>;
};

export default function LeaderboardPage() {
  const [selectedJob, setSelectedJob] = useState(allJobRoles[0]);
  const [selectedSegment, setSelectedSegment] = useState(segments[0]);

  const processedLeaderboard = useMemo(() => {
    // This is where we generate scores for each user, for each job, and each segment.
    return mockLeaderboard.map((user) => {
      const userSeed = user.id
        .split('')
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);

      const jobScores: Record<
        string,
        { segmentScores: Record<string, number>; completionTime: number }
      > = {};
      
      const allJobsForCalculation = allJobRoles.filter(j => j !== 'Overall');

      allJobsForCalculation.forEach((job) => {
        const jobSeed = allJobRoles.indexOf(job);
        const segmentScores: Record<string, number> = {};
        let jobOverallScore = 0;

        segments.slice(1).forEach((segment, index) => {
          const randomFactor = (userSeed * (index + 1) * (jobSeed + 1) * user.rank) % 350;
          const score = 800 + randomFactor + (user.rank % 5) * 40;
          segmentScores[segment] = score;
          jobOverallScore += score;
        });

        segmentScores['Overall'] = jobOverallScore;
        const timeSeed = (userSeed * jobSeed * user.rank) % 150;
        const completionTime = 700 + timeSeed;
        
        jobScores[job] = { segmentScores, completionTime };
      });

      // Calculate the true "Overall" score by summing up all segment scores from all jobs
      const grandTotalScore = allJobsForCalculation.reduce((total, job) => {
          return total + jobScores[job].segmentScores['Overall'];
      }, 0);

      const overallCompletionTime = allJobsForCalculation.reduce((total, job) => {
        return total + jobScores[job].completionTime;
      }, 0) / allJobsForCalculation.length;

      jobScores['Overall'] = {
        segmentScores: { 'Overall': grandTotalScore },
        completionTime: overallCompletionTime
      };

      // Also create overall scores for each segment across all jobs
      segments.slice(1).forEach(segment => {
        const totalSegmentScore = allJobsForCalculation.reduce((total, job) => {
          return total + (jobScores[job]?.segmentScores[segment] || 0);
        }, 0);
        jobScores['Overall'].segmentScores[segment] = totalSegmentScore;
      });


      return {
        ...user,
        jobScores,
      };
    });
  }, []);

  const displayedLeaderboard = useMemo(() => {
    return processedLeaderboard
      .filter((user) => {
          if (selectedJob === 'Overall') return true;
          return user.role === selectedJob;
      })
      .map((user) => {
        const jobData = user.jobScores[selectedJob] || user.jobScores['Overall'];
        
        if (!jobData) {
          return { ...user, score: 0, completionTime: 0, rank: user.rank };
        }
        
        const score = jobData.segmentScores[selectedSegment] || 0;
        
        return {
          ...user,
          score,
          completionTime: jobData.completionTime,
        };
      })
      .sort((a, b) => b.score - a.score)
      .map((user, index) => ({ ...user, rank: index + 1 }));
  }, [selectedJob, selectedSegment, processedLeaderboard]);

  const topThree = displayedLeaderboard.slice(0, 3);
  const restOfLeaderboard = displayedLeaderboard.slice(3);

  // Find current user's mock rank (simulated as u1)
  const currentUserRank = displayedLeaderboard.find(u => u.id === 'u1')?.rank || 0;

  return (
    <PageWrapper
      title="Leaderboard"
      description="See how you stack up against the top performers."
    >
      <div className="space-y-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                 <Select value={selectedJob} onValueChange={setSelectedJob}>
                    <SelectTrigger className="w-full sm:w-[240px]">
                        <SelectValue placeholder="Select a filter" />
                    </SelectTrigger>
                    <SelectContent>
                        {allJobRoles.map((job) => (
                        <SelectItem key={job} value={job}>
                            {job}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                 <Tabs
                    value={selectedSegment}
                    onValueChange={setSelectedSegment}
                    className="overflow-x-auto w-full sm:w-auto"
                >
                    <TabsList>
                    {segments.map((segment) => {
                        const isOverallView = selectedJob === 'Overall';
                        if (isOverallView && segment !== 'Overall' && !processedLeaderboard[0]?.jobScores['Overall']?.segmentScores[segment]) {
                        return null;
                        }
                        
                        return (
                        <TabsTrigger key={segment} value={segment}>
                            {segment}
                        </TabsTrigger>
                        );
                    })}
                    </TabsList>
                </Tabs>
             </div>
             <div className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                 Your Rank: <span className="font-bold text-foreground">#{currentUserRank}</span>
             </div>
          </div>

          {/* Personalization Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Your Standing</p>
                      <p className="text-2xl font-bold text-primary">Top 5%</p>
                      <p className="text-xs text-muted-foreground">You're crushing it!</p>
                  </CardContent>
              </Card>
              <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Next Rank</p>
                      <p className="text-2xl font-bold">#3</p>
                      <p className="text-xs text-muted-foreground"><span className="text-primary font-semibold">1,250</span> points needed</p>
                  </CardContent>
              </Card>
               <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Rival</p>
                      <div className="flex items-center gap-2 mt-1">
                           <Image src="/avatars/02.png" alt="Rival" width={24} height={24} className="rounded-full bg-secondary" />
                           <p className="text-lg font-bold">Sarah K.</p>
                      </div>
                      <p className="text-xs text-red-500 font-medium">150 points ahead</p>
                  </CardContent>
              </Card>
              <Card>
                   <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Weekly Streak</p>
                      <p className="text-2xl font-bold text-orange-500">🔥 5 Days</p>
                      <p className="text-xs text-muted-foreground">Keep it up!</p>
                  </CardContent>
              </Card>
          </div>

        {/* Podium */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end justify-center mb-8 px-4 sm:px-0">
             {/* 2nd Place */}
             {topThree[1] && (
                 <div className="order-2 sm:order-1 flex flex-col items-center">
                      <div className="relative mb-2">
                        <Image src={topThree[1].avatar} alt={topThree[1].name} width={64} height={64} className="rounded-full border-4 border-gray-300 shadow-lg" />
                        <div className="absolute -bottom-2 md:bottom-0 left-1/2 -translate-x-1/2 bg-gray-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">#2</div>
                      </div>
                      <div className="text-center mb-2">
                          <p className="font-bold text-sm">{topThree[1].name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{topThree[1].score.toLocaleString()}</p>
                      </div>
                      <div className="w-full h-24 bg-gradient-to-t from-gray-200/50 to-gray-100/10 rounded-t-lg border-x border-t border-gray-200" />
                 </div>
             )}
             
             {/* 1st Place */}
             {topThree[0] && (
                 <div className="order-1 sm:order-2 flex flex-col items-center z-10 -mx-2 sm:mx-0">
                      <Crown className="w-8 h-8 text-yellow-500 mb-2 animate-bounce" />
                      <div className="relative mb-2">
                        <Image src={topThree[0].avatar} alt={topThree[0].name} width={80} height={80} className="rounded-full border-4 border-yellow-500 shadow-xl ring-4 ring-yellow-500/20" />
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-white text-sm font-bold px-3 py-0.5 rounded-full shadow-sm">#1</div>
                      </div>
                      <div className="text-center mb-3">
                          <p className="font-bold text-lg">{topThree[0].name}</p>
                          <p className="text-sm text-yellow-600 font-mono font-bold">{topThree[0].score.toLocaleString()}</p>
                      </div>
                      <div className="w-full h-32 bg-gradient-to-t from-yellow-100/50 to-yellow-50/10 rounded-t-xl border-x border-t border-yellow-200 shadow-sm" />
                 </div>
             )}

             {/* 3rd Place */}
             {topThree[2] && (
                  <div className="order-3 flex flex-col items-center">
                      <div className="relative mb-2">
                        <Image src={topThree[2].avatar} alt={topThree[2].name} width={64} height={64} className="rounded-full border-4 border-orange-300 shadow-lg" />
                        <div className="absolute -bottom-2 md:bottom-0 left-1/2 -translate-x-1/2 bg-orange-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">#3</div>
                      </div>
                      <div className="text-center mb-2">
                          <p className="font-bold text-sm">{topThree[2].name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{topThree[2].score.toLocaleString()}</p>
                      </div>
                      <div className="w-full h-20 bg-gradient-to-t from-orange-100/50 to-orange-50/10 rounded-t-lg border-x border-t border-orange-200" />
                 </div>
             )}
        </div>


        <Card className="border shadow-none">
          <CardHeader>
            <CardTitle>Rankings {displayedLeaderboard.length > 3 && `(4 - ${displayedLeaderboard.length})`}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="hidden md:table-cell text-right">
                    Avg. Time
                  </TableHead>
                  <TableHead className="hidden sm:table-cell text-center w-24">
                    Change
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {restOfLeaderboard.map((user) => (
                  <TableRow
                    key={user.id}
                    className={cn(user.id === 'u1' && 'bg-primary/5 border-l-2 border-l-primary')}
                  >
                    <TableCell className="text-center font-bold text-muted-foreground">
                        #{user.rank}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={32}
                            height={32}
                            className="rounded-full bg-secondary"
                          />
                        <span className={cn("font-medium", user.id === 'u1' && "text-primary")}>
                            {user.name} 
                            {user.id === 'u1' && <span className="ml-2 text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full uppercase tracking-wider">You</span>}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono font-medium">
                      {user.score.toLocaleString()}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-right text-muted-foreground text-sm">
                      {Math.floor(user.completionTime / 60)}m{' '}
                      {Math.round(user.completionTime % 60)}s
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-center">
                      <RankChangeIndicator user={user} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
