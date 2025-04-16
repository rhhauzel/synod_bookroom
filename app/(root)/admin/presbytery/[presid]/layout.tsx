import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pastor Bial',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
