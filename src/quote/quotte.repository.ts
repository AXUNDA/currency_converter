import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createQuote(dto: Prisma.QuoteUncheckedCreateInput) {
    return this.prisma.quote.create({ data: dto });
  }
  async getQuotes() {
    return await this.prisma.quote.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });
  }
}
