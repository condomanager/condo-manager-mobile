import AuthenticationService from 'services/AuthenticationService';

const API_HOST = require('../../app.json').api.host;

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

  getRequestConfig = (httpMethod, body) => {
    return AuthenticationService.getInstance().getToken()
    .then(token => {
      let config = {
        method: httpMethod,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      if (token)
        config.headers['Authorization'] = 'Bearer ' + token;

      if (body)
        config.body = JSON.stringify(body);

      return new Promise((resolve, reject) => resolve(config));
    });
  };

  _prepareRequest = (method, endpoint, body) => {
    return this.getRequestConfig(method, body)
    .then(requestConfig => {
      let requestURL = (this.getAPIHost() + endpoint);
      return new Promise((resolve, reject) => resolve({requestURL, requestConfig}));
    });
  };

  _executeRequest = (url, config) => {
    console.info('====== HTTPService fetching request from', url, config);
    return fetch(url, config)
    .then((requestResponse) => {
      console.info('====== HTTPService raw response from', url, requestResponse);
      if (requestResponse.status >= 500) 
        throw 'Ocorreu um problema durante a requisição';
      else
        return requestResponse.json();
    });
  };

  GET = (endpoint) => {
    return this._prepareRequest('GET', endpoint)
    .then(({requestURL, requestConfig}) => this._executeRequest(requestURL, requestConfig));
  };

  POST = (endpoint, body) => {
    return this._prepareRequest('POST', endpoint, body)
    .then(({requestURL, requestConfig}) => this._executeRequest(requestURL, requestConfig));
  };

  PUT = (endpoint, body) => {
    return this._prepareRequest('PUT', endpoint, body)
    .then(({requestURL, requestConfig}) => this._executeRequest(requestURL, requestConfig));
  };

  DELETE = (endpoint) => {
    return this._prepareRequest('DELETE', endpoint)
    .then(({requestURL, requestConfig}) => this._executeRequest(requestURL, requestConfig));
  };

};