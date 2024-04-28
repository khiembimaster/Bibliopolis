import prisma from '@/client';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const result = await prisma.review.findFirst({
    where: {
      id: parseInt(params.id)
    }
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const result = await prisma.review.delete({
    where: {
      id: parseInt(params.id)
    }
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { bookId, userId, rating, content, date_posted } = body;

  const result = await prisma.review.update({
    where: {
      id: parseInt(params.id)
    },
    data: {
      bookId: bookId,
      userId: userId,
      rating: rating,
      content: content,
      date_posted: date_posted
    },
  });
  if (!result) return Response.json({
    message: 'error',
    status: 500
  });
  return Response.json({ message: 'ok', status: 200, data: result });
}