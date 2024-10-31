import { ReactNode } from 'react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
    return (
        <div className="bg-secondary rounded-lg p-4 border border-primary/20 hover:neon-border transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-primary text-sm">{title}</p>
                    <p className="text-2xl font-bold text-white">{value}</p>
                </div>
                <div className="text-primary">{icon}</div>
            </div>
        </div>
    );
};

export default StatsCard;