// src/components/TokenSwap.tsx
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface TokenSwapProps {
    tokenAddress: string;
    chainId: number;
}

const TokenSwap = ({ tokenAddress, chainId }: TokenSwapProps) => {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState<any>(null);

    const getSwapQuote = async () => {
        if (!amount || isNaN(Number(amount))) return;

        setLoading(true);
        try {
            const response = await fetch(`https://api.0x.org/swap/v1/quote?`, {
                headers: {
                    '0x-api-key': process.env.NEXT_PUBLIC_0X_API_KEY || '',
                },
                method: 'GET',
                body: JSON.stringify({
                    sellToken: 'USDC',
                    buyToken: tokenAddress,
                    sellAmount: (Number(amount) * 1e6).toString(), // USDC has 6 decimals
                    chainId: chainId,
                }),
            });
            const data = await response.json();
            setQuote(data);
        } catch (error) {
            console.error('Error fetching swap quote:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-secondary p-6 rounded-lg border border-primary/20 hover:neon-border transition-all duration-300">
            <h3 className="text-xl font-bold text-primary mb-4">Buy HIGHER</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Amount in USDC</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-black/50 border border-primary/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                        placeholder="Enter amount..."
                    />
                </div>

                <button
                    onClick={getSwapQuote}
                    disabled={loading || !amount}
                    className="w-full bg-primary text-black py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                        'Get Quote'
                    )}
                </button>

                {quote && (
                    <div className="mt-4 p-4 bg-black/30 rounded-lg">
                        <p className="text-sm text-gray-400">Estimated Output</p>
                        <p className="text-xl font-bold text-white">
                            {(Number(quote.buyAmount) / 1e18).toFixed(4)} HIGHER
                        </p>
                        <p className="text-sm text-gray-400 mt-2">Gas Estimate</p>
                        <p className="text-white">{quote.estimatedGas} gwei</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TokenSwap;