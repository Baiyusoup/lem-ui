import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

export interface ModalProps {
  visible: boolean
  title: string
  style?: React.CSSProperties
  width?: number
  zIndex?: number
  centered?: boolean
  footer?: React.ReactNode
  className?: string
  okText?: string
  cancelText?: string
  closable?: boolean
  onOk?: () => void
  onCancel?: () => void
  mask?: boolean
  maskClosable?: boolean
  children?: React.ReactNode
}

const Modal = (props: ModalProps) => {
  const {
    visible = false,
    style,
    width = 520,
    zIndex = 1000,
    centered = false,
    title = 'title',
    footer,
    className = '',
    okText = '确定',
    cancelText = '取消',
    closable = true,
    onOk,
    onCancel,
    mask = true,
    maskClosable = true,
    children,
  } = props

  const onMask = () => {
    maskClosable && onCancel?.()
  }

  return visible
    ? ReactDOM.createPortal(
        <div className="lem-pirate-modal">
          <div
            className="lem-modal-mask"
            onClick={onMask}
            style={{
              visibility: mask ? 'visible' : 'hidden',
              zIndex: zIndex,
            }}
          />
          <div
            className={classNames('lem-modal-warp', className, {
              'lem-modal-center': centered,
            })}
            style={{
              width,
              zIndex,
            }}
          >
            {closable && (
              <div className="lem-modal-close" onClick={onCancel}>
                <span>+</span>
              </div>
            )}
            <div className="lem-modal" style={{ width, ...style }}>
              <div className="lem-modal-content">
                <div className="lem-modal-header">
                  <div className="lem-modal-title">{title}</div>
                </div>
                <div className="lem-modal-body">{children}</div>
                {footer === null ? null : (
                  <div className="lem-modal-footer">
                    {footer || (
                      <div>
                        <button onClick={onOk} type="button">
                          {okText}
                        </button>
                        <button onClick={onCancel} type="button">
                          {cancelText}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.querySelector('body') as Element
      )
    : null
}

export default Modal
