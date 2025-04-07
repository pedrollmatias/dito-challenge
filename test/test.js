"use strict";

import { test } from "tap";
import input from "./input.js";

import { getEasyTimeline, getPerformaticTimeline } from "../src/index.js";

const output = {
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
};

test("Deve retornar eventos saída esperada", async (t) => {
  // API requer credenciais de acesso. Alternativamente, utiliza o arquivo local para input
  // const response = await fetch('https://storage.googleapis.com/dito-questions/events.json');
  // const input = await response.json();

  t.same(JSON.stringify(output), JSON.stringify(getEasyTimeline(input)));
  t.same(JSON.stringify(output), JSON.stringify(getPerformaticTimeline(input)));
  t.end();
});
