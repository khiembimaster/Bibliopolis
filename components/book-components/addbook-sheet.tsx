'use server'
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CreateBook } from '@/app/actions'
import { GetAllGenre } from '@/app/actions'
import { GenreItem } from './genre-item'
import { Genre } from '@prisma/client'
import React, { useEffect, useState } from 'react';
import { AddbookButton } from './addbook-button'
import { ScrollArea } from "@/components/ui/scroll-area"


const AddbookSheet = async () => {

    let genres = await GetAllGenre();


    return <main>
        <Sheet>
            <SheetTrigger className='border p-2 bg-black text-white rounded-full'>
                Add a book
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Fill all information about new book</SheetTitle>
                  
                    <SheetDescription>
                    <ScrollArea className="h-[600px] w-full">
                        <Card>
                            <CardContent>
                                <CardTitle className="text-base">Title</CardTitle>
                                <CardDescription>
                                    <Input id='title' />
                                </CardDescription>
                            </CardContent>
                            <CardContent>
                                <CardTitle className="text-base">Author</CardTitle>
                                <CardDescription>
                                    <Input id='author' />
                                </CardDescription>
                            </CardContent>
                            <CardContent>
                                <CardTitle className="text-base">Price</CardTitle>
                                <CardDescription>
                                    <Input id='price' />
                                </CardDescription>
                            </CardContent>
                            <CardContent>
                            <CardTitle className="text-base">Genre</CardTitle>
                                <div className="combobox">
                                    <select id="genreCombobox">
                                   
                                        {genres.map((genre) => (
                                            
                                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                                        
                                        ))}
                                    </select>
                                </div>


                            </CardContent>



                            <CardContent>

                                <CardTitle className="text-base">Publication-year</CardTitle>
                                <CardDescription>
                                    <Input id='date' type="date" />
                                </CardDescription>
                            </CardContent>
                            <CardContent>
                                <CardTitle className="text-base">Stock-quantity</CardTitle>
                                <CardDescription>
                                    <Input id='quantity' />
                                </CardDescription>
                            </CardContent>
                            <CardContent>
                                <CardTitle className="text-base">Publisher</CardTitle>
                                <CardDescription>
                                    <Input id='publisher' />
                                </CardDescription>
                            </CardContent>
                            <CardContent>
                                <CardTitle className="text-base">Cover-image</CardTitle>
                                <CardDescription>
                                    <input id='image' type='file' />
                                </CardDescription>

                            </CardContent>

                            <CardContent>
                                <AddbookButton></AddbookButton>
                            </CardContent>
                        </Card>
                        </ScrollArea>
                    </SheetDescription>
                
                </SheetHeader>
            </SheetContent>
        </Sheet>
    </main >
}


export { AddbookSheet };