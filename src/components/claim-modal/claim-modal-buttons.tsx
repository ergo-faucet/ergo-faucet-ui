'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { DialogClose } from '@/components/ui/dialog';
import { RecaptchaSiteKey } from '@/configs';
import { requestPackage } from '@/lib/api';
import { useAuthStore } from '@/lib/api/auth-store';
import { useConnectSidebarStore } from '@/store/connect-sidebar-store';

interface ClaimModalButtonsProps {
  disabled: boolean;
  recaptchaToken: string | null;
  packageId: number;
  destAddress: string;
  onCancel?: () => void;
  onConfirm?: (token: string | null) => void;
}

export const ClaimModalButtons = ({
  disabled,
  recaptchaToken,
  packageId,
  destAddress,
  onCancel,
  onConfirm,
}: ClaimModalButtonsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useAuthStore((s) => s.accessToken);
  const openSidebar = useConnectSidebarStore((s) => s.open);
  const isRecaptchaRequired = !!RecaptchaSiteKey;

  const handleConfirm = async () => {
    if (!accessToken) {
      toast.error('Please connect your wallet and authenticate first');
      openSidebar();
      return;
    }

    if (isRecaptchaRequired && !recaptchaToken) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }

    if (!destAddress.trim()) {
      toast.error('Please enter a destination address');
      return;
    }

    if (!packageId || packageId <= 0) {
      toast.error('Invalid package selected. Please select a package first.');
      return;
    }

    setIsLoading(true);
    try {
      // Use 'test' for captcha token when reCAPTCHA is not required (dev mode)
      const captchaToken = isRecaptchaRequired ? recaptchaToken! : 'test';

      const result = await requestPackage(packageId, destAddress.trim(), captchaToken);
      toast.success(`Package request submitted successfully! Request ID: ${result.requestId}`);
      onConfirm?.(recaptchaToken);
    } catch (error) {
      let errorMessage = 'Failed to request package';
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex h-full w-full items-center justify-end gap-4 p-[31px] pt-0'>
      {/* Cancel */}
      <DialogClose asChild>
        <button
          type='button'
          onClick={onCancel}
          className='cursor-pointer text-[16px] font-semibold text-black hover:text-gray-900 dark:text-white
            dark:hover:text-gray-100'
        >
          Cancel
        </button>
      </DialogClose>

      {/* Confirm */}
      <button
        type='button'
        disabled={disabled || isLoading}
        onClick={handleConfirm}
        className={`h-[37px] w-[87px] rounded-[10px] text-[16px] font-semibold text-white
          ${disabled || isLoading ? 'cursor-not-allowed bg-gray-500' : 'cursor-pointer bg-green-700 hover:bg-green-800'}`}
      >
        {isLoading ? 'Claiming...' : 'Confirm'}
      </button>
    </div>
  );
};
