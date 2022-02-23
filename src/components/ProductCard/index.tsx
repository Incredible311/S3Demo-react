import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart } from "react-feather";
import { IRootState } from "../../redux/store";
import { Product } from '../../redux/slices/product';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { addProductToCart } from "../../redux/slices/cart";

type ProductCardProps = {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {

    const { product } = props;
    const dispatch = useDispatch();
    const { carts } = useSelector((state: IRootState) => state.cart);

    const addCart = useCallback(() => {
        dispatch(addProductToCart(product.id))
    }, [])

    return (
        <div className="product-card">
            <div className="product-image">
                <div className="product-image-content">
                        <LazyLoadImage
                            alt={"product image"}
                            src={product.photo}
                        />
                        <div className="product-image-caption">{product.name}</div>
                    {/* <img src={product.photo} alt="product" /> */}
                </div>
                <div className="price-badge">{product.currency}{product.price}</div>
            </div>
            <div className="product-title-div">
                <h5 className="product-title">{product.name}</h5>
                <div onClick={() => addCart()}><ShoppingCart size={26} /></div>
            </div>
            <p className="product-description">{product.description}</p>
        </div>
    )
}

export default ProductCard