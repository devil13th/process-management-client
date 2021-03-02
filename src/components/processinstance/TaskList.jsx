import React from 'react'
import {Input ,Table} from 'antd'
import ProcessApi from '@/api/ProcessApi'
const { Search } = Input;
class TaskList extends React.Component {
  state = {
    tableData:[],
    tableLoading:false,
    keyWords:'',
    pagination:{
      current:20,
      pageSize:10,
      pageSizeOptions:[5,10,15,50,100],
      showTotal:(total, range)=>{ return `${total} items`},
      showSizeChanger:true,
      showQuickJumper:true
    },
    // 排序
    sorter: {
      field: 'procinst.start_time_',
      order: 'descend',
    },
  }

  onSearch = (v) => {
    this.setState({ 
      keyWords:v
    },() => {
      this.queryList(true);
    })
  }

  queryList = (clearPage) => {
    console.log("===",this.state.pagination)
    if (clearPage) {
      // 清除分页
      this.setState(
        {
          pagination: {
            showTotal:(total, range)=>{ return `${total} items`},
            showSizeChanger:true,
            showQuickJumper:true,
            ...this.state.pagination,
            current: 1,
          },
        },
        this.basicQuery
      )
    } else {
      this.basicQuery()
    }
  }

  // 基础查询
  basicQuery = () => {
    const _this = this
    const queryCondition = {
      current: this.state.pagination.current,
      pageSize: this.state.pagination.pageSize,
      total: this.state.pagination.total,
      sortField: this.state.sorter.field,
      sortOrder: this.state.sorter.order.replace('end', ''),
      businessKey:this.state.keyWords,
    }
    this.setState({ tableLoading: true })
    ProcessApi.queryTask(queryCondition).then( result => {
      const r = result.data;
      this.setState({
        tableData:r.list,
        tableLoading: false,
        pagination: {
          showTotal:(total, range)=>{ return `${total} items`},
          showSizeChanger:true,
          showQuickJumper:true,
          current: r.pageNum,
          pageSize: r.pageSize,
          total: r.total,
        }
      })
    })

    
  }

  // 分页/排序 事件处理
  handleTableChange = (pagination, filters, sorter) => {
    
    const st = {
      pagination:{
        showTotal:(total, range)=>{ return `${total} items`},
        showSizeChanger:true,
        showQuickJumper:true,
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: this.state.pagination.total,
      },
    }
    if (sorter.field && sorter.order) {
      st.sorter = {
        field: sorter.field,
        order: sorter.order,
      }
    } else {
      st.sorter = {
        field: '',
        order: '',
      }
    }
    this.setState(st, this.queryList)
    
  }

  render() {

    const columns = [
        {
          title: 'Defined ID',
          dataIndex: 'procDefId',
        },
        {
          title: 'Business Key',
          dataIndex: 'businessKey',
        },
        {
            title: 'Process Instance Id',
            dataIndex: 'processInstanceId',
          },
        {
          title: 'Start Time',
          dataIndex: 'processInstanceStartTime',
        },
        {
            title: 'End Time',
            dataIndex: 'processInstanceEndTime',
          },
      ];
     
    return (
      <div>
          <h2>Task List</h2>
         
          <div className="search-bar" style={{textAlign:"right"}}>
            <Search 
              placeholder="key words"
              onSearch={this.onSearch}
              style={{width:200}}
              size="small"
              enterButton
            />
          </div>
          <Table 
            onChange={this.handleTableChange}
            columns={columns} 
            dataSource={this.state.tableData} 
            pagination={this.state.pagination}
            size="small" 
            rowKey="processInstanceId"
          />
      </div>
    )
  }
}

export default TaskList