import api from '../services/api'
import { useState,useEffect } from 'react'
import HotelCard from '../components/HotelCard'
import { useNavigate } from 'react-router-dom'
import  Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setHotels, deleteHotel } from "../redux/hotelSlice";
import HotelList from "../components/HotelList";


function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
const hotels = useSelector(
    (state ) => state.hotels.hotels
);
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const[minPrice, setMinPrice] = useState('')
    const[maxPrice, setMaxPrice] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const [showMessage, setShowMessage ] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const hotelsPerPage = 2
    useEffect(() => {
        fetchHotels()
    }, [])
    useEffect(() => {
        setCurrentPage(1)
    }, [search, minPrice, maxPrice, sortOrder])
    const fetchHotels = async() => {
        try{
            setLoading(true);
            const res=await api.get("/hotels");
            dispatch(setHotels(res.data));
        }catch(error){
            console.error(error);
        }finally{
            setLoading(false);
        }
    }
   
    
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this hotel?');
        if(!confirmDelete){
            return;
        }
        try{
            await api.delete(`/hotels/${id}`);
            dispatch(deleteHotel(id));
            setShowMessage(true)
        setTimeout(() => {
            setShowMessage(false)
        }, 2000)
    }catch(error){
        console.error(error)
    }
};



    let filteredHotels = hotels.filter((hotel) =>{
      const matchesSearch = hotel.title
        .toLowerCase()
        .includes(search.toLowerCase())
        const matchesMinPrice =
         minPrice === '' || Number(hotel.price) >= Number(minPrice)
        const matchesMaxPrice =
            maxPrice === '' || Number(hotel.price) <= Number(maxPrice)

            return matchesSearch && matchesMinPrice && matchesMaxPrice
})
   
        if(sortOrder === 'asc'){
            filteredHotels.sort(
                (a,b) => Number(a.price) - Number(b.price)
            )
        }
        if(sortOrder === 'desc'){
            filteredHotels.sort(
                (a,b) => Number(b.price) - Number(a.price)
            )
        }
       
const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage)
const startIndex = (currentPage -1) * hotelsPerPage
const currentHotels = filteredHotels.slice(
    startIndex,
    startIndex + hotelsPerPage
)


if(loading){
    return <div className="loader"></div>
}

    return(
        <div className="hotel-page">
          <div className="page-header">
            <div>
        <h1>Hotel List</h1>
        <p>Find and manage your hotel</p>
        </div>
        
        <button 
            className="add-button"
            onClick={() => navigate('/hotels/add')}
        >
            + Add Hotel
            </button>
        </div>
        <div className="stats">
            <h3>Total Hotels: {filteredHotels.length}</h3>
            <h3>
                Average Price: ₹
                {filteredHotels.length > 0
                ? (filteredHotels.reduce(
                    (sum, hotel) => sum + Number(hotel.price),
                     0
                    ) / filteredHotels.length
                ).toFixed(2)
                : 0}
            </h3>

            <h3>
                Total Value: ₹
                {filteredHotels.reduce(
                    (sum, hotel) => sum + Number(hotel.price),
                    0
                )}
            </h3>
        </div>


        <div className="filter-box">
            <input 
            type="text"
            placeholder="Search hotels by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />

            <input type="number" placeholder="Min Price" 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            />

            <input type="number" placeholder="Max Price" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}/>
            <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            >
                <option value="">Sort Price</option>
                <option value="asc">Low toHigh</option>
                <option value="desc">High to Low</option>
            </select>
        </div>

        <p style={{marginBottom:"20px"}}>
            Showing {currentHotels.length} of {filteredHotels.length} hotels
        </p>

        {showMessage && (
            <div className="success-message">
                Hotel deleted successfully
                </div>
        )}
{currentHotels.length === 0 ? (
    <h2 style={{ textAlign: "center"}}>No hotels found</h2>
) : (
    <HotelList
    hotels={currentHotels}
    onDelete={handleDelete}
    />
)}

       <Pagination
       currentPage={currentPage}
       totalPages={totalPages}
       setCurrentPage={setCurrentPage}
       />
<footer className="footer">
    <h3>Hotel Management System</h3>
    <p>Developed by DHARINI K</p>
    <p>@2025 All Rights Reserved</p>
    <p>{new Date().toLocaleDateString()}</p>
</footer>

       </div>
    )
}

export default Home