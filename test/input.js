export default {
  events: [
    {
      event: "comprou",
      timestamp: "2016-10-02T11:37:31.2300892-03:00",
      revenue: 120.0,
      custom_data: [
        { key: "transaction_id", value: "3409340" },
        { key: "store_name", value: "BH Shopping" },
      ],
    },
    {
      event: "comprou",
      timestamp: "2016-09-22T13:57:31.2311892-03:00",
      revenue: 250.0,
      custom_data: [
        { key: "transaction_id", value: "3029384" },
        { key: "store_name", value: "Patio Savassi" },
      ],
    },
    {
      event: "comprou-produto",
      timestamp: "2016-10-02T11:37:32.0000000-03:00",
      custom_data: [
        { key: "transaction_id", value: "3409340" },
        { key: "product_name", value: "Tenis Preto" },
        { key: "product_price", value: 120 },
      ],
    },
    {
      event: "comprou-produto",
      timestamp: "2016-09-22T13:57:32.0000000-03:00",
      custom_data: [
        { key: "transaction_id", value: "3029384" },
        { key: "product_name", value: "Camisa Azul" },
        { key: "product_price", value: 100 },
      ],
    },
    {
      event: "comprou-produto",
      timestamp: "2016-09-22T13:57:33.0000000-03:00",
      custom_data: [
        { key: "transaction_id", value: "3029384" },
        { key: "product_name", value: "Calça Rosa" },
        { key: "product_price", value: 150 },
      ],
    }
  ],
};
