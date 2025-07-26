import { useTheme } from 'next-themes';

import { Tooltip, TooltipProps } from '@mui/material';

export function TooltipTokenId(props: TooltipProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <Tooltip
      {...props}
      key={theme} // force re-render when theme changes
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: isLight ? '#003B00' : '#99D395',
            maxWidth: 194,
          },
        },
        arrow: {
          sx: {
            color: isLight ? '#003B00' : '#99D395',
          },
        },
      }}
    />
  );
}
