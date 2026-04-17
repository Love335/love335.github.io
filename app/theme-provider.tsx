'use client';

import { createContext, useContext } from 'react';

export type Theme = {
  page: {
    background: string;
    text: string;
  };
  text: {
    heading: string;
    subheading: string;
    body: string;
    sectionTitle: string;
  };
  surfaces: {
    card: string;
  };
  collaborators: {
    title: string;
    name: string;
    border: string;
    borderHover: string;
  };
  skills: {
    container: string;
    headerText: string;
    rowHover: string;
    categoryText: string;
    itemsText: string;
    border: string;
    divider: string;
  };
};

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({
  theme,
  children,
}: {
  theme: Theme;
  children: React.ReactNode;
}) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useTheme must be used within ThemeProvider');
  return theme;
}