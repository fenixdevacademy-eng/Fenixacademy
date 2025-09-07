import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Youtube,
  BookOpen,
  Users,
  Award,
  Zap
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
    { name: 'LinkedIn', href: 'https://linkedin.com/company/fenix-academy', icon: Linkedin, color: 'hover:text-blue-600' },
    { name: 'GitHub', href: 'https://github.com/fenix-academy', icon: Github, color: 'hover:text-gray-400' },
    { name: 'Twitter', href: 'https://twitter.com/fenixacademy', icon: Twitter, color: 'hover:text-blue-400' },
    { name: 'Instagram', href: 'https://instagram.com/fenixacademy', icon: Instagram, color: 'hover:text-pink-500' },
    { name: 'YouTube', href: 'https://youtube.com/@fenixacademy', icon: Youtube, color: 'hover:text-red-500' },
  ]

  const features = [
    { icon: BookOpen, text: 'Projetos Reais', description: 'Aprenda com projetos práticos' },
    { icon: Users, text: 'Mentoria', description: 'Suporte personalizado' },
    { icon: Award, text: 'Certificados', description: 'Reconhecimento oficial' },
    { icon: Zap, text: 'Comunidade', description: 'Networking ativo' },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Fique por dentro das novidades!</h3>
          <p className="text-blue-100 mb-6">Receba atualizações sobre novos cursos e oportunidades exclusivas</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 text-gray-900"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Inscrever-se
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">F</span>
              </div>
              <div>
                <span className="font-bold text-2xl bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Fenix Academy
                </span>
                <p className="text-sm text-gray-400">★ #1 Plataforma de Ensino</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transformando carreiras através da educação em programação.
              Aprenda com projetos reais, mentoria personalizada e uma
              comunidade ativa de desenvolvedores.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <feature.icon className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-sm font-medium text-white">{feature.text}</p>
                    <p className="text-xs text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors">
                <Mail className="w-5 h-5 text-orange-400" />
                <a href="mailto:fenixdevacademy@gmail.com" className="hover:underline">
                  fenixdevacademy@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors">
                <Phone className="w-5 h-5 text-orange-400" />
                <a href="tel:+5521986289597" className="hover:underline">
                  +55 (21) 98628-9597
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span>Itaboraí, RJ - Brasil</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white border-b border-orange-500 pb-2">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white border-b border-orange-500 pb-2">Cursos</h3>
            <ul className="space-y-3">
              {footerLinks.courses.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white border-b border-orange-500 pb-2">Suporte</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Legal */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400">Siga-nos:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-colors ${social.color}`}
                  title={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              © {currentYear} Fenix Academy. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>no Brasil</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 