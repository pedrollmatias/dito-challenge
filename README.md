# **Dito Challange**

A Dito coleta bilhões de eventos de comportamento on/offline e um dos desafios diários é gerar valor para os usuários através de informações consistentes e acessíveis.

Esse desafio é composto por um problema de **Manipulação de Dados**.

O objetivo é criar uma timeline de compras a partir dos eventos disponíveis neste endpoint: https://storage.googleapis.com/dito-questions/events.json​.

Um evento representa um comportamento de uma pessoa, seja no mundo online ou offline. Quando uma pessoa faz uma compra, um evento ​`comprou`​ é gerado contendo o total de receita gerada e o nome da loja. Para cada produto dessa compra é gerado um evento ​`comprou-produto​`, contendo o nome e preço do produto.

Você deve implementar uma função, em qualquer linguagem de programação, que consuma esse endpoint e agrupe as compras pelo campo ​`transaction_id​`. Cada item da timeline deve representar uma compra em uma determinada loja e deve conter uma **​lista​** com os produtos comprados.

A timeline deve ser ​ordenada​ pelo campo ​`timestamp​` na ordem decrescente.

A resposta esperada dessa função é a seguinte:

```javascript
{
  timeline: [
    {
      timestamp: "2016-10-02T11:37:31.2300892-03:00",
      revenue: 120.0,
      transaction_id: "3409340",
      store_name: "BH Shopping",
      products: [
        {
          name: "Tenis Preto",
          price: 120,
        },
      ],
    },
    {
      timestamp: "2016-09-22T13:57:31.2311892-03:00",
      revenue: 250.0,
      transaction_id: "3029384",
      store_name: "Patio Savassi",
      products: [
        {
          name: "Camisa Azul",
          price: 100,
        },
        {
          name: "Calça Rosa",
          price: 150,
        },
      ],
    },
  ],
}
```

### Critérios de avaliação

- Simplicidade da solução;
- Complexidade algorítmica;
- Boas práticas de desenvolvimento de software;
- Diferencial: utilização de conceitos de programação funcional.

# **Solução**

A solução foi desenvolvida em Node.js/Javascript. Foram feitas duas implementações, uma com foco em manutenção, priorizando facilidade de entendimento e outra mais complexa e performática. A requisição http foi feita utilizando o [fetch](https://www.npmjs.com/package/node-fetch) e os algoritmos foram testados com o [tap](https://www.npmjs.com/package/tap).

Para execução das funções, basta executar o `npm install` e posteriormente o script `npm run test`.

Autor: Pedro Matias
