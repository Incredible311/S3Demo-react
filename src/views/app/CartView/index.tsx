import React, { ReactElement, useMemo, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from "../../../redux/store";
import { getCarts } from "../../../redux/slices/cart";
import { getProductByID } from "../../../redux/slices/product";
import CartItem from "../../../components/CartItem";
import { Grid } from '@material-ui/core';

interface Cart {
    id: string,
    productId: string,
    quantity: number
}

function CartView(): ReactElement {

    const dispatch = useDispatch();
    const { carts } = useSelector((state: IRootState) => state.cart);

    const [totalPrice, setTotalPrice] = useState<number>();

    const cartContentMemo = useMemo(() => (
        carts.length > 0 ? <div>
            {
                carts.map((p: any, id: number) => (
                    <div key={p.id}>
                        <CartItem id={p.id} data={p} />
                        {carts.length - 1 > id && <hr />}
                    </div>
                ))
            }
        </div> : <div className="cart-empty">
            Cart Empty
        </div>
    ), [carts])

    const handleCheckout = useCallback(() => {
        console.log("check out cart")
    }, [dispatch])

    const getTotalPrice = useCallback(() => {
        if (carts?.length > 0) {
            let price = 0.0;
            carts.forEach(async (c: Cart, id: number) => {
                const res = await getProductByID(c.productId);
                if (res) {
                    price = price + parseFloat(res.price) * c.quantity
                }
                if (carts.length === id + 1) {
                    console.log(price)
                    setTotalPrice(price)
                }
            })
        }
    }, [carts])

    const cartCountNumMemo = useMemo(() => {
        if (carts?.length > 0) {
            let count = 0;
            carts.forEach((c: any) => {
                count = count + parseInt(c.quantity);
            })
            return <div className="cart-count-num">{count}</div>
        }
    }, [carts])

    useEffect(() => {
        dispatch(getCarts())
    }, [dispatch])

    return (
        <div>
            <Grid container>
                <Grid item lg={8} md={6} xs={12}>
                    <div className="cart-block">
                        <div className="cart-content">
                            {cartContentMemo}
                        </div>
                    </div>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <div className="cart-block">
                        <div className="cart-content">
                            <div className="d-flex align-items-center justify-content-between">
                                <h3>Total product count: </h3>
                                <h3>{cartCountNumMemo}</h3>
                            </div>
                            <hr />
                            <div className="d-flex align-items-center justify-content-between">
                                <h3>Total product price: </h3>
                                {getTotalPrice()}
                                <h3>$ {totalPrice}</h3>
                            </div>
                            <hr />
                            <button onClick={() => handleCheckout()}
                                type="button" className="cart-clear-btn">
                                CHECKOUT
                            </button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default CartView