import DataService from '../DataService';
import fetchAction from './fetch';

export const APPS_REQUEST = 'APPS_REQUEST';
export const APPS_SUCCESS = 'APPS_SUCCESS';
export const APPS_FAILURE = 'APPS_FAILURE';

export const fetchApps = fetchAction(
  [APPS_REQUEST, APPS_SUCCESS, APPS_FAILURE],
  DataService.mobileClients,
);

export const APP_CREATE_REQUEST = 'APP_CREATE_REQUEST';
export const APP_CREATE_SUCCESS = 'APP_CREATE_SUCCESS';
export const APP_CREATE_FAILURE = 'APP_CREATE_FAILURE';

export const createApp = app => fetchAction(
  [APP_CREATE_REQUEST, APP_CREATE_SUCCESS, APP_CREATE_FAILURE],
  async () => DataService.createApp(app),
)();

export const APP_DELETE_REQUEST = 'APP_DELETE_REQUEST';
export const APP_DELETE_SUCCESS = 'APP_DELETE_SUCCESS';
export const APP_DELETE_FAILURE = 'APP_DELETE_FAILURE';

export const deleteApp = name => fetchAction(
  [APP_DELETE_REQUEST, APP_DELETE_SUCCESS, APP_DELETE_FAILURE],
  async () => DataService.deleteApp(name),
)();
