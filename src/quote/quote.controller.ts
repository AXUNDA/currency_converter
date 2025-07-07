import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { QuoteDto } from './dto/quote.dto';
import { QuoteService } from './quote.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}
  @Post()
  async getQuote(@Body() dto: QuoteDto) {
    return await this.quoteService.getQuote(dto);
  }
}
