// https://github.com/arnaudambro/react-swipe-to-delete-ios

import clsx from 'clsx'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'

const THRESHOLD = 80

export interface Props {
  onDelete: Function
  onDeleteConfirm?: Function
  children: React.ReactNode
}

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
  const [created, setCreated] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const startTouchPosition = useRef(0)
  const initTranslate = useRef(0)
  const container = useRef<HTMLDivElement>(null)
  const containerWidth: number =
    container.current?.getBoundingClientRect().width || 0
  const deleteWithoutConfirmThreshold: number =
    containerWidth * (THRESHOLD / 100)

  // Used for in-animation
  useEffect(() => {
    setCreated(true)
    const timer = setTimeout(() => {
      setTranslate(0)
      setShowButton(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  const onStart = useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      if (touching) return
      startTouchPosition.current = cursorPosition(event)
      initTranslate.current = translate
      setTouching(true)
    },
    [touching, translate]
  )

  const onMove = useCallback(
    function (event: TouchEvent | MouseEvent) {
      if (!touching) return
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
    setDeleting(() => true)
    window.setTimeout(onDelete, 300)
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
    function () {
      startTouchPosition.current = 0
      const acceptableMove = THRESHOLD * -0.7
      const showDelete = translate < acceptableMove
      const notShowDelete = translate >= acceptableMove
      const deleteWithoutConfirm =
        -1 * translate >= deleteWithoutConfirmThreshold
      if (deleteWithoutConfirm) {
        setTranslate(() => -containerWidth)
      } else if (notShowDelete) {
        setTranslate(() => 0)
      } else if (showDelete && !deleteWithoutConfirm) {
        setTranslate(() => -1 * THRESHOLD)
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
    <ClickAwayListener onClickAway={onDeleteCancel}>
      <div
        className={clsx(
          'relative h-10 overflow-hidden rounded duration-300 ease-out',
          {
            'max-h-0 transition-all': deleting,
            'max-h-10': !deleting && created,
          },
          {
            'duration-300': created,
            'my-1 max-h-10': created && !deleting,
            'my-0 max-h-0 transition-all duration-200': !created,
          }
        )}
        ref={container}
      >
        {/* Custom properties are necessary to avoid red line around children */}
        <div className="absolute top-[1px] left-0 h-[38px] w-full rounded bg-red-500">
          <button
            type="button"
            aria-label="delete"
            onClick={onDeleteClick}
            className={clsx(
              'absolute top-0 -right-20 h-full w-20 border-l-2 border-l-white font-medium text-white duration-300 ease-out',
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
          className={clsx('bg-white duration-300 ease-out', {
            'transition-transform': !touching,
          })}
          style={{ transform: `translateX(${translate}px)` }}
          onMouseDown={onStart}
          onTouchStart={onStart}
        >
          {children}
        </div>
      </div>
    </ClickAwayListener>
  )
}

export default SetWrapper
