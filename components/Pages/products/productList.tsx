import React from 'react';
import Image from 'next/image'; // Import Image component from next/image
import Link from 'next/link'; 

export default function ProductList() {
  const products = [
    { id: 1, name: 'Product 1', price: 10, imageUrl: '/image/image1.jpg' },
    { id: 2, name: 'Product 2', price: 20, imageUrl: '/image/image2.jpg' },
    { id: 3, name: 'Product 3', price: 30, imageUrl: '/image/image3.jpg' },
    { id: 1, name: 'Product 1', price: 10, imageUrl: '/image/image1.jpg' },
    { id: 2, name: 'Product 2', price: 20, imageUrl: '/image/image2.jpg' },
    { id: 3, name: 'Product 3', price: 30, imageUrl: '/image/image3.jpg' },
    { id: 1, name: 'Product 1', price: 10, imageUrl: '/image/image1.jpg' },
    { id: 2, name: 'Product 2', price: 20, imageUrl: '/image/image2.jpg' },
    { id: 3, name: 'Product 3', price: 30, imageUrl: '/image/image3.jpg' },
  ];
  return (
    <div className='grid grid-cols-4 gap-5 mt-10'>
      {products.map(product => (
        <div key={product.id} className="border rounded p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
          <Link href={`/products/${product.id}`}>
            <div>
              <Image src={product.imageUrl} alt={product.name} width={300} height={200} className="w-full h-48 object-cover mb-4" />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
