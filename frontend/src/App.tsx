import { useState } from "react";
import "./index.css";
// Import your SearchBar component
import { SearchBar } from "./features/search/components/SearchBar";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          
          {/* Layout Container to mimic its visual placement */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                Service Finder
              </h1>
              <p className="mt-2 text-lg text-slate-600">
                React + TypeScript + TailwindCSS scaffold for the Service Finder app.
              </p>
            </div>
            
            {/* Displaying your SearchBar right here */}
            <div className="w-full max-w-[460px]">
              <SearchBar 
                value={searchQuery}
                onSearchChange={(val) => setSearchQuery(val)}
                onClear={() => setSearchQuery("")}
              />
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Auth</h2>
              <p className="mt-2 text-sm text-slate-600">
                Login, register, and user context.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Map</h2>
              <p className="mt-2 text-sm text-slate-600">
                Map container, markers, and directions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;