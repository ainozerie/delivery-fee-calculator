import React from 'react'
interface ButtonProps {
  name: string;
  onSubmit: React.FormEventHandler<HTMLButtonElement>;
  className: string;
} 
export default function Button({name, onSubmit, className} : ButtonProps) {
  return (
    <button onClick={onSubmit} className={className}>{name}</button>
  )
}
