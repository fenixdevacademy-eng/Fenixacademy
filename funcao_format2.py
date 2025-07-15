produtos = []
valores = []

for i in range(3):
    produto = input("Digite o nome do produto {}: ".format(i+1))
    valor = float(input("Digite o valor do produto {}: ".format(i+1)))

    produtos.append(produto)
    valores.append(valor)
  
  for produto, valor in zip(produtos, valores):
    print("o valor de {} é R$ {:.2f}".format(produto, valor))



