
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
  const change = useMemo(() => Math.floor(Math.random() * 3) - 1, [user.id]);

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
      .map((user) => {
        const jobData = user.jobScores[selectedJob];
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

  return (
    <PageWrapper
      title="Leaderboard"
      description="See how you stack up against other users."
    >
      <Card>
        <CardHeader>
          <CardTitle>Rankings</CardTitle>
          <CardDescription>
            Filter the leaderboard to see the top performers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="w-full sm:w-auto sm:min-w-[240px]">
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
          </div>

          <Tabs
            value={selectedSegment}
            onValueChange={setSelectedSegment}
            className="overflow-x-auto"
          >
            <TabsList>
              {segments.map((segment) => {
                const isOverallView = selectedJob === 'Overall';
                // In Overall view, the 'Overall' tab is the only relevant one for aggregated scores.
                // We show all segment tabs, but they represent the sum of that segment across all jobs.
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

          <div className="rounded-md border">
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
                    Rank Change
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedLeaderboard.map((user) => (
                  <TableRow
                    key={user.id}
                    className={cn(user.id === 'u1' && 'bg-accent')}
                  >
                    <TableCell className="text-center font-bold">
                      <div className="flex justify-center items-center">
                        {user.rank === 1 ? (
                          <Crown
                            className={cn('w-6 h-6', getRankColor(user.rank))}
                          />
                        ) : (
                          <span
                            className={cn('text-lg', getRankColor(user.rank))}
                          >
                            {user.rank}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div
                            className={cn(
                              'absolute -bottom-1 -right-2 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold text-white',
                              user.rank === 1 && 'bg-yellow-500',
                              user.rank === 2 && 'bg-gray-400',
                              user.rank === 3 && 'bg-yellow-700'
                            )}
                          >
                            {user.rank}
                          </div>
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {user.score.toLocaleString()}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-right">
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
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
