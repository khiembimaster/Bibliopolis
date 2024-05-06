
import { auth } from '@/auth';
import {Role} from '@prisma/client'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const Order = async () => {
    const session = await auth();
    return <p>Welcome to order management page</p>;
    
  }
  
  export default Order