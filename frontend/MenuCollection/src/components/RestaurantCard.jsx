export function RestaurantCard({ restaurant, onSelect, disabled }) {
  const isLimitReached = restaurant.orderCount >= restaurant.limit;

  return (
    <div
      className={`
        w-full flex flex-col rounded-2xl p-6 transition-all duration-200 border
        ${
          disabled
            ? "opacity-40 cursor-not-allowed bg-gray-100"
            : "bg-gradient-to-br from-white to-emerald-50 cursor-pointer hover:shadow-xl"
        }
      `}
    >
      <h3 className="text-xl font-extrabold mb-3 text-green-700">
        {restaurant.restaurantName}
      </h3>

      <pre className="whitespace-pre-wrap text-gray-700 text-sm bg-white rounded-xl p-4 mb-4 border">
        {restaurant.message}
      </pre>

      <div className="flex justify-between items-center mb-3 text-sm">
        <span className="font-medium">
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
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={onSelect}
        className={`w-full py-2.5 rounded-xl text-sm font-bold
          ${
            disabled
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
          }
        `}
      >
        {disabled ? "Orders Closed" : "Select Restaurant"}
      </button>
    </div>
  );
}

export default RestaurantCard;