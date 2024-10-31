// src/components/TokenStats.tsx
interface TokenStatsProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: number;
}

const TokenStats = ({ title, value, icon, change }: TokenStatsProps) => {
  return (
    <div className="bg-secondary p-4 rounded-lg border border-primary/20 hover:neon-border transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm">{title}</span>
        <span className="text-primary">{icon}</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold text-white">{value}</span>
        {change !== undefined && (
          <span className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default TokenStats;



