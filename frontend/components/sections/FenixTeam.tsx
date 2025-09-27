'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Award,
  Code,
  Heart,
  Lightbulb,
  Target,
  Globe,
  Star,
  Linkedin,
  Twitter,
  Github,
  Mail,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Sparkles
} from 'lucide-react'

interface TeamMember {
  name: string
  role: string
  bio: string
  avatar: string
  social: {
    linkedin?: string
    twitter?: string
    github?: string
    email?: string
  }
  achievements: string[]
  expertise: string[]
  joinDate: string
  location: string
}

interface Founder {
  name: string
  title: string
  bio: string
  avatar: string
  quote: string
  social: {
    linkedin?: string
    twitter?: string
    github?: string
    email?: string
  }
  achievements: string[]
  background: string
}

function FenixTeam() {
  const [activeMember, setActiveMember] = useState(0)

  const founders: Founder[] = [
    {
      name: "Lucas Silva",
      title: "CEO & Fundador",
      bio: "Desenvolvedor full-stack com mais de 10 anos de experiência, apaixonado por educação e tecnologia. Formado em Ciência da Computação pela USP.",
      avatar: "/images/team/lucas.jpg",
      quote: "Acredito que a educação tecnológica pode transformar vidas e democratizar oportunidades no Brasil.",
      social: {
        linkedin: "https://linkedin.com/in/lucassilva",
        twitter: "https://twitter.com/lucassilva",
        github: "https://github.com/lucassilva",
        email: "lucas@fenixacademy.com"
      },
      achievements: [
        "Ex-Google Engineer",
        "Mentor de 1000+ desenvolvedores",
        "Speaker em 50+ conferências",
        "Autor de 3 livros sobre programação"
      ],
      background: "Formado em Ciência da Computação pela USP, trabalhou 5 anos no Google antes de fundar a Fênix Academy. Especialista em React, Node.js e arquiteturas de software."
    },
    {
      name: "Maria Santos",
      title: "CTO & Co-fundadora",
      bio: "Engenheira de software especializada em IA e machine learning. Doutora em Ciência da Computação pela Unicamp.",
      avatar: "/images/team/maria.jpg",
      quote: "A inteligência artificial pode personalizar o aprendizado e tornar a educação mais eficiente e acessível.",
      social: {
        linkedin: "https://linkedin.com/in/mariasantos",
        twitter: "https://twitter.com/mariasantos",
        github: "https://github.com/mariasantos",
        email: "maria@fenixacademy.com"
      },
      achievements: [
        "PhD em Machine Learning",
        "20+ papers publicados",
        "Ex-Microsoft Research",
        "Inventora de 5 patentes"
      ],
      background: "Doutora em Ciência da Computação pela Unicamp, especialista em IA e machine learning. Trabalhou no Microsoft Research antes de co-fundar a Fênix Academy."
    }
  ]

  const teamMembers: TeamMember[] = [
    {
      name: "Ana Costa",
      role: "Head de Produto",
      bio: "Product Manager com foco em experiência do usuário e inovação educacional.",
      avatar: "/images/team/ana.jpg",
      social: {
        linkedin: "https://linkedin.com/in/anacosta",
        email: "ana@fenixacademy.com"
      },
      achievements: ["MBA em Gestão", "5 anos de experiência", "Especialista em UX"],
      expertise: ["Product Management", "UX Design", "Data Analysis"],
      joinDate: "2021",
      location: "São Paulo, SP"
    },
    {
      name: "Carlos Oliveira",
      role: "Lead Developer",
      bio: "Desenvolvedor sênior especializado em arquiteturas escaláveis e tecnologias modernas.",
      avatar: "/images/team/carlos.jpg",
      social: {
        linkedin: "https://linkedin.com/in/carlosoliveira",
        github: "https://github.com/carlosoliveira",
        email: "carlos@fenixacademy.com"
      },
      achievements: ["10+ anos de experiência", "Arquiteto de software", "Mentor técnico"],
      expertise: ["React", "Node.js", "AWS", "Microservices"],
      joinDate: "2021",
      location: "Rio de Janeiro, RJ"
    },
    {
      name: "Beatriz Lima",
      role: "Head de Marketing",
      bio: "Especialista em marketing digital e crescimento de startups de tecnologia.",
      avatar: "/images/team/beatriz.jpg",
      social: {
        linkedin: "https://linkedin.com/in/beatrizlima",
        twitter: "https://twitter.com/beatrizlima",
        email: "beatriz@fenixacademy.com"
      },
      achievements: ["Growth Hacker", "Especialista em SEO", "5 anos de experiência"],
      expertise: ["Digital Marketing", "Growth Hacking", "Content Strategy"],
      joinDate: "2022",
      location: "Belo Horizonte, MG"
    },
    {
      name: "Rafael Mendes",
      role: "Head de Educação",
      bio: "Pedagogo especializado em metodologias ativas e ensino de programação.",
      avatar: "/images/team/rafael.jpg",
      social: {
        linkedin: "https://linkedin.com/in/rafaelmendes",
        email: "rafael@fenixacademy.com"
      },
      achievements: ["Mestre em Educação", "Especialista em EAD", "15 anos de experiência"],
      expertise: ["Pedagogia", "Metodologias Ativas", "EAD"],
      joinDate: "2020",
      location: "Porto Alegre, RS"
    }
  ]

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-pink-900/20">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
      <div className="absolute inset-0 tech-grid opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">Nossa Equipe</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold gradient-text-neon mb-6">
            Conheça Quem Faz a Fênix
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Uma equipe apaixonada por educação e tecnologia, unida pelo sonho de
            democratizar o acesso ao conhecimento de qualidade no Brasil.
          </p>
        </motion.div>

        {/* Fundadores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Fundadores
          </h3>

          <div className="grid md:grid-cols-2 gap-12">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                className="glass-tech rounded-3xl p-8 hover:scale-105 transition-transform duration-300"
              >
                <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-4xl">
                      {founder.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  <h4 className="text-2xl font-bold text-white mb-2">{founder.name}</h4>
                  <p className="text-blue-400 font-medium mb-4">{founder.title}</p>

                  <blockquote className="text-gray-300 italic mb-6">
                    "{founder.quote}"
                  </blockquote>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Sobre</h5>
                    <p className="text-gray-300 text-sm">{founder.bio}</p>
                  </div>

                  <div>
                    <h5 className="text-white font-semibold mb-2">Background</h5>
                    <p className="text-gray-300 text-sm">{founder.background}</p>
                  </div>

                  <div>
                    <h5 className="text-white font-semibold mb-2">Conquistas</h5>
                    <div className="space-y-1">
                      {founder.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    {founder.social.linkedin && (
                      <a href={founder.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {founder.social.twitter && (
                      <a href={founder.social.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {founder.social.github && (
                      <a href={founder.social.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {founder.social.email && (
                      <a href={`mailto:${founder.social.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Equipe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Nossa Equipe
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="glass-tech rounded-2xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => setActiveMember(index)}
              >
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1">{member.name}</h4>
                  <p className="text-blue-400 text-sm mb-2">{member.role}</p>

                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{member.location}</span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>Desde {member.joinDate}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 text-center">{member.bio}</p>

                <div className="space-y-2 mb-4">
                  <h5 className="text-white font-semibold text-sm">Especialidades</h5>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.map((skill, i) => (
                      <span key={i} className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 justify-center">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.email && (
                    <a href={`mailto:${member.social.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Estatísticas da Equipe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="glass-tech rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-8">
              Nossa Equipe em Números
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">25+</div>
                <div className="text-gray-300">Profissionais</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">50+</div>
                <div className="text-gray-300">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">15+</div>
                <div className="text-gray-300">Especialidades</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">100%</div>
                <div className="text-gray-300">Comprometidos</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FenixTeam





