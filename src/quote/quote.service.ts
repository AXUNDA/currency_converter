import { BadRequestException, Injectable } from '@nestjs/common';
import { CoinGeckoService } from '@app/coin-gecko';
import { QuoteDto } from './dto/quote.dto';
import { User } from '@prisma/client';
import { QuoteRepository } from './quotte.repository';
import {
  africanCurrencyCodes,
  europeanCurrencyCodes,
  asianCurrencyCodes,
  northAmericanCurrencyCodes,
  southAmericanCurrencyCodes,
  oceanianCurrencyCodes,
} from './currencyCodes';

@Injectable()
export class QuoteService {
  constructor(
    private readonly coinGeckoService: CoinGeckoService,
    private quoteRepository: QuoteRepository,
  ) {}
  async getQuote(dto: QuoteDto, user: User) {
    try {
      const response = await this.coinGeckoService.getQuote(dto.currency);
      console.log(response);
      if (!response['tether'][dto.currency.toLowerCase()]) {
        throw new BadRequestException('Invalid currency');
      }
      const rate = response['tether'][dto.currency.toLowerCase()];

      const conversionAmount = dto.amount * rate;
      const fee = this.calculateFee(conversionAmount, dto.currency);
      await this.quoteRepository.createQuote({
        userId: user.id,
        currency: dto.currency.toLocaleUpperCase(),
        inputAmount: dto.amount,
        rate,
        fee,
        netAmount: conversionAmount - fee,
      });
      return {
        rate,
        amount: conversionAmount,
        fee: fee.toFixed(2),
        netAmount: conversionAmount - fee,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('An error occurred,try later');
    }
  }
  calculateFee(amount: number, currency: string): number {
    const currencyRegions = {
      Europe: europeanCurrencyCodes,
      Africa: africanCurrencyCodes,
      Asia: asianCurrencyCodes,
      NorthAmerica: northAmericanCurrencyCodes,
      SouthAmerica: southAmericanCurrencyCodes,
      Oceania: oceanianCurrencyCodes,
    };

    const feeRates = {
      Europe: 0.05,
      Africa: 0.03,
      Asia: 0.02,
      NorthAmerica: 0.07,
      SouthAmerica: 0.09,
      Oceania: 0.1,
      Default: 0.35,
    };

    const normalizedCurrency = currency.toUpperCase();

    for (const [region, codes] of Object.entries(currencyRegions)) {
      if (codes.includes(normalizedCurrency)) {
        return amount * feeRates[region];
      }
    }

    return amount * feeRates.Default;
  }
  async getRecentQuotes() {
    return await this.quoteRepository.getQuotes();
  }
}
