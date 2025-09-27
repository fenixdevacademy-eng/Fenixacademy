import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Carregar dados
df = pd.read_csv('data.csv')

# Análise exploratória
print(df.info())
print(df.describe())

# Visualização
plt.figure(figsize=(10, 6))
sns.histplot(df['coluna'])
plt.title('Distribuição dos Dados')
plt.show()

# Análise estatística
correlation = df.corr()
sns.heatmap(correlation, annot=True)
plt.show()
