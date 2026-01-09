export default function MainLayout({ children }) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-lime-50 to-yellow-50 text-gray-900">
        <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 shadow-md">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-wide">
              🍽️ Order Whatever You Like !!!
            </h1>
            <span className="text-sm opacity-90">
              Daily Menus
            </span>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-8">
          {children}
        </main>
      </div>

    );
  }
  