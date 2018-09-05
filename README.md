## Desafio Dito
Autor: Pedro Matias

### **Linguagem utilizada** 
A solução foi desenvolvida utilizando Node.js/Javascript.

### **Comando para a execução do código**
```node app.js```

### **Comentários gerais sobre a solução**
Utilizando o método “reduce”, nativo do Javascript, iterou-se sobre cada elemento do JSON fornecido. A cada iteração em um determinado elemento (evento) do JSON, acumula a resposta no vetor “array” e ao final de todos os elementos iterados, retorna “array” e grava na variavel timeline. O valor inicial de “array” é um array vazio. Para cada iteração, verifica se o valor da chave “transaction_id” já existe no vetor de resposta parcial e, além disso, checa se o evento é do tipo “comprou” ou “comprou-produto”. Após isso, executa os seguintes passos (ainda a cada iteração):

1. Caso o evento seja do tipo “comprou” e o valor da chave “transaction_id” do evento
ainda não exista no vetor resposta parcial (“array”), insere o evento no array,
deixando a lista de produtos vazia

2. Caso o evento seja do tipo “comprou-produto” e o valor da chave “transaction_id” do
evento ainda não exista no vetor resposta parcial (“array”), insere o evento no array,
deixando os campos “timestamp”, “revenue” e “store_name” como nulos, e adiciona
o produto no array produtos da resposta parcial (“array.products”)
3. Caso o evento seja do tipo “comprou” e o valor da chave “transaction_id” do evento já
exista no vetor resposta parcial (“array”), é porque o evento já foi inserido a partir de
um evento do tipo “comprou-produto”. Assim, apenas atualiza os valores de
“timestamp”, “revenue” e “store_name”, caso sejam nulos

4. Por fim, caso o evento seja do tipo “comprou-produto” e o valor da chave
“transaction_id” do evento já exista no vetor resposta parcial (“array”), é porque o
evento já foi inserido a partir de um evento do tipo “comprou”. Desta forma, apenas
incrementa a lista de produtos adicionando o produto em questão.

Ao final, com o vetor preenchido corretamente, apenas ordena-o pelo “timestamp”.
