
import { useSelector } from "react-redux";

export const Sidebar = ({ items, activeItem, isOpen, onClose, onSelect }) => {
  const gradient = useSelector((state) => state.gradient.gradient);

  return (
    <div
      className={`text-white w-48 p-4 fixed md:static z-30 top-0 left-0 h-full md:h-auto md:flex md:flex-col transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
  
    >
      <div className="flex items-center justify-between md:block mb-6">
        <img src="/thumbnails/logo.png" alt="Logo" className="h-24" />
        <button className="md:hidden" onClick={onClose}>✕</button>
      </div>

      <div className="space-y-4 mb-6">
        {items.map((item, index) => (
          <div
            key={index}
            className={`py-1 px-2 cursor-pointer hover:bg-gray-800 rounded ${
              item === activeItem ? "bg-gray-800" : ""
            }`}
            onClick={() => {
              onSelect(item);
              if (onClose) onClose();
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
