from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator
# from courses.models import Course  # Removido para evitar ciclo de importação
import uuid

User = get_user_model()

class Payment(models.Model):
    """
    Payment records for course purchases
    """
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
    ]
    
    CURRENCY_CHOICES = [
        ('usd', 'USD'),
        ('brl', 'BRL'),
    ]
    
    PAYMENT_METHOD_CHOICES = [
        ('stripe', 'Stripe'),
        ('pix', 'PIX'),
        ('boleto', 'Boleto'),
        ('credit_card', 'Credit Card'),
        ('debit_card', 'Debit Card'),
        ('bank_transfer', 'Bank Transfer'),
    ]
    
    # Basic information
    payment_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='payments')
    
    # Payment details
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default='usd')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default='stripe')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Stripe integration
    stripe_payment_intent_id = models.CharField(max_length=255, blank=True)
    stripe_charge_id = models.CharField(max_length=255, blank=True)
    stripe_customer_id = models.CharField(max_length=255, blank=True)
    
    # Payment metadata
    description = models.TextField(blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        verbose_name = _('payment')
        verbose_name_plural = _('payments')
        db_table = 'payments'
        indexes = [
            models.Index(fields=['payment_id']),
            models.Index(fields=['user', 'status']),
            models.Index(fields=['course', 'status']),
            models.Index(fields=['created_at']),
            models.Index(fields=['stripe_payment_intent_id']),
        ]
    
    def __str__(self):
        return f"Payment {self.payment_id} - {self.user.email} - {self.course.title}"
    
    @property
    def formatted_amount(self):
        """Get formatted amount with currency symbol"""
        if self.currency == 'usd':
            return f"${self.amount}"
        elif self.currency == 'brl':
            return f"R$ {self.amount}"
        return f"{self.amount} {self.currency.upper()}"
    
    @property
    def is_successful(self):
        """Check if payment was successful"""
        return self.status == 'completed'
    
    @property
    def is_pending(self):
        """Check if payment is pending"""
        return self.status in ['pending', 'processing']
    
    @property
    def is_failed(self):
        """Check if payment failed"""
        return self.status in ['failed', 'cancelled']


class Subscription(models.Model):
    """
    Subscription plans and recurring payments
    """
    PLAN_TYPE_CHOICES = [
        ('monthly', 'Monthly'),
        ('quarterly', 'Quarterly'),
        ('yearly', 'Yearly'),
        ('lifetime', 'Lifetime'),
    ]
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('cancelled', 'Cancelled'),
        ('expired', 'Expired'),
        ('paused', 'Paused'),
    ]
    
    # Basic information
    subscription_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscriptions')
    plan_name = models.CharField(max_length=100)
    plan_name_pt = models.CharField(max_length=100, blank=True, help_text="Portuguese plan name")
    plan_type = models.CharField(max_length=20, choices=PLAN_TYPE_CHOICES, default='monthly')
    
    # Pricing
    price_usd = models.DecimalField(max_digits=10, decimal_places=2)
    price_brl = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, choices=[('usd', 'USD'), ('brl', 'BRL')], default='usd')
    
    # Subscription details
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(null=True, blank=True)
    next_billing_date = models.DateTimeField(null=True, blank=True)
    
    # Stripe integration
    stripe_subscription_id = models.CharField(max_length=255, blank=True)
    stripe_customer_id = models.CharField(max_length=255, blank=True)
    
    # Features
    features = models.JSONField(default=list, help_text="List of features included in this plan")
    max_courses = models.IntegerField(default=1, help_text="Maximum number of courses allowed")
    has_certificates = models.BooleanField(default=True)
    has_live_support = models.BooleanField(default=False)
    has_mentor_access = models.BooleanField(default=False)
    
    # Metadata
    metadata = models.JSONField(default=dict, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    cancelled_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        verbose_name = _('subscription')
        verbose_name_plural = _('subscriptions')
        db_table = 'subscriptions'
        indexes = [
            models.Index(fields=['subscription_id']),
            models.Index(fields=['user', 'status']),
            models.Index(fields=['plan_type', 'status']),
            models.Index(fields=['start_date']),
            models.Index(fields=['next_billing_date']),
        ]
    
    def __str__(self):
        return f"Subscription {self.subscription_id} - {self.user.email} - {self.plan_name}"
    
    def get_plan_name(self, language='en'):
        """Get localized plan name"""
        if language == 'pt' and self.plan_name_pt:
            return self.plan_name_pt
        return self.plan_name
    
    @property
    def current_price(self):
        """Get current price based on currency"""
        if self.currency == 'usd':
            return self.price_usd
        return self.price_brl
    
    @property
    def formatted_price(self):
        """Get formatted price with currency symbol"""
        if self.currency == 'usd':
            return f"${self.price_usd}"
        return f"R$ {self.price_brl}"
    
    @property
    def is_active(self):
        """Check if subscription is active"""
        return self.status == 'active'
    
    @property
    def is_expired(self):
        """Check if subscription is expired"""
        if self.end_date:
            from django.utils import timezone
            return timezone.now() > self.end_date
        return False
    
    def cancel_subscription(self):
        """Cancel subscription"""
        from django.utils import timezone
        self.status = 'cancelled'
        self.cancelled_at = timezone.now()
        self.save()


class PaymentMethod(models.Model):
    """
    Stored payment methods for users
    """
    PAYMENT_METHOD_TYPE_CHOICES = [
        ('card', 'Credit/Debit Card'),
        ('bank_account', 'Bank Account'),
        ('pix', 'PIX'),
        ('boleto', 'Boleto'),
    ]
    
    # Basic information
    payment_method_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payment_methods')
    
    # Payment method details
    payment_method_type = models.CharField(max_length=20, choices=PAYMENT_METHOD_TYPE_CHOICES, default='card')
    is_default = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    # Card information (masked)
    card_brand = models.CharField(max_length=20, blank=True)
    card_last4 = models.CharField(max_length=4, blank=True)
    card_exp_month = models.IntegerField(null=True, blank=True)
    card_exp_year = models.IntegerField(null=True, blank=True)
    
    # Stripe integration
    stripe_payment_method_id = models.CharField(max_length=255, blank=True)
    stripe_customer_id = models.CharField(max_length=255, blank=True)
    
    # Metadata
    metadata = models.JSONField(default=dict, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('payment method')
        verbose_name_plural = _('payment methods')
        db_table = 'payment_methods'
        indexes = [
            models.Index(fields=['payment_method_id']),
            models.Index(fields=['user', 'is_active']),
            models.Index(fields=['stripe_payment_method_id']),
        ]
    
    def __str__(self):
        return f"Payment Method {self.payment_method_id} - {self.user.email}"
    
    @property
    def masked_card_number(self):
        """Get masked card number"""
        if self.card_last4:
            return f"**** **** **** {self.card_last4}"
        return "**** **** **** ****"
    
    @property
    def card_expiry(self):
        """Get formatted card expiry"""
        if self.card_exp_month and self.card_exp_year:
            return f"{self.card_exp_month:02d}/{self.card_exp_year}"
        return ""
    
    def set_as_default(self):
        """Set this payment method as default"""
        # Remove default from other payment methods
        PaymentMethod.objects.filter(user=self.user, is_default=True).update(is_default=False)
        # Set this as default
        self.is_default = True
        self.save()


class Refund(models.Model):
    """
    Payment refunds
    """
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
    ]
    
    REASON_CHOICES = [
        ('duplicate', 'Duplicate Charge'),
        ('fraudulent', 'Fraudulent'),
        ('requested_by_customer', 'Requested by Customer'),
        ('defective_product', 'Defective Product'),
        ('not_received', 'Product Not Received'),
        ('other', 'Other'),
    ]
    
    # Basic information
    refund_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name='refunds')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='refunds')
    
    # Refund details
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, choices=[('usd', 'USD'), ('brl', 'BRL')], default='usd')
    reason = models.CharField(max_length=30, choices=REASON_CHOICES, default='requested_by_customer')
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Stripe integration
    stripe_refund_id = models.CharField(max_length=255, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        verbose_name = _('refund')
        verbose_name_plural = _('refunds')
        db_table = 'refunds'
        indexes = [
            models.Index(fields=['refund_id']),
            models.Index(fields=['payment', 'status']),
            models.Index(fields=['user', 'status']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"Refund {self.refund_id} - {self.payment.payment_id}"
    
    @property
    def formatted_amount(self):
        """Get formatted amount with currency symbol"""
        if self.currency == 'usd':
            return f"${self.amount}"
        return f"R$ {self.amount}"
    
    @property
    def is_completed(self):
        """Check if refund is completed"""
        return self.status == 'completed' 