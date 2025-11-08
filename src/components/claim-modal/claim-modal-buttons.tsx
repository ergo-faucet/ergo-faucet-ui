import { DialogClose } from '@/components/ui/dialog';
import { authFetch } from '@/lib/api';
import { ClaimPackageRequestBody } from '@/types';

interface ClaimModalButtonsProps {
  disabled: boolean;
  reqBody: ClaimPackageRequestBody;
}

export const ClaimModalButtons = ({ disabled, reqBody }: ClaimModalButtonsProps) => {
  const handleClaim = async () => {
    await authFetch('/controller/packages/request', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(reqBody),
    });
  };

  return (
    <div className='flex h-full w-full items-center justify-end gap-4 p-[31px] pt-0'>
      {/* Cancel */}
      <DialogClose>
        <button
          type='button'
          className='cursor-pointer text-[16px] font-semibold text-black hover:text-gray-900 dark:text-white
            dark:hover:text-gray-100'
        >
          Cancel
        </button>
      </DialogClose>

      {/* Confirm */}
      <button
        type='button'
        disabled={disabled}
        onClick={handleClaim}
        className={`h-[37px] w-[87px] rounded-[10px] text-[16px] font-semibold text-white
          ${disabled ? 'cursor-not-allowed bg-gray-500' : 'cursor-pointer bg-green-700 hover:bg-green-800'}`}
      >
        Confirm
      </button>
    </div>
  );
};
