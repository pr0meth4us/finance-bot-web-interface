"use client";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

export default function ExpensePieChart({ data }) {
    const { income = {}, expense = {} } = data;

    // Combine USD and KHR expenses for chart simplicity. Using a fixed rate.
    const totalExpense = (expense.USD || 0) + ((expense.KHR || 0) / 4100);

    // This is a simplified example. A real one would pull detailed breakdown from API.
    // For now, let's just chart the totals.
    const chartData = [
        { name: 'Expense USD', value: expense.USD || 0 },
        { name: 'Expense KHR (in USD)', value: (expense.KHR || 0) / 4100 },
    ].filter(d => d.value > 0);

    if (chartData.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">No expense data for this month.</div>
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}