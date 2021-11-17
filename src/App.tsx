import React from 'react'
import './app.css'
import Layout from '../packages/lem-ui/src/layout'
import Menu from '../packages/lem-ui/src/menu'
import Input from '../packages/lem-ui/src/input'
import Pagination from '../packages/lem-ui/src/pagination'
import Plum from '../packages/lem-ui/src/plum'

const { Header, Content, Footer, Aside } = Layout

function App() {
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
      <Content className="app-content">
        Hello World
        <Plum />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Pagination total={50} />
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default App
