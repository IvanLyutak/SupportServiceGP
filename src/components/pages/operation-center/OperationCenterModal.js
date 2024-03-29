import React from 'react'
import './OperationCenterModal.css'

const Modal = ({
      visible = false,
      title = '',
      content = '',
      footer = '',
      onClose,
  }) => {
  // создаем обработчик нажатия клавиши Esc
  const onKeydown = ({ key }) => {
    switch (key) {
        case "Escape":
          onClose();
          break;
        default:
          break;
    }
  };


 React.useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  })

  // если компонент невидим, то не отображаем его
  if (!visible) return null

  // или возвращаем верстку модального окна
  return (
    <div className='modal'>
      <div className='modal-d' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <h3 className='modal-title'>{title}</h3>
          <span className='modal-close' onClick={onClose}>
            &times;
          </span>
        </div>
        <div className='modal-body'>
          <div className='modal-content'>{content}</div>
        </div>
        {footer && <div className='modal-footer'>{footer}</div>}
      </div>
    </div>
  )
}

export default Modal;


