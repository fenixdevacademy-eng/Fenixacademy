import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

# Configuração do estilo
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

# Dados de exemplo
data = pd.DataFrame({
    'x': np.random.randn(100),
    'y': np.random.randn(100),
    'category': np.random.choice(['A', 'B', 'C'], 100)
})

# Gráfico de dispersão
plt.figure(figsize=(10, 6))
sns.scatterplot(data=data, x='x', y='y', hue='category')
plt.title('Gráfico de Dispersão')
plt.xlabel('Variável X')
plt.ylabel('Variável Y')
plt.legend()
plt.show()

# Histograma
plt.figure(figsize=(10, 6))
plt.hist(data['x'], bins=20, alpha=0.7, color='skyblue')
plt.title('Distribuição da Variável X')
plt.xlabel('Valores')
plt.ylabel('Frequência')
plt.show()

# Box plot
plt.figure(figsize=(10, 6))
sns.boxplot(data=data, x='category', y='y')
plt.title('Box Plot por Categoria')
plt.xlabel('Categoria')
plt.ylabel('Valores Y')
plt.show()
