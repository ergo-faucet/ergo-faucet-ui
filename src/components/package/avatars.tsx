'use client';

import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib';
import { getAssetColors } from '@/lib/select-color';
import { Asset } from '@/types';

interface AvatarsProps {
  className?: string;
  assets: Asset[];
}

const Avatars = ({ assets, className }: AvatarsProps) => {
  return (
    <div className={cn('flex items-center', className)}>
      {assets.slice(0, 4).map((asset, index) => (
        <Avatar
          key={index}
          className={`${getAssetColors(asset.name)} -ml-2.5 flex h-8 w-8 items-center justify-center border-2
          border-white text-[14px] text-white first:ml-0`}
          style={{ zIndex: index + 1 }}
        >
          {asset.name.charAt(0).toUpperCase()}
        </Avatar>
      ))}
      {assets.length > 5 && (
        <Avatar
          className='-ml-2 flex h-8 w-8 items-center justify-center border-2 border-white bg-white text-[12px]
            font-extrabold text-gray-500'
          style={{ zIndex: 999 }}
        >
          {`+${assets.length - 4}`}
        </Avatar>
      )}
    </div>
  );
};

export default Avatars;
