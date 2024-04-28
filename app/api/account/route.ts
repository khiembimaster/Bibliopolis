import prisma from '@/client';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request) {
  const body = await req.json()
  const { name, username, email, emailVerified, image, role } = body;
  console.log(req.json);

  const result = await prisma.user.create({
    data: {
      name: name,
            username: username,
            email: email,
            image: image,
            role: role,
            emailVerified: emailVerified
    },
  })
  if (!result) return Response.json({
    message: 'error',
    status: 500
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}

export async function GET(req: Request) {
  const result = await prisma.user.findMany()
  return Response.json({ message: 'ok', status: 200, data: result })
}