import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import { t } from 'i18next';
import CommentManage from '../comment-manage/CommentManage';
import { useDispatch } from 'react-redux';
import RepliesList from '../../main-components/replies-list/RepliesList';
import {
    commentItem,
    replyItem,
    editComment,
    deleteComment,
} from "../../../redux/features/product/productSlice"

    

const CommentSection = ({ 
    item, 
    colors, 
    user, 
}) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [reply, setReply] = useState({});
    const [replyVisible, setReplyVisible] = useState({});
    const [showReplies, setShowReplies] = useState({});
    const [editMode, setEditMode] = useState({}); // State to manage edit mode for comments
    const [editedComment, setEditedComment] = useState({}); // State to hold edited comment text
    const navigate = useNavigate();


    // toggleCommentInput
    const toggleCommentInput = () => {
        setShowCommentInput((prev) => !prev); // Toggle the visibility of the textarea
    };

    // Toggle reply textarea visibility
    const toggleReplyVisibility = (commentId) => {
        setReplyVisible((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
    };
    // Toggle replies visibility
    const toggleRepliesVisibility = (commentId) => {
        setShowReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] })); // Toggle the visibility of replies
    };

        // Handle comment submission
        const handleCommentSubmit = async (e) => {
            e.preventDefault();
            if (!user) {
                alert("Please login to comment on this item. You will be redirected to the login page.");
                navigate("/login", { replace: true });
                return;
            }
            try {
                await dispatch(commentItem({ itemId: item?._id, comment, userName: user.name, userPhoto: user.photo })).unwrap();
                setComment(""); // Clear the comment input after submission
                setShowCommentInput(false); // Hide the textarea after submitting
            } catch (error) {
                console.error("Error submitting comment:", error);
                alert("for adding your comment. Please refresh the page.");
            }
        };

        // Handle reply submission
    const handleReplySubmit = async (e, commentId) => {
        e.preventDefault();
        if (!user) {
            alert("Please login to reply to this comment. You will be redirected to the login page.");
            navigate("/login", { replace: true });
            return;
        }

        const replyText = reply[commentId];
        if (!replyText) {
            alert("Reply cannot be empty.");
            return;
        }

        try {
            await dispatch(replyItem({ commentId, itemId: item._id, reply: replyText, userName: user.name, userPhoto: user.photo })).unwrap();
            setReply((prev) => ({ ...prev, [commentId]: "" }));
            setReplyVisible((prev) => ({ ...prev, [commentId]: false }));
        } catch (error) {
            console.error("Error submitting reply:", error);
            alert("for adding your reply. Please refresh the page.");
        }
    };

    // Handle comment edit
    const handleEditComment = (commentId) => {
        setEditMode((prev) => {
            // Toggle the edit mode state
            const isCurrentlyEditing = prev[commentId];
            return { ...prev, [commentId]: !isCurrentlyEditing };
        });
    
        // If cancelling edit mode, do not change the edited comment
        if (editMode[commentId]) {
            setEditedComment((prev) => ({ ...prev, [commentId]: "" }));
        } else {
            setEditedComment((prev) => ({ ...prev, [commentId]: item.comments.find(c => c._id === commentId).comment }));
        }
    };
    // handleEditSubmit
    const handleEditSubmit = async (e, commentId) => {
        e.preventDefault();
        try {
            await dispatch(editComment({ commentId, comment: editedComment[commentId] })).unwrap();
            setEditMode((prev) => ({ ...prev, [commentId]: false }));
        } catch (error) {
            console.error("Error editing comment:", error);
            alert("for editing your comment. Please refresh the page.");
        }
    };

    // Handle comment deletion
    const handleDeleteComment = async (commentId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                await dispatch(deleteComment(commentId)).unwrap();
            } catch (error) {
                console.error("Error deleting comment:", error);
                alert("for deleting your comment. Please refresh the page.");
            }
        }
    };

    // Function to shorten text
    const shortenText = (text, n) => {
        return text.length > n ? text.substring(0, n) + "..." : text;
    };
    // console.log(item)

    return (
        <Box className="comment-section mt-2 w-full">
            {/* Button to toggle the comment input visibility */}
            <Box className="flex flex-row justify-between w-full p-3">
                <button className='btn my-3' onClick={toggleCommentInput}>
                    {showCommentInput ? t("cancel") : t("addComment")}
                </button>
            </Box>
            {showCommentInput && (
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        placeholder={t("addComment")}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                    <button className='btn my-2' type="submit">{t("submit")}</button>
                </form>
            )}
             {/* Render comments */}
            {item?.comments.length > 0 ? (
                <Box className="comments-list">
                    <h3 className='my-2'>{t("comments")}:</h3>
                    <ul>
                        {item.comments.map((itemComment) => {
                            return (
                                <li key={itemComment._id} className='comment-content'>
                                    <Typography variant="subtitle1">
                                        <Box className="flex flex-row justify-between items-center">
                                            <Box className="flex flex-col">
                                                <span className="flex flex-row items-center">
                                                    {itemComment.photo && (
                                                        <img 
                                                            src={itemComment.photo} 
                                                            alt={`${itemComment.user}'s avatar`} 
                                                            style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px' }} 
                                                        />
                                                    )}
                                                    <strong>
                                                    { shortenText(itemComment.user, 16) || "Unknown User" }
                                                    </strong>:    
                                                </span>
                                                <p style={{
                                                    color: colors.grey[600],
                                                }}>
                                                    {shortenText(new Date(itemComment.createdAt).toLocaleString(), 16)}
                                                </p>
                                            </Box>
                                                <CommentManage 
                                                    editMode={editMode}
                                                    itemComment={itemComment}
                                                    handleEditComment={handleEditComment}
                                                    handleDeleteComment={handleDeleteComment}
                                                    toggleReplyVisibility={toggleReplyVisibility}
                                                    replyVisible={replyVisible}
                                                    t={t}
                                                    colors={colors} />
                                        </Box>
                                        {editMode[itemComment._id] ? (
                                            <form onSubmit={(e) => handleEditSubmit(e, itemComment._id)}>
                                                <textarea
                                                    value={editedComment[itemComment._id] || ""}
                                                    onChange={(e) => setEditedComment({ ...editedComment, [itemComment._id]: e.target.value })}
                                                    required
                                                />
                                                <button className='btn mt-3' type="submit">{t("save")}</button>
                                            </form>
                                        ) : (
                                            <p>{itemComment.comment}</p>
                                        )}
                                    </Typography>
                                    <Box className="flex flex-row items-baseline w-full">
                                    {/* Display Replies */}
                                        {itemComment.replies && itemComment.replies.length > 0 ? (
                                            <Box className="flex flex-col contentItem-reply">
                                                {/* Button to toggle replies visibility */}
                                                <button className='btn my-2' onClick={() => toggleRepliesVisibility(itemComment._id)}>
                                                    {showReplies[itemComment._id] ? t("hideReplies") : t("showReplies")}
                                                </button>
                                                <RepliesList shortenText={shortenText} colors={colors} itemComment={itemComment} showReplies={showReplies} t={t} />
                                            </Box>
                                        ) : (
                                            <p className='my-2'>{t("noReplies")}</p>
                                        )}
                                        <Box className="flex flex-col contentItem-reply">
                                            {/* Reply Form */}
                                            {replyVisible[itemComment._id] && (
                                                <form onSubmit={(e) => handleReplySubmit(e, itemComment._id)}>
                                                    <textarea
                                                        placeholder={t("reply")}
                                                        value={reply[itemComment._id] || ""}
                                                        onChange={(e) => setReply({ ...reply, [itemComment._id]: e.target.value })}
                                                        required
                                                    />
                                                    <button className='btn my-2' type="submit">{t("submit")}</button>
                                                </form>
                                            )}
                                        </Box>
                                    </Box>
                                </li>
                            );
                        })}
                    </ul>
                </Box>
            ) : (
                <Typography variant="body1">{t("noCommentsyet")}.</Typography>
            )}
        </Box>
);
};

export default CommentSection;