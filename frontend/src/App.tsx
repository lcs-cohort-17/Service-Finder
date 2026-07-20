import "./index.css";
import { NavBar } from "./components/layout/NavBar";
import { SideBar } from "./components/layout/SideBar";
import { MapContainer } from "./components/map/MapContainer";
import { FilterProvider } from "./context/FilterContext";
import { ServiceProvider } from "./context/ServiceContext";

function App() {
  return (
    <ServiceProvider>
      <FilterProvider>
        <div className="min-h-screen bg-slate-50">
          <NavBar />

          <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex h-[75vh] min-h-[560px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:flex-row">
              <SideBar />
              <MapContainer />
            </div>
          </main>
        </div>
      </FilterProvider>
    </ServiceProvider>
  );
}

export default App;
