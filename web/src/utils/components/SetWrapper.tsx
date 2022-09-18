// https://github.com/arnaudambro/react-swipe-to-delete-ios

import clsx from 'clsx'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { Transition } from '@headlessui/react'

const THRESHOLD_NO_CONFIRM = 50
const THRESHOLD_ACCEPTABLE = 20

export interface Props {
  onDelete: Function
  onDeleteConfirm?: Function
  children: any
}

/**
 * If the event has a clientX property, return it, otherwise return undefined.
 * @param {any} event - any - The event object that is passed to the function.
 * @returns The x-coordinate of the cursor position.
 */
const cursorPosition = (event: any) => {
  if (event?.touches?.[0]?.clientX) return event.touches[0].clientX
  if (event?.clientX) return event?.clientX
  if (event?.nativeEvent?.touches?.[0]?.clientX)
    return event.nativeEvent.touches[0].clientX
  return event?.nativeEvent?.clientX
}

const SetWrapper = ({ onDelete, onDeleteConfirm, children }: Props) => {
  const [touching, setTouching] = useState(false)
  const [translate, setTranslate] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const startTouchPosition = useRef(0)
  const initTranslate = useRef(0)
  const container = useRef<HTMLDivElement>(null)
  const containerWidth: number =
    container.current?.getBoundingClientRect().width || 0
  // Hard-coded the value to 80px to match the width of the delete button
  const acceptableWidth: number = 80 // containerWidth * (THRESHOLD_ACCEPTABLE / 100)
  const deleteWithoutConfirmThreshold: number =
    containerWidth * (THRESHOLD_NO_CONFIRM / 100)

  /* A function that is called when the user starts to touch the screen. */
  const onStart = useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      if (touching) return
      startTouchPosition.current = cursorPosition(event)
      initTranslate.current = translate
      setTouching(true)
    },
    [touching, translate]
  )

  /* A function that is called when the user moves their finger on the screen. */
  const onMove = useCallback(
    function (event: TouchEvent | MouseEvent) {
      if (!touching) return
      /* Checking if the user is moving their finger to the right. */
      if (
        cursorPosition(event) >
        startTouchPosition.current - initTranslate.current
      )
        return setTranslate(0)
      setTranslate(
        cursorPosition(event) -
          startTouchPosition.current +
          initTranslate.current
      )
    },
    [touching]
  )

  const onMouseMove = useCallback(
    function (event: MouseEvent): any {
      onMove(event)
    },
    [onMove]
  )

  const onTouchMove = useCallback(
    function (event: TouchEvent): any {
      onMove(event)
    },
    [onMove]
  )

  const onDeleteConfirmed = useCallback(() => {
    setDeleting(true)
  }, [onDelete])

  const onDeleteCancel = useCallback(() => {
    setTouching(() => false)
    setTranslate(() => 0)
    setDeleting(() => false)
    startTouchPosition.current = 0
    initTranslate.current = 0
  }, [onDelete])

  const onDeleteClick = useCallback(() => {
    if (onDeleteConfirm) {
      onDeleteConfirm(onDeleteConfirmed, onDeleteCancel)
    } else {
      onDeleteConfirmed()
    }
  }, [onDeleteConfirm, onDeleteConfirmed])

  const onMouseUp = useCallback(
    /* A function that is called when the user stops touching the screen. */
    function () {
      startTouchPosition.current = 0
      const acceptableMove = acceptableWidth * -0.7
      const showDelete = translate < acceptableMove
      const notShowDelete = translate >= acceptableMove
      const deleteWithoutConfirm =
        -1 * translate >= deleteWithoutConfirmThreshold
      /* Setting the translate value to the appropriate value based on the user's swipe. */
      if (deleteWithoutConfirm) {
        setTranslate(() => -containerWidth)
      } else if (notShowDelete) {
        setTranslate(() => 0)
      } else if (showDelete && !deleteWithoutConfirm) {
        setTranslate(() => -1 * acceptableWidth)
      }
      setTouching(() => false)
      if (deleteWithoutConfirm) onDeleteClick()
    },
    [containerWidth, deleteWithoutConfirmThreshold, onDeleteClick, translate]
  )

  useEffect(() => {
    if (touching) {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('touchmove', onTouchMove)
      window.addEventListener('mouseup', onMouseUp)
      window.addEventListener('touchend', onMouseUp)
    } else {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchend', onMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchend', onMouseUp)
    }
  }, [onMouseMove, onMouseUp, onTouchMove, touching])

  return (
    // In-And-Out animation

    <Transition
      appear={true}
      show={!deleting}
      enter="transition-all duration-75 ease-out overflow-hidden"
      enterFrom="max-h-0"
      enterTo="max-h-[43px]"
      leave="transition-all duration-200 ease-in overflow-hidden"
      leaveFrom="max-h-[43px]"
      leaveTo="max-h-0"
      afterEnter={() => {
        setTranslate(0)
        setShowButton(true)
      }}
      afterLeave={() => onDelete()}
    >
      <ClickAwayListener onClickAway={onDeleteCancel}>
        <div
          className="ease relative h-[43px] overflow-hidden rounded-sm transition-all duration-200"
          ref={container}
        >
          {/* Custom properties are necessary to avoid red line around children */}
          <div className="ease absolute top-[0px] left-0 h-[43px] w-full rounded-r-sm border-1 border-red-500 bg-red-400 transition duration-200 hover:bg-red-500">
            <button
              tabIndex={-1}
              type="button"
              aria-label="delete"
              onClick={onDeleteClick}
              className={clsx(
                'absolute top-0 -right-20 h-full w-20 font-medium tracking-wide text-white duration-200 ease-out',
                {
                  'transition-transform': !touching,
                  hidden: !showButton,
                }
              )}
              style={{ transform: `translateX(${translate}px)` }}
            >
              Delete
            </button>
          </div>
          <div
            className={clsx('transition duration-200 ease-out', {
              'transition-transform': !touching,
            })}
            style={{ transform: `translateX(${translate}px)` }}
            onMouseDown={onStart}
            onTouchStart={onStart}
          >
            {React.cloneElement(children, { deleting: translate !== 0 })}
          </div>
        </div>
      </ClickAwayListener>
    </Transition>
  )
}

export default SetWrapper
