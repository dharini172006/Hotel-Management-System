import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HotelForm from '../components/HotelForm'
import api from '../services/api'

function EditHotel(){
const { id } = useParams()
const [hotel, setHotel] = useState(null)
useEffect(() => {
    api.get(`/hotels/${id}`)
    .then((res) => {
        setHotel(res.data)
    })
    .catch((err) => {
        console.error(err)
    })
}, [id])

if(!hotel){
    return <h2>Loading..</h2>
}
return (
    <>
    <h1>Edit Hotel</h1>
    <HotelForm hotel={hotel} isEdit={true} />
    </>
)
}
export default EditHotel