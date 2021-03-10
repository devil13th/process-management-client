import axios from '@/axios';

const context = "/api"
export default {
  startProcessByDefId:function(data){
    return axios({
      method: 'post',
      url: `${context}/startProcessByDefId`,
      data: data
    });
  },
  startProcessByDefKey:function(data){
    return axios({
      method: 'post',
      url: `${context}/startProcessByDefKey`,
      data: data
    });
  },
  nextStep:function(taskId,processVariable){
    return axios({
      method: 'post',
      url: `${context}/nextStep`,
      data: {taskId,taskAssignee:'ADMIN',processVariable}
    });
  },
  queryProcessDef:function(params){
    return axios({
      method: 'get',
      url: `${context}/queryProcessDef`,
      params: params
    });
  },
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
  queryProcessVarByExecutionId:function(executionId){
    return axios({
      method: 'get',
      url: `${context}/queryProcessVarByExecutionId`,
      params:{executionId}
    });
  },
  queryProcessVarLocalByExecutionId:function(executionId){
    return axios({
      method: 'get',
      url: `${context}/queryProcessVarLocalByExecutionId`,
      params:{executionId}
    });
  },
  queryProcessVarByTaskId:function(taskId){
    return axios({
      method: 'get',
      url: `${context}/queryProcessVarByTaskId`,
      params:{taskId}
    });
  },
  queryProcessVarLocalByTaskId:function(taskId){
    return axios({
      method: 'get',
      url: `${context}/queryProcessVarLocalByTaskId`,
      params:{taskId}
    });
  },
 
  
}