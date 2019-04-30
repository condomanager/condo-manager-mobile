import AsyncStorageService from './AsyncStorageService';

const API_HOST = require('../app.json').api.host;

export default class HTTPService {
  static _instance;

  static getInstance() {
    if (!HTTPService._instance)
      HTTPService._instance = new HTTPService();

    return this._instance;
  };

  getAPIHost = () => {
    return API_HOST;
  };

  getRequestConfig = (httpMethod) => {
    let config = {
      method: httpMethod,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    if (this.token)
      config.headers['Authorization'] = 'Bearer ' + this.token;

    return config;
  };

  _prepareRequest = (method, endpoint, body) => {
    const requestURL    = (this.getAPIHost() + endpoint);
    const requestConfig = this.getRequestConfig(method);

    if (body)
      requestConfig.body = JSON.stringify(body);

    console.info('====== HTTPService prepared request:', {requestURL, ...requestConfig});

    return {requestURL, requestConfig};
  };

  _executeRequest = (url, config) => {
    return fetch(url, config).then((requestResponse) => {
      console.info('====== HTTPService raw response:', requestResponse);
      if (requestResponse.status >= 500)
        throw 'Ocorreu um problema durante o processo de autenticação';
      return requestResponse.json();
    });
  };

  GET = (endpoint) => {
    const { requestURL, requestConfig } = this._prepareRequest('GET', endpoint);

    if (endpoint == '/my-profile')
      return new Promise((resolve, reject) => resolve({ name: 'Fake User', cpf: '00000000000' }));

    return this._executeRequest(requestURL, requestConfig);
  };

  POST = (endpoint, body) => {
    const { requestURL, requestConfig } = this._prepareRequest('POST', endpoint, body);

    if (endpoint == '/login')
      return new Promise((resolve, reject) => resolve({ token: 'fake-token' }));

    return this._executeRequest(requestURL, requestConfig);
  };

  PUT = (endpoint, body) => {
    const { requestURL, requestConfig } = this._prepareRequest('PUT', endpoint, body);

    if (endpoint == '/logout')
      return new Promise((resolve, reject) => resolve());
    if (endpoint == '/my-profile')
      return new Promise((resolve, reject) => resolve({...body, edited: true}));

    return this._executeRequest(requestURL, requestConfig);
  };

  DELETE = (endpoint, body) => {
    const { requestURL, requestConfig } = this._prepareRequest('DELETE', endpoint, body);

    return this._executeRequest(requestURL, requestConfig);
  };

};