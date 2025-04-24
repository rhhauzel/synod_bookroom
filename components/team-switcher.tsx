"use client"

import * as React from "react"

import {
  DropdownMenu,
  
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import  Image  from "next/image"
import { APP_NAME } from "@/lib/constant"

export function TeamSwitcher() {
  

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/* <DropdownMenuTrigger asChild> */}
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Image src="/Images/Logo/VTR.svg" alt={`${APP_NAME} logo`} width={48} height={48} priority={true}/>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">VTR Computers</span>
                <span className="truncate text-xs">Synod Bookroom</span>
              </div>
              {/* <ChevronsUpDown className="ml-auto" /> */}
            </SidebarMenuButton>
          {/* </DropdownMenuTrigger> */}
          {/* <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <team.logo className="size-3.5 shrink-0" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent> */}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
