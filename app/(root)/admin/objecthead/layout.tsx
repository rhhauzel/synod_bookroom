import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Object Head',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
