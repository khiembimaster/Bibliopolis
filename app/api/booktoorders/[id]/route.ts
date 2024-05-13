import prisma from '@/client';

export async function GET(req: Request, { params }: { params: { bookId: string, orderId: string } }) {
  const result = await prisma.booksToOrders.findFirst({
    where: {
      bookId: parseInt(params.bookId),
      orderId: params.orderId
    }
  });
  return Response.json({ message: 'ok', status: 200, data: result });
}

export async function DELETE(req: Request, { params }: { params: { bookId: string, orderId: string } }) {
  const result = await prisma.booksToOrders.delete({
    where: {
      bookId_orderId: {
        bookId: parseInt(params.bookId),
        orderId: params.orderId
      }
    }
  });
  return Response.json({ message: 'ok', status: 200, data: result });
}

export async function PUT(req: Request, { params }: { params: { bookId: string, orderId: string } }) {
  const body = await req.json();
  const { quantity } = body;

  const result = await prisma.booksToOrders.update({
    where: {
      bookId_orderId: {
        bookId: parseInt(params.bookId),
        orderId: params.orderId
      }
    },
    data: {
      quantity: quantity
    }
  });
  if (!result) return Response.json({
    message: 'error',
    status: 500
  });
  return Response.json({ message: 'ok', status: 200, data: result });
}
