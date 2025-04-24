import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pay Scale',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
