import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

FOUNDERS_PRICE_CENTS = 9700  # R$97,00 em centavos
FOUNDERS_CURRENCY = "brl"

# Função utilitária para criar sessão de pagamento founders

def create_founders_checkout_session(user_email):
    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=[{
            "price_data": {
                "currency": FOUNDERS_CURRENCY,
                "product_data": {
                    "name": "Fênix Dev Academy - Founder Lifetime Access",
                },
                "unit_amount": FOUNDERS_PRICE_CENTS,
            },
            "quantity": 1,
        }],
        mode="payment",
        customer_email=user_email,
        success_url=settings.FOUNDERS_SUCCESS_URL,
        cancel_url=settings.FOUNDERS_CANCEL_URL,
    )
    return session 