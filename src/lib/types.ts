import type { LucideIcon } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  score: number;
  completionTime: number; // in seconds
}

export interface Session {
  id: string;
  title: string;
  time: string;
  type: 'IQ Test' | 'Psycho-Test' | 'Interview';
  icon: LucideIcon;
}

export interface Insight {
  id:string;
  text: string;
  icon: LucideIcon;
}

export interface Skill {
  id: string;
  name: string;
  mastery: number; // 0-100
}

export interface RecruitmentProgram {
  id: string;
  title: string;
  company: string;
  description: string;
  imageUrl: string;
  imageHint: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  imageHint: string;
  icon: LucideIcon;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  unlocked: boolean;
  icon: LucideIcon;
}
