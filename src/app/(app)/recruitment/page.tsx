import Image from 'next/image';
import { mockRecruitmentPrograms } from '@/lib/placeholder-data';
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

export default function RecruitmentPage() {
  return (
    <PageWrapper
      title="Recruitment Programs"
      description="Explore available programs and internships from our partner companies."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockRecruitmentPrograms.map((program) => (
          <Card key={program.id} className="flex flex-col overflow-hidden">
            <div className="relative h-52 w-full">
              <Image
                src={program.imageUrl}
                alt={program.title}
                fill
                className="object-cover"
                data-ai-hint={program.imageHint}
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{program.title}</CardTitle>
                <Badge variant="secondary">{program.company}</Badge>
              </div>
              <CardDescription className="pt-2">
                {program.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button className="w-full">Apply Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}
