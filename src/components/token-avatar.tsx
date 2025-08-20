import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib';

interface TokenAvatarProps {
  colors: string;
  assetName: string;
}

const TokenAvatar = ({ colors, assetName }: TokenAvatarProps) => {
  return (
    <Avatar
      className={cn(
        `flex h-[21px] w-[21px] items-center justify-center rounded-full text-[13px] leading-none font-bold text-white
        dark:text-black`,
        colors,
      )}
    >
      {assetName.charAt(0).toUpperCase()}
    </Avatar>
  );
};

export default TokenAvatar;
