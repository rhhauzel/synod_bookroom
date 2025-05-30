import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '@/assets/styles/globals.css'
import { APP_DESCRIPTION, APP_NAME, APP_URL } from '@/lib/constant'
import { ThemeProvider } from '@/components/theme-provider'

const geistRoboto = Roboto({
  weight: ['300', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `${APP_NAME}`,
  },
  description: `${APP_DESCRIPTION}`,
  metadataBase: new URL(`${APP_URL}`),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistRoboto.className}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
