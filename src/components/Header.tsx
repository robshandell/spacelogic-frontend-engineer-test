import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 grid grid-cols-3 md:flex items-center justify-between h-12 sm:h-14 md:h-16 gap-2 sm:gap-4 min-h-0 w-full">
        <button type="button" className="col-start-1 justify-self-start p-2 text-black hover:bg-gray-100 rounded-lg md:hidden w-9 h-9 flex items-center justify-center" aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <Link href="/" className="col-start-2 justify-self-center self-center md:col-auto md:justify-self-auto font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl text-black tracking-tight shrink-0">
          SHOP.CO
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-black">
          <Link href="/" className="hover:text-black flex items-center gap-1">
            Shop
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </Link>
          <Link href="/#on-sale" className="hover:text-black">
            On Sale
          </Link>
          <Link href="/#new-arrivals" className="hover:text-black">
            New Arrivals
          </Link>
          <Link href="/#brands" className="hover:text-black">
            Brands
          </Link>
        </nav>
        <div className="flex-1 max-w-md hidden lg:block">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>
        <div className="col-start-3 justify-self-end flex items-center gap-0 sm:gap-1 md:gap-2 lg:gap-4 flex-shrink-0 md:col-auto md:justify-self-auto">
          <button type="button" className="p-2 text-gray-600 hover:text-black rounded-lg lg:hidden w-9 h-9 flex items-center justify-center" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <Link href="/cart" className="p-2 text-gray-600 hover:text-black rounded-lg w-9 h-9 flex items-center justify-center sm:w-10 sm:h-10" aria-label="Cart">
            <svg className="w-5 h-5 sm:w-[22px] sm:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </Link>
          <button type="button" className="p-2 text-gray-600 hover:text-black rounded-lg w-9 h-9 flex items-center justify-center sm:w-10 sm:h-10" aria-label="Account">
            <svg className="w-5 h-5 sm:w-[22px] sm:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
