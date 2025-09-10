// Utilitários para design responsivo
export interface Breakpoint {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

export const breakpoints: Breakpoint = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export type BreakpointKey = keyof Breakpoint;

export const getBreakpointValue = (key: BreakpointKey): number => {
  return breakpoints[key];
};

export const isBreakpoint = (key: BreakpointKey, width: number): boolean => {
  const breakpointValue = getBreakpointValue(key);
  
  switch (key) {
    case 'xs':
      return width >= breakpointValue && width < getBreakpointValue('sm');
    case 'sm':
      return width >= breakpointValue && width < getBreakpointValue('md');
    case 'md':
      return width >= breakpointValue && width < getBreakpointValue('lg');
    case 'lg':
      return width >= breakpointValue && width < getBreakpointValue('xl');
    case 'xl':
      return width >= breakpointValue && width < getBreakpointValue('2xl');
    case '2xl':
      return width >= breakpointValue;
    default:
      return false;
  }
};

export const getCurrentBreakpoint = (width: number): BreakpointKey => {
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

export const isMobile = (width: number): boolean => {
  return width < breakpoints.md;
};

export const isTablet = (width: number): boolean => {
  return width >= breakpoints.md && width < breakpoints.lg;
};

export const isDesktop = (width: number): boolean => {
  return width >= breakpoints.lg;
};

export const isLargeScreen = (width: number): boolean => {
  return width >= breakpoints.xl;
};

export const getResponsiveValue = <T>(
  values: Partial<Record<BreakpointKey, T>>,
  width: number,
  defaultValue: T
): T => {
  const currentBreakpoint = getCurrentBreakpoint(width);
  
  // Tenta encontrar o valor para o breakpoint atual
  if (values[currentBreakpoint] !== undefined) {
    return values[currentBreakpoint] as T;
  }
  
  // Se não encontrar, procura pelo breakpoint menor mais próximo
  const breakpointOrder: BreakpointKey[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
  
  for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
    const breakpoint = breakpointOrder[i];
    if (values[breakpoint] !== undefined) {
      return values[breakpoint] as T;
    }
  }
  
  return defaultValue;
};

export const getResponsiveSpacing = (width: number): string => {
  if (isMobile(width)) return 'p-4';
  if (isTablet(width)) return 'p-6';
  if (isDesktop(width)) return 'p-8';
  return 'p-10';
};

export const getResponsiveGridCols = (width: number): number => {
  if (isMobile(width)) return 1;
  if (isTablet(width)) return 2;
  if (isDesktop(width)) return 3;
  return 4;
};

export const getResponsiveTextSize = (width: number): string => {
  if (isMobile(width)) return 'text-sm';
  if (isTablet(width)) return 'text-base';
  if (isDesktop(width)) return 'text-lg';
  return 'text-xl';
};

export const getResponsiveImageSize = (width: number): { width: number; height: number } => {
  if (isMobile(width)) return { width: 300, height: 200 };
  if (isTablet(width)) return { width: 400, height: 250 };
  if (isDesktop(width)) return { width: 500, height: 300 };
  return { width: 600, height: 400 };
};

export const getResponsiveColumns = (width: number): string => {
  const cols = getResponsiveGridCols(width);
  return `grid-cols-${cols}`;
};

export const getResponsiveGap = (width: number): string => {
  if (isMobile(width)) return 'gap-4';
  if (isTablet(width)) return 'gap-6';
  if (isDesktop(width)) return 'gap-8';
  return 'gap-10';
};
