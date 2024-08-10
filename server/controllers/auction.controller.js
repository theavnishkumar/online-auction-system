import uploadImage from '../services/cloudinaryService.js';
import Product from '../models/product.js';


const createAuction = async (req, res) => {
    try {
        const { itemName, itemPrice, itemDescription, itemCategory, itemStartDate, itemEndDate, seller } = req.body;
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
            seller,
        });
        await newAuction.save();

        res.status(201).json({ message: 'Auction created successfully', newAuction });
    } catch (error) {
        res.status(500).json({ message: 'Error creating auction', error: error.message });
    }
};

const showAuction = async (req, res) => {
    try {
        const auctions = await Product.find().sort({ createdAt: -1 });
        return res.status(200).json({ message: 'All auctions', auctions });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching auctions', error: error.message });
    }
}

export { createAuction, showAuction };