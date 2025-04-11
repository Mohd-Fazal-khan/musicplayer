import { useState } from 'react';
import { Menu } from 'lucide-react';
import songs from '../src/api/Songdata.json';
import { Sidebar } from './componets/Sidebar';
import { SearchBar } from './componets/Searchbar';
import { SongList } from './componets/Songlist';
import { NowPlaying } from './componets/Nowplaying';
import { useSelector } from "react-redux";

export default function SpotifyClone() {
  const gradient = useSelector((state) => state.gradient.gradient);
  const sidebarItems = ['For You', 'Top Tracks', 'Favourites', 'Recently Played'];

  const [currentSong, setCurrentSong] = useState({
    title: "Forest Lullaby",
    thumbnail: "/thumbnails/ForestLullaby.jpg",
    musicUrl: "/songs/forest_lullaby.mp3",
    duration: "4:26",
    artist: "Nature Notes"
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("For You");

  const favourites = ["Shape of You", "Blinding Lights"]; // could be from localStorage

  const searchSong = (song) => {
    if (!searchQuery) return true;
    return song.title.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const filteredSongs = songs.filter(searchSong);

  return (
    <div style={{ background: gradient }} className="flex h-screen text-white overflow-hidden">
      <Sidebar
        items={sidebarItems}
        activeItem={activeFilter}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelect={setActiveFilter}
      />

      <div className="flex-1 flex flex-col md:ml-48">
        <div className="p-4 flex justify-between items-center md:justify-start gap-4">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold">{activeFilter}</h1>
        </div>

        <div className="px-4">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        <SongList
          songs={filteredSongs}
          currentSong={currentSong}
          onSongSelect={setCurrentSong}
          activeFilter={activeFilter}
          favourites={favourites}
        />
      </div>

      <NowPlaying style={{ background: gradient }} song={currentSong} />
    </div>
  );
}
