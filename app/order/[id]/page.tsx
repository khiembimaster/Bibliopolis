'use client'
import { useParams } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
export default function page() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useParams();
    let productId: string = router.id as unknown as string
    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <Image src={"/image/done.png"} alt={'done'} width={100} height={100} />
            <p className="mt-3">Order successfully</p>
            <p>{productId}</p>
        </div>
    )
}
