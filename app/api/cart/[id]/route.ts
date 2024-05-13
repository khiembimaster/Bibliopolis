import prisma from '@/client';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const result = await prisma.cart.findFirst({
    where: {
      id: parseInt(params.id)
    }
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const result = await prisma.cart.delete({
    where: {
      id: parseInt(params.id)
    }
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const { userId,total_price} = body;

  const result = await prisma.order.update({
    where: {
      id: params.id
    },
    data: {
      userId: userId,
      total_price: parseFloat(total_price)
    },
  });
  if (!result) return Response.json({
    message: 'error',
    status: 500
  });
  return Response.json({ message: 'ok', status: 200, data: result });
}