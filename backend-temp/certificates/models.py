from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
# from courses.models import Course  # Removido para evitar ciclo de importação
import uuid
import qrcode
from io import BytesIO
from django.core.files import File
from PIL import Image

User = get_user_model()

class Certificate(models.Model):
    """
    Course completion certificates with QR code verification
    """
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('generated', 'Generated'),
        ('issued', 'Issued'),
        ('revoked', 'Revoked'),
    ]
    
    # Basic information
    certificate_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='certificates')
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='certificates')
    
    # Certificate details
    title = models.CharField(max_length=200)
    title_pt = models.CharField(max_length=200, blank=True, help_text="Portuguese title")
    description = models.TextField(blank=True)
    description_pt = models.TextField(blank=True, help_text="Portuguese description")
    
    # Completion information
    completion_date = models.DateTimeField(auto_now_add=True)
    grade = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        null=True,
        blank=True
    )
    total_hours = models.IntegerField(default=0, help_text="Total study hours")
    
    # Certificate content
    certificate_number = models.CharField(max_length=50, unique=True, blank=True)
    issued_by = models.CharField(max_length=200, default="Fênix Dev Academy")
    issued_by_pt = models.CharField(max_length=200, default="Fênix Dev Academy", help_text="Portuguese issuer name")
    
    # Files and media
    pdf_file = models.FileField(upload_to='certificates/pdfs/', null=True, blank=True)
    qr_code = models.ImageField(upload_to='certificates/qr_codes/', null=True, blank=True)
    certificate_image = models.ImageField(upload_to='certificates/images/', null=True, blank=True)
    
    # Status and verification
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    is_verified = models.BooleanField(default=False)
    verification_url = models.URLField(blank=True)
    
    # Metadata
    template_used = models.CharField(max_length=100, default='default')
    language = models.CharField(max_length=2, choices=[('en', 'English'), ('pt', 'Português')], default='en')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    issued_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        verbose_name = _('certificate')
        verbose_name_plural = _('certificates')
        unique_together = ['user', 'course']
        db_table = 'certificates'
        indexes = [
            models.Index(fields=['certificate_id']),
            models.Index(fields=['user', 'status']),
            models.Index(fields=['course', 'status']),
            models.Index(fields=['completion_date']),
            models.Index(fields=['certificate_number']),
        ]
    
    def __str__(self):
        return f"Certificate {self.certificate_number} - {self.user.email} - {self.course.title}"
    
    def save(self, *args, **kwargs):
        if not self.certificate_number:
            self.certificate_number = f"FENIX-{self.certificate_id.hex[:8].upper()}"
        
        if not self.verification_url:
            self.verification_url = f"/verify/{self.certificate_id}"
        
        super().save(*args, **kwargs)
        
        # Generate QR code if not exists
        if not self.qr_code:
            self.generate_qr_code()
    
    def generate_qr_code(self):
        """Generate QR code for certificate verification"""
        verification_url = f"https://fenixacademy.com{self.verification_url}"
        
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(verification_url)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Save to BytesIO
        buffer = BytesIO()
        img.save(buffer, format='PNG')
        buffer.seek(0)
        
        # Save to model
        filename = f"qr_code_{self.certificate_id}.png"
        self.qr_code.save(filename, File(buffer), save=False)
        self.save()
    
    def get_title(self, language='en'):
        """Get localized title"""
        if language == 'pt' and self.title_pt:
            return self.title_pt
        return self.title
    
    def get_description(self, language='en'):
        """Get localized description"""
        if language == 'pt' and self.description_pt:
            return self.description_pt
        return self.description
    
    def get_issued_by(self, language='en'):
        """Get localized issuer name"""
        if language == 'pt' and self.issued_by_pt:
            return self.issued_by_pt
        return self.issued_by
    
    @property
    def is_valid(self):
        """Check if certificate is valid"""
        return self.status in ['generated', 'issued'] and not self.is_verified
    
    def verify_certificate(self):
        """Mark certificate as verified"""
        self.is_verified = True
        self.save()
    
    def revoke_certificate(self):
        """Revoke certificate"""
        self.status = 'revoked'
        self.save()


class CertificateTemplate(models.Model):
    """
    Certificate templates for different designs
    """
    name = models.CharField(max_length=100)
    name_pt = models.CharField(max_length=100, blank=True, help_text="Portuguese name")
    description = models.TextField(blank=True)
    description_pt = models.TextField(blank=True, help_text="Portuguese description")
    
    # Template files
    html_template = models.TextField(help_text="HTML template for certificate")
    css_styles = models.TextField(help_text="CSS styles for certificate")
    
    # Template settings
    width = models.IntegerField(default=1200, help_text="Certificate width in pixels")
    height = models.IntegerField(default=800, help_text="Certificate height in pixels")
    background_color = models.CharField(max_length=7, default="#FFFFFF", help_text="Background color")
    text_color = models.CharField(max_length=7, default="#000000", help_text="Text color")
    
    # Logo and branding
    logo_url = models.URLField(blank=True)
    logo_position = models.CharField(
        max_length=20,
        choices=[
            ('top-left', 'Top Left'),
            ('top-center', 'Top Center'),
            ('top-right', 'Top Right'),
            ('center-left', 'Center Left'),
            ('center', 'Center'),
            ('center-right', 'Center Right'),
            ('bottom-left', 'Bottom Left'),
            ('bottom-center', 'Bottom Center'),
            ('bottom-right', 'Bottom Right'),
        ],
        default='top-center'
    )
    
    # Font settings
    title_font = models.CharField(max_length=100, default="Arial, sans-serif")
    body_font = models.CharField(max_length=100, default="Arial, sans-serif")
    title_font_size = models.IntegerField(default=48)
    body_font_size = models.IntegerField(default=16)
    
    # Template metadata
    is_active = models.BooleanField(default=True)
    is_default = models.BooleanField(default=False)
    language = models.CharField(max_length=2, choices=[('en', 'English'), ('pt', 'Português')], default='en')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('certificate template')
        verbose_name_plural = _('certificate templates')
        db_table = 'certificate_templates'
    
    def __str__(self):
        return self.name
    
    def get_name(self, language='en'):
        """Get localized name"""
        if language == 'pt' and self.name_pt:
            return self.name_pt
        return self.name
    
    def get_description(self, language='en'):
        """Get localized description"""
        if language == 'pt' and self.description_pt:
            return self.description_pt
        return self.description


class CertificateVerification(models.Model):
    """
    Certificate verification logs
    """
    certificate = models.ForeignKey(Certificate, on_delete=models.CASCADE, related_name='verifications')
    verified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='verifications_made')
    
    # Verification details
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    verification_method = models.CharField(
        max_length=20,
        choices=[
            ('qr_code', 'QR Code'),
            ('url', 'Direct URL'),
            ('api', 'API'),
            ('admin', 'Admin Panel'),
        ],
        default='url'
    )
    
    # Verification result
    is_successful = models.BooleanField(default=True)
    error_message = models.TextField(blank=True)
    
    # Timestamps
    verified_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('certificate verification')
        verbose_name_plural = _('certificate verifications')
        db_table = 'certificate_verifications'
        indexes = [
            models.Index(fields=['certificate', 'verified_at']),
            models.Index(fields=['verified_at']),
        ]
    
    def __str__(self):
        return f"Verification of {self.certificate.certificate_number} at {self.verified_at}"


class CertificateAchievement(models.Model):
    """
    Additional achievements and badges for certificates
    """
    ACHIEVEMENT_TYPE_CHOICES = [
        ('completion', 'Course Completion'),
        ('excellence', 'Academic Excellence'),
        ('speed', 'Fast Completion'),
        ('participation', 'High Participation'),
        ('helping', 'Helping Others'),
        ('innovation', 'Innovation'),
        ('leadership', 'Leadership'),
        ('persistence', 'Persistence'),
    ]
    
    certificate = models.ForeignKey(Certificate, on_delete=models.CASCADE, related_name='achievements')
    achievement_type = models.CharField(max_length=20, choices=ACHIEVEMENT_TYPE_CHOICES)
    
    # Achievement details
    title = models.CharField(max_length=200)
    title_pt = models.CharField(max_length=200, blank=True, help_text="Portuguese title")
    description = models.TextField()
    description_pt = models.TextField(blank=True, help_text="Portuguese description")
    
    # Achievement data
    criteria_met = models.JSONField(default=dict, help_text="Criteria that were met")
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    
    # Visual elements
    icon = models.CharField(max_length=50, blank=True, help_text="Icon class or emoji")
    color = models.CharField(max_length=7, default="#FFD700", help_text="Achievement color")
    
    # Timestamps
    awarded_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('certificate achievement')
        verbose_name_plural = _('certificate achievements')
        db_table = 'certificate_achievements'
        unique_together = ['certificate', 'achievement_type']
    
    def __str__(self):
        return f"{self.certificate.certificate_number} - {self.title}"
    
    def get_title(self, language='en'):
        """Get localized title"""
        if language == 'pt' and self.title_pt:
            return self.title_pt
        return self.title
    
    def get_description(self, language='en'):
        """Get localized description"""
        if language == 'pt' and self.description_pt:
            return self.description_pt
        return self.description 