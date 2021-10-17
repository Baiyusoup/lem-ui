/* eslint-disable import/default */
import Button, {
  ButtonSize,
  ButtonType,
} from '../packages/lem-ui/src/button/button'
import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const handler = () => {
    setCount(count + 1)
  }
  return (
    <div className="App">
      <Button onClick={handler}>Default Button</Button>
      <Button disabled>Disabled Button</Button>
      <Button btnType={ButtonType.Danger}>Danger Button</Button>
      <Button btnType={ButtonType.Primary}>Primary Button</Button>
      <Button btnType={ButtonType.Link} href="#">
        Link Button
      </Button>
      <Button disabled btnType={ButtonType.Link} href="#">
        Link Button
      </Button>
      <div>{count}</div>
      <div>
        <Button size={ButtonSize.Large}>Default Button</Button>
        <Button size={ButtonSize.Small}>Default Button</Button>
      </div>
    </div>
  )
}

export default App
