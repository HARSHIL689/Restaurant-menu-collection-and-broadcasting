export function RestaurantCard({ restaurant, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`
        bg-white rounded-lg p-5 transition cursor-pointer
        shadow-md hover:shadow-lg
        ${isSelected ? "ring-4 ring-green-500" : "ring-1 ring-gray-200"}
      `}
    >
      <h3 className="text-lg font-semibold mb-2">
        {restaurant.restaurantName}
      </h3>

      <pre className="text-gray-700 mb-3 whitespace-pre-wrap">
        {restaurant.message}
      </pre>

      <div className="text-sm text-gray-600 mb-4">
        <p>Price: ₹{restaurant.price}</p>
        <p>
          Date: {new Date(restaurant.createdDate).toLocaleString()}
        </p>
      </div>

      <div className="mt-4 border-t pt-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`
            w-full py-2 rounded-md text-sm font-semibold
            border-2
            ${
              isSelected
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-green-600 border-green-600 hover:bg-green-50"
            }
          `}
        >
          {isSelected ? "Selected" : "Select Restaurant"}
        </button>
      </div>
    </div>
  );
}

export default RestaurantCard;
