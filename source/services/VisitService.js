import { AsyncStorage } from "react-native";
import EventEmitter     from 'EventEmitter';
import HTTPService      from './HTTPService';

const endpoint = '/visits/my-visits';

export default class VisitService extends EventEmitter {
  static _instance;

  static getInstance() {
    if (!VisitService._instance)
      VisitService._instance = new VisitService();

    return this._instance;
  };
  
  list = () => {
    console.info('=== VisitService.list...');
    return HTTPService.getInstance().GET(endpoint)
    .then(responseBody => {
      console.info('=== VisitService.list got from server, returning...', responseBody);
      if (responseBody.length)
        responseBody.forEach(visit => {
          visit.createDate = new Date(visit.createDate);
          if (visit.authorizeDate) 
            visit.authorizeDate = new Date(visit.authorizeDate);
          if (visit.denyDate) 
            visit.denyDate = new Date(visit.denyDate);
        });
      return new Promise((resolve, reject) => resolve(responseBody));
    });
  };
  
};