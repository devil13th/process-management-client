import React from 'react'
import PropTypes from 'prop-types'
import ProcessApi from "@/api/ProcessApi";

class TaskInfo extends React.Component {
  
  
  state = {
    taskType:"", // task  taskHis
    taskInfo:{}
  }

  static propTypes = {
    taskId: PropTypes.string,
    taskHisId: PropTypes.string,
  };

  componentDidMount(){
    if(this.props.taskId){
        this.setState({
            taskId:this.props.taskId
        },this.queryTaskByTaskId)
    }
    if(this.props.taskHisId){
        this.setState({
            taskHisId:this.props.taskHisId
        },this.queryTaskHisByTaskHisId)
    }
  }

  queryTaskByTaskId = () => {
    ProcessApi.queryTaskByTaskId(this.props.taskId).then( r => {
        this.setState({taskInfo:r.data})
    })
  }

  queryTaskHisByTaskHisId = () => {
    ProcessApi.queryTaskHisByTaskHisId(this.props.taskHisId).then( r => {
        this.setState({taskInfo:r.data})
    })
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.state.taskInfo)}
      </div>
    )
  }
}

export default TaskInfo;