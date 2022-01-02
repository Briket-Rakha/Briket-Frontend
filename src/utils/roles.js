import RouteList from 'router/RouteList';

export const ROLES = {
  ADMIN: 0,
  CEO: 1,
  MANAGER_INDO: 2,
  MANAGER_BRAZIL: 3,
  SALES: 4,
};

export const DEFAULT_REDIRECT = {
  [ROLES.ADMIN]: RouteList.production.dashboard,
  [ROLES.CEO]: RouteList.production.dashboard,
  [ROLES.MANAGER_INDO]: RouteList.production.dashboard,
  [ROLES.MANAGER_BRAZIL]: RouteList.production.dashboard,
  [ROLES.SALES]: RouteList.sales.dashboard,
};

export const PAGE_ACCESS = {
  ADMIN: [ROLES.ADMIN],
  PRODUCTION: {
    DASHBOARD: [ROLES.ADMIN, ROLES.CEO, ROLES.MANAGER_INDO, ROLES.MANAGER_BRAZIL],
    PAYMENT_TIMELINE: [ROLES.ADMIN, ROLES.CEO, ROLES.MANAGER_INDO, ROLES.MANAGER_BRAZIL],
    INPUT: [ROLES.ADMIN, ROLES.CEO, ROLES.MANAGER_INDO],
    MANAGE: [ROLES.ADMIN, ROLES.CEO, ROLES.MANAGER_INDO],
  },
  SHIPPING: {
    DASHBOARD: [ROLES.ADMIN, ROLES.CEO, ROLES.MANAGER_INDO, ROLES.MANAGER_BRAZIL],
    INPUT: [ROLES.ADMIN, ROLES.CEO, ROLES.MANAGER_INDO],
  },
  WAREHOUSE: {
    DASHBOARD: [ROLES.ADMIN, ROLES.CEO, ROLES.MANAGER_INDO, ROLES.MANAGER_BRAZIL],
    INPUT: [ROLES.ADMIN, ROLES.CEO, ROLES.MANAGER_BRAZIL],
    NATIONAL_PRICE: [ROLES.ADMIN, ROLES.CEO, ROLES.MANAGER_INDO, ROLES.MANAGER_BRAZIL],
  },
  SALES: {
    DASHBOARD: [ROLES.ADMIN, ROLES.CEO, ROLES.MANAGER_INDO, ROLES.MANAGER_BRAZIL, ROLES.SALES],
    INPUT: [ROLES.ADMIN, ROLES.SALES],
    TRANSACTION: [ROLES.ADMIN, ROLES.SALES],
    MY_PERFORMANCE: [ROLES.ADMIN, ROLES.SALES],
  },
};

export const hasAccess = (role, pageAccess) => {
  return pageAccess.includes(role);
};