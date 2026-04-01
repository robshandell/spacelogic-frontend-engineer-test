export default function ProductLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 animate-pulse">
          <div className="h-4 w-56 bg-gray-200 rounded mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            <div className="aspect-square bg-gray-100 rounded-xl" />
            <div>
              <div className="h-10 w-4/5 bg-gray-200 rounded mb-4" />
              <div className="h-5 w-32 bg-gray-200 rounded mb-6" />
              <div className="h-8 w-40 bg-gray-200 rounded mb-6" />
              <div className="h-4 w-full bg-gray-200 rounded mb-2" />
              <div className="h-4 w-11/12 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-10/12 bg-gray-200 rounded mb-8" />
              <div className="h-11 w-full bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
