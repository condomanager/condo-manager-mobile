import HTTPService         from './HTTPService';
import AsyncStorageService from './AsyncStorageService';

export default class AuthenticationService extends HTTPService {
  
  static login = ({username, password}) => {
    const endpoint      = HTTPService.API_HOST + '/login?username=' + username + '&password=' + password;
    const requestConfig = HTTPService.requestConfig('POST');

    return fetch(endpoint, requestConfig)
    .then((requestResponse) => {
      console.info('RAW RESPONSE RECEIVED:', requestResponse);
      if (requestResponse.status >= 500)
        throw { title: 'Erro no servidor', message: 'Ocorreu um problema durante o processo de autenticação' };
      if (requestResponse.status >= 400)
        throw { title: 'Dados inválidos', message: 'Verifique seu CPF e sua senha' };
      return requestResponse.json();
    })
    .then((responseBody) => {
      return AsyncStorageService.set('authenticationToken', responseBody.token);
    }).then((asyncSetError) => {
      return AsyncStorageService.get('authenticationToken');
    });
  };
  
  static logout = () => {
    return AsyncStorageService.get('authenticationToken')
    .then((token) => {
      const endpoint      = HTTPService.API_HOST + '/logout';
      const requestConfig = HTTPService.requestConfig('PUT', token);

      return fetch(endpoint, requestConfig);
    })
    .then((requestResponse) => {
      console.info('RAW RESPONSE RECEIVED:', requestResponse);
      if (requestResponse.status != 200 && requestResponse.status != 401)
        throw { title: 'Erro no servidor', message: 'Ocorreu um problema durante o processo de autenticação' };
      return AsyncStorageService.remove('authenticationToken');
    });
  };
  
};