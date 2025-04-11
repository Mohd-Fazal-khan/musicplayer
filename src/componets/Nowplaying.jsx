import { useEffect, useRef, useState } from "react";
import { PlayerControls } from "./Playercontrol";
import { useSelector } from "react-redux";

export const NowPlaying = ({ song,songs }) => {
    const gradient = useSelector((state) => state.gradient.gradient);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [song]); 

    return (
        <div className="hidden lg:flex w-96 flex-col" >
            <div className="p-6 h-full flex flex-col items-center">
                <h2 className="text-xl font-bold self-start">{song.title}</h2>
                <p className="text-sm text-gray-400 self-start mb-4">{song.artist}</p>
                <div className="w-full aspect-square mb-8">
                    <img
                        src={song.thumbnail}
                        alt={song.title}
                        className="w-full h-full object-cover rounded"
                    />
                </div>
                <audio ref={audioRef} src={song.musicUrl} />
                <PlayerControls
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    handlePlayPause={handlePlayPause}
                    song={song}
                    audioRef={audioRef}
                />

            </div>
        </div>
    );
};
