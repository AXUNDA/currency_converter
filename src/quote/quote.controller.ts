import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { QuoteDto } from './dto/quote.dto';
import { QuoteService } from './quote.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetCurrentUser } from 'src/auth/decorators/getUser.decorator';
import { User } from '@prisma/client';
import { UserRoles } from 'src/auth/dto/roles';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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
}
