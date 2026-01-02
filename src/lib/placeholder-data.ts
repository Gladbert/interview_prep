
import {
    BrainCircuit,
    Lightbulb,
    BarChart,
    Briefcase,
    Presentation,
    Star,
    Zap,
    Clock,
    Target,
    FileText,
    Users,
    Award,
    BookOpen,
    Trophy,
    BarChart4,
    GraduationCap,
    ClipboardCheck,
    Gem,
    Shield,
    Heart,
    MessageSquare,
    Repeat,
    Sigma,
    Pencil,
    Swords,
    Crown,
    Feather,
    Activity,
    Calendar,
    Flag,
    Flame,
    Globe,
    Radio,
    Rocket,
    Atom,
    Sword,
  } from 'lucide-react';
  import type {
    User,
    Session,
    Insight,
    Skill,
    RecruitmentProgram,
    TrainingModule,
    Achievement,
  } from '@/lib/types';
  import { PlaceHolderImages } from '@/lib/placeholder-images';
  
  export const mockUser: User = {
    id: 'u1',
    name: 'Alex Doe',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    rank: 5,
    score: 9150,
    completionTime: 765, // in seconds
  };
  
  export const mockLeaderboard: User[] = [
    {
      id: 'u2',
      name: 'Samantha G.',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
      rank: 1,
      score: 9850,
      completionTime: 720,
    },
    {
      id: 'u3',
      name: 'John B.',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
      rank: 2,
      score: 9700,
      completionTime: 750,
    },
    {
      id: 'u4',
      name: 'Maria K.',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
      rank: 3,
      score: 9700,
      completionTime: 740,
    },
    {
      id: 'u5',
      name: 'David L.',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
      rank: 4,
      score: 9200,
      completionTime: 780,
    },
    {
      id: 'u1',
      name: 'You',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      rank: 5,
      score: 9150,
      completionTime: 765,
    },
    {
      id: 'u6',
      name: 'Chloe T.',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d',
      rank: 6,
      score: 8900,
      completionTime: 800,
    },
    {
      id: 'u7',
      name: 'Ben C.',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026710d',
      rank: 7,
      score: 8750,
      completionTime: 810,
    },
    {
      id: 'u8',
      name: 'Emily R.',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026711d',
      rank: 8,
      score: 8600,
      completionTime: 820,
    },
     {
      id: 'u9',
      name: 'Frank Miller',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026712d',
      rank: 9,
      score: 8450,
      completionTime: 830,
    },
    {
      id: 'u10',
      name: 'Grace Lee',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026713d',
      rank: 10,
      score: 8450,
      completionTime: 825,
    },
  ];
  
  export const mockUpcomingSessions: Session[] = [
    {
      id: 's1',
      title: 'Advanced Logical Reasoning',
      time: 'Today, 4:00 PM',
      type: 'IQ Test',
      icon: BrainCircuit,
    },
    {
      id: 's2',
      title: 'Software Engineer Mock Interview',
      time: 'Tomorrow, 10:00 AM',
      type: 'Interview',
      icon: Presentation,
    },
    {
      id: 's3',
      title: 'Leadership Skills Assessment',
      time: 'May 28, 2:00 PM',
      type: 'Psycho-Test',
      icon: BarChart,
    },
  ];
  
  export const mockInsights: Insight[] = [
    {
      id: 'i1',
      text: 'You excel at spatial reasoning questions. Keep it up!',
      icon: Star,
    },
    {
      id: 'i2',
      text: 'Consider practicing more STAR method responses for behavioral questions.',
      icon: Target,
    },
    {
      id: 'i3',
      text: 'Your psycho-test performance improved by 15% this week.',
      icon: Zap,
    },
  ];
  
  export const mockSkills: Skill[] = [
    { id: 'sk_overall', name: 'Overall Mastery', mastery: 25 }, // Base mastery
    { id: 'sk_logic', name: 'Logical Reasoning', mastery: 72 },
    { id: 'sk_comm', name: 'Communication', mastery: 85 },
    { id: 'sk_leader', name: 'Leadership', mastery: 65 },
    { id: 'sk_problem', name: 'Problem Solving', mastery: 90 },
  ];
  
  
  const recruitmentImage1 = PlaceHolderImages.find(
    (img) => img.id === 'recruitment1'
  )!;
  const recruitmentImage2 = PlaceHolderImages.find(
    (img) => img.id === 'recruitment2'
  )!;
  const recruitmentImage3 = PlaceHolderImages.find(
    (img) => img.id === 'recruitment3'
  )!;
  
  export const mockRecruitmentPrograms: RecruitmentProgram[] = [
    {
      id: 'rp1',
      title: 'Graduate Tech Program',
      company: 'Innovate Corp',
      description:
        'A fast-track program for recent graduates to become future tech leaders.',
      imageUrl: recruitmentImage1.imageUrl,
      imageHint: recruitmentImage1.imageHint,
    },
    {
      id: 'rp2',
      title: 'Product Manager Internship',
      company: 'NextGen Solutions',
      description:
        'Join our dynamic product team and help shape the future of our products.',
      imageUrl: recruitmentImage2.imageUrl,
      imageHint: recruitmentImage2.imageHint,
    },
    {
      id: 'rp3',
      title: 'Data Scientist Fellowship',
      company: 'Data Insights Ltd.',
      description: 'A 12-month intensive fellowship for aspiring data scientists.',
      imageUrl: recruitmentImage3.imageUrl,
      imageHint: recruitmentImage3.imageHint,
    },
  ];
  
  const trainingIqImage = PlaceHolderImages.find(
    (img) => img.id === 'training-iq'
  )!;
  const trainingPsychoImage = PlaceHolderImages.find(
    (img) => img.id === 'training-psycho'
  )!;
  const trainingInterviewImage = PlaceHolderImages.find(
    (img) => img.id === 'training-interview'
  )!;
  const trainingWrittenTestImage = PlaceHolderImages.find(
    (img) => img.id === 'training-written-test'
  )!;
  const trainingUserInterviewImage = PlaceHolderImages.find(
    (img) => img.id === 'training-user-interview'
  )!;
  const trainingCLevelInterviewImage = PlaceHolderImages.find(
    (img) => img.id === 'training-clevel-interview'
  )!;
  
  export const mockJobRoles = [
    'Software Engineer',
    'Product Manager',
    'Data Scientist',
    'UX/UI Designer',
    'Marketing Specialist',
    'Data Analyst',
    'Data Engineer',
  ];
  
  export const mockCLevelRoles = ['CTO', 'CFO', 'CEO'];
  
  export const mockTrainingModules: TrainingModule[] = [
    {
      id: 'tm1',
      title: 'IQ Tests',
      description: 'Sharpen your logical, spatial, and mathematical reasoning.',
      href: '/training/iq',
      imageUrl: trainingIqImage.imageUrl,
      imageHint: trainingIqImage.imageHint,
      icon: BrainCircuit,
    },
    {
      id: 'tm2',
      title: 'Psycho-Tests',
      description:
        'Understand your personality and how it fits professional roles.',
      href: '/training/psycho',
      imageUrl: trainingPsychoImage.imageUrl,
  imageHint: trainingPsychoImage.imageHint,
      icon: BarChart,
    },
    {
      id: 'tm3',
      title: 'HRD Interview',
      description: 'Practice common HRD interview questions with our AI simulator.',
      href: '/training/interview-sim',
      imageUrl: trainingInterviewImage.imageUrl,
      imageHint: trainingInterviewImage.imageHint,
      icon: Presentation,
    },
    {
      id: 'tm4',
      title: 'Written Test (Job Based)',
      description: 'Prepare for job-specific written assessments and case studies.',
      href: '/training/written-test',
      imageUrl: trainingWrittenTestImage.imageUrl,
      imageHint: trainingWrittenTestImage.imageHint,
      icon: FileText,
    },
    {
      id: 'tm5',
      title: 'User Interview (Job Based)',
      description:
        'Practice your skills in user-centric interview scenarios.',
      href: '/training/user-interview',
      imageUrl: trainingUserInterviewImage.imageUrl,
      imageHint: trainingUserInterviewImage.imageHint,
      icon: Users,
    },
    {
      id: 'tm6',
      title: 'Head (C-level) Interview',
      description:
        'Prepare for executive-level interviews and leadership assessments.',
      href: '/training/clevel-interview',
      imageUrl: trainingCLevelInterviewImage.imageUrl,
      imageHint: trainingCLevelInterviewImage.imageHint,
      icon: Award,
    },
  ];
  
  export const mockAssessmentModules = mockTrainingModules.map((module) => ({
    ...module,
    href: module.href.replace('/training/', '/assessments/'),
  }));
  
  export const mockAchievements: Achievement[] = [
    // Tier 1: Onboarding & First Steps (5-10 points)
    { id: 'ach1', title: 'First Steps', description: 'Complete your first training module.', points: 5, unlocked: true, icon: GraduationCap },
    { id: 'ach2', title: 'Assessment Taker', description: 'Complete your first assessment.', points: 5, unlocked: true, icon: Pencil },
    { id: 'ach3', title: 'Curious Mind', description: 'Explore all sections of the app.', points: 10, unlocked: false, icon: Globe },
    { id: 'ach4', title: 'Feedback Fanatic', description: 'Review your feedback on a session.', points: 5, unlocked: true, icon: MessageSquare },
    { id: 'ach5', title: 'Ranked', description: 'Appear on the leaderboard for the first time.', points: 10, unlocked: true, icon: BarChart4 },
  
    // Tier 2: Consistency & Habit Building (10-15 points)
    { id: 'ach6', title: 'Daily Dose', description: 'Complete a session every day for 3 days.', points: 10, unlocked: true, icon: Calendar },
    { id: 'ach7', title: 'Weekly Warrior', description: 'Complete a session every day for a week.', points: 15, unlocked: false, icon: Activity },
    { id: 'ach8', title: 'Hot Streak', description: 'Complete 5 sessions in a row without breaking a daily streak.', points: 15, unlocked: false, icon: Flame },
    { id: 'ach9', title: 'Persistent', description: 'Complete 10 total sessions.', points: 10, unlocked: true, icon: Repeat },
    { id: 'ach10', title: 'Dedicated', description: 'Complete 25 total sessions.', points: 15, unlocked: false, icon: Flag },
    
    // Tier 3: Specialization & Skill (15-25 points)
    { id: 'ach11', title: 'Brainiac', description: 'Score in the top 10% on an IQ test.', points: 20, unlocked: true, icon: BrainCircuit },
    { id: 'ach12', title: 'Quick Thinker', description: 'Complete an IQ test in under 3 minutes.', points: 15, unlocked: true, icon: Clock },
    { id: 'ach13', title: 'Logic Lord', description: 'Get a perfect score on an IQ training.', points: 25, unlocked: false, icon: Sigma },
    { id: 'ach14', title: 'The Analyst', description: 'Complete 5 Psycho-Test assessments.', points: 15, unlocked: false, icon: BarChart },
    { id: 'ach15', title: 'Personality Pro', description: 'Complete every type of Psycho-Test.', points: 20, unlocked: false, icon: Radio },
    { id: 'ach16', title: 'Talk the Talk', description: 'Complete 3 HRD Interview simulations.', points: 15, unlocked: true, icon: Presentation },
    { id: 'ach17', title: 'The Empath', description: 'Get a perfect score on a user interview.', points: 20, unlocked: false, icon: Heart },
    { id: 'ach18', title: 'Scribe', description: 'Complete your first Written Test.', points: 15, unlocked: true, icon: FileText },
    { id: 'ach19', title: 'Strategist', description: 'Ace a C-Level interview simulation.', points: 25, unlocked: false, icon: Award },
    { id: 'ach20', title: 'Problem Solver', description: 'Score high on a job-specific written test.', points: 20, unlocked: false, icon: Atom },
    
    // Tier 4: Mastery & Achievement (25-50 points)
    { id: 'ach21', title: 'Bookworm', description: 'Complete 10 training modules.', points: 25, unlocked: true, icon: BookOpen },
    { id: 'ach22', title: 'Well-Rounded', description: 'Complete one of every type of assessment.', points: 30, unlocked: false, icon: ClipboardCheck },
    { id: 'ach23', title: 'Novice Rank', description: "Achieve the 'Novice' skill rank.", points: 20, unlocked: true, icon: Feather },
    { id: 'ach24', title: 'Adept Rank', description: "Achieve the 'Adept' skill rank.", points: 30, unlocked: false, icon: Sword },
    { id: 'ach25', title: 'Master Rank', description: "Achieve the 'Master' skill rank.", points: 40, unlocked: false, icon: Star },
    { id: 'ach26', title: 'Grandmaster Rank', description: "Achieve the 'Grandmaster' skill rank.", points: 50, unlocked: false, icon: Gem },
  
    // Tier 5: Legendary & Leaderboard (50-100 points)
    { id: 'ach27', title: 'Top 10', description: 'Reach the Top 10 on the Overall leaderboard.', points: 50, unlocked: false, icon: Target },
    { id: 'ach28', title: 'Top 3', description: 'Reach the Top 3 on the Overall leaderboard.', points: 75, unlocked: false, icon: Swords },
    { id: 'ach29', title: 'Top of the Class', description: 'Reach the #1 spot on any leaderboard.', points: 100, unlocked: false, icon: Trophy },
    { id: 'ach30', title: 'Emperor Rank', description: "Achieve the 'Emperor' skill rank.", points: 60, unlocked: false, icon: Shield },
    { id: 'ach31', title: 'Legend Rank', description: "Achieve the 'Legend' skill rank.", points: 75, unlocked: false, icon: Trophy },
    { id: 'ach32', title: 'Guardian Rank', description: "Achieve the 'Guardian' skill rank.", points: 90, unlocked: false, icon: Crown },
    { id: 'ach33', title: 'Immortal', description: "Achieve the 'Immortal' skill rank.", points: 120, unlocked: false, icon: Rocket },
  ];
  