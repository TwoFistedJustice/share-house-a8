import {apiKey, databaseURL} from '../../share-house-config/share-house-config-a8'
export const APIkey = apiKey;
export const dataBaseUrl = databaseURL;

/* gObj_hasRoot is for vuex automatic namespacing.
*  This object is required to dispatch
*  or commit actions or mutations from another module*/
export const gObj_hasRoot = {root: true};
