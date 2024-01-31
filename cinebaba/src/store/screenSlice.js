import { createSlice } from '@reduxjs/toolkit'

export const screenSlice = createSlice({
    name:'screen',
    initialState: {
        tiers: [],
        selectedSeats: [],
        bookedSeats: [],
        totalPrice: 0,
        selectedShow: null
    },
    reducers: {
        addTiers: (state, action) => {
          state.tiers = action.payload
        },
        selectShow: (state, action)=> {
          state.selectedShow = action.payload
        },
        setbookedSeats: (state, action) =>{
          state.bookedSeats = action.payload
        },
        selectSeat: (state, action) => { 
           state.selectedSeats.push(action.payload)
           state.tiers.map((tier)=>{
              tier.rows.map((row)=>{
                if(row.name === action.payload.rowName){
                   const price = tier.price
                   state.totalPrice = state.totalPrice+price
                }
              })
           })  
        },
        deselectSeat: (state,action)=> {
          const deselectSeat = action.payload
          state.selectedSeats = state.selectedSeats.filter(selectedSeats =>{
            if(selectedSeats.rowName === deselectSeat.rowName && selectedSeats.seatNumber === deselectSeat.seatNumber){
                
            }
            else{
              return selectedSeats
            }
          })
          let deselectedSeatPrice;
          state.tiers.map((tier)=>{
            tier.rows.map((row)=>{
              if(row.name === action.payload.rowName){
                 state.totalPrice = state.totalPrice - tier.price
                
              }
            })
         })  
        }
    }
})    
export const { addTiers, selectSeat, selectShow ,deselectSeat, setbookedSeats } = screenSlice.actions
export default screenSlice.reducer