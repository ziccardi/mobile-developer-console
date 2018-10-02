import {
  BUILD_CONFIGS_REQUEST,
  BUILD_CONFIGS_SUCCESS,
  BUILD_CONFIGS_FAILURE,
  BUILD_CONFIG_DELETE_REQUEST,
  BUILD_CONFIG_DELETE_SUCCESS,
  BUILD_CONFIG_DELETE_FAILURE,
  BUILD_CONFIG_CREATE_REQUEST,
  BUILD_CONFIG_CREATE_SUCCESS,
  BUILD_CONFIG_CREATE_FAILURE,
} from '../actions/buildConfigs';
import resourceReducer from './resource';

const buildConfigs = resourceReducer({
  createRequest: BUILD_CONFIG_CREATE_REQUEST,
  createSuccess: BUILD_CONFIG_CREATE_SUCCESS,
  createFailure: BUILD_CONFIG_CREATE_FAILURE,
  listRequest: BUILD_CONFIGS_REQUEST,
  listSuccess: BUILD_CONFIGS_SUCCESS,
  listFailure: BUILD_CONFIGS_FAILURE,
  deleteRequest: BUILD_CONFIG_DELETE_REQUEST,
  deleteSuccess: BUILD_CONFIG_DELETE_SUCCESS,
  deleteFailure: BUILD_CONFIG_DELETE_FAILURE,
});

export default buildConfigs;
