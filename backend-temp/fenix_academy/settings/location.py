"""
Configurações de localização para Rio de Janeiro
"""

# Informações de localização
LOCATION_CONFIG = {
    'city': 'Rio de Janeiro',
    'state': 'RJ',
    'country': 'Brasil',
    'timezone': 'America/Sao_Paulo',
    'address': 'Rio de Janeiro, RJ, Brasil',
    'coordinates': {
        'latitude': -22.9068,
        'longitude': -43.1729,
    },
    'phone': '+55 21',
    'currency': 'BRL',
    'language': 'pt-br',
}

# Configurações de fuso horário
TIME_ZONE = LOCATION_CONFIG['timezone']
LANGUAGE_CODE = LOCATION_CONFIG['language']

# Configurações de moeda
CURRENCY = LOCATION_CONFIG['currency']
CURRENCY_SYMBOL = 'R$'

# Configurações de telefone
PHONE_COUNTRY_CODE = '55'
PHONE_AREA_CODE = '21'

# Configurações de endereço
ADDRESS_FORMAT = {
    'street': 'Rua',
    'number': 'Número',
    'complement': 'Complemento',
    'neighborhood': 'Bairro',
    'city': 'Cidade',
    'state': 'Estado',
    'zipcode': 'CEP',
    'country': 'País',
}

# Configurações de data e hora
DATE_FORMAT = 'd/m/Y'
TIME_FORMAT = 'H:i'
DATETIME_FORMAT = 'd/m/Y H:i'

# Configurações de números
DECIMAL_SEPARATOR = ','
THOUSAND_SEPARATOR = '.'
NUMBER_GROUPING = 3 