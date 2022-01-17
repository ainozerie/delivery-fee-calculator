import React, { useState } from 'react'
import Button from './Button'
import Input from './Input'
import Label from './Label'

const defaultFormData = {
  cart_value: '',
  distance: '',
  number_of_items: '',
  date_and_time: ''
}

export default function Calculator() {

  const[formData, setFormData] = useState(defaultFormData)

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
    console.log(formData)
  };
  const submitHandler = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setFormData(defaultFormData);
  };

    return (
      <div className='calculator'>
        <form>
          <div className='calc_line'>
            <p className='title'>Fill in fields:</p>
          </div>
          <div className='calc_line'>
          <Label htmlFor='cart_value' name='Cart value'/>
          <Input id='cart_value' onChange={changeHandler}/>
          </div>
          <div className='calc_line'>
          <Label htmlFor='distance' name='Distance'/>
            <Input id='distance' onChange={changeHandler}/>
          </div>
          <div className='calc_line'>
          <Label htmlFor='number_of_items' name='Number of items'/>
            <Input id='number_of_items' onChange={changeHandler}/>
          </div>
          <div className='calc_line'>
          <Label htmlFor='date_and_time' name='Date and time'/>
            <Input id='date_and_time' onChange={changeHandler}/>
          </div>
          <div className='calc_line'>
            <p className='final_cost_title'>Final delivery cost:</p>
            <p className='final_cost' >15€</p>
          </div>
          <div className='calc_line'>
            <Button name='Submit' onSubmit={submitHandler} />
          </div>
        </form>
      </div>
    )
}
