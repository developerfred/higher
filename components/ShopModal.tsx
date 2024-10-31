'use client'
import { X } from 'lucide-react';
import TokenSection from './TokenSection';

interface ShopModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-gray-900 border border-green-500/20 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
                <div className="flex justify-between items-center p-4 border-b border-green-500/20">
                    <h2 className="text-2xl font-bold text-green-400">HIGHER Token Shop</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6 text-green-400" />
                    </button>
                </div>
                <div className="p-4">
                    <TokenSection />
                </div>
            </div>
        </div>
    );
};
