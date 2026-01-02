
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  mockAssessmentModules,
  mockJobRoles,
  mockCLevelRoles,
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
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function AssessmentsPage() {
  const [selectedJobs, setSelectedJobs] = React.useState<Record<string, string>>(
    {}
  );

  const handleJobChange = (moduleId: string, value: string) => {
    setSelectedJobs((prev) => ({ ...prev, [moduleId]: value }));
  };

  const isJobBased = (id: string) => id === 'tm4' || id === 'tm5';
  const isCLevel = (id:string) => id === 'tm6';

  return (
    <PageWrapper
      title="Test Assessments"
      description="Select an assessment to evaluate your skills and get a score."
    >
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {mockAssessmentModules.map((module) => {
            const isJobModule = isJobBased(module.id);
            const isCLevelModule = isCLevel(module.id);
            const roles = isCLevelModule ? mockCLevelRoles : mockJobRoles;
            const defaultRole = roles[0];
            const selectedJob = selectedJobs[module.id] || defaultRole;
            const href =
              isJobModule || isCLevelModule
                ? `${module.href}?job=${encodeURIComponent(selectedJob)}`
                : module.href;

            return (
              <CarouselItem
                key={module.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1 h-full">
                <Card className="overflow-hidden h-full flex flex-col group">
                  <Link href={href} className="flex flex-col h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <module.icon className="w-6 h-6 text-primary" />
                        <CardTitle className="text-xl">
                          {module.title}
                        </CardTitle>
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                      <Badge className="w-fit" variant="default">Assessment</Badge>
                    </CardHeader>

                    <CardContent className="flex-1 mt-auto">
                      {(isJobModule || isCLevelModule) && (
                        <div
                          className="mb-4"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <Select
                            defaultValue={selectedJob}
                            onValueChange={(value) =>
                              handleJobChange(module.id, value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a job" />
                            </SelectTrigger>
                            <SelectContent>
                              {roles.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      <div className="relative h-32 w-full rounded-lg overflow-hidden">
                        <Image
                          src={module.imageUrl}
                          alt={module.description}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          data-ai-hint={module.imageHint}
                        />
                      </div>
                    </CardContent>

                    <CardFooter className="mt-auto pt-4">
                      <Button className="w-full">
                        Start Assessment{' '}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Link>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-12" />
        <CarouselNext className="hidden sm:flex -right-12" />
      </Carousel>
    </PageWrapper>
  );
}
