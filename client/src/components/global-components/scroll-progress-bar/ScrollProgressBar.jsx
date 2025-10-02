import React, { useEffect, useState } from 'react';
import './ScrollProgressBar.css'; // Import the CSS for styling
import i18n from '../../../translation/i18n';

const ScrollProgressBar = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY;
        const progress = (scrollTop / totalHeight) * 100;
        setScrollProgress(progress);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="progress-bar" style={{ 
            left: i18n.language == 'en' ? '0' : '',
            right: i18n.language == 'ar' ? '0' : '',
            width: `${scrollProgress}%` 
            }} />
    );
};

export default ScrollProgressBar;