import {
    MoreHorizontal,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    Volume1,
    VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const PlayerControls = ({ 
    handlePlayPause, 
    isPlaying, 
    setIsPlaying, 
    song, 
    audioRef
}) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef();
    const [isFav, setIsFav] = useState(false);
    
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const progressBarRef = useRef(null);
    
    const [volume, setVolume] = useState(1); // 0 to 1
    const [previousVolume, setPreviousVolume] = useState(1); // To restore volume when unmuting
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const volumeControlRef = useRef(null);
    const volumeSliderRef = useRef(null);

    useEffect(() => {
        if (audioRef && audioRef.current) {
            const audio = audioRef.current;
            
        
            audio.volume = volume;
            
            const handleLoadedMetadata = () => {
                setDuration(audio.duration);
            };
            
            const handleTimeUpdate = () => {
                setCurrentTime(audio.currentTime);
            };
            
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('timeupdate', handleTimeUpdate);
            if (audio.readyState >= 2) {
                setDuration(audio.duration);
            }
            
            return () => {
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [audioRef, song, volume]);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
 
            if (volumeControlRef.current && 
                !volumeControlRef.current.contains(e.target) && 
                showVolumeSlider) {
                setShowVolumeSlider(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showVolumeSlider]);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem("favourites")) || [];
        setIsFav(favs.includes(song.title));
    }, [song.title]);

    const toggleFavourite = (e) => {
        e.stopPropagation();
        const favs = JSON.parse(localStorage.getItem("favourites")) || [];
        let updatedFavs;

        if (favs.includes(song.title)) {
            updatedFavs = favs.filter((title) => title !== song.title);
        } else {
            updatedFavs = [...favs, song.title];
        }

        localStorage.setItem("favourites", JSON.stringify(updatedFavs));
        setIsFav(!isFav);
    };

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
        handlePlayPause();
    };


    const formatTime = (time) => {
        if (isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSeekBarClick = (e) => {
        if (!progressBarRef.current || !audioRef.current) return;
        
        const progressBar = progressBarRef.current;
        const rect = progressBar.getBoundingClientRect();
        const clickPositionRatio = (e.clientX - rect.left) / rect.width;
        const newTime = clickPositionRatio * duration;
 
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };
    
    const handleVolumeChange = (e) => {
        if (!audioRef.current) return;
        
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
        
        if (newVolume > 0) {
            setPreviousVolume(newVolume);
        }
    };
    

    const toggleMute = () => {
        if (!audioRef.current) return;
        
        if (volume > 0) {
           
            setPreviousVolume(volume);
            setVolume(0);
            audioRef.current.volume = 0;
        } else {
          
            setVolume(previousVolume);
            audioRef.current.volume = previousVolume;
        }
    };
    
    const getVolumeIcon = () => {
        if (volume === 0) return <VolumeX size={20} />;
        if (volume < 0.5) return <Volume1 size={20} />;
        return <Volume2 size={20} />;
    };

    return (
        <div className="w-full flex flex-col mt-auto relative">
            <div className="w-full mb-4">

                <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
                
                <div 
                    ref={progressBarRef}
                    className="w-full h-2 bg-gray-300 rounded-full cursor-pointer relative"
                    onClick={handleSeekBarClick}
                >
                    <div 
                        className="absolute top-0 left-0 h-full bg-gray-700 rounded-full"
                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    ></div>
                </div>
            </div>

            <div className="w-full flex justify-between items-center">
              
                <div className="relative" ref={menuRef}>
                    <button
                        className="p-2 text-black hover:text-white"
                        onClick={() => setShowMenu((prev) => !prev)}
                    >
                        <MoreHorizontal size={20} />
                    </button>

                    {showMenu && (
                        <div className="absolute left-0 bottom-full mb-2 bg-white text-black text-sm rounded shadow-md z-50">
                            <button
                                onClick={toggleFavourite}
                                className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                            >
                                {isFav ? "Remove from Favourites" : "Add to Favourites"}
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center">
                    <button 
                        className="p-2 text-black hover:text-white"
                    >
                        <SkipBack size={20} />
                    </button>
                    <button
                        onClick={handlePlay}
                        className="p-2 mx-2 bg-white text-black rounded-full hover:bg-gray-200"
                    >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button 
                        className="p-2 text-black hover:text-white"
                    >
                        <SkipForward size={20} />
                    </button>
                </div>

                <div className="relative" ref={volumeControlRef}>
                    <button 
                        className="p-2 text-black hover:text-white"
                        onClick={toggleMute}
                        onMouseEnter={() => setShowVolumeSlider(true)}
                    >
                        {getVolumeIcon()}
                    </button>
                
                    {showVolumeSlider && (
                        <div 
                            className="absolute right-0 bottom-full mb-2 bg-black bg-opacity-40 backdrop-blur-sm p-4 rounded shadow-md z-50"
                            ref={volumeSliderRef}
                        >
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-24 h-2 bg-gray-300 bg-opacity-70 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};