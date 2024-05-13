import prisma from '@/client';

export async function GET(req: Request, { params }: { params: { bookId: string, cartId: string } }) {
  const result = await prisma.booksToCarts.findFirst({
    where: {
      bookId: parseInt(params.bookId),
      cartId: parseInt(params.cartId)
    }
  });
  return Response.json({ message: 'ok', status: 200, data: result });
}

export async function DELETE(req: Request, { params }: { params: { bookId: string, cartId: string } }) {
  const result = await prisma.booksToCarts.delete({
    where: {
      bookId_cartId: {
        bookId: parseInt(params.bookId),
        cartId: parseInt(params.cartId)
      }
    }
  });
  return Response.json({ message: 'ok', status: 200, data: result });
}

export async function PUT(req: Request, { params }: { params: { bookId: string, cartId: string } }) {
  const body = await req.json();
  const { quantity } = body;

  const result = await prisma.booksToCarts.update({
    where: {
      bookId_cartId: {
        bookId: parseInt(params.bookId),
        cartId: parseInt(params.cartId)
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
