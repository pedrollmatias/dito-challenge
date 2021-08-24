'use strict';

function converterCustomDataParaJson(customData) {
  return customData.reduce(
    (customDataObj, customData) => ({
      ...customDataObj,
      [customData.key]: customData.value,
    }),
    {}
  );
}

function extrairEventosComprouFormatadosEOrdenados(eventos) {
  return eventos
    .filter((evento) => evento.event === "comprou")
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .map((evento) => {
      const dadosEventoComprou = converterCustomDataParaJson(
        evento.custom_data
      );

      return {
        timestamp: evento.timestamp,
        revenue: evento.revenue,
        transaction_id: dadosEventoComprou.transaction_id,
        store_name: dadosEventoComprou.store_name,
      };
    });
}

function extrairProdutosFormatados(eventos) {
  return eventos
    .filter((evento) => evento.event === "comprou-produto")
    .map((produto) => {
      const dadosProduto = converterCustomDataParaJson(produto.custom_data);

      return {
        transaction_id: dadosProduto.transaction_id,
        name: dadosProduto.product_name,
        price: dadosProduto.product_price,
      };
    });
}

function agruparProdutosPorTransactionId(produtos) {
  return produtos.reduce((produtosAgrupados, produto) => {
    produtosAgrupados[produto.transaction_id] = [
      ...(produtosAgrupados[produto.transaction_id] || []),
      {
        name: produto.name,
        price: produto.price,
      },
    ];

    return produtosAgrupados;
  }, {});
}

function mesclarEventosComprouEProdutos(eventosComprou, produtos) {
  return eventosComprou.map((eventoComprou) => ({
    ...eventoComprou,
    products: produtos[eventoComprou.transaction_id],
  }));
}

export {
  converterCustomDataParaJson,
  agruparProdutosPorTransactionId,
  extrairProdutosFormatados,
  extrairEventosComprouFormatadosEOrdenados,
  mesclarEventosComprouEProdutos
};
