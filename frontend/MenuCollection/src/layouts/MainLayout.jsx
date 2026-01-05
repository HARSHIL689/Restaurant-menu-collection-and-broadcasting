export default function MainLayout({ children }) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <header className="bg-green-600 text-white px-6 py-4 shadow">
          <h1 className="text-xl font-semibold">
            PG Menu System
          </h1>
        </header>
  
        <main className="max-w-6xl mx-auto px-6 py-6">
          {children}
        </main>
      </div>
    );
  }
  