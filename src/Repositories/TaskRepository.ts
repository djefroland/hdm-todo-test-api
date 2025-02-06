import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | (Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput> & {
          id: number;
        }),
  ) {
    const { id, ...updateData } = data;
    if (!data.id) {
      // Création d'une nouvelle tâche
      return this.prisma.task.create({ data: data as Prisma.TaskCreateInput });
    } else {
      // Mise à jour de la tâche existante
      return this.prisma.task.update({
        where: { id },
        data: updateData,
      });
    }
  }
}
