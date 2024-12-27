import React from 'react';
import CommentSection from '../../../components/portfolio-components/comment-section/CommentSection';
import { likeItem, unlikeItem, commentItem, replyItem, editComment, deleteComment } from '../../../redux/features/product/productSlice'; // Import the new actions



const ItemComment = ({ product, colors, user }) => {
    return (
        <CommentSection 
            item={product}
            colors={colors}
            user={user}
            likeItem={likeItem}
            unlikeItem={unlikeItem}
            commentItem={commentItem}
            replyItem={replyItem}
            editItemComment={editComment}
            deleteItemComment={deleteComment}
        />
    );
};

export default ItemComment;