const RouteList = {
  production: {
    dashboard: '/',
    input: {
      selfProduce: {
        rawMaterial: '/raw-material',
        hasilProduksi: '/hasil-produksi',
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
