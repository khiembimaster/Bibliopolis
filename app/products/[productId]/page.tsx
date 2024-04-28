import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ToastAction } from "@/components/ui/toast"

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PiMinus, PiPlus } from 'react-icons/pi';
import { Input } from '@/components/ui/input';

// Dữ liệu giả định cho sản phẩm
const product = {
    id: 1,
    name: 'Product 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    availableQuantity: 10,
    images: [
        { id: 1, url: '/image/image1.jpg', width: 2000, height: 2000 },
        { id: 2, url: '/image/image2.jpg', width: 2000, height: 2000 },
        { id: 3, url: '/image/image3.jpg', width: 2000, height: 2000 }
    ]
};

export default function ProductDetailPage() {

    return (
        <div className='container my-6'>
            <div className='flex gap-6'>
                <div className='flex-shrink-0'>
                    <div className='sticky top-24'>
                        <ProductImageThumbnails product={product} />
                    </div>
                </div>
                <div className='flex-grow flex justify-between gap-6'>
                    <div className='w-1/2 flex-shrink-0'>
                        <ProductImage product={product} />
                    </div>
                    <div className='flex-grow'>
                        <h1 className='my-4 text-center text-4xl'>
                            {product.name}
                        </h1>
                        <div className=' my-8'>
                            {product.description}
                        </div>
                        <div className='flex gap-3 my-8 ml-4'>
                        <form className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity:</label>
                            <input type="number" id="productQuantity" min={1} max={product.availableQuantity} aria-describedby="helper-text-explanation" className= "bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" placeholder="90210" required />
                        </form>
                    </div>
                        <Button size={'lg'} className='w-full text-lg' >
                            Add to cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}


// Component hiển thị danh sách các hình ảnh nhỏ của sản phẩm
const ProductImageThumbnails = ({ product }: { product: any }) => {
    return (
        <div className='flex flex-col gap-2'>
            {product.images.map((image: any) => (
                <Link href={`#${image.id}`} key={image.id}>
                    <div>
                        <Image

                            src={image.url}
                            alt={product.name}
                            width={100}
                            height={100}
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
};

// Component hiển thị hình ảnh chính của sản phẩm
const ProductImage = ({ product }: { product: any }) => {
    return (
        <div className='flex flex-col gap-2'>
            {/* Hiển thị hình ảnh chính của sản phẩm */}
            <Image
                className='w-full'
                src={product.images[0].url}
                alt={product.name}
                width={product.images[0].width}
                height={product.images[0].height}
            />
        </div>
    );
};
