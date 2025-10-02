import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

const ProductsCircleChart = ({ products }) => {
    // Create an object to hold counts for each category
    const categoryCounts = {};

    // Count products by category
    products.forEach(({ category }) => {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    // Prepare data for the PieChart
    const chartData = Object.entries(categoryCounts).map(([category, count]) => ({
        category,
        count
    }));

    // Define colors for the pie slices
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6699'];

    return (
        <div>
            <PieChart width={300} height={300}>
                <Pie
                    data={chartData}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
}

export default ProductsCircleChart;
