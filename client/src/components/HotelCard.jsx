import { useNavigate } from 'react-router-dom'
function HotelCard({ hotel, onDelete }) {
    const navigate = useNavigate()

    return (
        <div className="hotel-card">
            <img 
            src={
                hotel.image 
                 ? hotel.image.startsWith("/uploads")
                 ? `http://localhost:5000${hotel.image}`
                 : hotel.image
                :"https://via.placeholder.com/400"
            } 
            alt={hotel.title} />

            

            <div className="hotel-info">
                <h2>{hotel.title}</h2>
                <p className="hotel-id">Hotel ID: {hotel.id}</p>
                <p className="price">₹{hotel.price}</p>
                <p>{hotel.description}</p>
                <button 
                className="favourite-btn"
                onClick={() => alert("Added to favourites")}
                >
                    ❤️
                </button>

                <button onClick={() => navigate(`/hotels/${hotel.id}`)}>
                    ViewDetails
                </button>

                <button onClick={() => navigate(`/hotels/edit/${hotel.id}`)}>
                    Edit
                </button>

                <button onClick={() => onDelete(hotel.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default HotelCard;