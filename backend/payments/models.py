from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator
from django.utils import timezone
import uuid
from decimal import Decimal

User = get_user_model()

class Payment(models.Model):
    """
    Enhanced payment records for international edtech platform
    """
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
        ('partially_refunded', 'Partially Refunded'),
        ('disputed', 'Disputed'),
    ]
    
    CURRENCY_CHOICES = [
        ('usd', 'USD'),
        ('brl', 'BRL'),
        ('eur', 'EUR'),
        ('gbp', 'GBP'),
        ('cad', 'CAD'),
        ('aud', 'AUD'),
        ('jpy', 'JPY'),
        ('inr', 'INR'),
        ('mxn', 'MXN'),
        ('ars', 'ARS'),
        ('clp', 'CLP'),
        ('cop', 'COP'),
        ('pen', 'PEN'),
        ('uyu', 'UYU'),
        ('pyg', 'PYG'),
        ('bob', 'BOB'),
        ('cny', 'CNY'),
        ('krw', 'KRW'),
        ('sgd', 'SGD'),
        ('hkd', 'HKD'),
    ]
    
    PAYMENT_METHOD_CHOICES = [
        ('stripe', 'Stripe'),
        ('paypal', 'PayPal'),
        ('pix', 'PIX'),
        ('boleto', 'Boleto'),
        ('credit_card', 'Credit Card'),
        ('debit_card', 'Debit Card'),
        ('bank_transfer', 'Bank Transfer'),
        ('apple_pay', 'Apple Pay'),
        ('google_pay', 'Google Pay'),
        ('alipay', 'Alipay'),
        ('wechat_pay', 'WeChat Pay'),
        ('amazon_pay', 'Amazon Pay'),
        ('klarna', 'Klarna'),
        ('affirm', 'Affirm'),
        ('afterpay', 'Afterpay'),
        ('crypto', 'Cryptocurrency'),
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
    
    # Exchange rates and amounts
    original_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    original_currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, null=True, blank=True)
    exchange_rate = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)
    
    # Fees and taxes
    processing_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    tax_country = models.CharField(max_length=2, blank=True)
    
    # Stripe integration
    stripe_payment_intent_id = models.CharField(max_length=255, blank=True)
    stripe_charge_id = models.CharField(max_length=255, blank=True)
    stripe_customer_id = models.CharField(max_length=255, blank=True)
    stripe_refund_id = models.CharField(max_length=255, blank=True)
    
    # PayPal integration
    paypal_order_id = models.CharField(max_length=255, blank=True)
    paypal_payment_id = models.CharField(max_length=255, blank=True)
    
    # PIX integration (Brazil)
    pix_key = models.CharField(max_length=255, blank=True)
    pix_qr_code = models.TextField(blank=True)
    pix_expires_at = models.DateTimeField(null=True, blank=True)
    
    # Payment metadata
    description = models.TextField(blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    
    # Fraud detection
    risk_score = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    fraud_detected = models.BooleanField(default=False)
    fraud_reason = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    failed_at = models.DateTimeField(null=True, blank=True)
    
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
            models.Index(fields=['currency']),
            models.Index(fields=['payment_method']),
        ]
    
    def __str__(self):
        return f"Payment {self.payment_id} - {self.user.email} - {self.course.title}"
    
    @property
    def formatted_amount(self):
        """Get formatted amount with currency symbol"""
        currency_symbols = {
            'usd': '$', 'brl': 'R$', 'eur': '€', 'gbp': '£', 'cad': 'C$',
            'aud': 'A$', 'jpy': '¥', 'inr': '₹', 'mxn': '$', 'ars': '$',
            'clp': '$', 'cop': '$', 'pen': 'S/', 'uyu': '$', 'pyg': '₲',
            'bob': 'Bs', 'cny': '¥', 'krw': '₩', 'sgd': 'S$', 'hkd': 'HK$'
        }
        symbol = currency_symbols.get(self.currency, self.currency.upper())
        return f"{symbol}{self.amount}"
    
    @property
    def total_amount(self):
        """Get total amount including fees and taxes"""
        return self.amount + self.processing_fee + self.tax_amount
    
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
    
    @property
    def is_refunded(self):
        """Check if payment was refunded"""
        return self.status in ['refunded', 'partially_refunded']
    
    def calculate_tax(self, country_code):
        """Calculate tax based on country"""
        # This would integrate with a tax calculation service
        tax_rates = {
            'BR': Decimal('0.17'),  # Brazil VAT
            'US': Decimal('0.00'),  # US (varies by state)
            'CA': Decimal('0.13'),  # Canada GST/HST
            'AU': Decimal('0.10'),  # Australia GST
            'GB': Decimal('0.20'),  # UK VAT
            'DE': Decimal('0.19'),  # Germany VAT
            'FR': Decimal('0.20'),  # France VAT
        }
        
        rate = tax_rates.get(country_code, Decimal('0.00'))
        self.tax_rate = rate
        self.tax_amount = self.amount * rate
        self.tax_country = country_code
        self.save(update_fields=['tax_rate', 'tax_amount', 'tax_country'])

class Subscription(models.Model):
    """
    Enhanced subscription plans for international users
    """
    PLAN_TYPE_CHOICES = [
        ('monthly', 'Monthly'),
        ('quarterly', 'Quarterly'),
        ('yearly', 'Yearly'),
        ('lifetime', 'Lifetime'),
        ('trial', 'Trial'),
    ]
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('cancelled', 'Cancelled'),
        ('expired', 'Expired'),
        ('paused', 'Paused'),
        ('past_due', 'Past Due'),
        ('unpaid', 'Unpaid'),
        ('trialing', 'Trialing'),
    ]
    
    # Basic information
    subscription_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscriptions')
    plan_name = models.CharField(max_length=100)
    plan_name_pt = models.CharField(max_length=100, blank=True, help_text="Portuguese plan name")
    plan_type = models.CharField(max_length=20, choices=PLAN_TYPE_CHOICES, default='monthly')
    
    # Pricing in multiple currencies
    price_usd = models.DecimalField(max_digits=10, decimal_places=2)
    price_brl = models.DecimalField(max_digits=10, decimal_places=2)
    price_eur = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price_gbp = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price_cad = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price_aud = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Subscription details
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(null=True, blank=True)
    next_billing_date = models.DateTimeField(null=True, blank=True)
    trial_end_date = models.DateTimeField(null=True, blank=True)
    
    # Billing cycle
    billing_cycle = models.CharField(max_length=20, default='monthly')
    billing_interval = models.IntegerField(default=1)  # 1 for monthly, 3 for quarterly, etc.
    
    # Stripe integration
    stripe_subscription_id = models.CharField(max_length=255, blank=True)
    stripe_customer_id = models.CharField(max_length=255, blank=True)
    stripe_price_id = models.CharField(max_length=255, blank=True)
    
    # Features
    features = models.JSONField(default=list, help_text="List of features included in this plan")
    max_courses = models.IntegerField(default=1, help_text="Maximum number of courses allowed")
    has_certificates = models.BooleanField(default=True)
    has_live_support = models.BooleanField(default=False)
    has_mentor_access = models.BooleanField(default=False)
    has_priority_support = models.BooleanField(default=False)
    has_offline_access = models.BooleanField(default=False)
    has_team_features = models.BooleanField(default=False)
    
    # Metadata
    metadata = models.JSONField(default=dict, blank=True)
    cancellation_reason = models.TextField(blank=True)
    reactivation_date = models.DateTimeField(null=True, blank=True)
    
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
            models.Index(fields=['stripe_subscription_id']),
            models.Index(fields=['next_billing_date']),
            models.Index(fields=['trial_end_date']),
        ]
    
    def __str__(self):
        return f"{self.user.email} - {self.plan_name} ({self.status})"
    
    def get_plan_name(self, language='en'):
        """Get localized plan name"""
        if language == 'pt' and self.plan_name_pt:
            return self.plan_name_pt
        return self.plan_name
    
    @property
    def current_price(self):
        """Get current price based on user's currency preference"""
        # This would be determined by user's location/currency preference
        return self.price_usd
    
    @property
    def formatted_price(self):
        """Get formatted price with currency"""
        return f"${self.current_price}"
    
    @property
    def is_active(self):
        """Check if subscription is active"""
        if self.status != 'active':
            return False
        if self.end_date and self.end_date < timezone.now():
            return False
        return True
    
    @property
    def is_expired(self):
        """Check if subscription is expired"""
        if self.end_date and self.end_date < timezone.now():
            return True
        return False
    
    @property
    def is_trialing(self):
        """Check if subscription is in trial period"""
        if self.trial_end_date and self.trial_end_date > timezone.now():
            return True
        return False
    
    @property
    def days_until_expiry(self):
        """Get days until subscription expires"""
        if not self.end_date:
            return None
        delta = self.end_date - timezone.now()
        return max(0, delta.days)
    
    def cancel_subscription(self, reason=""):
        """Cancel subscription"""
        from django.utils import timezone
        self.status = 'cancelled'
        self.cancelled_at = timezone.now()
        self.cancellation_reason = reason
        self.save(update_fields=['status', 'cancelled_at', 'cancellation_reason'])
    
    def reactivate_subscription(self):
        """Reactivate cancelled subscription"""
        self.status = 'active'
        self.reactivation_date = timezone.now()
        self.cancelled_at = None
        self.cancellation_reason = ""
        self.save(update_fields=['status', 'reactivation_date', 'cancelled_at', 'cancellation_reason'])

class PaymentMethod(models.Model):
    """
    Enhanced stored payment methods for international users
    """
    PAYMENT_METHOD_TYPE_CHOICES = [
        ('card', 'Credit/Debit Card'),
        ('bank_account', 'Bank Account'),
        ('pix', 'PIX'),
        ('boleto', 'Boleto'),
        ('paypal', 'PayPal'),
        ('apple_pay', 'Apple Pay'),
        ('google_pay', 'Google Pay'),
        ('alipay', 'Alipay'),
        ('wechat_pay', 'WeChat Pay'),
        ('crypto', 'Cryptocurrency'),
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
    card_country = models.CharField(max_length=2, blank=True)
    
    # Bank account information
    bank_name = models.CharField(max_length=100, blank=True)
    bank_account_last4 = models.CharField(max_length=4, blank=True)
    bank_account_type = models.CharField(max_length=20, blank=True)
    
    # PIX information (Brazil)
    pix_key_type = models.CharField(max_length=20, blank=True)
    pix_key_value = models.CharField(max_length=255, blank=True)
    
    # Stripe integration
    stripe_payment_method_id = models.CharField(max_length=255, blank=True)
    stripe_customer_id = models.CharField(max_length=255, blank=True)
    
    # Metadata
    metadata = models.JSONField(default=dict, blank=True)
    last_used = models.DateTimeField(null=True, blank=True)
    
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
            models.Index(fields=['payment_method_type']),
        ]
    
    def __str__(self):
        return f"{self.payment_method_type} for {self.user.email}"
    
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
        self.save(update_fields=['is_default'])
    
    def deactivate(self):
        """Deactivate payment method"""
        self.is_active = False
        if self.is_default:
            self.is_default = False
        self.save(update_fields=['is_active', 'is_default'])

class Refund(models.Model):
    """
    Enhanced payment refunds for international platform
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
        ('quality_issue', 'Quality Issue'),
        ('technical_issue', 'Technical Issue'),
        ('billing_error', 'Billing Error'),
        ('other', 'Other'),
    ]
    
    # Basic information
    refund_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name='refunds')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='refunds')
    
    # Refund details
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, choices=Payment.CURRENCY_CHOICES, default='usd')
    reason = models.CharField(max_length=30, choices=REASON_CHOICES, default='requested_by_customer')
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Partial refund
    is_partial = models.BooleanField(default=False)
    original_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Stripe integration
    stripe_refund_id = models.CharField(max_length=255, blank=True)
    
    # Metadata
    metadata = models.JSONField(default=dict, blank=True)
    admin_notes = models.TextField(blank=True)
    
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
            models.Index(fields=['payment']),
            models.Index(fields=['user', 'status']),
            models.Index(fields=['created_at']),
            models.Index(fields=['stripe_refund_id']),
        ]
    
    def __str__(self):
        return f"Refund {self.refund_id} - {self.payment.payment_id}"
    
    @property
    def formatted_amount(self):
        """Get formatted amount with currency symbol"""
        currency_symbols = {
            'usd': '$', 'brl': 'R$', 'eur': '€', 'gbp': '£', 'cad': 'C$',
            'aud': 'A$', 'jpy': '¥', 'inr': '₹', 'mxn': '$', 'ars': '$',
        }
        symbol = currency_symbols.get(self.currency, self.currency.upper())
        return f"{symbol}{self.amount}"
    
    @property
    def is_completed(self):
        """Check if refund is completed"""
        return self.status == 'completed'
    
    @property
    def refund_percentage(self):
        """Get refund percentage of original payment"""
        if self.original_amount and self.original_amount > 0:
            return (self.amount / self.original_amount) * 100
        return 0

class Invoice(models.Model):
    """
    Invoice system for international billing
    """
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('open', 'Open'),
        ('paid', 'Paid'),
        ('uncollectible', 'Uncollectible'),
        ('void', 'Void'),
    ]
    
    # Basic information
    invoice_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='invoices')
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name='invoices', null=True, blank=True)
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE, related_name='invoices', null=True, blank=True)
    
    # Invoice details
    invoice_number = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    currency = models.CharField(max_length=3, choices=Payment.CURRENCY_CHOICES, default='usd')
    
    # Amounts
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Billing information
    billing_name = models.CharField(max_length=200)
    billing_email = models.EmailField()
    billing_address = models.TextField(blank=True)
    billing_city = models.CharField(max_length=100, blank=True)
    billing_state = models.CharField(max_length=100, blank=True)
    billing_country = models.CharField(max_length=2, blank=True)
    billing_postal_code = models.CharField(max_length=20, blank=True)
    
    # Tax information
    tax_id = models.CharField(max_length=50, blank=True)
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    
    # Due dates
    issue_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(null=True, blank=True)
    paid_date = models.DateTimeField(null=True, blank=True)
    
    # PDF generation
    pdf_file = models.FileField(upload_to='invoices/', null=True, blank=True)
    pdf_generated = models.BooleanField(default=False)
    
    # Metadata
    notes = models.TextField(blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('invoice')
        verbose_name_plural = _('invoices')
        db_table = 'invoices'
        indexes = [
            models.Index(fields=['invoice_id']),
            models.Index(fields=['user', 'status']),
            models.Index(fields=['invoice_number']),
            models.Index(fields=['due_date']),
        ]
    
    def __str__(self):
        return f"Invoice {self.invoice_number} - {self.user.email}"
    
    @property
    def is_paid(self):
        """Check if invoice is paid"""
        return self.status == 'paid'
    
    @property
    def is_overdue(self):
        """Check if invoice is overdue"""
        if self.due_date and self.due_date < timezone.now() and not self.is_paid:
            return True
        return False
    
    @property
    def days_overdue(self):
        """Get days overdue"""
        if self.is_overdue:
            delta = timezone.now() - self.due_date
            return delta.days
        return 0
    
    def mark_as_paid(self):
        """Mark invoice as paid"""
        from django.utils import timezone
        self.status = 'paid'
        self.paid_date = timezone.now()
        self.save(update_fields=['status', 'paid_date'])
    
    def generate_pdf(self):
        """Generate PDF invoice"""
        # This would integrate with a PDF generation service
        pass 