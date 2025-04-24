"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
//import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    }
  ],
  navMain: [
    
    {
      title: "Master",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          key: 1,
          title: "Head",
          url: "/admin/head",
        },
        {
          key: 2,
          title:"-",
          url:"#",
        },
        {
          key: 3,
          title: "Receipt",
          url: "/admin/receipt",
        },
        {
          key: 4,
          title:"-",
          url:"#",
        },
        {
          key: 5,
          title: "Presbytery",
          url: "/admin/presbytery",
        },
        {
          key: 42,
          title:"-",
          url:"#",
        },
        {
          key: 52,
          title: "Designation",
          url: "/admin/designation",
        },
        {
          key: 41,
          title:"-",
          url:"#",
        },
        {
          key: 51,
          title: "Employee",
          url: "/admin/employee",
        }
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          key: 5,
          title: "Genesis",
          url: "#",
        },
        {
          key: 6,
          title: "Explorer",
          url: "#",
        },
        {
          key: 7,
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          key: 8,
          title: "Introduction",
          url: "#",
        },
        {
          key: 9,
          title: "Get Started",
          url: "#",
        },
        {
          key: 10,
          title: "Tutorials",
          url: "#",
        },
        {
          key: 11,
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          key: 12,
          title: "General",
          url: "#",
        },
        {
          key: 13,
          title: "Team",
          url: "#",
        },
        {
          key: 14,
          title: "Billing",
          url: "#",
        },
        {
          key: 15,
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
