import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Apple from "next-auth/providers/apple"
import Credentials from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs"
import { z } from "zod"

const users: Array<{
  id: string
  email: string
  name?: string
  password?: string
  provider?: string
}> = []

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials)
          
          const user = users.find(u => u.email === email)
          if (!user || !user.password) {
            throw new Error("Invalid credentials")
          }

          const isValidPassword = await bcryptjs.compare(password, user.password)
          if (!isValidPassword) {
            throw new Error("Invalid credentials")
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "apple") {
        const existingUser = users.find(u => u.email === user.email)
        if (!existingUser) {
          users.push({
            id: crypto.randomUUID(),
            email: user.email!,
            name: user.name!,
            provider: account.provider,
          })
        }
      }
      return true
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
})

export async function createUser(email: string, password: string, name?: string) {
  const existingUser = users.find(u => u.email === email)
  if (existingUser) {
    throw new Error("User already exists")
  }

  const hashedPassword = await bcryptjs.hash(password, 10)
  const newUser = {
    id: crypto.randomUUID(),
    email,
    password: hashedPassword,
    name,
  }
  
  users.push(newUser)
  return { id: newUser.id, email: newUser.email, name: newUser.name }
}