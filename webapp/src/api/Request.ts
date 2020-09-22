/*
* Functions for processing api requests
*/

import url from './Api';
import axios from 'axios';

interface Params {
  uri: string,
  uriId: string,
  authToken: string,
  userId: string,
  body: any
}

interface Url {
  user: string,
  locker: string,
  workdone: string,
  login: string,
  register: string
}
const urlLinks: Url = url;

interface Headers {
  'Accept': string,
  'Content-Type': string,
  'Authorization': string,
  'User': string
}

const headers: Headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': '',
    'User': ''
};

const processErrors = (err: any) => {
  const returnParams = {status: 502, data: {}};
  if (err.hasOwnProperty('response')) {
    returnParams.status = err.response ? err.response.status : 502;
  }

  switch (returnParams.status) {
    case 401:
      return returnParams;
    case 404:
      return returnParams;
    case 405:
      return returnParams;
    case 406:
      return returnParams;
    case 409:
      return returnParams;
    case 422:
      return returnParams;
    case 500:
      return returnParams;
    default:
      return {status: 502, data: {}};
  }
}

const requestGet = async(params: Params) => {
  headers['Authorization'] = params.authToken ? params.authToken: '';
  headers['User'] = params.userId ? params.userId: '';

  const paramsUriId = params.uriId ===  '' ? '' : '/' + params.uriId;
  const paramsBody = params.body === '' ? '' : '/' + params.body;

  const getUrl = (urlLinks as any)[params.uri] + paramsUriId + paramsBody;
  //console.log(getUrl);
  //console.log(headers);
  const getResponse = await axios.get(getUrl, {headers: headers})
    .then(response => {
      //console.log(response);
      return response;
    })
    .catch(error => {
      //console.log(error);
      return processErrors(error);
    });

  return getResponse;
}

const requestPost = async(params: Params) => {  
  headers['Authorization'] = params.authToken ? params.authToken: '';
  headers['User'] = params.userId ? params.userId: '';

  const paramsUriId = params.uriId ===  '' ? '' : '/' + params.uriId;
  const postUrl = (urlLinks as any)[params.uri] + paramsUriId;
  //console.log(postUrl);
  //console.log(params);
  const postResponse = await axios.post(postUrl, params.body, {headers: headers})
    .then(response => {
      //console.log(response);
      return(response);
    })
    .catch(error => {
      //console.log(error);
      return processErrors(error);
    });

  return postResponse;
}

const requestPut = (params: Params) => {
  console.log({'type': 'put', 'params': params });
  return { 'status': 200, 'data': {} }
}

const requestDelete = (params: Params) => {
  console.log({'type': 'delete', 'params': params });
  return { 'status': 200, 'data': {} }
}

const getUserRequest = async(request: string, params: Params) => {
  switch (request) {
    case 'get':
      return await requestGet(params);
    case 'post':
      return await requestPost(params);
    case 'put':
      return await requestPut(params);
    case 'delete':
      return await requestDelete(params);
    default:
      return {'status':400, 'data': {} }
  }
}

export default getUserRequest;
