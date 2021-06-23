const RouteList = {
  production: {
    dashboard: '/',
    input: {
      selfProduce: {
        rawMaterial: '/raw-material',
        hasilProduksi: '/hasil-produksi',
      },
      outSource: {
        charcoal: '/outsource/charcoal',
        payment: '/outsource/payment',
      },
    },
    payment: 'production/payment',
  },
  login: {
    root: '/login',
  },
  register: {
    root: '/register',
  },
};

export default RouteList;
