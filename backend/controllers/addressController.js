import addressSchema from "../models/address.js";

export const addAddress = async (req, res) => {
    try {
        const address = await addressSchema.create(req.body);
        res.status(201).json({ message: 'Address added successfully', address });
    } catch (error) {
        res.status(500).json({ message: 'Error adding address', error });
    }
};

//get address by user id
export const getAddress = async (req, res) => {
    try {
        const address = await addressSchema.find({ userId: req.params.userId });
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.status(200).json({ address });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching address', error });
    }
};