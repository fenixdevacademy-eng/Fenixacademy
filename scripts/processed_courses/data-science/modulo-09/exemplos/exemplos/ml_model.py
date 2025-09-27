from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import pandas as pd
import numpy as np

# Carregar dados
# df = pd.read_csv('data.csv')

# Dados de exemplo
np.random.seed(42)
X = np.random.randn(100, 4)
y = np.random.randint(0, 2, 100)

# Dividir dados
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Treinar modelo
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Fazer previsões
y_pred = model.predict(X_test)

# Avaliar modelo
accuracy = accuracy_score(y_test, y_pred)
print(f'Acurácia: {accuracy:.2f}')

print('\nRelatório de Classificação:')
print(classification_report(y_test, y_pred))

# Importância das features
feature_importance = model.feature_importances_
print('\nImportância das Features:')
for i, importance in enumerate(feature_importance):
    print(f'Feature {i}: {importance:.3f}')
