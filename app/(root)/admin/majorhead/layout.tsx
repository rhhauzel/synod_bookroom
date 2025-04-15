import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Major Head',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
