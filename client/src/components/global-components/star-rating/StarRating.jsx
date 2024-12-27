import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { rateProduct } from '../../../redux/features/product/productSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const StarRating = ({ item, user }) => {
    // Translation
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productRating = useSelector((state) => state.product.rating);
    const [rating, setRating] = useState(productRating || 0);
    const stars = [1, 2, 3, 4, 5]; // 5-star rating system

    // Get loading and error states from Redux
    const { isLoading, isError, message } = useSelector((state) => state.product);

    useEffect(() => {
        setRating(item?.rating || 0); // Update local state when item rating changes
    }, [item]);

    const onRate = async (newRating) => {
        if (!user) {
            alert("Please login to rate this product. You will be redirected to the login page.");
            navigate("/login", { replace: true });
            return;
        }

        // Allow users to remove their rating by clicking the same star
        if (newRating === rating) {
            newRating = 0; // Reset rating if the same star is clicked
        }

        // Log the new rating value for debugging
        console.log("New Rating:", newRating);

        // Validate the new rating before dispatching
        if (newRating < 0 || newRating > 5) {
            alert("Invalid rating. Please select a rating between 1 and 5.");
            return;
        }

        try {
            // Dispatch the rating action
            await dispatch(rateProduct({ itemId: item?._id, userId: user.id, rating: newRating })).unwrap();
            setRating(newRating); // Update local state after successful rating
        } catch (error) {
            console.error("Error rating item:", error);
            alert("Failed to rate the product. Please try again.");
        }
    };

    return (
        <div className="star-rating item-font p-2 w-full flex flex-row justify-between items-center">
            <span>
                {t("item.rating")}:
            </span>
            <div className='flex flex-row justify-evenly items-center'>
                {rating > 0 && <p className='item-font'>{t("item.rated")} {rating} {t("item.outOf")} 5</p>}
                {stars.map((star) => (
                    <span
                        className='item-font'
                        key={star}
                        onClick={() => onRate(star)}
                        style={{ cursor: "pointer", color: star <= rating ? "gold" : "gray" }}
                    >
                        {star <= rating ? <AiFillStar /> : <AiOutlineStar />}
                    </span>
                ))}
                {isLoading && <p>Loading...</p>}
                {isError && <p style={{ color: 'red' }}>{message}</p>}
            </div>
        </div>
    );
};