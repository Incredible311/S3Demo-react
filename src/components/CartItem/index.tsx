import React, { useEffect, useState, useCallback } from "react"
import { getProductByID } from "../../redux/slices/product"
import { Trash, Save } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from "../../redux/store";
import { removeProductFromCart, updateCartQuantity } from "../../redux/slices/cart";
import { TextField } from '@material-ui/core';

interface Cart {
    id: string,
    productId: string,
    quantity: number
}

type CardItemProps = {
    id: string,
    data: Cart
}

const CartItem: React.FC<CardItemProps> = (props: CardItemProps) => {

    const { data, id } = props;
    const dispatch = useDispatch();
    const { carts } = useSelector((state: IRootState) => state.cart);

    const [quantity, setQuantity] = useState<number>(0);
    const [product, setProduct] = useState<any>();

    const removeCartItem = useCallback((cartId: string) => {
        dispatch(removeProductFromCart(cartId))
    }, [dispatch])

    const handleChangeQuantity = useCallback((e) => {
        setQuantity(e.target.value)
    }, [dispatch, setQuantity])

    const saveQuantity = useCallback(() => {
        dispatch(updateCartQuantity(id, quantity))
    }, [dispatch, id, quantity])

    useEffect(() => {
        async function getData() {
            if (data?.productId) {
                const res = await getProductByID(data?.productId)
                setProduct(res)
            }
        }
        setQuantity(data?.quantity)
        getData()
    }, [])

    return (
        <div className="d-flex align-items-center justify-content-between cart-product-item flex-wrap">
            {
                product && <>
                    <div className="cart-product-img">
                        <div className="cart-product-img-content">
                            <img src={product.photo} alt="cart product" />
                        </div>
                    </div>
                    <div>
                        <p className="cart-product-title">{product.name}</p>
                        <p className="cart-product-price">{product?.currency} {product.price}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <TextField
                            id={`quantity-number-${id}`}
                            className="quantity-number"
                            label="Quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => handleChangeQuantity(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                        />
                        <div><Save className="cursor-pointer" onClick={() => saveQuantity()}/></div>
                    </div>
                    <div className="d-flex align-items-center">

                        <Trash onClick={() => removeCartItem(id)} className="remove-cart-item" />
                    </div>
                </>
            }

        </div>
    )
}

export default CartItem