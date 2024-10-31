'use client'
import { X, ExternalLink, User, Calendar, Trophy, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Bounty } from '@/lib/types';

interface BountyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bounty: Bounty | null;
  loading?: boolean;
}

export const BountyDetailsModal: React.FC<BountyDetailsModalProps> = ({ isOpen, onClose, bounty }) => {
  if (!isOpen || !bounty) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 border border-green-500/20 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div className="flex justify-between items-center p-4 border-b border-green-500/20">
          <h2 className="text-xl font-bold text-green-400">Bounty Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-green-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Title and Reward */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">{bounty.title}</h1>
            <div className="flex items-center gap-2 text-green-400">
              <Trophy className="w-5 h-5" />
              <span className="font-bold">${bounty.reward_summary.usd_value} HIGHER</span>
            </div>
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-3 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <User className="w-4 h-4" />
                <span>Posted by</span>
              </div>
              <div className="text-green-400 font-medium">{bounty.poster.display_name}</div>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Calendar className="w-4 h-4" />
                <span>Deadline</span>
              </div>
              <div className="text-green-400 font-medium">
                {formatDistanceToNow(new Date(bounty.expiration_date), { addSuffix: true })}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-800/50 p-4 rounded-lg border border-green-500/20">
            <h3 className="text-lg font-bold text-white mb-3">Description</h3>
            <p className="text-gray-300 whitespace-pre-wrap">{bounty.summary_text}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-800/50 p-3 rounded-lg border border-green-500/20">
              <div className="text-sm text-gray-400 mb-1">Status</div>
              <div className="text-green-400 font-medium capitalize">{bounty.current_state}</div>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg border border-green-500/20">
              <div className="text-sm text-gray-400 mb-1">Quota</div>
              <div className="text-green-400 font-medium">
                {bounty.quota?.remaining}/{bounty.quota?.total}
              </div>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg border border-green-500/20">
              <div className="text-sm text-gray-400 mb-1">Channel</div>
              <div className="text-green-400 font-medium">
                {bounty.channel?.name || 'General'}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <a
              href={bounty.links.external}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-black py-3 rounded-lg font-bold hover:bg-green-400 transition-colors"
            >
              View on Farcaster
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

