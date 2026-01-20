export function RestaurantCard({ restaurant, isSelected, onSelect, disabled }) {
  const isLimitReached = restaurant.orderCount >= restaurant.limit;
  return (
    <div 
      onClick={!disabled && !isLimitReached ? onSelect : undefined}
      className={`
        w-full flex flex-col
        bg-gradient-to-br from-white to-emerald-50
        rounded-2xl p-6 transition-all duration-200
        shadow-md hover:shadow-xl
        border
        ${isLimitReached || disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
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

      <div className="flex justify-between items-center mb-3 text-sm">
        <span className="text-gray-700 font-medium">
          Orders: {restaurant.orderCount} / {restaurant.limit}
        </span>

        {isLimitReached && (
          <span className="text-red-600 font-semibold text-xs">
            Order limit reached
          </span>
        )}
      </div>

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
          disabled={isLimitReached || disabled}
          onClick={(e) => {
            e.stopPropagation();
            if (!isLimitReached && !disabled) onSelect();
          }}
          className={`
            w-full py-2.5 rounded-xl text-sm font-bold transition-all
            
            ${
              isLimitReached
                ? "bg-gray-400 text-white cursor-not-allowed"
                : isSelected
                ? "bg-green-600 text-white"
                : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90"
            }
          `}
        >
          {isLimitReached
            ? "Orders Closed"
            : isSelected
            ? "✔ Selected"
            : "Select Restaurant"}
        </button>
      </div>
    </div>
  );
}

export default RestaurantCard;