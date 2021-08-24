'use strict';

import {
  converterCustomDataParaJson,
  obterDadosEventoComprou,
  gerarNovoEventoComprou,
  gerarEventoComprouAtualizado,
  getDadosProdutoEventoComprouProduto,
  gerarNovoEventoComprouProduto,
  gerarEventoComprouProdutoAtualizado,
} from "./helpers.js";

const getPerformaticTimeline = (input) => {
  const { events: eventos } = input;

  const timelinePorTransactionId = eventos.reduce(
    (timelinePorTransactionId, evento) => {
      const eventoCustomDataJson = converterCustomDataParaJson(evento);
      const { transaction_id: transactionId } = eventoCustomDataJson;

      const ehEventoComprou = evento.event === "comprou";
      const eventoPresenteNaTimeline = Boolean(
        timelinePorTransactionId[transactionId]
      );

      if (ehEventoComprou) {
        const dadosEventoComprou = obterDadosEventoComprou(
          evento,
          transactionId,
          eventoCustomDataJson
        );

        timelinePorTransactionId[transactionId] = !eventoPresenteNaTimeline
          ? gerarNovoEventoComprou(dadosEventoComprou)
          : gerarEventoComprouAtualizado(
              timelinePorTransactionId[transactionId],
              dadosEventoComprou
            );

        return timelinePorTransactionId;
      }

      const dadosProduto =
        getDadosProdutoEventoComprouProduto(eventoCustomDataJson);

      timelinePorTransactionId[transactionId] = !eventoPresenteNaTimeline
        ? gerarNovoEventoComprouProduto(dadosProduto)
        : gerarEventoComprouProdutoAtualizado(
            timelinePorTransactionId[transactionId],
            dadosProduto
          );

      return timelinePorTransactionId;
    },
    {}
  );

  return {
    timeline: Object.keys(timelinePorTransactionId)
      .map((key) => timelinePorTransactionId[key])
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp)),
  };
};

export default getPerformaticTimeline;
