import React, { createRef, useState } from 'react'
import './app.css'
import Layout from '../packages/lem-ui/src/layout'
import Menu from '../packages/lem-ui/src/menu'
import Modal from '../packages/lem-ui/src/modal'

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
          <Menu.Item index={0}>item 1</Menu.Item>
          <Menu.Item index={1}>item 2</Menu.Item>
          <Menu.SubMenu index="sub1" title="item 3">
            <Menu.Item index={2}>item3-1</Menu.Item>
            <Menu.Item index={3}>item3-2</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Header>
      <Layout isVertical={true}>
        <Aside>aside</Aside>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <div>
              <button onClick={showModal}>点击</button>
            </div>
          </div>
          <Modal
            visible={visiable}
            title="测试"
            onCancel={handleCancel}
            onOk={handleOk}
          >
            <p>内容</p>
            <p>内容</p>
            <p>内容</p>
          </Modal>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default App
