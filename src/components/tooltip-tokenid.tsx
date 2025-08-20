'use client';

import React, { useState } from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { copyToClipboard } from '@/lib';

type TooltipTokenIdProps = {
  children: React.ReactNode;
  tokenId: string;
  delayDuration?: number;
} & React.ComponentProps<typeof Tooltip>;

export function TooltipTokenId({ children, tokenId, delayDuration = 200, ...props }: TooltipTokenIdProps) {
  const [open, setOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const defaultTooltip = (
    <div className='max-w-[194px] text-left wrap-break-word'>
      <span className='cursor-pointer text-green-300 hover:underline dark:text-green-900'>{tokenId}</span>
    </div>
  );
  const clickedContent = (
    <div className='max-w-[194px] text-left wrap-break-word'>
      <span className='text-green-300 dark:text-green-900'>{tokenId}</span> <br></br>{' '}
      <span className='dark:text-green-1000 font-semibold text-green-50'>Copied to Clipboard!</span>
    </div>
  );
  const [tooltip, setTooltip] = useState(defaultTooltip);

  const content = (
    <button
      onClick={() => {
        copyToClipboard(tokenId);
        setTooltip(
          <div className='max-w-[194px] text-left wrap-break-word'>
            <span className='text-green-300 dark:text-green-900'>{tokenId}</span> <br></br>{' '}
            <span className='dark:text-green-1000 font-semibold text-green-50'>Copied to Clipboard!</span>
          </div>,
        );
        setIsClicked(true);
      }}
    >
      {tooltip}
    </button>
  );

  const handleOnOpenChange = (state: boolean) => {
    if (open && !state) {
      setTooltip(defaultTooltip);
      setIsClicked(false);
    }
    setOpen(state);
  };

  return (
    <TooltipProvider>
      <Tooltip onOpenChange={handleOnOpenChange} delayDuration={delayDuration} {...props}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side='bottom'
          onClick={(e: { stopPropagation: () => void }) => e.stopPropagation()}
          className='bg-green-900 dark:bg-green-200'
        >
          <TooltipPrimitive.Arrow
            className='size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] border-none bg-green-900
              fill-green-900 dark:bg-green-200 dark:fill-green-200'
          />
          {isClicked ? clickedContent : content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
