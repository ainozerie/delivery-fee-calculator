import React from 'react'

interface InputProps {
  id: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: number;
} 

export default function Input({id, placeholder, onChange, value} : InputProps) {
  return (
    <>
      <input id={id} placeholder={placeholder} onChange={onChange} type="number" value={value}/>
    </>
  )
}
