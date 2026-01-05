'use client';

import { LogOut, Search, User, Settings, BrainCircuit, Star, Presentation } from 'lucide-react';
import Link from 'next/link';
import { AppLogo } from '@/components/icons';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUser } from '@/lib/placeholder-data';
import { useIsMobile } from '@/hooks/use-mobile';

export function AppHeader() {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger />
      <div className="flex items-center gap-2 md:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <AppLogo className="h-6 w-6 text-primary" />
          <span className="font-headline font-semibold">InterviewPrepPro</span>
        </Link>
      </div>

        <div className="relative ml-auto hidden flex-1 max-w-xs sm:block">
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search modules..."
                  className="pl-8 w-full cursor-text text-left"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <div className="p-2">
                <p className="text-sm font-medium text-muted-foreground px-2 py-1.5 focus:bg-accent focus:text-accent-foreground">
                  Suggestions
                </p>
                <div className="grid gap-1">
                  <Link
                    href="/training/iq"
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    <BrainCircuit className="h-4 w-4" />
                    <span>IQ Assessment</span>
                  </Link>
                   <Link
                    href="/training/psycho"
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    <Star className="h-4 w-4" />
                    <span>Personality Test</span>
                  </Link>
                  <Link
                    href="/training/interview-sim"
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    <Presentation className="h-4 w-4" />
                    <span>Interview Sim</span>
                  </Link>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {isMobile && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
     
    </header>
  );
}
