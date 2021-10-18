import React, { useState } from 'react'
import Layout from '../packages/lem-ui/src/layout'
import './app.css'

const { Header, Content, Footer, Aside } = Layout

function App() {
  const [value, setValue] = useState(false)
  const handleEvent = (payload: boolean) => {
    console.log('trigger')
    setValue(payload)
    console.log(value)
  }
  return (
    <Layout>
      <Header>Header</Header>
      <Layout isVertical={true}>
        <Aside collapsible collapsed={value} onCollapse={handleEvent}>
          Aside
        </Aside>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">Content</div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default App
