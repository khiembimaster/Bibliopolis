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
import {InputFile} from '@/components/ui/input-file'
const AddbookSheet = () => {
    return  <main>
         <Sheet>
     
            <SheetTrigger className='border p-2 bg-black text-white rounded-full'>
                Add a book
            </SheetTrigger>
    

        <SheetContent>
            <SheetHeader>
                <SheetTitle>Fill all information about new book</SheetTitle>
                <SheetDescription>
                    <Card>
                        <CardContent>
                            <CardTitle>Title</CardTitle>
                            <CardDescription>
                                <Input />
                            </CardDescription>
                        </CardContent>
                        <CardContent>
                            <CardTitle>Author</CardTitle>
                            <CardDescription>
                                <Input />
                            </CardDescription>
                        </CardContent>
                        <CardContent>
                            <CardTitle>Price</CardTitle>
                            <CardDescription>
                                <Input />
                            </CardDescription>
                        </CardContent>
                        <CardContent>
                            <CardTitle>Publication-year</CardTitle>
                            <CardDescription>
                                <Input type="date"/>
                            </CardDescription>
                        </CardContent>
                        <CardContent>
                            <CardTitle>Stock-quantity</CardTitle>
                            <CardDescription>
                                <Input />
                            </CardDescription>
                        </CardContent>
                        <CardContent>
                            <CardTitle>Publisher</CardTitle>
                            <CardDescription>
                                <Input />
                            </CardDescription>
                        </CardContent>
                        <CardContent>
                            <CardTitle>Cover-image</CardTitle>
                            <CardDescription>
                                <InputFile/>
                            </CardDescription>
                            
                        </CardContent>
                        
                        <CardContent>
                            <Button>Submit</Button>
                        </CardContent>
                    </Card>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
    </main>
    
   
}

export {AddbookSheet};