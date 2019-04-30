import { AsyncStorage } from "react-native";
import EventEmitter     from 'EventEmitter';
import HTTPService      from './HTTPService';

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

  getProfile = () => {
    console.info('=== ProfileService.getProfile...');
    if (!this._profile) {
      console.info('=== ProfileService.getProfile not found locally, getting from AsyncStorage...')
      return AsyncStorage.getItem('profile').then(profile => {
        if (profile) {
          console.info('=== ProfileService.getProfile found from AsyncStorage, parsing and returning...')
          this._changeProfile(JSON.parse(profile));
          return new Promise((resolve, reject) => resolve(this._profile));
        } else {
          console.info('=== ProfileService.getProfile not found from AsyncStorage, redirecting to ProfileService.loadProfile...')
          return this.loadProfile();
        }
      });
    } else {
      console.info('=== ProfileService.getProfile found profile locally, returning...')
      return new Promise((resolve, reject) => resolve(this._profile));
    }
  };
  
  loadProfile = () => {
    console.info('=== ProfileService.loadProfile...');
    return HTTPService.getInstance().GET('/my-profile')
    .then(responseBody => {
      console.info('=== ProfileService.loadProfile got from server, storing locally and on AsyncStorage...');
      this._changeProfile(responseBody);
      return AsyncStorage.setItem('profile', JSON.stringify(this._profile));
    }).then(asyncStorageError => {
      console.info('=== ProfileService.loadProfile stored, returning...');
      return new Promise((resolve, reject) => resolve(this._profile));
    });
  };
  
  updateProfile = (profile) => {
    console.info('=== ProfileService.updateProfile...');
    return HTTPService.getInstance().PUT('/my-profile', profile)
    .then(responseBody => {
      console.info('=== ProfileService.updateProfile got from server, storing locally and on AsyncStorage...');
      this._changeProfile(responseBody);
      return AsyncStorage.setItem('profile', JSON.stringify(this._profile));
    }).then(asyncStorageError => {
      console.info('=== ProfileService.updateProfile stored, returning...');
      return new Promise((resolve, reject) => resolve(this._profile));
    });
  };
  
};