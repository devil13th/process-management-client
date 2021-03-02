import axios from 'axios';

const context = "/api"
export default {
  queryProcessInstance:function(params){
    return axios({
      method: 'get',
      url: `${context}/queryProcessInstance`,
      params: params
    });
  },
  queryTask:function(params){
    return axios({
      method: 'get',
      url: `${context}/queryTask`,
      params: params
    });
  },
}