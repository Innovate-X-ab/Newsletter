// src/lib/auth.ts
import type { NextAuthConfig } from 'next-auth';
import type { JWT } from '@auth/core/jwt';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma";

// Define a more specific User type
interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

declare module '@auth/core/types' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      role: string;
    }
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string
            }
          });

          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!passwordMatch) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user && typeof user.id === 'string' && typeof user.role === 'string') {
        return {
          ...token,
          id: user.id,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.id === 'string' && typeof token.role === 'string') {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            role: token.role,
          }
        };
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin',
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);