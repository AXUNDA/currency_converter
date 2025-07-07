import { BadRequestException, Injectable } from '@nestjs/common';
import { CoinGeckoService } from '@app/coin-gecko';
import { QuoteDto } from './dto/quote.dto';

@Injectable()
export class QuoteService {
  constructor(private readonly coinGeckoService: CoinGeckoService) {}
  async getQuote(dto: QuoteDto) {
    try {
      const response = await this.coinGeckoService.getQuote(dto.currency);
      console.log(response);
      const rate = response['tether'][dto.currency];
      return rate;
    } catch (error) {
      throw new BadRequestException('Invalid currency');
    }
  }
}
