import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Stripe from 'stripe';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;
    private stripe: Stripe
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,  // Lấy từ biến môi trường
            port: parseInt(process.env.SMTP_PORT),  // Lấy từ biến môi trường
            auth: {
                user: process.env.SMTP_USER,  // Lấy từ biến môi trường
                pass: process.env.SMTP_PASS,  // Lấy từ biến môi trường
            },
        });
    }
    async sendPasswordResetEmail(to: string, resetToken: string) {
        // const resetLink = `http://yourapp.com/reset-password?token=${resetToken}`;
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: 'Auth-backend service',
            to: to,
            subject: 'Password Reset Request',
            html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    async sendPaymentConfirmationEmail(
        email: string,
        amount: number,
        currency: string,
        paymentId: string,
        products: any[],
        shippingAddress: { name: string, phone: string, address: string }
    ) {
        const productDetails = products.map(product => {
            return `<li>${product.name} - Quantity: ${product.quantity}</li>`;
        }).join('');

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Payment Confirmation',
            html: `
                <h1>Thank you for your payment!</h1>
                <p>Your payment was successful. Below are the details:</p>
                <ul>
                    <li><strong>Payment ID:</strong> ${paymentId}</li>
                    <li><strong>Amount:</strong> ${amount} ${currency}</li>
                </ul>
                <p><strong>Shipping Information:</strong></p>
                <ul>
                    <li><strong>Name:</strong> ${shippingAddress.name}</li>
                    <li><strong>Phone:</strong> ${shippingAddress.phone}</li>
                    <li><strong>Address:</strong> ${shippingAddress.address}</li>
                </ul>
                <p><strong>Purchased Products:</strong></p>
                <ul>
                    ${productDetails}
                </ul>
                <p>If you have any questions, feel free to contact us.</p>
            `,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Payment confirmation email sent to ${email}`);
        } catch (error) {
            console.error('Error sending payment confirmation email:', error);
        }
    }


}

// <a href="http://localhost:3000/invoice/${paymentId}" target="_blank">Download Invoice</a>
