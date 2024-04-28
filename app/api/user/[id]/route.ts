import prisma from '@/client';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const userId = params.id
    const result = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })
    return Response.json({ message: 'ok', status: 200, data: result })
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const userId = params.id
    const result = await prisma.user.delete({
        where: {
            id: userId
        }
    })
    return Response.json({ message: 'ok', status: 200, data: result })
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();
    const { name, username, email, emailVerified, image, role } = body;
  
    const result = await prisma.user.update({
      where: {
        id: params.id
      },
      data: {
        name: name,
        username: username,
        email: email,
        image: image,
        role: role,
        emailVerified: emailVerified
      },
    });
    if (!result) return Response.json({
      message: 'error',
      status: 500
    });
    return Response.json({ message: 'ok', status: 200, data: result });
  }