import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { CoinGeckoModule } from '@app/coin-gecko';
import { PrismaModule } from '@app/prisma';

@Module({
  providers: [QuoteService],
  controllers: [QuoteController],
  imports: [CoinGeckoModule, PrismaModule],
})
export class QuoteModule {}
