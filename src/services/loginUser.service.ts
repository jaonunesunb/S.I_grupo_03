import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { IUser } from "../interfaces";
import { AppError } from "../errors/AppError";

const prisma = new PrismaClient();

export const loginService = async (data: IUser) => {
  try {
    const userExist = await prisma.aluno.findUnique({
      where: { email: data.email },
    });

    if (!userExist) {
      throw new AppError("Email or password invalid", 403);
    }

    const passwordMatch = await compare(data.password, userExist.password);

    if (!passwordMatch) {
      throw new AppError("Email or password invalid", 403);
    }

    const token = jwt.sign(
      {
        id: userExist.id,
      },
      process.env.SECRET_KEY as string,
      {
        subject: String(userExist.id),
        expiresIn: "24h",
      }
    );

    return { token };
  } catch (error) {
    // Será que esse try and catch é uma boa ideia?
    // Não é melhor deixar falhar mesmo não?
    console.error("Error during login:", error);
    throw error;
  }
};
