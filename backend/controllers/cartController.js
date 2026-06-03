import Cart from '../models/Cart.js';

//add item to cart
export const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
        } else {
            const item = cart.items.find(
                item => item.productId.toString() === productId
            );

            if (item) {
                item.quantity += 1;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }
        }

        await cart.save();
        res.json({
            message: 'Item added to cart',
            cart
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//remove cart items
export const removeItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(
            item => item.productId.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                message: 'Item not found in cart'
            });
        }

        item.quantity -= 1;

        if (item.quantity <= 0) {
            cart.items = cart.items.filter(
                item => item.productId.toString() !== productId
            );
        }

        await cart.save();
        res.json({
            message: 'Item removed from cart',
            cart
        });

    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//get cart for a user
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


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
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
