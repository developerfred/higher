import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
    return (
        <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search bounties..."
                className="w-full pl-10 pr-4 py-2 bg-secondary rounded-lg border border-primary/20 focus:neon-border outline-none text-white placeholder-gray-400"
            />
        </div>
    );
};

export default SearchBar;