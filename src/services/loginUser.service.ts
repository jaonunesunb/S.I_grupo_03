import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { IUser } from "../interfaces";
import { AppError } from "../errors/AppError";

const prisma = new PrismaClient();

export const loginService = async (data: IUser) => {
  try {
    let userExist: any = null;

    const alunoExist = await prisma.aluno.findUnique({
      where: { email: data.email },
    });

    const servidorExist = await prisma.servidor.findUnique({
      where: { email: data.email },
    });

    if (!alunoExist && !servidorExist) {
      throw new AppError("Email or password invalid", 403);
    }

    if (servidorExist) {
      userExist = servidorExist;

      const passwordMatch = await compare(
        data.password,
        servidorExist.password
      );

      if (!passwordMatch) {
        throw new AppError("Email or password invalid", 403);
      }
    }

    if (alunoExist) {
      userExist = alunoExist;

      const passwordMatch = await compare(data.password, alunoExist.password);

      if (!passwordMatch) {
        throw new AppError("Email or password invalid", 403);
      }
    }

    let userType: "aluno" | "servidor" = "aluno";
    if (alunoExist && alunoExist.matricula) {
      userType = "aluno";
    } else if (servidorExist && servidorExist.matricula) {
      userType = "servidor";
    }

    const token = jwt.sign(
      {
        id: userExist.id,
        userType: userType,
      },
      process.env.SECRET_KEY as string,
      {
        subject: String(userExist.id),
        expiresIn: "24h",
      }
    );

    return { token };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
