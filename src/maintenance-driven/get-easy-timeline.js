'use strict';

import {
  agruparProdutosPorTransactionId,
  extrairProdutosFormatados,
  extrairEventosComprouFormatadosEOrdenados,
  mesclarEventosComprouEProdutos,
} from "./helpers.js";

const getEasyTimeline = (input) => {
  const eventos = input.events;

  const eventosComprou = extrairEventosComprouFormatadosEOrdenados(eventos);

  const produtos = extrairProdutosFormatados(eventos);
  const produtosAgrupadosPorTransactionId =
    agruparProdutosPorTransactionId(produtos);

  const timeline = mesclarEventosComprouEProdutos(
    eventosComprou,
    produtosAgrupadosPorTransactionId
  );

  return { timeline };
};

export default getEasyTimeline;
