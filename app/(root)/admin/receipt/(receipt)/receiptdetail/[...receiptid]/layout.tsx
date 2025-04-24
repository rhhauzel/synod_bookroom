import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detail Head',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
