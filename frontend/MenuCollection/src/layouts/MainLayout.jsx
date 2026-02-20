import { Link,useLocation} from "react-router-dom";

export default function MainLayout({ children}) {
  let user=localStorage.getItem("role")
    const homePath=
    user=== "Admin" ? "/admin-dashboard" : "/dashboard";
    console.log(homePath);
  const location = useLocation();
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/orders":
        return "My Orders";
      case "/menus":
        return "Order Whatever You Like";
      case "/admin":
        return "Analytics";
      default:
        return "";
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 text-gray-900">

      {/* Header */}
      <header className="bg-white shadow-md border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Brand */}
          <h1 className="text-xl font-bold text-gray-800 tracking-wide">
            🍽️ <span className="text-gray-800">{getPageTitle()}</span>
          </h1>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            <Link
              to={homePath}
              className="
                px-5 py-2.5
                rounded-xl
                text-sm font-semibold
                text-gray-700
                hover:bg-red-50
                hover:text-red-500
                transition-all duration-200
              "
            >
              Home
            </Link>

            <Link
              to="/orders"
              className="
                px-5 py-2.5
                rounded-xl
                text-sm font-semibold
                text-gray-700
                hover:bg-red-50
                hover:text-red-500
                transition-all duration-200
              "
            >
              Orders
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {children}
      </main>
    </div>
  );
}
