import React from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function HeaderDropdownMenu() {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                <RxHamburgerMenu className={'w-8 h-8 cursor-pointer'} />
                </DropdownMenuTrigger>
                
                <DropdownMenuContent>
                    <DropdownMenuLabel>All Product</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}
