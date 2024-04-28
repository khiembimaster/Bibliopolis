import prisma from '@/client';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request) {
  const body = await req.json()
  const {userId,  total_price} = body;
  console.log(req.json);

  const result = await prisma.cart.create({
    data: {
      userId: userId,
      total_price:  parseFloat(total_price),
    },
  })
  if (!result) return Response.json({
    message: 'error',
    status: 500
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}

export async function GET(req: Request) {
  const result = await prisma.cart.findMany()
  return Response.json({ message: 'ok', status: 200, data: result })
}