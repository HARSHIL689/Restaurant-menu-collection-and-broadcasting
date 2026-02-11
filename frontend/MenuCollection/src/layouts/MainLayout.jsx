import {Link} from "react-router-dom"

export default function MainLayout({ children }) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lime-50 via-emerald-50 to-yellow-50 text-gray-900">
        <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 shadow-md">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              🍽️ Order Whatever You Like !!!
            </h1>
           <div className="space-x-6">
            <Link to="/dashboard" className="hover:underline">
              Home
            </Link>
           </div>
          </div>
        </header>

        <main className="w-full px-6 py-6">
          {children}
        </main>
      </div>

    );
  }
  