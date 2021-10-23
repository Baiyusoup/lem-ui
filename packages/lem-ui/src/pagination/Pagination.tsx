import classNames from 'classnames'
import React, { useState } from 'react'

interface BasicPaginationProps {
  defaultCurrent?: number
  defaultPageSize?: number
  total: number
  onChange?: (page: number, pageSize: number) => void
}

export type PaginationProps = BasicPaginationProps &
  Omit<React.HTMLAttributes<HTMLUListElement>, 'onChange'>

function calculatePage(pageSize: number, total: number) {
  return Math.floor((total - 1) / pageSize) + 1
}

const Pagination: React.FC<PaginationProps> = ({
  defaultCurrent = 1,
  defaultPageSize = 10,
  total,
  className,
  onChange,
  ...props
}) => {
  const totalPage = calculatePage(defaultPageSize, total)
  const [current, setCurrent] = useState(Math.min(defaultCurrent, totalPage))
  const [currentInputValue, setCurrentInputValue] = useState(current)

  const hasPrev = () => current > 1
  const hasNext = () => current < totalPage

  const handleChange = (page: any) => {
    setCurrent(page)
    setCurrentInputValue(page)
    onChange?.(page, totalPage)
    return page
  }

  const getValidValue = (e: any) => {
    const inputValue = e.target.value
    let value: number
    if (inputValue === '') {
      value = inputValue
    } else if (Number.isNaN(Number(inputValue))) {
      value = currentInputValue
    } else if (inputValue >= totalPage) {
      value = totalPage
    } else {
      value = Number(inputValue)
    }
    return value
  }

  const prev = () => {
    if (hasPrev()) {
      handleChange(current - 1)
    }
  }
  const next = () => {
    if (hasNext()) {
      handleChange(current + 1)
    }
  }

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
    }
  }

  const handleKeyUp = (e: any) => {
    const value = getValidValue(e)

    if (e.key === 'Enter') {
      handleChange(value)
    } else if (e.key === 'ArrowUp' && hasNext()) {
      handleChange(value + 1)
    } else if (e.key === 'ArrowDown' && hasPrev()) {
      handleChange(value - 1)
    }
  }

  const renderToggler = (
    type: string,
    handle: React.MouseEventHandler,
    icon: string
  ) => {
    return (
      <li className={`lem-pagination-${type}`}>
        <button
          onClick={handle}
          type="button"
          className="lem-pagination-button"
        >
          {icon}
        </button>
      </li>
    )
  }

  return (
    <ul
      className={classNames('lem-pagination lem-pagination-simple', className)}
      {...props}
    >
      {renderToggler('prev', prev, '<')}
      <li className="lem-pagination-simple-pager">
        <input
          type="text"
          value={currentInputValue}
          size={3}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onChange={handleKeyUp}
        />
        <span className="lem-pagination-slash">{'/'}</span>
        {totalPage}
      </li>
      {renderToggler('next', next, '>')}
    </ul>
  )
}

export default Pagination
