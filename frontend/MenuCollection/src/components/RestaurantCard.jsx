export function RestaurantCard({ restaurant, isSelected, onSelect, disabled }) {
  return (
    <div 
      onClick={!disabled ? onSelect : undefined}
      className={`
        flex flex-col
        bg-gradient-to-br from-white to-emerald-50
        rounded-2xl p-6 transition-all duration-200
        shadow-md hover:shadow-xl
        border
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${isSelected ? "border-green-600 ring-2 ring-green-500" : "border-emerald-200"}
      `}
    >
      <h3 className="text-xl font-extrabold mb-3 text-green-700 tracking-wide">
        {restaurant.restaurantName}
      </h3>

      <pre className="whitespace-pre-wrap
        text-gray-700 text-sm leading-relaxed
         bg-white rounded-xl p-4 mb-4
          border border-emerald-100
          shadow-inner">
        {restaurant.message}
      </pre>

      <div className="flex items-center justify-between mb-6">
        <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold">
          ₹ {restaurant.price}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(restaurant.createdDate).toLocaleString()}
        </span>
      </div>

      <div className="mt-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`
            w-full py-2.5 rounded-xl text-sm font-bold transition-all
            
            ${
              isSelected
                ? "bg-green-600 text-white"
                : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90"
            }
          `}
        >
          {isSelected ? "✔ Selected" : "Select Restaurant"}
        </button>
      </div>
    </div>
  );
}

export default RestaurantCard;
