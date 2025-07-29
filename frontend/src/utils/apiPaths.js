export const BASE_URL = 'http://localhost:8000';

export const API_PATHS = {
  AUTH: {
    LOGIN: `/api/v1/auth/login/`,
    SIGNUP: `/api/v1/auth/register/`,
    GET_USER: `/api/v1/auth/user/`,
  },
  DASHBOARD: {
    DATA: `/api/v1/dashboard/data`,
  },
  EXPENSE: {
    GET_ALL: `/api/v1/expense/all`,
    ADD: `/api/v1/expense/add`,
    DELETE: `/api/v1/expense/:id`,
    UPDATE: `/api/v1/expense/update/:id`,
  },
  Image: {
    UPLOAD: `/api/v1/auth/upload`,
  },
  INCOME: {
    GET_ALL: `/api/v1/income/all`,
    ADD: `/api/v1/income/add`,
    DELETE: `/api/v1/income/:id`,
    DOWNLOAD: `/api/v1/income/download-excel`,
  },
};