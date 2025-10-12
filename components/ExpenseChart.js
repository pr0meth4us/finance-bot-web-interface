'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff4d4d'];

const ExpenseChart = ({ data = [] }) => {
    const chartData = data.map((item) => ({
        name: item.category,
        value: parseFloat(item.totalUSD.toFixed(2)),
    }));

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md h-80">
            <h3 className="text-lg font-semibold text-white mb-4">
                Monthly Expense Breakdown
            </h3>
            {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => `$${value.toFixed(2)}`}
                            contentStyle={{
                                backgroundColor: '#374151', // bg-gray-700
                                borderColor: '#4B5563', // border-gray-600
                            }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                    <p>No expense data for this period.</p>
                </div>
            )}
        </div>
    );
};

export default ExpenseChart;