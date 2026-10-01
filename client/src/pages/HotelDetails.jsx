import { useParams, useNavigate }from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import api from '../services/api'
import { useEffect, useState } from 'react'



function HotelDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const hotels = useSelector((state) => state.hotels.hotels)
    const [userLocation, setUserLocation] = useState(null)
    useEffect(() => {
        if(!navigator.geolocation){
            return
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation([
                    position.coords.latitude,
                    position.coords.longitude,
                ])
            },
            () => {
                setUserLocation(null)
            }
         )
        }, [])
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
        return <h2> Loading...</h2>
        return <h1>Hotel not found</h1>
    }
    return(
        <>
        <Helmet>
            <title> {hotel.title} | Hotel Details</title>
            <meta
            name="description"
            content={hotel.description}
            />
            </Helmet>
        <div className="hotel-page">
            <button onClick={() => navigate(-1)}>
                ← Back to Hotels
            </button>
            <div className="hotel-details">
                <img 
                src=
                {
                    hotel.image.startsWith("/uploads")
                    ? `http://localhost:5000${hotel.image}`
                    : hotel.image
                }
                alt={hotel.title}
                />
                <div className="hotel-map">
                    <h2>Hotel Location</h2>
                    <MapContainer
                    center={[Number(hotel.latitude),Number(hotel.longitude)]}
                    zoom={15}
                    style={{height: '350px', width: '100%'}}
                    >
                        <TileLayer
                        attribution="&copy; OpenStreetMap contributions"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[
                            Number(hotel.latitude),
                            Number(hotel.longitude),
                        ]}
                        >
                        <Popup>{hotel.title}</Popup>
                        </Marker>
                        {userLocation && (
                        <Marker position={userLocation}>
                            <Popup>Your current location</Popup>
                            </Marker>
                            )}
                    </MapContainer>
                </div>
                <div className="hotel-info">
                    <h1>{hotel.title}</h1>
                    <p className="price">₹{hotel.price}</p>
                    <p>{hotel.description}</p>
                    <p><strong>Latitude:</strong> {hotel.latitude}</p>
                    <p>
                        <strong>
                            Longitude:
                        </strong> {hotel.longitude}
                    </p>
                    <a 
                    href={`https://www.google.com/maps?q=${hotel.latitude},${hotel.longitude}`} 
                    target="_blank"
                     rel="noreferrer"
                     >
                        Open in Google Maps
                        </a>
                </div>
            </div>
        </div>
        </>
    )
}


export default HotelDetails