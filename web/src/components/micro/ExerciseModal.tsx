import clsx from 'clsx'
import React, { useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'

const Modal = ({ exercise }) => {
  const [showModal, setShowModal] = useState(true)
  return (
    <>
      <div
        className="px-2 py-1 transition rounded cursor-pointer bg-primary-100 hover:bg-primary-200"
        onClick={() => setShowModal(true)}
      >
        {exercise}
      </div>
      {showModal && (
        <ClickAwayListener onClickAway={() => setShowModal(false)}>
          <div className="fixed top-0 left-0 z-20 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="p-5 bg-white rounded">hello</div>
          </div>
        </ClickAwayListener>
      )}
      <div
        className={clsx(
          'pointer-events-none fixed top-0 left-0 z-10 h-screen w-screen bg-gray-900 transition-all duration-300',
          { 'opacity-0': !showModal, 'opacity-20': showModal }
        )}
      ></div>
    </>
  )
}

export default Modal
