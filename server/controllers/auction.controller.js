import uploadImage from '../services/cloudinaryService.js';
import Product from '../models/product.js';


const createAuction = async (req, res) => {
    try {
        const { itemName, itemPrice, itemDescription, itemCategory, itemStartDate, itemEndDate } = req.body;
        let imageUrl = '';

        if (req.file) {
            try {
                console.log(req.file);
                imageUrl = await uploadImage(req.file);
            } catch (error) {
                return res.status(500).json({ message: 'Error uploading image to Cloudinary', error: error.message });
            }
        }

        const newAuction = new Product({
            itemName,
            itemPrice,
            itemDescription,
            itemCategory,
            itemPhoto: imageUrl,
            itemStartDate,
            itemEndDate,
        });
        await newAuction.save();

        res.status(201).json({ message: 'Auction created successfully', newAuction });
    } catch (error) {
        res.status(500).json({ message: 'Error creating auction', error: error.message });
    }
};

export default createAuction;