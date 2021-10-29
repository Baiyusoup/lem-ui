import React, { useState } from 'react'
import './app.css'
import Layout from '../packages/lem-ui/src/layout'
import Menu from '../packages/lem-ui/src/menu'
import Modal from '../packages/lem-ui/src/modal'
import Input from '../packages/lem-ui/src/input'
import { UserAddOutlined } from '@ant-design/icons'
import Pagination from '../packages/lem-ui/src/pagination'

const { Header, Content, Footer, Aside } = Layout

function App() {
  const [visiable, setVisiable] = useState(false)

  const handleCancel = () => {
    console.log('cancel')
    setVisiable(false)
  }
  const handleOk = () => {
    console.log('ok')
    setVisiable(false)
  }

  const showModal = () => {
    setVisiable(true)
  }

  return (
    <Layout>
      <Header>
        <Menu defaultIndex={0}>
          <Menu.Item index={0}>
            <Input />
          </Menu.Item>
          <Menu.Item index={1}>item 1</Menu.Item>
          <Menu.Item index={2}>item 2</Menu.Item>
          <Menu.SubMenu index="sub1" title="item 3">
            <Menu.Item index={3}>item3-1</Menu.Item>
            <Menu.Item index={4}>item3-2</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Header>
      <Layout isVertical={true}>
        <Aside>
          <Menu mode="vertical" defaultIndex={0}>
            <Menu.Item index={0}>item 1</Menu.Item>
            <Menu.Item index={1}>item 2</Menu.Item>
            <Menu.SubMenu index="sub1" title="item 3">
              <Menu.Item index={2}>item3-1</Menu.Item>
              <Menu.Item index={3}>item3-2</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Aside>
        <Content>
          <button onClick={showModal}>Click</button>
          <Modal
            title="测试"
            centered={true}
            visible={visiable}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>内容</p>
            <p>
              <UserAddOutlined />
              用户
            </p>
          </Modal>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        <Pagination total={50} />
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default App
