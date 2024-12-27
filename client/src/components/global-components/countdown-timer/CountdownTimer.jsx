import React, { useState, useEffect } from 'react';
import { t } from 'i18next';
import { FaFireAlt } from "react-icons/fa";
import "./CountdownTimer.css";
import { Box } from '@mui/material';

const CountdownTimer = ({ initialDays, initialHours, initialMinutes, initialSeconds }) => {

    // Calculate total initial seconds
    const calculateTotalInitialSeconds = () => {
        return initialDays * 24 * 60 * 60 + initialHours * 3600 + initialMinutes * 60 + initialSeconds;
    };

    // Calculate end time based on current time and initial values
    const calculateEndTime = () => {
        const totalSeconds = calculateTotalInitialSeconds();
        return Date.now() + totalSeconds * 1000; // Convert to milliseconds
    };

    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        // Check if there's a saved end time in localStorage
        const savedEndTime = localStorage.getItem('countdownEndTime');
        if (savedEndTime) {
            const remainingTime = Math.max(0, new Date(savedEndTime) - Date.now());
            setTimeLeft(Math.floor(remainingTime / 1000)); // Convert milliseconds to seconds
        } else {
            const endTime = calculateEndTime();
            localStorage.setItem('countdownEndTime', new Date(endTime).toISOString());
            setTimeLeft(calculateTotalInitialSeconds());
        }
    }, [initialDays, initialHours, initialMinutes, initialSeconds]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    localStorage.removeItem('countdownEndTime'); // Clear saved end time
                    return 0;
                }
                return prevTime - 1; // Decrement the time left by 1 second
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const calculateTimeComponents = (seconds) => {
        const days = Math.floor(seconds / (24 * 60 * 60));
        const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secondsLeft = seconds % 60;

        return { days, hours, minutes, seconds: secondsLeft };
    };

    const timeLeftComponents = calculateTimeComponents(timeLeft);

    return (
        <Box className='shows-item flex flex-row justify-between items-center w-full'>
            {timeLeft > 0 ? (
                <>
                    <Box className='flex flex-row items-center'>
                        <h1>{t("shows.title")}</h1>
                        <span className='fire animate-vibrate'>
                            <FaFireAlt />
                        </span>
                    </Box>
                    <Box className='flex flex-row items-center justify-between'>
                        <h1 
                            className='shows-end flex justify-center'
                        >{t("shows.end")}</h1>
                        <Box className="flex flex-row items-center justify-evenly w-full">
                            <p className="flex flex-col justify-center items-center">
                                <span className='time-title'>{t("shows.days")}</span>
                                <span>{timeLeftComponents.days}</span>
                            </p>
                            <span className='mt-2'>:</span>
                            <p className="flex flex-col justify-center items-center">
                                <span className='time-title'>{t("shows.hours")}</span>
                                <span>{timeLeftComponents.hours}</span>
                            </p>
                            <span className='mt-2'>:</span>
                            <p className="flex flex-col justify-center items-center">
                                <span className='time-title'>{t("shows.minutes")}</span>
                                <span>{timeLeftComponents.minutes}</span>
                            </p>
                            <span className='mt-2'>:</span>
                            <p className="flex flex-col justify-center items-center">
                                <span className='time-title'>{t("shows.seconds")}</span>
                                <span>{timeLeftComponents.seconds}</span>
                            </p>
                        </Box>
                    </Box>
                </>
            ) : (
                <Box>{t("shows.timeUp")}</Box> // Display a message when time is up
            )}
        </Box>
    );
};

export default CountdownTimer;