import React, { useCallback, useMemo, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from "../../redux/store"
import { getBanners, Banner } from "../../redux/slices/banner"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function BannerComponent() {

    const dispatch = useDispatch()
    const { banners, error } = useSelector((state: IRootState) => state.banner)

    useEffect(() => {
        dispatch(getBanners())
    }, [dispatch])

    return (
        <div className="banner-container">
            {
                !error && banners?.length > 0 && <Carousel infiniteLoop={true} showThumbs={false}>
                    {
                        banners.map((banner: Banner, id: number) => {
                            return <div key={id} className="banner-card">
                                <div className="banner-image">
                                    <LazyLoadImage
                                        alt={"banner image"}
                                        src={banner.photo}
                                    />
                                </div>
                                <div className="banner-title">{banner.description}</div>
                            </div>
                        })
                    }
                </Carousel>
            }

        </div>
    )
}