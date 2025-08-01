'use client';

import { useTheme } from 'next-themes';

import { Box, Avatar } from '@mui/material';

import { getAssetColors } from '@/lib/select-color';
import { Asset } from '@/types';

interface AvatarsProps {
  assets: Asset[];
}

const Avatars = ({ assets }: AvatarsProps) => {
  const { theme } = useTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {assets.slice(0, 4).map((asset, index) => (
        <Avatar
          key={index}
          sx={{
            bgcolor: theme === 'light' ? getAssetColors(asset.name)[0] : getAssetColors(asset.name)[1],
            color: 'white',
            height: '32px',
            width: '32px',
            fontSize: '14px',
            zIndex: index + 1, // Higher index = on top
            marginLeft: index !== 0 ? '-10px' : '0px',
            border: '2px solid #fff',
          }}
        >
          {asset.name.charAt(0).toUpperCase()}
        </Avatar>
      ))}
      {assets.length > 5 && (
        <Avatar
          sx={{
            bgcolor: '#fff',
            color: '#808080',
            height: '32px',
            width: '32px',
            fontSize: '12px',
            fontWeight: '800',
            zIndex: 999, // Highest z-index so it's always on top
            marginLeft: '-10px',
          }}
        >
          {`+${assets.length - 4}`}
        </Avatar>
      )}
    </Box>
  );
};

export default Avatars;
