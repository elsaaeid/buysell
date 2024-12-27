import React from "react";
import {Box} from '@mui/material';
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Import your preferred code style



const CodeContent = ({children})=>{
  // Theme Colors Mode
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    return(
        <Box 
            style={{
                background: colors.grey[900],
                color: colors.grey[500],
                }}
            className="code-content w-full h-full">
            <Box
                className="code">
                <SyntaxHighlighter language="javascript" style={solarizedlight}>
                    {children}
                </SyntaxHighlighter>
            </Box>
        </Box>
    )
};
export default CodeContent;