// Example feature-specific component
// This is a placeholder - replace with actual home feature components

import type { HomeData } from "@/modules/home/types/home.types";

type CardProps = {
  item: HomeData;
  onItemClick?: (id: string) => void;
  onItemDelete?: (id: string) => void;
};

export function Card({ item, onItemClick, onItemDelete }: CardProps) {
  const handleClick = () => {
    onItemClick?.(item.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onItemDelete?.(item.id);
  };

  return (
    <div
      className="home-card p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
      onClick={handleClick}
    >
      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
      <p className="text-gray-600 mb-3">{item.description}</p>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          Created:
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
        {onItemDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
