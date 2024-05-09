'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ToastAction } from "@/components/ui/toast"
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PiMinus, PiPlus } from 'react-icons/pi';
import { Input } from '@/components/ui/input';
import { GetByBookDetail, addToCart, createCart, getGenresOfBook, updateItemCart } from '@/app/action';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';


export default function ProductDetailPage() {
    const { data: session, status } = useSession()
    const router = useParams();
    let productId: string = router.productId as unknown as string

    const [product, setProduct] = useState<NonNullable<any>>(null);
    const [book, setGenre] = useState<NonNullable<any>>(null);
    const { toast } = useToast()
    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await GetByBookDetail(parseInt(productId));
            const productWithGenres = { ...fetchedProduct, genres: await getGenresOfBook(parseInt(productId)) };
            setProduct(productWithGenres);
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }
    const handle = async () => {
        console.log(session?.user)
        if (status === "authenticated") {
            const Quantity = document.getElementById('productQuantity') as HTMLInputElement;
            const price = Number(Quantity.value) * product.price;
            //const creatCart = await createCart("clvictuww0001o83h8g7l3ddt",price,parseInt(productId),Number(Quantity.value) );
            // const add = await addToCart(parseInt(productId), creatCart.id, Number(Quantity.value) )
            const updateCart = await updateItemCart(session.user.id, price, 10, parseInt(productId), Number(Quantity.value));
            toast({
                title: "✅ Product added to cart",
            })
        }
        else {
            toast({
                title: "You are not logged in, please log in to your account",
            })
        }
    }
    return (
        <div className='container my-6'>
            <div className='flex gap-6'>

                <div className='flex-grow flex justify-between gap-6'>
                    <div className='w-1/2 flex-shrink-0'>
                        <Image
                            src={product.cover_image}
                            alt={product.title}
                            width={1500}
                            height={5500}
                        />
                    </div>
                    <div className='flex-grow'>
                        <h1 className='my-4 text-center text-4xl'>
                            {product.title}
                        </h1>
                        <div className='flex my-8'>
                            <p className=' font-bold'>Price: </p>
                            <p className='text-4xl ms-4'>${product.price}</p>
                        </div>
                        <div className=' my-8'>
                            {product.description}
                        </div>
                        <div className='flex my-8'>
                            <p className=' font-bold'>Author: </p>
                            <p className=' ms-4'>{product.author}</p>
                            <p className='ms-10 font-bold'>Publisher: </p>
                            <p className=' ms-4'>{product.publisher}</p>
                            <p className='ms-10 font-bold'>Publication year: </p>
                            <p className=' ms-4'>{String(product.publication_year.getFullYear())}</p>
                        </div>

                        <div className='flex my-8'>
                            <p className='font-bold'>Genre: </p>
                            {product.genres && product.genres.map((genre: any, index: number) => (
                                <React.Fragment key={genre.id}>
                                    <p className='ms-4'>{genre.name}</p>
                                    {index !== product.genres.length - 1 && <span>,</span>}
                                </React.Fragment>
                            ))}
                            <p className='ms-10 font-bold'>Inventory: </p>
                            <p className='ms-4'>{product.stock_quantity}</p>
                        </div>

                        <div className='flex gap-3 my-8'>
                            <p className=' font-bold'>Quantity: </p>
                            <form className="">
                                <input type="number" id="productQuantity" min={1} max={product.stock_quantity} aria-describedby="helper-text-explanation" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={1} required />
                            </form>
                        </div>
                        <Button size={'lg'} className='w-full text-lg' onClick={handle}>
                            ➕ Add to cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
const ProductImageThumbnails = ({ product }: { product: any }) => {
    return (
        <div className='flex flex-col gap-2'>
            {product.images && product.images.length > 0 && product.images.map((image: any) => (
                <Link href={`#${image.id}`} key={image.id}>
                    <div>
                        <Image
                            src={image.url}
                            alt={product.title}
                            width={100}
                            height={100}
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
};


const ProductImage = ({ product }: { product: any }) => {
    return (
        <div className='flex flex-col gap-2'>
            {product.images && product.images.length > 0 && (
                <Image
                    className='w-full'
                    src={product.images[0].url}
                    alt={product.title}
                    width={product.images[0].width}
                    height={product.images[0].height}
                />
            )}
        </div>
    );
};
