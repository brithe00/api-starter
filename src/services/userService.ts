import { PrismaClient } from "@prisma/client";
import { User, CreateUserInput, UpdateUserInput } from "@/schema/userSchema";
import { NotFoundError } from "@/utils/errors";

const prisma = new PrismaClient();

export class UserService {
  async getUser(id: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  async getUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async createUser(input: CreateUserInput): Promise<User> {
    return prisma.user.create({ data: input });
  }

  async updateUser(id: string, input: UpdateUserInput): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: input,
    });
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}

export const userService = new UserService();
