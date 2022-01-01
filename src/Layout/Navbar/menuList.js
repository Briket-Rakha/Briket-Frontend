import RouteList from 'router/RouteList';

export default [
  {
    id: 0,
    name: 'PRODUCTION MODEL',
    route: RouteList.production.dashboard,
    sub: [
      {
        id: 0,
        name: 'DASHBOARD',
        route: RouteList.production.dashboard,
      },
      {
        id: 1,
        name: 'INPUT',
        sub: [
          {
            id: 0,
            name: 'SELF PRODUCE',
            sub: [
              {
                id: 0,
                name: 'RAW MATERIAL',
                route: RouteList.production.input.selfProduce.rawMaterial,
              },
              {
                id: 1,
                name: 'FACTORY PRODUCTION',
                route: RouteList.production.input.selfProduce.hasilProduksi,
              },
            ],
          },
          {
            id: 1,
            name: 'OUTSOURCE',
            sub: [
              {
                id: 0,
                name: 'CHARCOAL',
                route: RouteList.production.input.outSource.charcoal,
              },
              {
                id: 1,
                name: 'PAYMENT',
                route: RouteList.production.input.outSource.payment,
              },
            ],
          },
          {
            id: 2,
            name: 'PACKAGING',
            route: RouteList.production.input.packaging,
          },
        ],
      },
      {
        id: 2,
        name: 'PAYMENT TIMELINE',
        route: RouteList.production.payment,
      },
      {
        id: 3,
        name: 'MANAGE',
        route: RouteList.production.manage,
      },
    ],
  },
  {
    id: 1,
    name: 'SHIPPING MODEL',
    route: RouteList.shipping.dashboard,
    sub: [
      {
        id: 0,
        name: 'DASHBOARD',
        route: RouteList.shipping.dashboard,
      },
      {
        id: 1,
        name: 'INPUT',
        route: RouteList.shipping.input,
      },
    ],
  },
  {
    id: 2,
    name: 'WAREHOUSE MODEL',
    route: RouteList.warehouse.dashboard,
    sub: [
      {
        id: 0,
        name: 'DASHBOARD',
        route: RouteList.warehouse.dashboard,
      },
      {
        id: 1,
        name: 'INPUT',
        sub: [
          {
            id: 0,
            name: 'WAREHOUSE',
            route: RouteList.warehouse.input,
          },
          {
            id: 1,
            name: 'NATIONAL PRICE',
            route: RouteList.warehouse.nationalPrice,
          },
        ],
      },
    ],
  },
];
