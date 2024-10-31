// src/components/TokenSection.tsx
import { useState, useEffect } from 'react';
import { Coins, TrendingUp, BarChart3, Wallet } from 'lucide-react';
import TokenStats from './TokenStats';
import TokenSwap from './TokenSwap';
import TokenChart from './TokenChart';

const HIGHER_TOKEN_ADDRESS = '0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe';
const BASE_CHAIN_ID = 8453;

const TokenSection = () => {
  const [tokenData, setTokenData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const response = await fetch(
          `https://coins.llama.fi/prices/current/base:${HIGHER_TOKEN_ADDRESS}`
        );
        const data = await response.json();
        setTokenData(data.coins[`base:${HIGHER_TOKEN_ADDRESS}`]);
      } catch (error) {
        console.error('Error fetching token data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
    const interval = setInterval(fetchTokenData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 mb-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-primary neon-text">HIGHER Token</h2>
        <p className="text-xl text-primary-dark">Power your HighClan experience</p>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TokenStats
              title="Current Price"
              value={`$${tokenData?.price.toFixed(4) || '0.00'}`}
              icon={<Coins className="w-6 h-6" />}
              change={tokenData?.price_change_24h}
            />
            <TokenStats
              title="24h Volume"
              value={`$${(tokenData?.volume || 0).toLocaleString()}`}
              icon={<BarChart3 className="w-6 h-6" />}
            />
            <TokenStats
              title="Market Cap"
              value={`$${(tokenData?.mcap || 0).toLocaleString()}`}
              icon={<TrendingUp className="w-6 h-6" />}
            />
            <TokenStats
              title="Holders"
              value="Loading..."
              icon={<Wallet className="w-6 h-6" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TokenChart data={tokenData?.sparkline || []} />
            <TokenSwap tokenAddress={HIGHER_TOKEN_ADDRESS} chainId={BASE_CHAIN_ID} />
          </div>
        </>
      )}
    </div>
  );
};

export default TokenSection;

