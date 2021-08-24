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
  shipping: {
    dashboard: '/shipping',
    input: '/shipping/input',
  },
  warehouse: {
    dashboard: '/warehouse',
    input: '/warehouse/input',
  },
  login: {
    root: '/login',
  },
  register: {
    root: '/register',
  },
};

export default RouteList;
