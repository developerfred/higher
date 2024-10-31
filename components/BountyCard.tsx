// src/components/BountyCard.tsx
import { Bounty } from '@/lib/types';
import { ExternalLink } from 'lucide-react';

interface BountyCardProps {
    bounty: Bounty;
}

const BountyCard = ({ bounty }: BountyCardProps) => {
    return (
        <div className="bg-secondary rounded-lg overflow-hidden border border-primary/20 hover:neon-border transition-all duration-300">
            <div className="bg-primary/5 p-4">
                <h3 className="text-xl font-bold text-primary truncate">{bounty.title}</h3>
                <p className="text-sm text-gray-400">Posted by {bounty.poster.display_name}</p>
            </div>
            <div className="p-4 space-y-4">
                <p className="text-sm text-gray-300 line-clamp-3">{bounty.summary_text}</p>
                <div className="flex justify-between items-center">
                    <div className="bg-primary/10 px-3 py-1 rounded-full">
                        <span className="text-primary font-bold">
                            ${Number(bounty.reward_summary.usd_value).toLocaleString()}
                        </span>
                    </div>
                    <a
                        href={bounty.links.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                    >
                        View Details
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BountyCard;
