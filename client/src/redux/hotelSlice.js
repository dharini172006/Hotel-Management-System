import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    hotels: [
        {
            id:1,
            title:'Grand Palace Hotel',
            description:'A comfortable hotel modern rooms and excellent facilities',
            price:2500,
            latitude:'10.7905',
            longitude:'78.7047',
            image:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        },
        {
            id:2,
            title: 'Ocean View Resort',
            description:'Enjoy a relaxing stay wiht a beautiful ocean view',
            price:3200,
            latitude:'10.7920',
            longitude:'78.7000',
            image:'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
        },
    ],
    loading: false,
    error: null,
}

const hotelSlice = createSlice({
    name: 'hotels' ,
    initialState,
    reducers: {
        setHotels: (state,action) =>{
            state.hotels = action.payload;
        }, 
        addHotel: (state, action) => {
            state.hotels.push(action.payload);
        },
        updateHotel:(state,action)=> {
            const index = state.hotels.findIndex(
                (hotel) => hotel.id === action.payload.id
            )
            if(index !== -1){
                state.hotels[index] = action.payload
            }
        },
            deleteHotel: (state,action) => {
                state.hotels= state.hotels.filter(
                    (hotel) => hotel.id !== action.payload
                )
    },
},
})

export default hotelSlice.reducer

export const{
    setHotels,
    addHotel,
    updateHotel,
    deleteHotel,
} = hotelSlice.actions
