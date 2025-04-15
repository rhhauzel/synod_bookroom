import { AppSidebar } from "@/components/app-sidebar"
import Footer from "@/components/footer"
import Header from "@/components/shared/header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
      <Header />
      <main className='flex-1 wrapper'>{children}</main>
      <Footer />
    </SidebarInset>
    </SidebarProvider>
  )
}
