import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Role } from "@prisma/client"
import prisma from "./client"

export const { handlers, auth, signIn, signOut} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    })
  ],
  session: {
    strategy: 'jwt' 
  },
  callbacks: {
    async jwt({ token, user}) {
        return {...token, ...user};
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  secret: '7SbIYMw4oF/sPKpbnzy1ZZ/i2DtpRhcezh/Px9VydFc=',
})