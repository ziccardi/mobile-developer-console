import DataService from '../DataService';
import fetchAction from './fetch';

export const BUILDS_REQUEST = 'BUILDS_REQUEST';
export const BUILDS_SUCCESS = 'BUILDS_SUCCESS';
export const BUILDS_FAILURE = 'BUILDS_FAILURE';

export const fetchBuilds = fetchAction([BUILDS_REQUEST, BUILDS_SUCCESS, BUILDS_FAILURE], DataService.builds);

export const BUILD_TRIGGER_REQUEST = 'BUILD_TRIGGER_REQUEST';
export const BUILD_TRIGGER_SUCCESS = 'BUILD_TRIGGER_SUCCESS';
export const BUILD_TRIGGER_FAILURE = 'BUILD_TRIGGER_FAILURE';

export const triggerBuild = name =>
  fetchAction([BUILD_TRIGGER_REQUEST, BUILD_TRIGGER_SUCCESS, BUILD_TRIGGER_FAILURE], async () =>
    DataService.triggerBuild(name)
  )();

export const BUILD_DOWNLOAD_REQUEST = 'BUILD_DOWNLOAD_REQUEST';
export const BUILD_DOWNLOAD_SUCCESS = 'BUILD_DOWNLOAD_SUCCESS';
export const BUILD_DOWNLOAD_FAILURE = 'BUILD_DOWNLOAD_FAILURE';

export const generateDownloadURL = name =>
  fetchAction([BUILD_DOWNLOAD_REQUEST, BUILD_DOWNLOAD_SUCCESS, BUILD_DOWNLOAD_FAILURE], async () =>
    DataService.generateDownloadURL(name)
  )();
