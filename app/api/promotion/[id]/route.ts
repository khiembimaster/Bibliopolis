import prisma from '@/client';


export async function GET(req: Request, { params }: { params: { id: string } }) {
  const result = await prisma.promotion.findFirst({
    where: {
      id: parseInt(params.id)
    }
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const result = await prisma.promotion.delete({
    where: {
      id: parseInt(params.id)
    }
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { description, discount_rate, start_date, end_date } = body;

  const result = await prisma.promotion.update({
    where: {
      id: parseInt(params.id)
    },
    data: {
      description: description,
      discount_rate: discount_rate,
      start_date: start_date,
      end_date: end_date
    },
  });
  if (!result) return Response.json({
    message: 'error',
    status: 500
  });
  return Response.json({ message: 'ok', status: 200, data: result });
}