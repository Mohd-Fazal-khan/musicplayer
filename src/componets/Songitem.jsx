
export const SongItem = ({ song, isActive, onClick }) => {

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
        isActive ? "bg-gray-800 text-white" : "hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <img src={song.thumbnail} alt={song.title} className="w-12 h-12 rounded-md object-cover" />
        <div>
          <h4 className="font-medium">{song.title}</h4>
          <p className="text-sm text-gray-500">{song.artist}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">{song.duration}</span>
      </div>
    </div>
  );
};
