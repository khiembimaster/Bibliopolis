
import { auth } from '@/auth';
import {Role} from '@prisma/client'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const User = async () => {
    const session = await auth();
    return <p>Welcome to user management page</p>;
    
  }
  
  export default User