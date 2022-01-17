import React from 'react'

interface InputProps {
  id: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
} 

export default function Input({id, placeholder, onChange} : InputProps) {
  return (
    <>
      <input id={id} placeholder={placeholder} onChange={onChange} />
    </>
  )
}
