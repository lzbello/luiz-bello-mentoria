// app/actions/auth.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// app/actions/auth.ts (mesmo arquivo)
export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;

  return { id: user.id, name: user.name, email: user.email };
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria usuário no banco
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
}
