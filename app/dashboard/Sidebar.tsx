"use client"
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  links: Array<{
    tooltip_content: string; 
    href: string;
    icon: React.ReactNode;
  }>
}

const Sidebar = ({links}:SidebarProps) => {
  const pathname = usePathname()
  return (
    <>
      {links.map(link => 
        {
          const isActive = pathname === link.href;
          return(
              <TooltipProvider key={link.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.href}
                      className={cn( 
                        (isActive && "bg-accent text-accent-foreground") || "text-muted-foreground",
                        "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                      )}
                    >
                        {link.icon}
                      <span className="sr-only">{link.tooltip_content}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{link.tooltip_content}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
          )
        }
      )}
    </>
  )
}

export default Sidebar