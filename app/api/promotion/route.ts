import prisma from '@/client';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request) {
  const body = await req.json()
  const { description, discount_rate, start_date, end_date } = body;
  console.log(req.json);

  const result = await prisma.promotion.create({
    data: {
      description: description,
      discount_rate: discount_rate,
      start_date: start_date,
      end_date: end_date
    },
  })
  if (!result) return Response.json({
    message: 'error',
    status: 500
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}

export async function GET(req: Request) {
  const result = await prisma.promotion.findMany()
  return Response.json({ message: 'ok', status: 200, data: result })
}