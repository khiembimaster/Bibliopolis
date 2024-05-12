import React, {ReactNode} from 'react'
import Sidebar from './Sidebar';
import Header from './Header';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { Home, LibraryBig, Package2, Settings, ShoppingCart, UserRound } from 'lucide-react';
import { auth } from '@/auth';
import { Role } from '@prisma/client';

const top_sections = [
  { tooltip_content: 'Dashboard', href: '/dashboard', icon: <Home className="h-5 w-5" />},
  { tooltip_content: 'Orders', href: '/dashboard/order', icon: <ShoppingCart className="h-5 w-5" />},
  { tooltip_content: 'Books', href: '/dashboard/book', icon: <LibraryBig className="h-5 w-5" />},
  { tooltip_content: 'Customers', href: '/dashboard/customer', icon: <UserRound className="h-5 w-5" />},
]

const bottom_section = [
  { tooltip_content: 'Settings', href: '/dashboard/setting', icon: <Settings className="h-5 w-5" />},
]

const DashboardLayout = async ({children}: Props) => {
  const session = await auth()
  const user = session?.user;
  if (!session || session?.user.role ===  Role.USER)
    return <div>You are not permitted to view this page! Please choose another account.</div>

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Sidebar links={top_sections}/>
        </nav>
        <div className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Sidebar links={bottom_section}/>
        </div>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header links={top_sections} user={user}/>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout