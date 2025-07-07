import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

export class QuoteDto {
  @IsString()
  @IsNotEmpty()
  currency: string;

  @Type(() => Number)
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Amount must be a number' },
  )
  @IsPositive({ message: 'Amount must be a positive number' })
  @IsNotEmpty()
  amount: number;
}
