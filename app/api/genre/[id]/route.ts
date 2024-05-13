import prisma from '@/client';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const result = await prisma.genre.findFirst({
    where: {
      id: parseInt(params.id)
    }
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const result = await prisma.genre.delete({
    where: {
      id: parseInt(params.id)
    }
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const { name, description } = body;

  const result = await prisma.genre.update({
    where: {
      id: parseInt(params.id)
    },
    data: {
      name: name,
      description: description
    },
  });
  if (!result) return Response.json({
    message: 'error',
    status: 500
  });
  return Response.json({ message: 'ok', status: 200, data: result });
}