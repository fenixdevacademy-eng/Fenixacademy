import * as nodemailer from 'nodemailer';
import { emailConfig } from '../config/database';

export interface UserEmailData {
    name: string;
    email: string;
    firstName: string;
}

export interface PasswordResetData {
    name: string;
    email: string;
    resetLink: string;
}

class EmailService {
    private transporter: nodemailer.Transporter | null = null;

    constructor() {
        this.initializeTransporter();
    }

    private initializeTransporter() {
        try {
            this.transporter = nodemailer.createTransport({
                host: emailConfig.host,
                port: emailConfig.port,
                secure: false, // true para 465, false para outras portas
                auth: {
                    user: emailConfig.user,
                    pass: emailConfig.pass}});
        } catch (error) {
            console.error('Erro ao inicializar transporter de email:', error);
            this.transporter = null;
        }
    }

    private async verifyConnection(): Promise<boolean> {
        if (!this.transporter) {
            console.warn('Transporter de email não inicializado');
            return false;
        }

        try {
            await this.transporter.verify();
            return true;
        } catch (error) {
            console.error('Erro na verificação de conexão de email:', error);
            return false;
        }
    }

    async sendWelcomeEmail(userData: UserEmailData): Promise<boolean> {
        if (!this.transporter) {
            console.warn('Transporter de email não inicializado');
            return false;
        }

        const mailOptions = {
            from: `"Fênix Academy" <${emailConfig.user}>`,
            to: userData.email,
            subject: '🎉 Bem-vindo à Fênix Academy!',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Bem-vindo à Fênix Academy!</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Sua jornada de aprendizado começa agora</p>
          </div>
          
          <div style="padding: 40px; background: white; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Olá, ${userData.firstName}!</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              É um prazer tê-lo(a) conosco na Fênix Academy! Estamos muito animados para fazer parte da sua jornada de aprendizado em tecnologia.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">O que você pode fazer agora:</h3>
              <ul style="color: #666; line-height: 1.8;">
                <li>Explorar nossos cursos de programação</li>
                <li>Personalizar seu perfil</li>
                <li>Acompanhar seu progresso</li>
                <li>Conectar-se com outros estudantes</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/courses" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                Explorar Cursos
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px; margin-top: 30px;">
              Se você tiver alguma dúvida, não hesite em nos contatar. Estamos aqui para ajudar!
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
            <p>© 2024 Fênix Academy. Todos os direitos reservados.</p>
          </div>
        </div>
      `}

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('✅ E-mail de boas-vindas enviado para:', userData.email);
            return true;
        } catch (error) {
            console.error('❌ Erro ao enviar e-mail de boas-vindas:', error);
            return false;
        }
    }

    async sendPasswordResetEmail(resetData: PasswordResetData): Promise<boolean> {
        if (!this.transporter) {
            console.warn('Transporter de email não inicializado');
            return false;
        }

        const mailOptions = {
            from: `"Fênix Academy" <${emailConfig.user}>`,
            to: resetData.email,
            subject: '🔐 Recuperação de Senha - Fênix Academy',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Recuperação de Senha</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Fênix Academy</p>
          </div>
          
          <div style="padding: 40px; background: white; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Olá, ${resetData.name}!</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Recebemos uma solicitação para redefinir a senha da sua conta na Fênix Academy.
            </p>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #856404; margin: 0; font-weight: bold;">
                ⚠️ Se você não solicitou esta redefinição, ignore este e-mail.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetData.resetLink}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                Redefinir Senha
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Este link é válido por 1 hora. Após esse período, você precisará solicitar uma nova redefinição.
            </p>
            
            <p style="color: #999; font-size: 14px; margin-top: 30px;">
              Se você tiver problemas com o botão acima, copie e cole o link abaixo no seu navegador:
            </p>
            <p style="color: #999; font-size: 12px; word-break: break-all; background: #f8f9fa; padding: 10px; border-radius: 4px;">
              ${resetData.resetLink}
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
            <p>© 2024 Fênix Academy. Todos os direitos reservados.</p>
          </div>
        </div>
      `}

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('✅ E-mail de recuperação de senha enviado para:', resetData.email);
            return true;
        } catch (error) {
            console.error('❌ Erro ao enviar e-mail de recuperação:', error);
            return false;
        }
    }

    async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
        if (!this.transporter) {
            console.warn('Transporter de email não inicializado');
            return false;
        }

        const mailOptions = {
            from: `"Fênix Academy" <${emailConfig.user}>`,
            to,
            subject,
            html}

        try {
            await this.transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.error('❌ Erro ao enviar e-mail:', error);
            return false;
        }
    }
}

export const emailService = new EmailService();