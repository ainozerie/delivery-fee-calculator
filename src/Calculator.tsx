import React, { useState } from 'react'
import Button from './Button'
import Input from './Input'
import Label from './Label'
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
// import Moment from 'react-moment';


// default data for the from
const defaultFormData = {
  cart_value: 0,
  distance: 0,
  number_of_items: 0,
  date_and_time: ''
}

export default function Calculator() {

  const[formData, setFormData] = useState(defaultFormData);
  const {cart_value, distance, number_of_items} = formData;
  // input handler: saving data from inputs
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
    console.log(Datetime);
  };
  const dateHandler = (event: string | moment.Moment) => {
    setFormData((prevState) => ({
      ...prevState,
      date_and_time: event.toString()
    }));
    console.log(formData);
  }
  // button handler: prevent page reload, launch calculate price function, turn entered data to default
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
            <Input id='cart_value' onChange={changeHandler} placeholder='Cart value' value={cart_value} />
          </div>
          <div className='calc_line'>
          <Label htmlFor='distance' name='Distance'/>
            <Input id='distance' onChange={changeHandler} placeholder='Distance' value={distance} />
          </div>
          <div className='calc_line'>
          <Label htmlFor='number_of_items' name='Number of items'/>
            <Input id='number_of_items' onChange={changeHandler} placeholder='Number of items' value={number_of_items} />
          </div>
          <div className='calc_line'>
            <Label htmlFor='date_and_time' name='Date and time'/>
            <Datetime input={true} initialValue={new Date()} onChange={dateHandler}/>
          </div>
          <div className='calc_line'>
            <p className='final_cost_title'>Final delivery cost:</p>
            <p className='final_cost' >{+formData.cart_value + +formData.distance}€</p>
          </div>
          
          <div className='calc_line'>
            <Button name='Calculate' onSubmit={submitHandler} />
          </div>
        </form>
      </div>
    )
}
