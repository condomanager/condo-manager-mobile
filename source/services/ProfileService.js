import { AsyncStorage } from "react-native";
import EventEmitter     from 'EventEmitter';
import HTTPService      from './HTTPService';

const endpoint = '/profiles';

export default class ProfileService extends EventEmitter {
  static _instance;

  static _profile;

  static getInstance() {
    if (!ProfileService._instance)
      ProfileService._instance = new ProfileService();

    return this._instance;
  };

  _changeProfile = (profile) => {
    if(profile !== this._profile) {
      this._profile = profile;
      this.emit('change', this._profile);
    }
  };

  clear = () => {
    return AsyncStorage.removeItem('profile').then(asyncStorageError => {
      this._profile = undefined;
      return new Promise((resolve, reject) => resolve());
    });
  };

  get = () => {
    console.info('=== ProfileService.get...');
    if (!this._profile) {
      console.info('=== ProfileService.get not found locally, getting from AsyncStorage...')
      return AsyncStorage.getItem('profile').then(profile => {
        if (profile) {
          console.info('=== ProfileService.get found from AsyncStorage, parsing and returning...')
          this._changeProfile(JSON.parse(profile));
          return new Promise((resolve, reject) => resolve(this._profile));
        } else {
          console.info('=== ProfileService.get not found from AsyncStorage, redirecting to ProfileService.load...')
          return this.load();
        }
      });
    } else {
      console.info('=== ProfileService.get found profile locally, returning...')
      return new Promise((resolve, reject) => resolve(this._profile));
    }
  };
  
  load = () => {
    console.info('=== ProfileService.load...');
    return HTTPService.getInstance().GET(endpoint + '/my-profile')
    .then(responseBody => {
      console.info('=== ProfileService.load got from server, storing locally and on AsyncStorage...');
      this._changeProfile(responseBody);
      return AsyncStorage.setItem('profile', JSON.stringify(this._profile));
    }).then(asyncStorageError => {
      console.info('=== ProfileService.load stored, returning...');
      return new Promise((resolve, reject) => resolve(this._profile));
    });
  };
  
  create = (profile) => {
    console.info('=== ProfileService.create...');
    return HTTPService.getInstance().POST(endpoint, profile)
    .then(responseBody => {
      if (responseBody.status) {
        if (responseBody.message.includes('already registered'))
          throw 'Já existe um cadastro para este CPF';
        if (responseBody.message.includes('is required'))
          throw 'Preencha todos os campos';
      }
      
      console.info('=== ProfileService.create on server, storing locally and on AsyncStorage...');
      this._changeProfile(responseBody);
      return AsyncStorage.setItem('profile', JSON.stringify(this._profile));
    }).then(asyncStorageError => {
      console.info('=== ProfileService.create stored, returning...');
      return new Promise((resolve, reject) => resolve(this._profile));
    });
  };
  
  update = (profile) => {
    console.info('=== ProfileService.update...');
    return HTTPService.getInstance().PUT(endpoint + '/my-profile', profile)
    .then(responseBody => {
      console.info('=== ProfileService.update on server, storing locally and on AsyncStorage...');
      this._changeProfile(responseBody);
      return AsyncStorage.setItem('profile', JSON.stringify(this._profile));
    }).then(asyncStorageError => {
      console.info('=== ProfileService.update stored, returning...');
      return new Promise((resolve, reject) => resolve(this._profile));
    });
  };
  
};