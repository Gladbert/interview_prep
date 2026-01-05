
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
  MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

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
  
  const nextTierIndex = masteryTiers.findIndex(t => t.level === currentTier.level) + 1;
  const nextTier = masteryTiers[nextTierIndex];

  return (
    <PageWrapper
      title="Skill Journey"
      description="Track your path to mastery."
    >
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Hero Card */}
          <Card className="overflow-hidden relative border-none shadow-2xl bg-gradient-to-br from-primary/10 via-background to-secondary/10">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
            <CardHeader className="text-center relative z-10 pb-10 pt-12">
               <div className="absolute top-4 right-4 animate-pulse">
                   <Sparkles className="h-6 w-6 text-yellow-400 opacity-70" />
               </div>
              <div className="flex justify-center mb-6">
                  <div className={cn("p-6 rounded-full bg-background shadow-2xl ring-4 ring-primary/20 animate-in zoom-in duration-500", currentTier.bgColor)}>
                    <currentTier.icon
                        className={cn('h-20 w-20 sm:h-24 sm:w-24 drop-shadow-lg', currentTier.color)}
                    />
                </div>
              </div>
              <div className="space-y-2">
                  <CardTitle className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    {currentTier.title}
                  </CardTitle>
                  <CardDescription className="text-lg font-medium text-muted-foreground">
                    Level {currentTier.level} • {totalMastery} Mastery Points
                  </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-10 relative z-10">
              {nextTier ? (
                <div className="space-y-4 max-w-lg mx-auto">
                    <div className="flex justify-between text-sm font-bold text-muted-foreground uppercase tracking-widest">
                        <span>Current</span>
                        <span>Next: {nextTier.title}</span>
                    </div>
                   <div className="h-6 w-full bg-secondary/50 rounded-full overflow-hidden p-1 box-content border border-white/20 shadow-inner">
                        <div 
                            className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(var(--primary),0.5)] relative"
                            style={{ 
                                width: `${Math.min(100, Math.max(0, ((totalMastery - currentTier.minMastery) / (nextTier.minMastery - currentTier.minMastery)) * 100))}%` 
                            }}
                        >
                             <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-sm" />
                        </div>
                   </div>
                  <p className="text-center text-sm font-medium text-muted-foreground">
                    <span className="text-primary font-bold">{nextTier.minMastery - totalMastery}</span> points until level up
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                     <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-amber-200 to-yellow-500 text-yellow-900 border-none shadow-lg">
                        <Crown className="mr-2 h-5 w-5" /> Max Level Reached
                    </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mastery Path */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <MapPin className="h-6 w-6 text-primary" />
                The Path to Legend
            </h2>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {masteryTiers.map((tier) => {
                const isAchieved = totalMastery >= tier.minMastery;
                const isCurrent = tier.level === currentTier.level;
                const isNext = tier.level === (currentTier.level + 1);

                return (
                    <Card
                    key={tier.level}
                    className={cn(
                        'flex flex-col items-center p-4 text-center transition-all duration-300 relative overflow-hidden group',
                        isCurrent ? 'ring-2 ring-primary shadow-xl bg-card scale-105 z-10' : 'bg-card/50',
                        !isAchieved && !isNext && 'opacity-40 grayscale',
                         isNext && 'opacity-80 border-dashed border-2 border-primary/50'
                    )}
                    >
                    {isAchieved && (
                        <div className="absolute top-2 right-2 text-primary">
                            <CheckCircle2 className="h-4 w-4" />
                        </div>
                    )}
                    {!isAchieved && !isNext && (
                         <div className="absolute top-2 right-2 text-muted-foreground">
                            <Lock className="h-4 w-4" />
                        </div>
                    )}

                    <div
                        className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-full mb-3 transition-transform group-hover:scale-110 duration-300',
                        tier.bgColor,
                        isAchieved ? "bg-opacity-100" : "bg-opacity-50"
                        )}
                    >
                        <tier.icon className={cn('h-6 w-6', tier.color)} />
                    </div>
                    
                    <div className="space-y-1">
                        <div className="font-bold text-sm leading-none">{tier.title}</div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Lvl {tier.level}</div>
                    </div>
                    
                    {/* Progress Line Connector (Visual only, simple implementation) */}
                    </Card>
                );
                })}
            </div>
          </div>
        </div>

        {/* Sidebar Achievements */}
        <div className="space-y-6">
          <Card className="h-full border-l-4 border-l-primary/20 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Achievements
              </CardTitle>
              <CardDescription>
                {unlockedAchievements.length} / {totalAchievements} Unlocked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 space-y-2">
                 <div className="flex justify-between text-xs font-semibold mb-1">
                     <span>Collection Progress</span>
                     <span>{Math.round((unlockedAchievements.length / totalAchievements) * 100)}%</span>
                 </div>
                <Progress
                    value={(unlockedAchievements.length / totalAchievements) * 100}
                    className="h-2"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
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
