import prisma from '@/client';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request) {
  const body = await req.json()
  const { bookId, userId, rating, content, date_posted } = body;
  console.log(req.json);

  const result = await prisma.review.create({
    data: {
      bookId: bookId,
      userId: userId,
      rating: rating,
      content: content,
      date_posted: date_posted
    },
  })
  if (!result) return Response.json({
    message: 'error',
    status: 500
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}

export async function GET(req: Request) {
  const result = await prisma.review.findMany()
  return Response.json({ message: 'ok', status: 200, data: result })
}