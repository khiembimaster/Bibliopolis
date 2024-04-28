import prisma from '@/client';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request) {
  const body = await req.json()
  const {userId,  order_date, total_price, shipping_address, billing_adddresss, status  } = body;
  console.log(req.json);

  const result = await prisma.order.create({
    data: {
      userId: userId,
      order_date: order_date,
      total_price:  parseFloat(total_price),
      shipping_address: shipping_address,
      billing_address: billing_adddresss, 
      status: status
    },
  })
  if (!result) return Response.json({
    message: 'error',
    status: 500
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}

export async function GET(req: Request) {
  const result = await prisma.order.findMany()
  return Response.json({ message: 'ok', status: 200, data: result })
}