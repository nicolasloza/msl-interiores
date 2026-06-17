import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        if (!email || !password) return null;

        if (process.env.DATABASE_URL) {
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) return null;
          const valid = await bcrypt.compare(password, user.password);
          if (!valid) return null;
          return { id: String(user.id), email: user.email, name: user.name };
        }

        // Fallback a env vars si no hay DB configurada
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
          return { id: '1', email, name: 'Administrador' };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: { strategy: 'jwt', maxAge: 2 * 60 * 60 }, // 2 horas
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = 'admin';
      return token;
    },
    session({ session, token }) {
      if (token.role) (session.user as { role?: string }).role = token.role as string;
      return session;
    },
  },
  trustHost: true,
});
