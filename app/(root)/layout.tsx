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
      <main className='flex-1 wrapper p-4 pt-0'>
      <div className="bg-muted/50 aspect-video rounded-xl p-5">{children}</div></main>
      <Footer />
    </SidebarInset>
    </SidebarProvider>
  )
}
