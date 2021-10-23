import Pagination from '../packages/lem-ui/src/pagination'
import React, { useState } from 'react'
import Layout from '../packages/lem-ui/src/layout'
import Menu from '../packages/lem-ui/src/menu'

import './app.css'

const { Header, Content, Footer, Aside } = Layout

function App() {
  const [value, setValue] = useState(false)
  const handleEvent = (payload: boolean) => {
    console.log('trigger')
    setValue(payload)
    console.log(value)
  }
  const handleChange = (pageSize: number, currentPage: number) => {
    console.log(pageSize, currentPage)
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
        <Aside collapsible collapsed={value} onCollapse={handleEvent}>
          aside
        </Aside>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            Content
            <Pagination onChange={handleChange} total={50} />
          </div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default App
