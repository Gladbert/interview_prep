
'use client';

import React from 'react';
import {
  mockSkills,
  mockUser,
  mockAchievements,
} from '@/lib/placeholder-data';
import { PageWrapper } from '@/components/shared/page-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Skill, Achievement } from '@/lib/types';
import {
  Baby,
  Smile,
  Star,
  Gem,
  Shield,
  Trophy,
  CheckCircle2,
  Lock,
  Feather,
  Sword,
  Crown,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const masteryTiers = [
  {
    level: 0,
    title: 'Infant',
    minMastery: 0,
    nextLevelMastery: 50,
    icon: Baby,
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
  },
  {
    level: 1,
    title: 'Novice',
    minMastery: 50,
    nextLevelMastery: 125,
    icon: Feather,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
  },
  {
    level: 2,
    title: 'Youngling',
    minMastery: 125,
    nextLevelMastery: 200,
    icon: Smile,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-600/10',
  },
  {
    level: 3,
    title: 'Adept',
    minMastery: 200,
    nextLevelMastery: 300,
    icon: Sword,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    level: 4,
    title: 'Master',
    minMastery: 300,
    nextLevelMastery: 450,
    icon: Star,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    level: 5,
    title: 'Grandmaster',
    minMastery: 450,
    nextLevelMastery: 600,
    icon: Gem,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  {
    level: 6,
    title: 'Emperor',
    minMastery: 600,
    nextLevelMastery: 750,
    icon: Shield,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    level: 7,
    title: 'Legend',
    minMastery: 750,
    nextLevelMastery: 900,
    icon: Trophy,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    level: 8,
    title: 'Guardian',
    minMastery: 900,
    nextLevelMastery: 1000,
    icon: Crown,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
  },
  {
    level: 9,
    title: 'Immortal',
    minMastery: 1000,
    nextLevelMastery: null,
    icon: Sparkles,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10',
  },
];

const getMasteryTier = (mastery: number) => {
  return (
    [...masteryTiers]
      .reverse()
      .find((tier) => mastery >= tier.minMastery) ?? masteryTiers[0]
  );
};

const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={cn(
              'flex flex-col items-center justify-center p-4 text-center transition-all aspect-square',
              achievement.unlocked
                ? 'bg-card'
                : 'bg-secondary opacity-60'
            )}
          >
            <achievement.icon
              className={cn(
                'w-8 h-8 sm:w-10 sm:h-10 mb-2',
                achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
              )}
            />
            <p className="font-semibold text-xs sm:text-sm">{achievement.title}</p>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-bold">{achievement.title}</p>
          <p>{achievement.description}</p>
          <p className="text-primary font-semibold">
            +{achievement.points} Points
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default function JourneyPage() {
  const baseMastery = mockSkills.find(skill => skill.id === 'sk_overall')?.mastery || 0;
  const unlockedAchievements = mockAchievements.filter((a) => a.unlocked);
  const achievementPoints = unlockedAchievements.reduce(
    (total, ach) => total + ach.points,
    0
  );
  const totalMastery = baseMastery + achievementPoints;
  const maxMastery =
    masteryTiers[masteryTiers.length - 1]?.minMastery || 1000;

  const currentTier = getMasteryTier(totalMastery);
  const totalAchievements = mockAchievements.length;
  

  return (
    <PageWrapper
      title="Your Skills Journey"
      description="Level up your skills, earn badges, and become a master!"
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <currentTier.icon
                  className={cn('h-16 w-16 sm:h-24 sm:w-24', currentTier.color)}
                />
              </div>
              <CardTitle className="text-3xl sm:text-4xl">
                You are a {currentTier.title}!
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Overall Mastery: {totalMastery} / {maxMastery}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentTier.nextLevelMastery ? (
                <>
                  <Progress
                    value={
                      ((totalMastery - currentTier.minMastery) /
                        (currentTier.nextLevelMastery -
                          currentTier.minMastery)) *
                      100
                    }
                    className="h-4"
                  />
                  <p className="text-center text-muted-foreground mt-2">
                    {currentTier.nextLevelMastery - totalMastery} points to{' '}
                    {masteryTiers[currentTier.level + 1]?.title}
                  </p>
                </>
              ) : (
                <p className="text-center font-bold text-primary text-lg">
                  Maximum Level Reached! Congratulations, Immortal!
                </p>
              )}
            </CardContent>
          </Card>
          <div className="space-y-2 mb-6">
            <h2 className="font-headline text-2xl font-bold tracking-tight text-primary">
              Mastery Ranks
            </h2>
            <p className="text-muted-foreground">
              This is the path to become an Immortal.
            </p>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {masteryTiers.map((tier) => {
              const isAchieved = totalMastery >= tier.minMastery;
              const isCurrent = tier.level === currentTier.level;

              return (
                <Card
                  key={tier.level}
                  className={cn(
                    'flex flex-col transition-all',
                    isCurrent ? 'ring-2 ring-primary shadow-lg' : 'opacity-50',
                    isAchieved && 'opacity-100'
                  )}
                >
                  <CardHeader className="flex-row items-center gap-4 space-y-0 p-3 sm:p-4">
                    <div
                      className={cn(
                        'flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg shrink-0',
                        tier.bgColor
                      )}
                    >
                      <tier.icon className={cn('h-5 w-5 sm:h-6 sm:w-6', tier.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm sm:text-base truncate">{tier.title}</CardTitle>
                      <CardDescription className={cn('font-bold text-xs', tier.color)}>
                        Level {tier.level}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                {unlockedAchievements.length} of {totalAchievements} unlocked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress
                value={(unlockedAchievements.length / totalAchievements) * 100}
                className="mb-4"
              />
              <div className="grid grid-cols-3 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {mockAchievements.map((ach) => (
                  <AchievementCard key={ach.id} achievement={ach} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
