import HotelCard from "./HotelCard";
function HotelList({ hotels, onDelete}){
    return(
        <div className="hotel-list">
            {hotels.map((hotel)=> (
                <HotelCard
                key={hotel.id}
                hotel={hotel}
                onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default HotelList;