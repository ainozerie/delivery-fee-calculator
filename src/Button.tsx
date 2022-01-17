import React from 'react'
interface ButtonProps {
  name: string;
  onSubmit: React.FormEventHandler<HTMLButtonElement>;
} 
export default function Button({name, onSubmit} : ButtonProps) {
  return (
    <button onClick={onSubmit}>{name}</button>
  )
}
