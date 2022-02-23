import React, { ReactElement, useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from "../../../redux/store"
import product, { getProducts } from "../../../redux/slices/product"
import ProductCard from "../../../components/ProductCard"
import { Grid, CircularProgress } from '@material-ui/core';
import InfiniteScroll from 'react-awesome-infinite-scroll';
import { Product } from '../../../redux/slices/product';
import BannerComponent from "../../../components/Banner";

function HomeView(): ReactElement {

    const dispatch = useDispatch()
    const { products, error } = useSelector((state: IRootState) => state.product)

    const [perPage, setPerPage] = useState(16)
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const fetchMoreData = useCallback(() => {
        setTimeout(() => {
            setPage(page + 1)
            if (products.length >= 60) {
                setHasMore(false)
            }
        }, 1000);
    }, [page, setPage, products, setHasMore])

    const reload = useCallback(() => {
        setIsRefreshing(true)
        setTimeout(() => {
            setIsRefreshing(false)
        }, 1000);
    }, [setIsRefreshing])

    useEffect(() => {
        dispatch(getProducts(0, perPage * (page + 1)))
    }, [dispatch, page])

    const productListMemo = useMemo(() => (
        <InfiniteScroll
            length={products?.length}
            next={fetchMoreData}
            scrollableParent={document.querySelector(".cart-index")}
            hasMore={hasMore}
            isRefreshing={isRefreshing}
            pullDownToRefresh
            refreshFunction={reload}
            loadingComponent={<div className="d-flex justify-content-center"><CircularProgress /></div>}
        >
            <Grid container>
                {
                    products && products.map((product: any, id: number) => (
                        <Grid key={id} item lg={3} md={4} sm={6} xs={12}>
                            <ProductCard
                                product={product} />
                        </Grid>
                    ))
                }
            </Grid>
        </InfiniteScroll>

    ), [products, hasMore, isRefreshing])

    return (
        <div className="content-container">
            <BannerComponent />
            {!error && products?.length ? productListMemo : <div className="d-flex justify-content-center"><h2>No products</h2></div>}
        </div >
    )
}

export default HomeView