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

    async sendEmail(
        name: string,
        email: string,
        to: string,
        subject: string,
        text: string,
        html: string
    ): Promise<EmailSendResult> {
        return await this.transporter.sendMail({
            from: `"${name}" <${email}>`,
            to,
            subject,
            text,
            html,
        });
    }

    async notifyAdminSolicitation(
        name: string,
        loja: string,
        value: number,
        description: string
    ): Promise<EmailSendResult> {
        return await this.transporter.sendMail({
            from: (name + ' ' + process.env.EMAIL_USER) as string,
            to: process.env.EMAIL_ADMIN as string,
            subject: 'Nova solicitaçao',
            text: description,
            html: `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          background: #ffffff;
          margin: auto;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }
        .header {
          background: #007bff;
          color: white;
          padding: 15px;
          border-radius: 8px 8px 0 0;
          text-align: center;
          }
          .content {
            background:#ffffff;
          margin: 20px 0;
        }
        .button {
          display: inline-block;
          padding: 10px 15px;
          margin: 5px;
          border-radius: 5px;
          color: white;
          text-decoration: none;
        }
        .approve {
          background-color: #28a745;
        }
        .reject {
          background-color: #dc3545;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #888;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>💰 Nova Solicitação de Saída</h2>
        </div>
        <div class="content">
          <p><strong>Funcionário:</strong> ${name}</p>
          <p><strong>Loja:</strong> ${loja}</p>
          <p><strong>Valor solicitado:</strong> R$ ${value.toFixed(2)}</p>
          <p><strong>Data:</strong> 02/10/2025</p>
          <p><strong>Descrição:</strong>${description}</p>
        </div>
        <div class="content">
          <a href="https://sistema.com/approve/123" class="button approve">Aprovar</a>
          <a href="https://sistema.com/reject/123" class="button reject">Rejeitar</a>
        </div>
        <div class="footer">
          <p>Este é um e-mail automático, não responda.</p>
        </div>
      </div>
    </body>
  </html>
`,
        });
    }
}
