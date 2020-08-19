import url from './Api.js';

const requestGet = (params) => {
  console.log({'type': 'get', 'params': params });
  return { 'status': 200, 'info': { 'msg': 'ok', 'data': params } }
}

const requestPost = (params) => {
  console.log({'type': 'post', 'params': params });
  return { 'status': 200, 'info': { 'msg': 'ok', 'data': params } }
}

const requestPut = (params) => {
  console.log({'type': 'put', 'params': params });
  return { 'status': 200, 'info': { 'msg': 'ok', 'data': params } }
}

const requestDelete = (params) => {
  console.log({'type': 'delete', 'params': params });
  return { 'status': 200, 'info': { 'msg': 'ok', 'data': params } }
}

const getUserRequest = (request, params) => {
  switch (request) {
    case 'get':
      return requestGet(params);
    case 'post':
      return requestPost(params);
    case 'put':
      return requestPut(params);
    case 'delete':
      return requestDelete(params);
    default:
      return {'status':400, 'info': { 'msg': 'Invalid request.', 'data': null} }
  }
}

export default getUserRequest;
