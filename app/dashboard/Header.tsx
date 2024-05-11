"use client"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

import React from 'react'
import { Home, LineChart, Package, Package2, PanelLeft, Route, Search, ShoppingCart, Users2 } from "lucide-react"
import Link from "next/link"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Sidebar from "./Sidebar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User } from "@prisma/client"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import { useRouter } from "next/navigation"


interface SidebarProps {
  links: Array<{
    tooltip_content: string; 
    href: string;
    icon: React.ReactNode;
  }>,
  user: {
    email: string;
    image: string | StaticImport;
    role: string;
    name: string
  }
}

const Header = ({links,user}:SidebarProps) => {
  
  const navigateToURL = (url: string) => {
    router.push(url);
  };
  
  const pathname = usePathname()
  const segments = pathname.split('/').slice(1);
  const current_segment = segments.splice(-1).at(0);
  var breadcrumb_link = "";
  const router = useRouter();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {links.map(link => {
              const isActive = pathname === link.href;
              return(
                <Link key={link.tooltip_content}
                  href={link.href}
                  className={cn(
                    isActive && "text-foreground" || "text-muted-foreground hover:text-foreground",
                    "flex items-center gap-4 px-2.5"
                  )}
                  >
                  {link.icon}
                  {link.tooltip_content}
                </Link>                  
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>

      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {
            segments.map(segment => {
            breadcrumb_link += '/'+segment;
            segment = segment.charAt(0).toUpperCase() + segment.substring(1);
            
            return (
              <>
                <BreadcrumbItem key={segment}>
                  <BreadcrumbLink asChild>
                    <Link href={breadcrumb_link}>{segment}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )
          })}
          <BreadcrumbItem>
            <BreadcrumbPage>
                {current_segment ? current_segment.charAt(0).toUpperCase() + current_segment.substring(1) : ''}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            {
              user.image?
            <Image
             src={user.image }
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />:null
            }

          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {
                
                navigateToURL('/api/auth/signout')
          }}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header