import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';


const ProductsBarChart = ({ products }) => {
    
    // Create an object to hold counts for each category
    const categoryCounts = {};

    // Count products by category
    products.forEach(({ category }) => {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    // Prepare data for the BarChart
    const chartData = Object.entries(categoryCounts).map(([category, count]) => ({
        category,
        count
    }));

    return (
        <div>
            <BarChart width={300} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#32963d" />
            </BarChart>
        </div>
    );
}

export default ProductsBarChart;
