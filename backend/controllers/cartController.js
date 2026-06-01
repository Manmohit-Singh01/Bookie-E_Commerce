import Cart from '../models/Cart.js';

//add item to cart
export const addToCart = async (req, res) => {
    try {
        let item = null;

        if (!cart) {
            cart = await Cart.create({
                userId,
                items: [{ productId, quantity: 1 }]
            });
        } else {
            item = cart.items.find(
                item => item.productId.toString() === productId
            );

            if (item) {
                item.quantity += 1;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }

            await cart.save();
        }

        await cart.save();
        res.json({
            message: 'Item added to cart',
            cart
        });
    } 
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

//remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId
        );

        await cart.save();
        res.json({
            message: 'Item removed from cart',
            cart
        });
    }
    catch (error) {       
        res.status(500).json({ message: 'Server error' });
    }
}

//update item quantity in cart
export const updateQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(
            item => item.productId.toString() === productId
        );

        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        item.quantity = quantity;

        await cart.save();
        res.json({
            message: 'Item quantity updated',
            cart
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

//get cart by user id
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json({ cart });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

