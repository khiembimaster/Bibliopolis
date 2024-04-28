import prisma from '@/client';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const result = await prisma.order.findFirst({
    where: {
      id: params.id
    }
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const result = await prisma.order.delete({
    where: {
      id: params.id
    }
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const { userId, order_date, total_price, shipping_address, billing_adddresss, status } = body;

  const result = await prisma.order.update({
    where: {
      id: params.id
    },
    data: {
      userId: userId,
      order_date: order_date,
      total_price: parseFloat(total_price),
      shipping_address: shipping_address,
      billing_address: billing_adddresss,
      status: status
    },
  });
  if (!result) return Response.json({
    message: 'error',
    status: 500
  });
  return Response.json({ message: 'ok', status: 200, data: result });
}