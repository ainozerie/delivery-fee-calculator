import React from 'react'

interface LabelProps{
  name: string;
  htmlFor?: string
} 

export default function Label({name, htmlFor} : LabelProps) {
  return (
    <label htmlFor={htmlFor}>{name}</label>
  )
}
