import api from '../services/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addHotel, updateHotel } from '../redux/hotelSlice'


function HotelForm({hotel,isEdit = false}) {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: hotel?.title || '',
        description: hotel?.description || '',
        latitude: hotel?.latitude || '',
        longitude: hotel?.longitude || '',
        price: hotel?.price || '',
        image: null,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }   
        const handleImageChange = (e) => {
            setFormData({
                ...formData,
                image: e.target.files[0],
            })
        }
        const handleSubmit = async (e) => {
            e.preventDefault()
            if(!formData.title.trim()) {
                alert('Title is required')
                return
            }
            if(!formData.description.trim()){
                alert('Description is required')
                return
            }

            if(
                formData.latitude === '' || 
                formData.longitude === '' 
                        ){
                            alert('Latitude and ongitude are required')
                            return;
                        }            
            if(Number(formData.latitude) < -90 || Number(formData.latitude) > 90){
                alert('Latitude must be between -90 and 90');
                return;
            }
            if(Number(formData.longitude) < -180 || Number(formData.longitude) > 180){
                alert("Longitude must be between -180 and 180");
                return;
            }
            if(!formData.price || Number(formData.price) <= 0){
                alert('Please enter a valid price')
                return
            }
            try{
                const data = new FormData()
                data.append("title", formData.title)
                data.append("description", formData.description)
                data.append("latitude",formData.latitude)
                data.append("longitude",formData.longitude)
                data.append("price",formData.price)


                if(formData.image){
                    data.append("image", formData.image);
                }else if(isEdit){
                    data.append("image", hotel.image);
                }

                if(isEdit){
                    const res = await api.put(`/hotels/${hotel.id}`,data);
                    dispatch(updateHotel(res.data));
                }else{
                    const res = await api.post("/hotels",data);
                    dispatch(addHotel(res.data));
                }
                navigate('/')
            }   catch(error){
                console.error(error)
                alert(isEdit ? "Failed to update hotel": "Failed to add hotel")
            }
}
        return (
            <form onSubmit={handleSubmit} className="hotel-form"
            noValidate
            >
                <h1>{isEdit ? 'EditHotel' : 'Add Hotel'}</h1>
                <label>Title</label>
                <input 
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}

                />

                <label>Description</label>
                <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                />
                <label>Latitude</label>
                <input 
                type="number"
                name="latitude"
                min="-90"
                max="90"
                step="any"
                value={formData.latitude}
                onChange={handleChange}/>
                <label>Longitude</label>
                <input 
                type="number"
                name="longitude"
                min="-180"
                max="180"
                step="any"
                value={formData.longitude}
                onChange={handleChange}
                />
                <label>Hotel Image</label>
                <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                />
                {formData.image && (
                    <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Hotel preview"
                    className="image-preview"
                    />
                )}

                {!formData.image && hotel?.image && (
                    <img
                    src={
                        hotel.image.startsWith("/uploads")
                        ? `http://localhost:5000${hotel.image}`
                        : hotel.image
                    }
                    alt={hotel.title}
                    className="image-preview"
                    />
                )}


                <label>Price</label>
                <input
                type="number"
                name="price"
                min="1"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                />
                <button type="submit">
                    {isEdit ? 'Update Hotel' : 'Save Hotel'}
                    </button>

            </form>
        )
    }
    export default HotelForm