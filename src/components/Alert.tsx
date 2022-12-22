import React from 'react'

export default function Alert({ message, type }: AlertProps) {
  return <div className={type}>{message}</div>
}
