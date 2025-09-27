import Link from 'next/link'
import { Heart, Github, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react'
import { NAVIGATION, ROUTES } from '@/lib/routes'

interface FooterLink {
  name: string;
  href: string;
}

interface SocialLink extends FooterLink {
  icon: React.ComponentType<{ className?: string }>;
}

interface FooterLinks {
  company: readonly FooterLink[];
  courses: readonly FooterLink[];
  legal: readonly FooterLink[];
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks: FooterLinks = {
    company: NAVIGATION.FOOTER.COMPANY,
    courses: NAVIGATION.FOOTER.COURSES,
    legal: NAVIGATION.FOOTER.LEGAL}

  const socialLinks: SocialLink[] = [
    { name: 'LinkedIn', href: 'https://linkedin.com/company/fenixdevacademy', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com/fenixdevacademy', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com/fenixdevacademy', icon: Twitter },
    { name: 'Instagram', href: 'https://instagram.com/fenixdevacademy', icon: Instagram },
    { name: 'YouTube', href: 'https://youtube.com/@fenixdevacademy', icon: Youtube },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-3">Fenix Academy</h3>
            <p className="text-sm text-gray-400">Aprenda tecnologia com projetos reais e comunidade ativa.</p>
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map(social => (
                <Link key={social.name} href={social.href} className="text-gray-400 hover:text-white" title={social.name}>
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Contato</h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Equipe Fênix Academy</p>
              <a href="/contact" className="text-sm text-gray-400 hover:text-white block">
                Entre em contato
              </a>
              <a href="mailto:contato@fenixdevacademy.com" className="text-sm text-gray-400 hover:text-white block">
                contato@fenixdevacademy.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.company.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Cursos</h4>
            <ul className="space-y-2">
              {footerLinks.courses.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-400">© {currentYear} Fenix Academy. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>no Brasil</span>
          </div>
        </div>
      </div>
    </footer>
  )
}