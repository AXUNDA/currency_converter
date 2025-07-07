import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class CoinGeckoService {
  client: AxiosInstance;
  constructor(private configService: ConfigService) {
    this.client = axios.create({
      baseURL: this.configService.get('COIN_GECKO_API_URL'),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  async getQuote(currency: string) {
    const { data } = await this.client.get(
      `/simple/price?ids=tether&vs_currencies=${currency}`,
    );
    return data;
  }
}
