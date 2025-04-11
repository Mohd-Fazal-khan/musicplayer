import { Search } from "lucide-react";

export const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const handleclick = (e) => {
     
        setSearchQuery(e.target.value)
    }

    return (
        <div className="relative mb-4">
            <input
                type="text"
                value={searchQuery}
                onChange={handleclick}
                placeholder="Search Song, Artist"
                className="bg-gray-800 text-white text-sm rounded-full pl-8 pr-4 py-1 w-full md:w-64"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
    );
}