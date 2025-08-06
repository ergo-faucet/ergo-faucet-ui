'use client';

import React from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type TooltipTokenIdProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  clickedContent?: React.ReactNode;
  defaultOpen?: boolean;
  delayDuration?: number;
  clickDuration?: number;
} & React.ComponentProps<typeof Tooltip>;

export function TooltipTokenId({
  children,
  content,
  clickedContent = 'Copied!',
  defaultOpen = false,
  delayDuration = 300,
  clickDuration = 5000,
  ...props
}: TooltipTokenIdProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const [isClicked, setIsClicked] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout>(null);

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    setIsOpen(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsClicked(false);
    }, clickDuration);
  };

  const handleOpenChange = (open: boolean) => {
    // Only allow closing if not in clicked state
    if (!open && !isClicked) {
      setIsOpen(false);
    }
    // If trying to close while clicked, keep it open
    else if (open) {
      setIsOpen(true);
    }
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={handleOpenChange} delayDuration={delayDuration} {...props}>
        <TooltipTrigger asChild onClick={handleTriggerClick}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          side='bottom'
          onClick={(e: { stopPropagation: () => void }) => e.stopPropagation()}
          className='cursor-pointer bg-green-900 before:bg-red-500 dark:bg-green-200'
        >
          {isClicked ? clickedContent : content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
