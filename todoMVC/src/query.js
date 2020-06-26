import React from 'react';
import './static/App.css';
import 'antd/dist/antd.css';
import { Table } from 'antd';

const url = "http://122.51.125.90:9999/query";

class Query extends React.Component {
  constructor(props) {
    super(props);
    this.state = { datasearch: [], }
    this.columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      }
    ]
  }

  getData() {
    fetch(url)//链接接口
      .then(res => res.json())//解析json数据 
      .then(data => {
        console.log(data);
        this.setState({ datasearch: data.arr})
        console.log(this.state.datasearch);
      })
      .catch(e => console.log('error', e))
  }

  componentDidMount() {//网络请求都是放在此生命周期函数中
    this.getData();
  }

  render() {

    return (
      <Table
        dataSource={this.state.datasearch} 
        columns={this.columns}
      />
    );
  }
}

export default Query;
