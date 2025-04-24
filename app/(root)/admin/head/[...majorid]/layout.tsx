import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sub Head',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
