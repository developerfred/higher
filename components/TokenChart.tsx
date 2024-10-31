// src/components/TokenChart.tsx
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TokenChartProps {
    data: number[];
}

const TokenChart = ({ data }: TokenChartProps) => {
    const chartData = data.map((price, index) => ({
        time: index,
        price: price,
    }));

    return (
        <div className="bg-secondary p-6 rounded-lg border border-primary/20 hover:neon-border transition-all duration-300">
            <h3 className="text-xl font-bold text-primary mb-4">Price Chart (24h)</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <XAxis dataKey="time" stroke="#4ade80" />
                        <YAxis stroke="#4ade80" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1a1a1a',
                                border: '1px solid #00ff9d',
                                borderRadius: '8px',
                            }}
                            labelStyle={{ color: '#00ff9d' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#00ff9d"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TokenChart;