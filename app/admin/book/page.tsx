
import { auth } from '@/auth';
import { Role } from '@prisma/client'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {AddbookSheet} from '@/components/ui/addbook-sheet'
import { Input } from '@/components/ui/input'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
const Book = async () => {
    const session = await auth();
    return <main>
        <p>Welcome to book management page</p>
        <AddbookSheet></AddbookSheet>
    </main>



}

export default Book