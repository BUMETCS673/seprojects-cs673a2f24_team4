import * as React from 'react';
import { useColorScheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectProps } from '@mui/material/Select';

export default function ColorModeSelect(props: SelectProps) {
  const colorScheme = useColorScheme();
  if (!colorScheme || !colorScheme.mode) {
    return null;
  }
  const { mode, setMode } = colorScheme;

  return (
    <Select
      value={mode}
      onChange={(event) =>
        setMode(event.target.value as 'system' | 'light' | 'dark')
      }
      // Explicitly cast 'data-screenshot' to bypass TypeScript's strict typing
      SelectDisplayProps={
        {
          'data-screenshot': 'toggle-mode',
        } as React.HTMLAttributes<HTMLDivElement>
      }
      {...props}
    >
      <MenuItem value="system">System</MenuItem>
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}
