import { useState, useEffect } from 'react';

export const SeekBar = ({ duration, currentTime, onSeek }) => {
  const [seekValue, setSeekValue] = useState(currentTime);

  useEffect(() => {
    setSeekValue(currentTime);
  }, [currentTime]);

  const handleSeek = (e) => {
    const seekValue = e.target.value;
    onSeek(seekValue);
  };

  return (
    <input
      type="range"
      min="0"
      max={duration}
      value={seekValue}
      onChange={handleSeek}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
  );
};