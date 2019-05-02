import { AsyncStorage } from "react-native";

import HTTPService      from './HTTPService';
import ProfileService   from './ProfileService';

export default class AuthenticationService {
  static _instance;

  static _authenticationToken;

  static getInstance() {
    if (!AuthenticationService._instance)
      AuthenticationService._instance = new AuthenticationService();

    return this._instance;
  };

  clear = () => {
    return AsyncStorage.removeItem('authenticationToken').then(asyncStorageError => {
      this._authenticationToken = undefined;
      return new Promise((resolve, reject) => resolve());
    });
  };

  getToken = () => {
    if (!this._authenticationToken)
      return AsyncStorage.getItem('authenticationToken').then(token => {
        this._authenticationToken = token;
        return new Promise((resolve, reject) => resolve(this._authenticationToken));
      });

    return new Promise((resolve, reject) => resolve(this._authenticationToken));
  };
  
  login = (credentials) => {
    return HTTPService.getInstance().POST('/login', credentials)
    .then(responseBody => {
      if (responseBody.status == 400 || responseBody.status == 404)
        throw 'Usuário ou senha inválidos';
      if (!responseBody.token)
        throw 'Ocorreu um problema durante a autenticação';

      this._authenticationToken = responseBody.token;
      return AsyncStorage.setItem('authenticationToken', this._authenticationToken);
    }).then(asyncStorageError => {
      return new Promise((resolve, reject) => resolve(this._authenticationToken));
    });
  };
  
  logout = () => {
    const proceedWithLogout = () => {
      return this.clear()
      .then(() => ProfileService.getInstance().clear())
      .then(() => new Promise((resolve, reject) => resolve()));
    };

    return HTTPService.getInstance().PUT('/logout')
    .then(proceedWithLogout)
    .catch(proceedWithLogout);
  };
  
};