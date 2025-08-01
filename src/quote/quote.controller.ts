import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { QuoteDto } from './dto/quote.dto';
import { QuoteService } from './quote.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetCurrentUser } from 'src/auth/decorators/getUser.decorator';
import { User } from '@prisma/client';
import { UserRoles } from 'src/auth/dto/roles';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Response } from 'express';
import * as fastCsv from 'fast-csv';
import { Throttle } from '@nestjs/throttler';

@Throttle({ default: { limit: 5, ttl: 120000 } })
@UseGuards(JwtAuthGuard)
@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}
  @Post()
  async getQuote(@Body() dto: QuoteDto, @GetCurrentUser() user: User) {
    return await this.quoteService.getQuote(dto, user);
  }
  @Roles(UserRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async getRecentQuotes() {
    return await this.quoteService.getRecentQuotes();
  }
  @Roles(UserRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Get('export')
  async getRecentQuotesasCsv(@Res() res: Response) {
    const quotes = await this.quoteService.getRecentQuotes();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="quotes.csv"');

    // Stream CSV data
    const csvStream = fastCsv.format({ headers: true });
    csvStream.pipe(res);
    quotes.forEach((quote) => csvStream.write(quote));
    csvStream.end();
  }
}
