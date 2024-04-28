import prisma from '@/client';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request) {
  const body = await req.json()
  const { bookId, cartId, quantity } = body;
  console.log(req.json);

  const result = await prisma.booksToCarts.create({
    data: {
      bookId: parseInt(bookId),
      cartId: parseInt(cartId),
      quantity: quantity
    },
  })
  if (!result) return Response.json({
    message: 'error',
    status: 500
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}

export async function GET(req: Request) {
  const result = await prisma.booksToCarts.findMany()
  return Response.json({ message: 'ok', status: 200, data: result })
}