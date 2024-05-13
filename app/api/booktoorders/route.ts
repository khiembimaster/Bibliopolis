import prisma from '@/client';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request) {
  const body = await req.json()
  const { bookId, orderId, quantity } = body;
  console.log(req.json);

  const result = await prisma.booksToOrders.create({
    data: {
      bookId: parseInt(bookId),
      orderId: orderId,
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
  const result = await prisma.booksToOrders.findMany()
  return Response.json({ message: 'ok', status: 200, data: result })
}