import pool from '../db/db.js'
export const getHotels = async (req,res)=>{
    try{
        const result = await pool.query('SELECT * FROM hotels ORDER BY id')
        res.json(result.rows)
    }catch(error){
        console.error(error)
        res.status(500).json({
            message: 'Server Error',
        })
    }
}

export const createHotel = async (req, res) => {
    try{
        const{
            title,
            description,
            latitude,
            longitude,
            price,
        } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : "";
        if(!title || !description || !latitude || !longitude || !price)
        {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        if(Number(price) <= 0){
            return res.status(400).json({
                message: "Price must be greater than 0",
            });
        }
        if(Number(latitude) < -90 || Number(latitude) > 90){
            return res.status(400).json({
                message: "Invalid latitude",
            });
        }

        if(Number(longitude) < -180 || Number(longitude) > 180){
            return res.status(400).json({
                message: "Invalid longitude",
            });
        }
        const result=await pool.query(
  `INSERT INTO hotels(image,title,description,latitude,longitude,price)
  VALUES($1, $2, $3, $4, $5, $6)
  RETURNING *`,
  [image,title,description,latitude,longitude,price]
        )
        res.status(201).json(result.rows[0])
    }catch(error){
        console.error(error)
        res.status(500).json({
            message: 'Server Error',
        })
    }
}

export const updateHotel = async(req,res) => {
    try{
        const{ id } =req.params
        const{
            title,
            description,
            latitude,
            longitude,
            price,
        }=req.body;
        let image =  req.body.image;
        if(req.file){
            image = `/uploads/${req.file.filename}`;
        }
        if(!title || !description || !latitude || !longitude || !price)
        {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        if(Number(price) <= 0){
            return res.status(400).json({
                message: "Price must be greater than 0",
            });
        }
        if(Number(latitude) < -90 || Number(latitude) > 90){
            return res.status(400).json({
                message: "Invalid latitude",
            });
        }

        if(Number(longitude) < -180 || Number(longitude) > 180){
            return res.status(400).json({
                message: "Invalid longitude",
            });
        }
        const result=await pool.query(
            `UPDATE hotels
            SET image = $1,
            title = $2,
            description = $3,
            latitude =$4,
            longitude = $5,
            price = $6
            WHERE id = $7
            RETURNING *`,
            [
                image,
                title,
                description,
                latitude,
                longitude,
                price,
                id,
            ]
        )
        res.json(result.rows[0])
    }catch(error){
        console.error(error)
        res.status(500).json({
            message: 'Server Error',
        })
    }
}

export const getHotelById = async(req,res) => {
    try{
        const { id } =req.params
        const result = await pool.query(
            'SELECT * FROM hotels WHERE id = $1',
            [id]
        )
        if(result.rows.length === 0){
            return res.status(404).json({message: 'Hotel not found'})
        }
        res.json(result.rows[0])
    }catch(error){
        console.error(error)
        res.status(500).json({message: 'Server Error'})
    }
}

export const deleteHotel = async(req,res) => {
    try{
        const { id } = req.params
        await pool.query(
            'DELETE FROM hotels WHERE id=$1',
            [id]
        )
        res.json({
            message: 'Hotel deleted successfully'
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            message:'Server Error'
        })
    }
}