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
import { CreateBook } from '@/app/actions'
import {AddBookButton} from '@/components/ui/addbook-button'
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
                                <Input id='title'/>
                            </CardDescription>
                        </CardContent>
                        <CardContent>
                            <CardTitle>Author</CardTitle>
                            <CardDescription>
                                <Input id='author' />
                            </CardDescription>
                        </CardContent>
                        <CardContent>
                            <CardTitle>Price</CardTitle>
                            <CardDescription>
                                <Input id='price' />
                            </CardDescription>
                        </CardContent>
                      
                        <CardContent>
                            
                            <CardTitle>Publication-year</CardTitle>
                            <CardDescription>
                                <Input id='date' type="date"/>
                            </CardDescription>
                        </CardContent>
                        <CardContent>
                            <CardTitle>Stock-quantity</CardTitle>
                            <CardDescription>
                                <Input id='quantity'/>
                            </CardDescription>
                        </CardContent>
                        <CardContent>
                            <CardTitle>Publisher</CardTitle>
                            <CardDescription>
                                <Input id='publisher'/>
                            </CardDescription>
                        </CardContent>
                        <CardContent>
                            <CardTitle>Cover-image</CardTitle>
                            <CardDescription>
                                <input id='image' type='file'/>
                            </CardDescription>
                            
                        </CardContent>
                     
                        <CardContent>
                          <Button onClick ={handle}>submit</Button>
                        </CardContent>
                    </Card>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
    </main>
    
   
}

const handle = () => {
  
       const inputTitle = document.getElementById('title') as HTMLInputElement;
       const inputDate= document.getElementById('date') as HTMLInputElement;
       const inputAuthor = document.getElementById('author') as HTMLInputElement;
       const inputPrice = document.getElementById('price') as HTMLInputElement;
       const inputQuantity = document.getElementById('quantity') as HTMLInputElement;
       const inputPublisher = document.getElementById('publisher') as HTMLInputElement;
       const inputImage= document.getElementById('image') as HTMLInputElement;

       CreateBook(inputTitle.value,new Date(inputDate.value),inputAuthor.value,
       Number(inputPrice.value),Number(inputQuantity.value),inputPublisher.value,inputImage.value)
}
export {AddbookSheet};