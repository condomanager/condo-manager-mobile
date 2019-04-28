import AsyncStorageService from './AsyncStorageService';

export default class HTTPService {
  static API_HOST = 'http://192.168.25.19:8989';

  static requestConfig(httpMethod, token) {
    let config = {
      method: httpMethod,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    };

    if (token)
      config.headers.Authorization = 'Bearer ' + token;

    return config;
  };

  static loadProfile() {
    const endpoint      = HTTPService.API_HOST + '/profiles/my-profile';
    const requestConfig = HTTPService.requestConfig('GET');

    return fetch(endpoint, requestConfig)
      .then((response) => response.json());
  };

  static saveProfile(profile) {
    if (!profile.phones)
      profile.phones = [];
    
    const endpoint      = HTTPService.API_HOST + '/profiles/my-profile';
    const requestConfig = {...(HTTPService.requestConfig('PUT')), body: JSON.stringify(profile)};

    return fetch(endpoint, requestConfig).then((response) => response.json());
  };
};