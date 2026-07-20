export function NavBar() {
  return (
    <header className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-7 w-7 text-slate-900"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21s-7-6.192-7-11a7 7 0 1 1 14 0c0 4.808-7 11-7 11Z"
          />
          <circle cx="12" cy="10" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Service Finder
        </h1>
      </div>
    </header>
  );
}
