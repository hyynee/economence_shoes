import { Module } from '@nestjs/common';
import { GoodsreceiptService } from './goodsreceipt.service';
import { GoodsreceiptController } from './goodsreceipt.controller';

@Module({
  controllers: [GoodsreceiptController],
  providers: [GoodsreceiptService],
})
export class GoodsreceiptModule {}
