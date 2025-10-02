import React from 'react'
import { Box, Typography } from '@mui/material';

// The RepliesList component renders the replies for a given blog comment.
const RepliesList = ({
    itemComment,
    showReplies,
    t,
    colors,
    shortenText
}) => {
  return (
        <Box className="replies-list w-full">
            {showReplies[itemComment._id] && (
            <Box>
                <h3 className='my-2'>{t("replies")}:</h3>
                <ul>
                    {itemComment.replies.map((reply) => (
                        <li key={reply._id} className='reply-content'>
                            <Typography variant="subtitle2">
                                <Box className="flex flex-row items-center">
                                    {reply.photo && (
                                        <img 
                                            src={reply.photo} 
                                            alt={`${reply.user}'s avatar`} 
                                            style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px' }} 
                                        />
                                    )}
                                    <strong>{reply.user || "Unknown User"}</strong>: 
                                </Box>
                                <p style={{
                                    color: colors.grey[600],
                                }}>
                                    {shortenText(new Date(reply.createdAt).toLocaleString(), 16)}
                                </p>
                            </Typography>
                                <p className='mt-2'>{reply.reply}</p>
                        </li>
                    ))}
                </ul>
            </Box>
            )}
        </Box>
  )
}

export default RepliesList
