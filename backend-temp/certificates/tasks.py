from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.utils import timezone
from .models import Certificate, CertificateTemplate
import logging
from weasyprint import HTML
from io import BytesIO
from django.core.files import File
import qrcode

logger = logging.getLogger(__name__)

@shared_task
def generate_certificate_pdf(certificate_id):
    """
    Generate PDF certificate for a given certificate
    """
    try:
        certificate = Certificate.objects.select_related('user', 'course').get(id=certificate_id)
        
        # Get certificate template
        template = CertificateTemplate.objects.filter(
            is_active=True,
            language=certificate.language
        ).first()
        
        if not template:
            # Use default template
            template = CertificateTemplate.objects.filter(is_default=True).first()
        
        if not template:
            logger.error(f"No certificate template found for certificate {certificate_id}")
            return
        
        # Prepare context for template
        context = {
            'certificate': certificate,
            'user': certificate.user,
            'course': certificate.course,
            'template': template,
            'completion_date': certificate.completion_date.strftime('%B %d, %Y'),
            'completion_date_pt': certificate.completion_date.strftime('%d de %B de %Y'),
        }
        
        # Render HTML template
        html_content = render_to_string('certificates/certificate_template.html', context)
        
        # Add CSS styles
        html_with_css = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                {template.css_styles}
                @page {{
                    size: {template.width}px {template.height}px;
                    margin: 0;
                }}
                body {{
                    margin: 0;
                    padding: 20px;
                    font-family: {template.body_font};
                    background-color: {template.background_color};
                    color: {template.text_color};
                }}
            </style>
        </head>
        <body>
            {html_content}
        </body>
        </html>
        """
        
        # Generate PDF
        pdf_file = HTML(string=html_with_css).write_pdf()
        
        # Save PDF to certificate
        filename = f"certificate_{certificate.certificate_id}.pdf"
        certificate.pdf_file.save(filename, File(BytesIO(pdf_file)), save=True)
        
        logger.info(f"PDF certificate generated for {certificate.certificate_number}")
        
    except Exception as e:
        logger.error(f"Failed to generate PDF certificate for {certificate_id}: {str(e)}")
        raise

@shared_task
def generate_certificate_image(certificate_id):
    """
    Generate certificate image for sharing on social media
    """
    try:
        from PIL import Image, ImageDraw, ImageFont
        import os
        
        certificate = Certificate.objects.select_related('user', 'course').get(id=certificate_id)
        
        # Create image
        width = 1200
        height = 630
        image = Image.new('RGB', (width, height), color='#1F2937')
        draw = ImageDraw.Draw(image)
        
        # Try to load font, fallback to default if not available
        try:
            font_large = ImageFont.truetype("arial.ttf", 48)
            font_medium = ImageFont.truetype("arial.ttf", 32)
            font_small = ImageFont.truetype("arial.ttf", 24)
        except:
            font_large = ImageFont.load_default()
            font_medium = ImageFont.load_default()
            font_small = ImageFont.load_default()
        
        # Draw background gradient
        for y in range(height):
            r = int(31 + (y / height) * 20)
            g = int(41 + (y / height) * 20)
            b = int(55 + (y / height) * 20)
            draw.line([(0, y), (width, y)], fill=(r, g, b))
        
        # Draw certificate content
        text_color = '#FFFFFF'
        
        # Title
        title = "Certificate of Completion"
        title_bbox = draw.textbbox((0, 0), title, font=font_large)
        title_width = title_bbox[2] - title_bbox[0]
        title_x = (width - title_width) // 2
        draw.text((title_x, 100), title, fill=text_color, font=font_large)
        
        # Student name
        student_name = certificate.user.get_full_name()
        name_bbox = draw.textbbox((0, 0), student_name, font=font_medium)
        name_width = name_bbox[2] - name_bbox[0]
        name_x = (width - name_width) // 2
        draw.text((name_x, 200), student_name, fill=text_color, font=font_medium)
        
        # Course name
        course_name = certificate.course.get_title(certificate.language)
        course_bbox = draw.textbbox((0, 0), course_name, font=font_medium)
        course_width = course_bbox[2] - course_bbox[0]
        course_x = (width - course_width) // 2
        draw.text((course_x, 280), course_name, fill=text_color, font=font_medium)
        
        # Completion date
        date_text = f"Completed on {certificate.completion_date.strftime('%B %d, %Y')}"
        date_bbox = draw.textbbox((0, 0), date_text, font=font_small)
        date_width = date_bbox[2] - date_bbox[0]
        date_x = (width - date_width) // 2
        draw.text((date_x, 360), date_text, fill=text_color, font=font_small)
        
        # Certificate number
        cert_text = f"Certificate #: {certificate.certificate_number}"
        cert_bbox = draw.textbbox((0, 0), cert_text, font=font_small)
        cert_width = cert_bbox[2] - cert_bbox[0]
        cert_x = (width - cert_width) // 2
        draw.text((cert_x, 400), cert_text, fill=text_color, font=font_small)
        
        # Logo or branding
        logo_text = "Fênix Dev Academy"
        logo_bbox = draw.textbbox((0, 0), logo_text, font=font_small)
        logo_width = logo_bbox[2] - logo_bbox[0]
        logo_x = (width - logo_width) // 2
        draw.text((logo_x, 500), logo_text, fill='#F59E0B', font=font_small)
        
        # Save image
        buffer = BytesIO()
        image.save(buffer, format='PNG')
        buffer.seek(0)
        
        filename = f"certificate_image_{certificate.certificate_id}.png"
        certificate.certificate_image.save(filename, File(buffer), save=True)
        
        logger.info(f"Certificate image generated for {certificate.certificate_number}")
        
    except Exception as e:
        logger.error(f"Failed to generate certificate image for {certificate_id}: {str(e)}")
        raise

@shared_task
def generate_pending_certificates():
    """
    Generate certificates for completed courses that don't have certificates yet
    """
    try:
        from courses.models import Enrollment
        
        # Find completed enrollments without certificates
        completed_enrollments = Enrollment.objects.filter(
            status='completed',
            is_completed=True
        ).select_related('user', 'course')
        
        for enrollment in completed_enrollments:
            # Check if certificate already exists
            certificate_exists = Certificate.objects.filter(
                user=enrollment.user,
                course=enrollment.course
            ).exists()
            
            if not certificate_exists:
                # Create certificate
                certificate = Certificate.objects.create(
                    user=enrollment.user,
                    course=enrollment.course,
                    title=f"Certificate of Completion - {enrollment.course.title}",
                    title_pt=f"Certificado de Conclusão - {enrollment.course.get_title('pt')}",
                    description=f"This certificate is awarded to {enrollment.user.get_full_name()} for successfully completing {enrollment.course.title}.",
                    description_pt=f"Este certificado é concedido a {enrollment.user.get_full_name()} por concluir com sucesso {enrollment.course.get_title('pt')}.",
                    status='generated',
                    language=enrollment.user.preferred_language,
                    completion_date=enrollment.completed_at or timezone.now(),
                )
                
                # Generate QR code
                certificate.generate_qr_code()
                
                # Generate PDF and image asynchronously
                generate_certificate_pdf.delay(certificate.id)
                generate_certificate_image.delay(certificate.id)
                
                logger.info(f"Created certificate for {enrollment.user.email} - {enrollment.course.title}")
        
        logger.info(f"Generated {completed_enrollments.count()} pending certificates")
        
    except Exception as e:
        logger.error(f"Failed to generate pending certificates: {str(e)}")
        raise

@shared_task
def send_certificate_email(certificate_id):
    """
    Send certificate completion email with PDF attachment
    """
    try:
        certificate = Certificate.objects.select_related('user', 'course').get(id=certificate_id)
        user = certificate.user
        course = certificate.course
        
        subject = f"🎉 Your Certificate is Ready: {course.title}"
        subject_pt = f"🎉 Seu Certificado Está Pronto: {course.get_title('pt')}"
        
        language = user.preferred_language
        
        if language == 'pt':
            subject = subject_pt
            template_name = 'emails/certificate_ready_pt.html'
        else:
            template_name = 'emails/certificate_ready_en.html'
        
        context = {
            'user': user,
            'course': course,
            'certificate': certificate,
            'certificate_url': f"{settings.SITE_URL}/certificates/{certificate.certificate_id}",
            'verification_url': f"{settings.SITE_URL}/verify/{certificate.certificate_id}",
        }
        
        html_message = render_to_string(template_name, context)
        plain_message = f"""
        🎉 Your Certificate is Ready!
        
        Hi {user.first_name},
        
        Congratulations! Your certificate for {course.title} is ready.
        
        Certificate Number: {certificate.certificate_number}
        Verification URL: {context['verification_url']}
        
        View your certificate: {context['certificate_url']}
        
        Best regards,
        The Fênix Dev Academy Team
        """
        
        # Send email with PDF attachment if available
        from django.core.mail import EmailMessage
        
        email = EmailMessage(
            subject=subject,
            body=html_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[user.email],
        )
        email.content_subtype = "html"
        
        # Attach PDF if available
        if certificate.pdf_file:
            email.attach_file(certificate.pdf_file.path)
        
        email.send()
        
        logger.info(f"Certificate email sent to {user.email} for {course.title}")
        
    except Exception as e:
        logger.error(f"Failed to send certificate email for {certificate_id}: {str(e)}")
        raise

@shared_task
def cleanup_expired_certificates():
    """
    Clean up expired or revoked certificates (older than 5 years)
    """
    try:
        from datetime import timedelta
        
        five_years_ago = timezone.now() - timedelta(days=5*365)
        
        expired_certificates = Certificate.objects.filter(
            created_at__lt=five_years_ago,
            status__in=['revoked', 'expired']
        )
        
        deleted_count = expired_certificates.count()
        expired_certificates.delete()
        
        logger.info(f"Cleaned up {deleted_count} expired certificates")
        
    except Exception as e:
        logger.error(f"Failed to cleanup expired certificates: {str(e)}")
        raise

@shared_task
def update_certificate_statistics():
    """
    Update certificate statistics and analytics
    """
    try:
        total_certificates = Certificate.objects.count()
        issued_certificates = Certificate.objects.filter(status='issued').count()
        pending_certificates = Certificate.objects.filter(status='pending').count()
        
        # Log statistics
        logger.info(f"Certificate Statistics - Total: {total_certificates}, Issued: {issued_certificates}, Pending: {pending_certificates}")
        
        # You could also store these in a cache or database for dashboard display
        
    except Exception as e:
        logger.error(f"Failed to update certificate statistics: {str(e)}")
        raise 