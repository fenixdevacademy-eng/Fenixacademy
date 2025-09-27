import { UserEmailData } from './config';

// Template de e-mail de boas-vindas
export const getWelcomeEmailTemplate = (userData: UserEmailData) => {
    const { name, email, firstName = name.split(' ')[0] } = userData;

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo à Fênix Dev Academy!</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; }
        .header p { color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
        .content { padding: 40px 30px; }
        .welcome-text { font-size: 18px; color: #333333; margin-bottom: 30px; line-height: 1.6; }
        .steps { background-color: #f8f9fa; padding: 30px; border-radius: 10px; margin: 30px 0; }
        .step { margin-bottom: 20px; padding: 15px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #667eea; }
        .step-number { background-color: #667eea; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; }
        .step-title { font-weight: bold; color: #333333; margin-bottom: 5px; }
        .step-description { color: #666666; font-size: 14px; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
        .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0; }
        .feature { text-align: center; padding: 20px; }
        .feature-icon { font-size: 48px; margin-bottom: 15px; }
        .feature-title { font-weight: bold; color: #333333; margin-bottom: 10px; }
        .feature-description { color: #666666; font-size: 14px; }
        .footer { background-color: #f8f9fa; padding: 30px; text-align: center; }
        .footer p { color: #666666; font-size: 14px; margin: 5px 0; }
        .social-links { margin: 20px 0; }
        .social-links a { color: #667eea; text-decoration: none; margin: 0 10px; }
        .highlight { background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Bem-vindo à Fênix Dev Academy!</h1>
            <p>Sua jornada para se tornar um desenvolvedor de elite começa agora!</p>
        </div>
        
        <div class="content">
            <div class="welcome-text">
                Olá <strong>${firstName}</strong>! 👋<br><br>
                É com grande alegria que te damos as boas-vindas à <strong>Fênix Dev Academy</strong>, a plataforma de ensino de programação mais avançada do Brasil!
            </div>
            
            <div class="highlight">
                <strong>🎉 Parabéns!</strong> Sua conta foi criada com sucesso e você já tem acesso a todos os nossos recursos exclusivos.
            </div>
            
            <h2 style="color: #333333; margin-top: 40px;">📋 Próximos Passos - Siga este guia:</h2>
            
            <div class="steps">
                <div class="step">
                    <span class="step-number">1</span>
                    <div class="step-title">Complete seu perfil</div>
                    <div class="step-description">Acesse seu perfil e adicione suas informações pessoais, foto e objetivos de carreira.</div>
                </div>
                
                <div class="step">
                    <span class="step-number">2</span>
                    <div class="step-title">Explore os 26 cursos disponíveis</div>
                    <div class="step-description">Navegue pelo catálogo completo de cursos, desde fundamentos até tecnologias avançadas.</div>
                </div>
                
                <div class="step">
                    <span class="step-number">3</span>
                    <div class="step-title">Teste nossa IDE avançada</div>
                    <div class="step-description">Experimente nossa IDE integrada com debugger, Git, terminal e colaboração em tempo real.</div>
                </div>
                
                <div class="step">
                    <span class="step-number">4</span>
                    <div class="step-title">Conecte-se com a IA superinteligente</div>
                    <div class="step-description">Use nossa IA para tirar dúvidas, revisar código e acelerar seu aprendizado.</div>
                </div>
                
                <div class="step">
                    <span class="step-number">5</span>
                    <div class="step-title">Participe da comunidade</div>
                    <div class="step-description">Junte-se a mais de 50.000 desenvolvedores na nossa comunidade ativa.</div>
                </div>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://fenixdevacademy.com.br'}/dashboard" class="cta-button">
                    🚀 Acessar Minha Conta
                </a>
            </div>
            
            <h3 style="color: #333333;">✨ O que você tem acesso:</h3>
            
            <div class="features">
                <div class="feature">
                    <div class="feature-icon">📚</div>
                    <div class="feature-title">26 Cursos Especializados</div>
                    <div class="feature-description">Frontend, Backend, Mobile, Data Science, DevOps e muito mais!</div>
                </div>
                
                <div class="feature">
                    <div class="feature-icon">💻</div>
                    <div class="feature-title">IDE Avançada</div>
                    <div class="feature-description">Editor profissional com debugger, Git integrado e colaboração em tempo real.</div>
                </div>
                
                <div class="feature">
                    <div class="feature-icon">🤖</div>
                    <div class="feature-title">IA Superinteligente</div>
                    <div class="feature-description">Assistente de programação com GPT-4 para acelerar seu aprendizado.</div>
                </div>
                
                <div class="feature">
                    <div class="feature-icon">🏆</div>
                    <div class="feature-title">Certificados Digitais</div>
                    <div class="feature-description">Certificados verificáveis para cada curso concluído.</div>
                </div>
                
                <div class="feature">
                    <div class="feature-icon">👥</div>
                    <div class="feature-title">Comunidade Ativa</div>
                    <div class="feature-description">Conecte-se com desenvolvedores e mentores especialistas.</div>
                </div>
                
                <div class="feature">
                    <div class="feature-icon">🎯</div>
                    <div class="feature-title">Mentoria Individual</div>
                    <div class="feature-description">Sessões de mentoria personalizada com especialistas.</div>
                </div>
            </div>
            
            <div class="highlight">
                <strong>💡 Dica:</strong> Comece pelo curso "Fundamentos de Desenvolvimento Web" se você é iniciante, ou escolha qualquer curso que corresponda ao seu nível atual.
            </div>
            
            <h3 style="color: #333333;">📞 Precisa de ajuda?</h3>
            <p style="color: #666666;">
                Nossa equipe de suporte está sempre disponível para te ajudar!<br>
                📧 E-mail: contato@fenixdevacademy.com<br>
                💬 Chat online: Disponível 24/7 na plataforma<br>
                📞 Suporte: Acesse nossa página de contato
            </p>
        </div>
        
        <div class="footer">
            <div class="social-links">
                <a href="https://linkedin.com/company/fenixdevacademy">LinkedIn</a>
                <a href="https://github.com/fenixdevacademy">GitHub</a>
                <a href="https://twitter.com/fenixdevacademy">Twitter</a>
                <a href="https://instagram.com/fenixdevacademy">Instagram</a>
            </div>
            <p><strong>Fênix Dev Academy</strong> - Transformando vidas através da programação</p>
            <p>Este e-mail foi enviado para ${email}</p>
            <p>Se você não criou uma conta conosco, ignore este e-mail.</p>
        </div>
    </div>
</body>
</html>
  `;
}

// Template de confirmação de pagamento
export const getPaymentConfirmationTemplate = (userData: UserEmailData) => {
    const { name, courseName, paymentAmount } = userData;

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pagamento Confirmado - Fênix Dev Academy</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 40px 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; }
        .content { padding: 40px 30px; }
        .success-icon { font-size: 64px; text-align: center; margin: 20px 0; }
        .payment-details { background-color: #f8f9fa; padding: 30px; border-radius: 10px; margin: 30px 0; }
        .detail-row { display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e9ecef; }
        .detail-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .detail-label { font-weight: bold; color: #333333; }
        .detail-value { color: #666666; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
        .footer { background-color: #f8f9fa; padding: 30px; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Pagamento Confirmado!</h1>
            <p>Seu acesso aos cursos foi liberado com sucesso!</p>
        </div>
        
        <div class="content">
            <div class="success-icon">🎉</div>
            
            <h2 style="color: #333333; text-align: center;">Parabéns, ${name}!</h2>
            <p style="text-align: center; color: #666666; font-size: 18px;">
                Seu pagamento foi processado com sucesso e você já tem acesso completo à Fênix Dev Academy!
            </p>
            
            <div class="payment-details">
                <h3 style="color: #333333; margin-bottom: 20px;">📋 Detalhes do Pagamento</h3>
                <div class="detail-row">
                    <span class="detail-label">Curso:</span>
                    <span class="detail-value">${courseName || 'Acesso Completo Fênix Academy'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Valor Pago:</span>
                    <span class="detail-value">R$ ${paymentAmount || '97,00'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value" style="color: #28a745; font-weight: bold;">✅ Confirmado</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Data:</span>
                    <span class="detail-value">${new Date().toLocaleDateString('pt-BR')}</span>
                </div>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://fenixdevacademy.com.br'}/courses" class="cta-button">
                    🚀 Acessar Cursos
                </a>
            </div>
            
            <h3 style="color: #333333;">🎯 O que você pode fazer agora:</h3>
            <ul style="color: #666666; line-height: 1.8;">
                <li>✅ Acessar todos os 26 cursos disponíveis</li>
                <li>✅ Usar nossa IDE avançada com debugger integrado</li>
                <li>✅ Conectar-se com nossa IA superinteligente</li>
                <li>✅ Participar da comunidade de desenvolvedores</li>
                <li>✅ Obter certificados digitais ao concluir cursos</li>
                <li>✅ Agendar sessões de mentoria individual</li>
            </ul>
        </div>
        
        <div class="footer">
            <p><strong>Fênix Dev Academy</strong> - Obrigado por confiar em nós!</p>
            <p>Este e-mail confirma seu pagamento e liberação de acesso.</p>
        </div>
    </div>
</body>
</html>
  `;
}

// Template de lembrete de curso
export const getCourseReminderTemplate = (userData: UserEmailData) => {
    const { name, courseName } = userData;

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Continue seu aprendizado - Fênix Dev Academy</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #ffc107 0%, #ff8c00 100%); padding: 40px 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; }
        .content { padding: 40px 30px; }
        .reminder-icon { font-size: 64px; text-align: center; margin: 20px 0; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
        .footer { background-color: #f8f9fa; padding: 30px; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📚 Continue seu aprendizado!</h1>
            <p>Seu curso está esperando por você</p>
        </div>
        
        <div class="content">
            <div class="reminder-icon">⏰</div>
            
            <h2 style="color: #333333; text-align: center;">Olá, ${name}!</h2>
            <p style="text-align: center; color: #666666; font-size: 18px;">
                Notamos que você começou o curso <strong>"${courseName}"</strong> mas ainda não o concluiu.
            </p>
            
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 10px; border-left: 4px solid #ffc107; margin: 30px 0;">
                <p style="margin: 0; color: #856404;">
                    <strong>💡 Dica:</strong> A consistência é a chave do sucesso! Dedique apenas 30 minutos por dia e você verá resultados incríveis.
                </p>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://fenixdevacademy.com.br'}/courses" class="cta-button">
                    🚀 Continuar Curso
                </a>
            </div>
            
            <h3 style="color: #333333;">🎯 Por que continuar?</h3>
            <ul style="color: #666666; line-height: 1.8;">
                <li>✅ Desenvolva habilidades valorizadas no mercado</li>
                <li>✅ Aumente suas chances de emprego</li>
                <li>✅ Obtenha certificados reconhecidos</li>
                <li>✅ Conecte-se com a comunidade de desenvolvedores</li>
                <li>✅ Acelere sua carreira na tecnologia</li>
            </ul>
        </div>
        
        <div class="footer">
            <p><strong>Fênix Dev Academy</strong> - Seu sucesso é nossa missão!</p>
        </div>
    </div>
</body>
</html>
  `;
}
