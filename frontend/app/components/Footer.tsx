import Link from 'next/link'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  ArrowUp
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'Sobre Nós', href: '/about' },
      { name: 'Nossa Missão', href: '/mission' },
      { name: 'Carreiras', href: '/careers' },
      { name: 'Imprensa', href: '/press' },
    ],
    courses: [
      { name: 'Python', href: '/courses/python' },
      { name: 'JavaScript', href: '/courses/javascript' },
      { name: 'React', href: '/courses/react' },
      { name: 'Node.js', href: '/courses/nodejs' },
      { name: 'Data Science', href: '/courses/data-science' },
      { name: 'DevOps', href: '/courses/devops' },
    ],
    support: [
      { name: 'Central de Ajuda', href: '/help' },
      { name: 'Documentação', href: '/docs' },
      { name: 'Comunidade', href: '/community' },
      { name: 'Contato', href: '/contact' },
      { name: 'Status', href: '/status' },
    ],
    legal: [
      { name: 'Termos de Uso', href: '/terms' },
      { name: 'Política de Privacidade', href: '/privacy' },
      { name: 'Cookies', href: '/cookies' },
      { name: 'Licenças', href: '/licenses' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com/fenixacademy', icon: Facebook },
    { name: 'Twitter', href: 'https://twitter.com/fenixacademy', icon: Twitter },
    { name: 'Instagram', href: 'https://instagram.com/fenixacademy', icon: Instagram },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/fenix-academy', icon: Linkedin },
    { name: 'YouTube', href: 'https://youtube.com/fenixacademy', icon: Youtube },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-background text-foreground border-t border-primary">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="font-bold text-xl text-white">Fenix Academy</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transformando carreiras através da educação em programação. 
              Aprenda com projetos reais, mentoria personalizada e uma 
              comunidade ativa de desenvolvedores.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-primary" />
                <span>contato@fenixacademy.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-primary" />
                <span>+55 (11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-primary" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Cursos</h3>
            <ul className="space-y-2">
              {footerLinks.courses.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Suporte</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-primary">
          <div className="max-w-md">
            <h3 className="font-semibold text-lg mb-2 text-primary">
              Fique por dentro das novidades
            </h3>
            <p className="text-gray-300 mb-4">
              Receba dicas, atualizações e ofertas exclusivas diretamente no seu email.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 px-4 py-2 bg-[#222] border border-[#333] rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="btn-primary px-6 py-2">
                Inscrever
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-300">
              <span>&copy; {currentYear} Fenix Academy. Todos os direitos reservados.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Feito com</span>
              <Heart className="w-4 h-4 text-primary fill-current" />
              <span className="hidden sm:inline">no Brasil</span>
            </div>
            {/* Destaques */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <span className="font-semibold text-primary">CEO: Lucas Silva Petris</span>
              <span className="font-semibold text-blue-400 flex items-center">
                Gestor de Marketing: Cezar Camara Lins
                <a href="https://www.linkedin.com/in/cezar-camara-lins" target="_blank" rel="noopener noreferrer" className="ml-2 underline flex items-center">
                  <Linkedin className="w-4 h-4 inline" /> LinkedIn
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center space-x-8 text-gray-500 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>SSL Seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>Pagamento Seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span>Garantia de 30 dias</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span>Suporte 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 