'use strict';

function converterCustomDataParaJson(evento) {
  return evento.custom_data.reduce(
    (customDataEventoObj, customData) => ({
      ...customDataEventoObj,
      [customData.key]: customData.value,
    }),
    {}
  );
}

function obterDadosEventoComprou(evento, transactionId, eventoCustomDataJson) {
  const { store_name: storeName } = eventoCustomDataJson;

  return {
    timestamp: evento.timestamp,
    revenue: evento.revenue,
    transaction_id: transactionId,
    store_name: storeName,
  };
}

function gerarNovoEventoComprou(dadosEvento) {
  return {
    ...dadosEvento,
    products: [],
  };
}

function gerarEventoComprouAtualizado(eventoComprou, dadosEvento) {
  return { ...dadosEvento, ...eventoComprou };
}

function getDadosProdutoEventoComprouProduto(eventoCustomDataJson) {
  const { product_name, product_price } = eventoCustomDataJson;

  return {
    product_name,
    product_price,
  };
}

function gerarNovoEventoComprouProduto(dadosProduto) {
  return {
    products: [
      {
        name: dadosProduto.product_name,
        price: dadosProduto.product_price,
      },
    ],
  };
}

function gerarEventoComprouProdutoAtualizado(
  eventoComprouProduto,
  dadosProduto
) {
  return {
    ...eventoComprouProduto,
    products: [
      ...eventoComprouProduto.products,
      {
        name: dadosProduto.product_name,
        price: dadosProduto.product_price,
      },
    ],
  };
}

export {
  converterCustomDataParaJson,
  obterDadosEventoComprou,
  gerarNovoEventoComprou,
  gerarEventoComprouAtualizado,
  getDadosProdutoEventoComprouProduto,
  gerarNovoEventoComprouProduto,
  gerarEventoComprouProdutoAtualizado,
};
