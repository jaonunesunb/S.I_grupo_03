import { PrismaClient, Usuario } from '@prisma/client';
import { IUsuarioUpdate } from '../interfaces';

const prisma = new PrismaClient();

export const updateUserService = async (id: number, dadosAtualizacao: IUsuarioUpdate): Promise<Usuario | null> => {
  try {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { id } });

    if (!usuarioExistente) {
      throw new Error('Usuário não encontrado');
    }

    let subAreasInteresse: { nome: string }[] | undefined;
    if (dadosAtualizacao.subAreasInteresse) {
      subAreasInteresse = dadosAtualizacao.subAreasInteresse.map((subArea) => ({
        nome: subArea,
      }));
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id },
      data: {
        nome: dadosAtualizacao.nome,
        email: dadosAtualizacao.email,
        senha: dadosAtualizacao.senha,
        subAreasInteresse: {
          set: subAreasInteresse,
        },
      },
    });

    return usuarioAtualizado;
  } catch (error) {
    // Tratar erros aqui
    console.error('Erro ao atualizar o usuário:', error);
    return null;
  }
};
