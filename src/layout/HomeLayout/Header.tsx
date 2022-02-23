import React, { ReactElement, useMemo, useCallback, useEffect, useState } from "react"
import { ShoppingCart } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { IRootState } from "../../redux/store";
import { getCarts } from "../../redux/slices/cart";

function Header(): ReactElement {

    const history = useHistory();
    const dispatch = useDispatch();
    const { carts } = useSelector((state: IRootState) => state.cart);

    const handleClick = useCallback((y) => {
        history.push("/cart")
    }, [])

    const cartCountNumMemo = useMemo(() => {
        if (carts?.length > 0) {
            let count = 0;
            carts.forEach((c: any) => {
                count = count + parseInt(c.quantity);
            })
            return <div className="cart-count-num">{count}</div>
        }
    }, [carts?.length])

    useEffect(() => {
        dispatch(getCarts())
    }, [dispatch])

    return (
        <div>
            <header className="header d-flex align-items-center justify-content-between">
                <div className="header__menu d-flex align-items-center">
                    <h1 onClick={() => history.push("/")} className="mb-0 mt-0">S3DEMO</h1>

                </div>
                <div onClick={handleClick} className="header__action d-flex align-items-center cart-btn">
                    <ShoppingCart size={28} />
                    {cartCountNumMemo}
                </div>

            </header>

            <header className="mobile-header justify-content-between">
                <h2 onClick={() => history.push("/")} className="mb-0 mt-0">S3DEMO</h2>
                <div onClick={handleClick} className="cart-btn">
                    <ShoppingCart size={28} />
                    {cartCountNumMemo}
                </div>

            </header>
        </div>
    )
}

export default Header