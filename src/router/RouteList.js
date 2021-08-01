const RouteList = {
  production: {
    dashboard: '/',
    manage: '/manage',
    input: {
      selfProduce: {
        rawMaterial: '/raw-material',
        hasilProduksi: '/hasil-produksi',
      },
      outSource: {
        charcoal: '/outsource/charcoal',
        payment: '/outsource/payment',
      },
      packaging: '/packaging',
    },
    payment: '/production/payment',
  },
  login: {
    root: '/login',
  },
  register: {
    root: '/register',
  },
};

export default RouteList;
