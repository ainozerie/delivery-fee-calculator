import React, { useState } from 'react'
import Button from './Button'
import Input from './Input'
import Label from './Label'
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import {round} from 'mathjs'
// function to calculate price of delivery
interface FormData {
  cart_value: string,
  distance: string,
  number_of_items: string,
  date_and_time: string,
  delivery_fee: number
}

const calculatePrice = (FormData: FormData) => {
  if (+FormData.cart_value >= 100) return 0; // if cart value >= 100 => delivery fee = 0
  let surcharge;
  let distance_fee;
  let items_fee;
  let delivery_fee;
  let day = FormData.date_and_time.slice(0, 3);
  let hours = +FormData.date_and_time.slice(16, 18);
  +FormData.cart_value >= 10 ? surcharge = 0 : surcharge = (10*100 - +FormData.cart_value*100) / 100; // by *10 and /10 we get accuracy 
  +FormData.distance <= 1000 ? distance_fee = 0 : distance_fee = (((+FormData.distance - 1000) - (+FormData.distance) % 500) / 500 + 1) * 1; // additional fee for every 500m
  +FormData.number_of_items <= 4 ? items_fee = 0 : items_fee = (+FormData.number_of_items - 4) * 0.5; // additional fee for items 
  console.log(surcharge, distance_fee, items_fee);
  delivery_fee = surcharge + distance_fee + items_fee;
  if (day === 'Fri' && hours >= 15 && hours <= 18) delivery_fee = round(((delivery_fee*100) * (1.1*100) / 10000), 2); // by *10 and /10 we get accuracy 
  if (delivery_fee < 0) return 0;
  return (delivery_fee >= 15 ? 15 : delivery_fee);
}

// default data for the from
const defaultFormData = {
  cart_value: '',
  distance: '',
  number_of_items: '',
  date_and_time: '',
  delivery_fee: 0
}
export default function Calculator() {

  const[formData, setFormData] = useState(defaultFormData);
  const {cart_value, distance, number_of_items, delivery_fee} = formData;
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
  }
  // button handler: prevent page reload, launch calculate price function, turn entered data to default
  const submitHandler = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      delivery_fee: calculatePrice(formData),
    }));
  };
  const clearHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
            <Button name='Calculate' onSubmit={submitHandler} />
          </div>
          <div className='calc_line'>
            <p className='final_cost_title'>Final delivery cost:</p>
            <p className='final_cost' >{delivery_fee}€</p>
          </div>
          <div className='calc_line'>
            <button onClick={clearHandler}>Clear</button>
          </div>
        </form>
      </div>
    )
}
