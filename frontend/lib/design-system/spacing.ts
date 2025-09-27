// Sistema de espaçamento avançado da Fênix Academy
export const spacing = {
  // Espaçamentos base (em rem)
  base: {
    0: '0',
    0.5: '0.125rem',  // 2px
    1: '0.25rem',     // 4px
    1.5: '0.375rem',  // 6px
    2: '0.5rem',      // 8px
    2.5: '0.625rem',  // 10px
    3: '0.75rem',     // 12px
    3.5: '0.875rem',  // 14px
    4: '1rem',        // 16px
    5: '1.25rem',     // 20px
    6: '1.5rem',      // 24px
    7: '1.75rem',     // 28px
    8: '2rem',        // 32px
    9: '2.25rem',     // 36px
    10: '2.5rem',     // 40px
    11: '2.75rem',    // 44px
    12: '3rem',       // 48px
    14: '3.5rem',     // 56px
    16: '4rem',       // 64px
    20: '5rem',       // 80px
    24: '6rem',       // 96px
    28: '7rem',       // 112px
    32: '8rem',       // 128px
    36: '9rem',       // 144px
    40: '10rem',      // 160px
    44: '11rem',      // 176px
    48: '12rem',      // 192px
    52: '13rem',      // 208px
    56: '14rem',      // 224px
    60: '15rem',      // 240px
    64: '16rem',      // 256px
    72: '18rem',      // 288px
    80: '20rem',      // 320px
    96: '24rem',      // 384px
  } as Record<number, string>,

  // Espaçamentos em pixels
  pixel: {
    0: '0px',
    1: '1px',
    2: '2px',
    3: '3px',
    4: '4px',
    5: '5px',
    6: '6px',
    8: '8px',
    10: '10px',
    12: '12px',
    14: '14px',
    16: '16px',
    18: '18px',
    20: '20px',
    24: '24px',
    28: '28px',
    32: '32px',
    36: '36px',
    40: '40px',
    44: '44px',
    48: '48px',
    52: '52px',
    56: '56px',
    60: '60px',
    64: '64px',
    72: '72px',
    80: '80px',
    96: '96px',
    112: '112px',
    128: '128px',
    144: '144px',
    160: '160px',
    176: '176px',
    192: '192px',
    208: '208px',
    224: '224px',
    240: '240px',
    256: '256px',
    288: '288px',
    320: '320px',
    384: '384px',
    448: '448px',
    512: '512px'} as Record<number, string>,

  // Espaçamentos semânticos
  semantic: {
    // Espaçamentos de componente
    component: {
      xs: '0.5rem',    // 8px
      sm: '0.75rem',   // 12px
      md: '1rem',      // 16px
      lg: '1.5rem',    // 24px
      xl: '2rem',      // 32px
      '2xl': '3rem',   // 48px
    },

    // Espaçamentos de seção
    section: {
      xs: '2rem',      // 32px
      sm: '3rem',      // 48px
      md: '4rem',      // 64px
      lg: '6rem',      // 96px
      xl: '8rem',      // 128px
      '2xl': '12rem',  // 192px
    },

    // Espaçamentos de página
    page: {
      xs: '1rem',      // 16px
      sm: '1.5rem',    // 24px
      md: '2rem',      // 32px
      lg: '3rem',      // 48px
      xl: '4rem',      // 64px
      '2xl': '6rem',   // 96px
    } as Record<string, any>,

    // Espaçamentos de grid
    grid: {
      xs: '0.5rem',    // 8px
      sm: '1rem',      // 16px
      md: '1.5rem',    // 24px
      lg: '2rem',      // 32px
      xl: '3rem',      // 48px
    } as Record<string, any>
  },

  // Espaçamentos responsivos
  responsive: {
    // Mobile first
    mobile: {
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'},

    // Tablet
    tablet: {
      xs: '0.75rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem'},

    // Desktop
    desktop: {
      xs: '1rem',
      sm: '1.5rem',
      md: '2rem',
      lg: '3rem',
      xl: '4rem'} as Record<string, any>
  },

  // Large desktop
  large: {
    xs: '1.5rem',
    sm: '2rem',
    md: '3rem',
    lg: '4rem',
    xl: '6rem'} as Record<string, any>
} as const

// Função para gerar espaçamentos dinâmicos
export function generateSpacing(
  base: keyof typeof spacing.base,
  multiplier: number = 1
): string {
  const baseValue = parseFloat(spacing.base[base])
  return `${baseValue * multiplier}rem`
}

// Função para espaçamento responsivo
export function responsiveSpacing(
  mobile: keyof typeof spacing.base,
  tablet: keyof typeof spacing.base,
  desktop: keyof typeof spacing.base
): Record<string, any> {
  return {
    [spacing.base[mobile] as string]: spacing.base[mobile] as string,
    [`@media (min-width: 768px)`]: {
      [spacing.base[tablet] as string]: spacing.base[tablet] as string},
    [`@media (min-width: 1024px)`]: {
      [spacing.base[desktop] as string]: spacing.base[desktop] as string}}
}

// Função para espaçamento condicional
export function conditionalSpacing(
  condition: boolean,
  trueSpacing: keyof typeof spacing.base,
  falseSpacing: keyof typeof spacing.base
): string {
  return condition ? spacing.base[trueSpacing] : spacing.base[falseSpacing]
}

// Função para espaçamento em grid
export function gridSpacing(
  columns: number,
  gap: keyof typeof spacing.base = 4
): Record<string, string> {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: spacing.base[gap]}
}

// Função para espaçamento flexível
export function flexibleSpacing(
  direction: 'row' | 'column' = 'row',
  gap: keyof typeof spacing.base = 4,
  wrap: boolean = false
): Record<string, string> {
  return {
    display: 'flex',
    flexDirection: direction,
    gap: spacing.base[gap],
    flexWrap: wrap ? 'wrap' : 'nowrap'}
}

// Função para espaçamento de container
export function containerSpacing(
  maxWidth: string = '1200px',
  padding: keyof typeof spacing.base = 4
): Record<string, string> {
  return {
    maxWidth,
    margin: '0 auto',
    paddingLeft: spacing.base[padding],
    paddingRight: spacing.base[padding]}
}

// Função para espaçamento de seção
export function sectionSpacing(
  paddingY: keyof typeof spacing.base = 16,
  paddingX: keyof typeof spacing.base = 4
): Record<string, string> {
  return {
    paddingTop: spacing.base[paddingY],
    paddingBottom: spacing.base[paddingY],
    paddingLeft: spacing.base[paddingX],
    paddingRight: spacing.base[paddingX]}
}

// Função para espaçamento de card
export function cardSpacing(
  padding: keyof typeof spacing.base = 6,
  gap: keyof typeof spacing.base = 4
): Record<string, string> {
  return {
    padding: spacing.base[padding],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.base[gap]}
}

// Função para espaçamento de botão
export function buttonSpacing(
  paddingY: keyof typeof spacing.base = 3,
  paddingX: keyof typeof spacing.base = 6,
  gap: keyof typeof spacing.base = 2
): Record<string, string> {
  return {
    paddingTop: spacing.base[paddingY],
    paddingBottom: spacing.base[paddingY],
    paddingLeft: spacing.base[paddingX],
    paddingRight: spacing.base[paddingX],
    display: 'flex',
    alignItems: 'center',
    gap: spacing.base[gap]}
}

// Função para espaçamento de input
export function inputSpacing(
  paddingY: keyof typeof spacing.base = 3,
  paddingX: keyof typeof spacing.base = 4
): Record<string, string> {
  return {
    paddingTop: spacing.base[paddingY],
    paddingBottom: spacing.base[paddingY],
    paddingLeft: spacing.base[paddingX],
    paddingRight: spacing.base[paddingX]}
}

// Função para espaçamento de lista
export function listSpacing(
  gap: keyof typeof spacing.base = 2,
  padding: keyof typeof spacing.base = 0
): Record<string, string> {
  return {
    listStyle: 'none',
    padding: spacing.base[padding],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.base[gap]}
}

// Função para espaçamento de modal
export function modalSpacing(
  padding: keyof typeof spacing.base = 6,
  gap: keyof typeof spacing.base = 4
): Record<string, string> {
  return {
    padding: spacing.base[padding],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.base[gap],
    maxHeight: '90vh',
    overflowY: 'auto'}
}

// Função para espaçamento de tabela
export function tableSpacing(
  cellPadding: keyof typeof spacing.base = 3,
  gap: keyof typeof spacing.base = 0
): Record<string, any> {
  return {
    width: '100%',
    borderCollapse: 'collapse',
    '& td, & th': {
      padding: spacing.base[cellPadding]}}
}

