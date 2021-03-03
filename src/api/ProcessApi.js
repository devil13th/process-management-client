import axios from 'axios';

const context = "/api"
export default {
  queryProcessInstancePage:function(params){
    return axios({
      method: 'get',
      url: `${context}/queryProcessInstancePage`,
      params: params
    });
  },
  queryTaskPage:function(params){
    return axios({
      method: 'get',
      url: `${context}/queryTaskPage`,
      params: params
    });
  },
  queryTaskHisPage:function(params){
    return axios({
      method: 'get',
      url: `${context}/queryTaskHisPage`,
      params: params
    });
  },
  
}