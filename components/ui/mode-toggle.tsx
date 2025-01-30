'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';


export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
      variant='outline'
      size='icon'
    >
      {theme === 'light' ? <Sun /> : <Moon />}
    </Button>
  );
}
