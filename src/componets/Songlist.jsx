import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGradient } from "../store/gradientSlice";
import ColorThief from "colorthief";
import { SongItem } from "./Songitem";

const rgbToString = (rgb) => `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

export const SongList = ({ songs, currentSong, onSongSelect, activeFilter, favourites }) => {
  const dispatch = useDispatch();
  const gradient = useSelector((state) => state.gradient.gradient);

  useEffect(() => {
    if (currentSong && currentSong.thumbnail) {
      extractColorsFromImage(currentSong.thumbnail);
    }
  }, [currentSong]);

  useEffect(() => {
    document.documentElement.style.setProperty("--app-background", gradient);
  }, [gradient]);

  const extractColorsFromImage = (imageUrl) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        const palette = colorThief.getPalette(img, 3);
        const newGradient = `linear-gradient(135deg, ${rgbToString(
          dominantColor
        )} 0%, ${rgbToString(palette[1] || palette[0])} 100%)`;
        dispatch(setGradient(newGradient));
      } catch (error) {
        console.error("Error extracting colors:", error);
      }
    };
  };

  const handleSongSelect = (song) => {
    onSongSelect(song);

    const recentlyPlayed = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
    const updated = [song.title, ...recentlyPlayed.filter((title) => title !== song.title)];
    localStorage.setItem("recentlyPlayed", JSON.stringify(updated.slice(0, 10)));

    if (song.thumbnail) extractColorsFromImage(song.thumbnail);
  };

  const filteredSongs = useMemo(() => {
    switch (activeFilter) {
      case "Top Tracks":
        return songs.slice(0, 3);
        case "Favourites":
            const favs = JSON.parse(localStorage.getItem("favourites")) || [];
            return songs.filter((s) => favs.includes(s.title));
          
        const recent = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
        return recent
          .map((title) => songs.find((s) => s.title === title))
          .filter(Boolean);
      default:
        return songs;
    }
  }, [activeFilter, songs, favourites]);

  return (
    <div className="flex-1 px-4 space-y-2 pb-4 transition-all duration-500">
      {filteredSongs.map((song) => (
        <SongItem
          key={song.title}
          song={song}
          isActive={song.title === currentSong?.title}
          onClick={() => handleSongSelect(song)}
        />
      ))}
    </div>
  );
};


