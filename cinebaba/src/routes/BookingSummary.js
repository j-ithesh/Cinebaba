
import React, { useState } from 'react'
import axios from 'axios';
import styles from './BookingSummary.module.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function BookingSummary(props) {
  const [loading, setLoading] = useState(false)
    const selectedSeats = useSelector(state=>state.screen.selectedSeats)
    const show = useSelector(state=>state.screen.selectedShow)
    const totalPrice = useSelector(state=>state.screen.totalPrice)
   

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const form = e.target
        const email = form['email'].value
        const phone = form['phone'].value
        const bookingPayload = {
            email: email,
            phone: phone,
            selectedSeats: selectedSeats,
            show: show
        }
        axios.post('http://localhost:3000/bookings',bookingPayload)
        .then(res=>{
          setLoading(false)
           console.log(res)
        })
        .catch(err=>{
          setLoading(false)
          console.log(err)
        })
    }   

    return(
       <main className={styles.Main}>
         <div className={styles.Summary}>
           <h2>Booking Summary</h2>
           <ul className={styles.Seats}>
              {
                selectedSeats.map((seat ,index)=>{
                    return(
                        <li key={index} className={styles.selectedSeats}>
                            <h3>{seat.rowName}-{seat.seatNumber}</h3>

                        </li>
                    )
                })
              }
           </ul>
           <form className={styles.ConfirmationForm} onSubmit={handleSubmit}>
             <label htmlFor='email'>Email</label>
             <input type='email' id='email' name='email'/>
             <label htmlFor='phone'>phone</label>
             <input type='text' id='phone' name='phone'/>
             <button type='submit' className={styles.ConfirmButton}>{loading?'processing...':`Confirm booking - Rs${totalPrice}`}</button>
           </form>
            
         </div>
       </main>

    )
}
export default BookingSummary;