from django.core.management.base import BaseCommand
from django.core.management import call_command

class Command(BaseCommand):
    help = 'Popula a plataforma com todos os cursos (básicos, intermediários e avançados)'

    def handle(self, *args, **kwargs):
        self.stdout.write('🚀 Iniciando população completa da plataforma...')
        
        try:
            # Executa seed de cursos básicos
            self.stdout.write('📚 Criando cursos básicos...')
            call_command('seed_real_courses')
            
            # Executa seed de cursos avançados
            self.stdout.write('🔥 Criando cursos avançados...')
            call_command('seed_advanced_courses')
            
            # Executa seed rápido (dados de exemplo)
            self.stdout.write('⚡ Criando dados de exemplo...')
            call_command('seed_full_courses')
            
            self.stdout.write(
                self.style.SUCCESS(
                    '✅ Plataforma populada com sucesso!\n'
                    '📊 Agora você tem:\n'
                    '   • Cursos de Python, JavaScript, React, Node.js, SQL\n'
                    '   • Módulos com conteúdos educacionais reais\n'
                    '   • Lições com explicações detalhadas\n'
                    '   • Exercícios práticos e projetos\n'
                    '   • Diferentes níveis de dificuldade\n\n'
                    '🎯 Acesse o admin do Django para visualizar todos os cursos criados!'
                )
            )
            # Mostra o total de cursos cadastrados
            from courses.models import Course
            self.stdout.write(self.style.SUCCESS(f'📊 Total de cursos cadastrados: {Course.objects.count()}'))
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Erro ao popular a plataforma: {e}')
            ) 