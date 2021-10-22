import { createContext } from 'react'

export interface IMenuContext {
  index: number
  mode?: string
  currentSubMenuOpenKey?: string
  onSelect?: (selectedIndex: number) => void
}

export default createContext<IMenuContext>({
  index: 0,
  mode: 'horizontal',
})
