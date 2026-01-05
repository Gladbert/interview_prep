'use client';

import Image from 'next/image';
import { mockRecruitmentPrograms, mockUser } from '@/lib/placeholder-data';
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
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2 } from 'lucide-react';

// Helper to generate random match score seeded by program id
const getMatchScore = (id: string) => {
    const seed = id.charCodeAt(id.length - 1);
    const base = 85; 
    const random = (seed * 13) % 15;
    return base + random;
};

export default function RecruitmentPage() {
  const { toast } = useToast();

  const handleApply = (programTitle: string) => {
    toast({
        title: "Application Submitted!",
        description: `We've sent your profile to the recruiter for ${programTitle}. Good luck!`,
        action: <div className="text-green-500 font-bold"><CheckCircle2 className="h-5 w-5"/></div>,
    });
  };

  return (
    <PageWrapper
      title="Recruitment Programs"
      description="Explore available programs and internships from our partner companies."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockRecruitmentPrograms.map((program) => {
          const matchScore = getMatchScore(program.id);
          return (
          <Card key={program.id} className="flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-52 w-full">
              <Image
                src={program.imageUrl}
                alt={program.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={program.imageHint}
              />
               <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm font-bold flex items-center gap-1 backdrop-blur-sm">
                   <span className="text-green-400">{matchScore}%</span> Match
               </div>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl line-clamp-1" title={program.title}>{program.title}</CardTitle>
                <Badge variant="secondary" className="max-w-[120px] truncate">{program.company}</Badge>
              </div>
              <CardDescription className="pt-2 line-clamp-2">
                {program.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button className="w-full" onClick={() => handleApply(program.title)}>Apply Now</Button>
            </CardFooter>
          </Card>
        )})}
      </div>
    </PageWrapper>
  );
}
