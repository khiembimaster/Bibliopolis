'use client'
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
import { CreateGenre } from '@/app/actions'
import { Textarea } from '../ui/textarea'
const AddgenreSheet = () => {
    return <main>
        <Sheet>
            <SheetTrigger className='border p-2 bg-black text-white rounded-full hover:bg-white hover:text-black '>
                Add a genre
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Fill all information about new genre</SheetTitle>
                    <SheetDescription>
                        <Card>
                            <CardContent>
                                <CardTitle>Name</CardTitle>
                                <CardDescription>
                                    <Input id='genreName' />
                                </CardDescription>
                            </CardContent>
                            <CardContent>
                                <CardTitle>Description</CardTitle>
                                <CardDescription>
                                    <Textarea id='genreDescription' />
                                </CardDescription>
                            </CardContent>
                           

                            <CardContent>
                                <Button onClick={handle}>submit</Button>
                            </CardContent>
                        </Card>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    </main>


}

const handle = () => {
    const inputName = document.getElementById('genreName') as HTMLInputElement;
    const inputDescription = document.getElementById('genreDescription') as HTMLInputElement;
   CreateGenre(inputName.value,inputDescription.value);
}
export { AddgenreSheet };