import clsx from 'clsx'
import React, { useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'

const Modal = ({ exercise }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <div
        className="cursor-pointer rounded bg-primary-100 px-2 py-1 transition hover:bg-primary-200"
        onClick={() => setShowModal(true)}
      >
        {exercise?.name}
      </div>
      {showModal && (
        <ClickAwayListener onClickAway={() => setShowModal(false)}>
          <div className="fixed top-0 left-0 z-20 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="rounded bg-white p-5">hello</div>
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
