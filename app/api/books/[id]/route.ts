import prisma from '@/client';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const result = await prisma.book.findFirst({
    where: {
      id: parseInt(params.id)
    }
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const result = await prisma.book.delete({
    where: {
      id: parseInt(params.id)
    }
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const { title, author, isbn, price, publication_year, description, cover_image, publisher, stock_quantity, rating } = body;

  const result = await prisma.book.update({
    where: {
      id: parseInt(params.id)
    },
    data: {
      title: title,
      author: author, 
      isbn: isbn,
      publication_year: publication_year,
      price: price,
      description: description,
      cover_image: cover_image,
      publisher: publisher,
      stock_quantity: stock_quantity,
      rating: rating
    },
  });
  if (!result) return Response.json({
    message: 'error',
    status: 500
  });
  return Response.json({ message: 'ok', status: 200, data: result });
}