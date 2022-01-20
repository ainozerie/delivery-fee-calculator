import React, { useState } from 'react'
import Button from './Button'
import Input from './Input'
import Label from './Label'
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import {round} from 'mathjs'; // to round delivery price we get

interface FormData {
  cart_value: string,
  distance: string,
  amount_of_items: string,
  date_and_time: string,
  delivery_fee: number
}

// function to calculate price of delivery
const calculatePrice = (FormData: FormData) => {
  if (+FormData.cart_value >= 100) return 0; // if cart value >= 100 => delivery fee = 0
  let surcharge;
  let distance_fee = 2;
  let items_fee;
  let delivery_fee;
  let day = FormData.date_and_time.slice(0, 3); // we save exact day from Datetimr
  let hours = +FormData.date_and_time.slice(16, 18); // we save hours from datetime
  // calculate surcharge, distance_fee, items_fee
  +FormData.cart_value >= 10 ? surcharge = 0 : surcharge = (10*100 - +FormData.cart_value*100) / 100; // by *100 and /100 we get accuracy 
  +FormData.distance <= 1000 ? distance_fee = 2 : distance_fee += (((+FormData.distance - 1000) - (+FormData.distance % 500)) / 500) * 1; // additional fee for every 500m
  if (+FormData.distance % 500 >= 1 && +FormData.distance > 1000) distance_fee += 1;
  +FormData.amount_of_items <= 4 ? items_fee = 0 : items_fee = (+FormData.amount_of_items - 4) * 0.5; // additional fee for items 
  
  delivery_fee = surcharge + distance_fee + items_fee;

  if (day === 'Fri' && hours >= 15 && hours <= 18) delivery_fee = round(((delivery_fee*100) * (1.1*100) / 10000), 2); // by *100 and /10000 we get accuracy 
  if (delivery_fee < 0) return 0;
  return (delivery_fee >= 15 ? 15 : round(delivery_fee, 2));
}

// default data for the from
const defaultFormData = {
  cart_value: '',
  distance: '',
  amount_of_items: '',
  date_and_time: '',
  delivery_fee: 0
}
export default function Calculator() {

  const[formData, setFormData] = useState(defaultFormData);
  const {cart_value, distance, amount_of_items, delivery_fee} = formData;
  // input handler: saving data from inputs
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
    console.log(Datetime);
  };
  // date and time handler: saving picked date and time
  const dateHandler = (event: string | moment.Moment) => {
    setFormData((prevState) => ({
      ...prevState,
      date_and_time: event.toString()
    }));
  }
  // button handler: prevent page reload, launch calculate price function
  const submitHandler = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      delivery_fee: calculatePrice(formData),
    }));
  };
  // button handler: clear inputs and change entered data to default
  const clearHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setFormData(defaultFormData);
  };


    return (
      <div className='calculator'>
        <form>
          <div className='calc_line'>
            <p className='title'>Fill in the fields:</p>
          </div>
          <div className='calc_line'>
            <Label htmlFor='cart_value' name='Cart value, €'/>
            <Input id='cart_value' onChange={changeHandler} placeholder='Cart value' value={cart_value} />
          </div>
          <div className='calc_line'>
            <Label htmlFor='distance' name='Distance, m'/>
            <Input id='distance' onChange={changeHandler} placeholder='Distance' value={distance} />
          </div>
          <div className='calc_line'>
            <Label htmlFor='amount_of_items' name='Amount of items'/>
            <Input id='amount_of_items' onChange={changeHandler} placeholder='Amount of items' value={amount_of_items} />
          </div>
          <div className='calc_line'>
            <Label name='Time'/>
            <Datetime input={true} initialValue={new Date()} onChange={dateHandler}/>
          </div>
          <div className='calc_line'>
            <p className='final_cost_title'>Final delivery cost:</p>
            <p className='final_cost'>{delivery_fee}€</p>
          </div>
          <div className='calc_line btn_line'>
            <Button name='Calculate delivery price' className='btn_calculate' onSubmit={submitHandler} />
          </div>
          <div className='calc_line btn_line'>
            <button onClick={clearHandler} className='btn_clear'>Clear</button>
          </div>
        </form>
      </div>
    )
}
