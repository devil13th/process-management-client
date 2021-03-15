import React from "react";
import { Tabs, Input, Table, Tooltip, Divider, Modal, Button,Popconfirm ,message} from "antd";
import {
  InfoCircleOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  OrderedListOutlined
} from "@ant-design/icons";
import TaskList from "./TaskList";
import TaskHisList from "./TaskHisList";
import ProcessVariable from '../processvariable/ProcessVariable'
import ProcessApi from "@/api/ProcessApi";

const { Search } = Input;
const { TabPane } = Tabs;
class ProcessInstanceList extends React.Component {
  state = {
    tableData: [],
    tableLoading: false,
    keyWords: "",
    processInstanceId: "",
    taskListModalVisible: false,
    taskHisListModalVisible:false,
    processVarModalVisible:false,
    executionVar:'',
    executionLocalVar:'',
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: [5, 10, 15, 50, 100],
      showTotal: (total, range) => {
        return `${total} items`;
      },
      showSizeChanger: true,
      showQuickJumper: true,
    },
    // 排序
    sorter: {
      field: "procinst.start_time_",
      order: "descend",
    },
  };

  onSearch = (v) => {
    this.setState(
      {
        keyWords: v,
      },
      () => {
        this.queryList(true);
      }
    );
  };

  queryList = (clearPage) => {
    console.log("===", this.state.pagination);
    if (clearPage) {
      // 清除分页
      this.setState(
        {
          pagination: {
            showTotal: (total, range) => {
              return `${total} items`;
            },
            showSizeChanger: true,
            showQuickJumper: true,
            ...this.state.pagination,
            current: 1,
          },
        },
        this.basicQuery
      );
    } else {
      this.basicQuery();
    }
  };

  // 基础查询
  basicQuery = () => {
    const _this = this;
    const queryCondition = {
      current: this.state.pagination.current,
      pageSize: this.state.pagination.pageSize,
      total: this.state.pagination.total,
      sortField: this.state.sorter.field,
      sortOrder: this.state.sorter.order.replace("end", ""),
      keyWords: this.state.keyWords,
    };
    this.setState({ tableLoading: true });
    ProcessApi.queryProcessInstancePage(queryCondition).then((result) => {
      const r = result.data;
      this.setState({
        tableData: r.list,
        tableLoading: false,
        pagination: {
          showTotal: (total, range) => {
            return `${total} items`;
          },
          showSizeChanger: true,
          showQuickJumper: true,
          current: r.pageNum,
          pageSize: r.pageSize,
          total: r.total,
        },
      });
    });
  };

  // 分页/排序 事件处理
  handleTableChange = (pagination, filters, sorter) => {
    const st = {
      pagination: {
        showTotal: (total, range) => {
          return `${total} items`;
        },
        showSizeChanger: true,
        showQuickJumper: true,
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: this.state.pagination.total,
      },
    };
    if (sorter.field && sorter.order) {
      st.sorter = {
        field: sorter.field,
        order: sorter.order,
      };
    } else {
      st.sorter = {
        field: "",
        order: "",
      };
    }
    this.setState(st, this.queryList);
  };
  openTaskListModal = (processInstanceId) => {
    this.setState({
      processInstanceId: processInstanceId,
      taskListModalVisible: true,
    });
  };
  openTaskHisListModal = (processInstanceId) => {
    this.setState({
      processInstanceId: processInstanceId,
      taskHisListModalVisible: true,
    });
  };
  closeModal = () => {
    this.setState({
      taskListModalVisible: false,
      taskHisListModalVisible:false,
      processVarModalVisible:false,
    });
  };

  openProcessVar(executionId){

    this.setState({processVarModalVisible:true,processInstanceId:executionId})
  }

  componentDidMount() {
    this.queryList();
  }

  deleteProcessInstance = (record) =>{
    ProcessApi.deleteProcessInstance(record.processInstanceId).then( r => {
      if(r.data === 'SUCCESS'){
        message.success("Process Instance Be Deleted successfully")
        this.queryList(false)
      }else{
        message.error("Process Instance Deleted Failure")
      }
    })
  }

  render() {
    const columns = [
      {
        title: "Def ID",
        dataIndex: "procDefId",
      },
      {
        title: "Key",
        dataIndex: "businessKey",
      },
      {
        title: "PI Id",
        dataIndex: "processInstanceId",
      },
      {
        title: "Start",
        dataIndex: "processInstanceStartTime",
      },
      {
        title: "End",
        dataIndex: "processInstanceEndTime",
      },
      {
        title: "Operate",
        key: "operate",
        render: (text, record) => (
          <div>
            <Tooltip title="Curent Task">
              <a>
                <UnorderedListOutlined
                  onClick={() => {
                    this.openTaskListModal(record.processInstanceId);
                  }}
                />
              </a>
            </Tooltip>
            <Divider type="vertical"></Divider>
            <Tooltip title="Step History">
              <a>
                <OrderedListOutlined
                  onClick={() => {
                    this.openTaskHisListModal(record.processInstanceId);
                  }}
                />
              </a>
            </Tooltip>
            
            <Divider type="vertical"></Divider>


            <Popconfirm
              placement="left"
              title="Are you sure to delete this process instance?"
              onConfirm={() => {
                this.deleteProcessInstance(record);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Delete Process Instance">
              <a>
                <DeleteOutlined />
              </a>
            </Tooltip>
            </Popconfirm>



            
            <Divider type="vertical"></Divider>
            <Tooltip title="Set Process Global Variable">
              <a>
                <SettingOutlined onClick={() => {this.openProcessVar(record.processInstanceId)}}/>
              </a>
            </Tooltip>
            
          </div>
        ),
      },
    ];

    const operations = {
      right: (
        <Search
          placeholder="key words"
          onSearch={this.onSearch}
          style={{ width: 200 }}
          size="small"
          enterButton
        />
      ),
    };

    return (
      <div>
        <Tabs type="card" tabBarExtraContent={operations}>
          <TabPane tab="Process Instance Management" ></TabPane>
        </Tabs>

        <Table
          onChange={this.handleTableChange}
          columns={columns}
          dataSource={this.state.tableData}
          pagination={this.state.pagination}
          size="small"
          rowKey="processInstanceId"
        />

        <Modal
          width={"100%"}
          style={{top:32}}
          title={<UnorderedListOutlined />}
          visible={this.state.taskListModalVisible}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          destroyOnClose={true}
          maskClosable={false}
        >
          <TaskList processInstanceId={this.state.processInstanceId}></TaskList>
        </Modal>


        <Modal
          width={"100%"}
          style={{top:32}}
          title={<OrderedListOutlined/>}
          visible={this.state.taskHisListModalVisible}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          destroyOnClose={true}
          maskClosable={false}
        >
          <TaskHisList processInstanceId={this.state.processInstanceId}></TaskHisList>
        </Modal>

        <Modal
          width={"100%"}
          title={<OrderedListOutlined/>}
          visible={this.state.processVarModalVisible}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          destroyOnClose={true}
          maskClosable={false}
        >
          <ProcessVariable processVarType='execution' id={this.state.processInstanceId}></ProcessVariable>
        </Modal>

        

      </div>
    );
  }
}

export default ProcessInstanceList;
