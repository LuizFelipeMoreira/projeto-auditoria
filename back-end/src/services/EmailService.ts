import nodemailer, { Transporter } from 'nodemailer';

export type EmailSendResult = {
    accepted: string[];
    rejected: string[];
    envelopeTime: number;
    messageTime: number;
    messageId: string;
    response: string;
};

export class EmailService {
    private readonly transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.PASSWORD_USER,
            },
        });
    }

    async sendEmail(): Promise<EmailSendResult> {
        return await this.transporter.sendMail({});
    }

    async notifyAdminSolicitation(): Promise<EmailSendResult> {
        return await this.transporter.sendMail({});
    }
}
