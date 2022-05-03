import React, { useEffect, useState } from "react";
import { fetchImage, fetchImageUrls } from "../api/index";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/system";
import { Button, Card } from "@mui/material";


const ImageCarousel = (props) => {
    const [imageUrls, setImageUrls] = useState([])
    const [imageUrlsLoaded, setImageUrlsLoaded] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)
    const [imageFetched, setImageFetched] = useState(0)

    const imagesExists = imageUrls.length > 0

    const getNextIndex = index => index + 1 < imageUrls.length ? index + 1 : 0
    const gePreviusIndex = index => index - 1 >= 0 ? index - 1 : imageUrls.length - 1

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

    const fetchUrls = async () => {
        try {
            const urls = await fetchImageUrls()
            setImageUrls(urls)
            setImageUrlsLoaded(true)
        } catch(e) {
            console.error('Error fetching urls:', e)
        }
    }

    if (!imageUrlsLoaded) return <CircularProgress />

    if (imageUrlsLoaded && !imagesExists) return <div className="carousel__empty">
        Images not found
    </div>

    return <div className="carousel__content">
        <Button onClick={() => setImageIndex(gePreviusIndex(imageIndex))} variant="outlined">
            Prev
        </Button>
        <div className="carousel__img-wrapper">
            {imageFetched ? <img alt="img" src={imageUrls[imageIndex]} /> : <CircularProgress />}
        </div>
        <Button onClick={() => setImageIndex(getNextIndex(imageIndex))} variant="outlined">
            Next
        </Button>
    </div>
};
export default ImageCarousel;
