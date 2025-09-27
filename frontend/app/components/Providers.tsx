'use client'

import { ReactNode } from 'react'
import { AuthProvider } from '@/lib/auth/auth-context'
import ClientOnly from '@/components/ClientOnly'

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ClientOnly>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ClientOnly>
  )
}