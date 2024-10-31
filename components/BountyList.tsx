'use client'
import React, { useState, useEffect } from 'react';
import { Shield, Coins, Zap, Trophy } from 'lucide-react';
import { fetchBounties, fetchBountyDetails } from '@/lib/api';
import { ShopModal } from '@/components/ShopModal';
import { BountyDetailsModal } from './BountyDetailsModal';
import { Bounty } from '@/lib/types';


interface BountyLinks {
    external: string;
}


interface BountyDetails extends Bounty {
    description?: string;
    
}

const BountyList: React.FC = () => {
    const [bounties, setBounties] = useState<Bounty[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<'daily' | 'progress'>('daily');
    const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
    const [selectedBounty, setSelectedBounty] = useState<BountyDetails | null>(null);
    const [detailsLoading, setDetailsLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadBounties = async (): Promise<void> => {
            try {
                setLoading(true);
                const data = await fetchBounties();
                setBounties(data);
            } catch (error) {
                console.error('Error loading bounties:', error);
            } finally {
                setLoading(false);
            }
        };

        loadBounties();        
        const interval = setInterval(loadBounties, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const handleBountyClick = async (bounty: Bounty): Promise<void> => {
        try {
            setDetailsLoading(true);
            const details = await fetchBountyDetails(bounty.uid);
            setSelectedBounty(details);
        } catch (error) {
            console.error('Error loading bounty details:', error);
        } finally {
            setDetailsLoading(false);
        }
    };

    const parseUsdValue = (value: string | undefined): number => {
        if (!value) return 0;
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
    };

    const totalValue = bounties.reduce(
        (sum, bounty) => sum + parseUsdValue(bounty.reward_summary?.usd_value),
        0
    );

    const calculateProgressPercentage = (bounty: Bounty): number => {
        if (!bounty.quota) return 0;
        return ((bounty.quota.total - bounty.quota.remaining) / bounty.quota.total) * 100;
    };


    return (
        <>
            <div className="min-h-screen bg-gray-900 text-green-400 p-4">
                {/* Top Stats Bar */}
                <div className="flex justify-between items-center mb-6 bg-gray-800/50 rounded-xl p-3">
                    <div className="flex items-center gap-2">
                        <Shield className="w-6 h-6" />
                        <span className="font-bold">{bounties.length} Bounties</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Coins className="w-6 h-6" />
                        <span className="font-bold">${totalValue.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Trophy className="w-6 h-6" />
                        <span className="font-bold">HIGHER</span>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setActiveTab('daily')}
                        className={`px-6 py-2 rounded-t-lg font-bold ${activeTab === 'daily'
                                ? 'bg-green-500 text-black'
                                : 'bg-gray-800/50 text-green-400'
                            }`}
                    >
                        Daily
                    </button>
                    <button
                        onClick={() => setActiveTab('progress')}
                        className={`px-6 py-2 rounded-t-lg font-bold ${activeTab === 'progress'
                                ? 'bg-green-500 text-black'
                                : 'bg-gray-800/50 text-green-400'
                            }`}
                    >
                        Progress
                    </button>
                </div>

                {/* Bounties List */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        bounties.map((bounty) => (
                            <div
                                key={bounty.uid}
                                className="bg-gray-800/50 rounded-lg border border-green-500/20 hover:border-green-500/50 transition-all"
                                onClick={() => handleBountyClick(bounty)}
                            >
                                <div className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                            <Zap className="w-6 h-6 text-green-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{bounty.title}</h3>
                                            <p className="text-sm text-green-300/60">
                                                Reward: ${bounty.reward_summary.usd_value} HIGHER
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="text-sm text-green-300/60">Progress</div>
                                            <div className="font-bold">
                                                {bounty.quota?.remaining || 0}/{bounty.quota?.total || 1}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e: React.MouseEvent) => {
                                                e.stopPropagation();
                                                window.open(bounty.links.external, '_blank');
                                            }}
                                            className="px-6 py-2 bg-green-500 text-black rounded-lg font-bold hover:bg-green-400 transition-colors"
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-1 bg-gray-700">
                                    <div
                                        className="h-full bg-green-500"
                                        style={{
                                            width: `${calculateProgressPercentage(bounty)}%`
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <BountyDetailsModal
                isOpen={!!selectedBounty}
                onClose={() => setSelectedBounty(null)}
                bounty={selectedBounty}
                loading={detailsLoading}
            />
            <ShopModal isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} />
        </>
    );
};

export default BountyList;