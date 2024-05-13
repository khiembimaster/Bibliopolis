import prisma from '@/client';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request) {
  const body = await req.json()
  const { title, author, isbn, price, publication_year, description, cover_image, publisher, stock_quantity, rating } = body;
  console.log(req.json);

  const result = await prisma.book.create({
    data: {
      title: title,
      author: author, 
      isbn: isbn,
      publication_year: publication_year,
      price: price,
      description: description,
      cover_image: cover_image,
      publisher: publisher,
      stock_quantity: stock_quantity,
      rating: rating,
      genres: {
        connect: {
          id: 1
        }
      }
    }
  })
  if (!result) return Response.json({
    message: 'error',
    status: 500
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}

export async function GET(req: Request) {
  const result = await prisma.book.findMany()
  return Response.json({ message: 'ok', status: 200, data: result })
}