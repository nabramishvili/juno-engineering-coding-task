import React, { useCallback, useEffect, useMemo, useState } from "react";
import { fetchImage, fetchImageUrls } from "../api/index";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/system";
import { Button, Card } from "@mui/material";


const ImageCarousel = (props) => {
    const [imageUrls, setImageUrls] = useState([])
    const [imageUrlsLoaded, setImageUrlsLoaded] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)
    const [imageFetched, setImageFetched] = useState(0)

    const imagesExists = useMemo(() => imageUrls.length > 0, [imageUrls.length])

    const getNextIndex = useCallback(index => index + 1 < imageUrls.length ? index + 1 : 0, [imageUrls.length])
    const gePreviusIndex = useCallback(index => index - 1 >= 0 ? index - 1 : imageUrls.length - 1, [imageUrls.length])

    useEffect(() => {
        fetchUrls()
    }, [])

    useEffect(() => {
        if (!imagesExists) return
        fetchImage(imageIndex).then(() => setImageFetched(true))
        //pre-fetch previus and next images
        fetchImage(getNextIndex(imageIndex))
        fetchImage(gePreviusIndex(imageIndex))
        return () => {
            setImageFetched(false)
        }
    }, [imagesExists, imageIndex])

    const fetchUrls = useCallback(async () => {
        try {
            const urls = await fetchImageUrls()
            setImageUrls(urls)
            setImageUrlsLoaded(true)
        } catch(e) {
            console.error('Error fetching urls:', e)
        }
    }, [setImageUrlsLoaded, setImageUrls])
    return <div className="carousel_wrapper">
        <div className="carousel">
            {!imageUrlsLoaded && <CircularProgress /> }
            {imageUrlsLoaded && !imagesExists && <div className="carousel__empty">
                Images not found
            </div> }
            {imagesExists && <div className="carousel__content">
                <Button onClick={() => setImageIndex(gePreviusIndex(imageIndex))} variant="outlined">
                    Prev
                </Button>
                <div className="carousel__img-wrapper">
                    {imageFetched ? <img alt="img" src={imageUrls[imageIndex]} /> : <CircularProgress />}
                </div>
                <Button onClick={() => setImageIndex(getNextIndex(imageIndex))} variant="outlined">
                    Next
                </Button>
            </div> }
        </div>
    </div>;
};
export default ImageCarousel;
