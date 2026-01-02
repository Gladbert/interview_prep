
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  mockTrainingModules,
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

export default function TrainingPage() {
  const [selectedJobs, setSelectedJobs] = React.useState<Record<string, string>>(
    {}
  );

  const handleJobChange = (moduleId: string, value: string) => {
    setSelectedJobs((prev) => ({ ...prev, [moduleId]: value }));
  };

  const isJobBased = (id: string) => id === 'tm4' || id === 'tm5';
  const isCLevel = (id: string) => id === 'tm6';

  return (
    <PageWrapper
      title="Training Modules"
      description="Select a module to start your AI-powered training session."
    >
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {mockTrainingModules.map((module) => {
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
                  <Card
                    key={module.id}
                    className="overflow-hidden h-full flex flex-col"
                  >
                    <Link href={href} className="group flex flex-col h-full">
                      <div className="relative h-48 w-full">
                        <Image
                          src={module.imageUrl}
                          alt={module.description}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          data-ai-hint={module.imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <Badge
                          className="absolute top-3 right-3"
                          variant="secondary"
                        >
                          Training
                        </Badge>
                        <CardTitle className="absolute bottom-4 left-4 text-xl text-white">
                            {module.title}
                          </CardTitle>
                      </div>
                      <CardHeader>
                        <CardDescription>{module.description}</CardDescription>
                      </CardHeader>
                      <div className="px-6 mt-auto">
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
                      </div>

                      <CardFooter className="mt-auto pt-4">
                        <Button variant="outline" className="w-full">
                          Start Training{' '}
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
