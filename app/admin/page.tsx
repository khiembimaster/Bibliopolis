'use server'
import { auth } from '@/auth';
import {Role} from '@prisma/client'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const AdminManagerment = async () => {
    const session = await auth();
    return <p>Welcome to admin page</p>;
    
  }
  
  export default AdminManagerment