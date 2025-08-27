interface ClaimModalButtonsProps {
  disabled: boolean;
  recaptchaToken: string | null;
  onCancel?: () => void;
  onConfirm?: (token: string | null) => void;
}

export const ClaimModalButtons = ({ disabled, recaptchaToken, onCancel, onConfirm }: ClaimModalButtonsProps) => {
  return (
    <div className='flex h-full w-full items-center justify-end gap-4 p-[31px] pt-0'>
      {/* Cancel */}
      <button
        type='button'
        onClick={onCancel}
        className='cursor-pointer text-[16px] font-semibold text-black hover:text-gray-900 dark:text-white
          dark:hover:text-gray-100'
      >
        Cancel
      </button>

      {/* Confirm */}
      <button
        type='button'
        disabled={disabled}
        onClick={() => onConfirm?.(recaptchaToken)}
        className={`h-[37px] w-[87px] rounded-[10px] text-[16px] font-semibold text-white
          ${disabled ? 'cursor-not-allowed bg-gray-500' : 'cursor-pointer bg-green-700 hover:bg-green-800'}`}
      >
        Confirm
      </button>
    </div>
  );
};
