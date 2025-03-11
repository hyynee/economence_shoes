import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MailService } from 'src/services/mail.services';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService,MailService],
})
export class PaymentModule {}
