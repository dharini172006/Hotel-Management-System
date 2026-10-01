import upload from '../middleware/upload.js';
import express from 'express'
import { 
    getHotels,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel
 } from '../controllers/hotelController.js'

const router = express.Router()
router.get('/',getHotels)
router.get('/:id', getHotelById)
router.post("/", upload.single("image"), createHotel);
router.put("/:id", upload.single("image"), updateHotel)
router.delete('/:id', deleteHotel)

export default router