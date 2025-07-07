import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createQuote(dto: Prisma.QuoteUncheckedCreateInput) {
    return this.prisma.quote.create({ data: dto });
  }
  async findUser(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where,
    });
  }
}
