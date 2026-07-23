// import "./index.css";

// function App() {
//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900">
//       <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
//         <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
//           <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
//             Service Finder
//           </h1>
//           <p className="mt-4 text-lg leading-8 text-slate-600">
//             React + TypeScript + TailwindCSS scaffold for the Service Finder
//             app.
//           </p>
//           <div className="mt-10 grid gap-4 sm:grid-cols-2">
//             <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
//               <h2 className="text-xl font-semibold text-slate-900">Auth</h2>
//               <p className="mt-2 text-sm text-slate-600">
//                 Login, register, and user context.
//               </p>
//             </div>
//             <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
//               <h2 className="text-xl font-semibold text-slate-900">Map</h2>
//               <p className="mt-2 text-sm text-slate-600">
//                 Map container, markers, and directions.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import "./index.css";
import MapErrorBoundary from "./components/map/MapErrorBoundary";
import MapContainer from "./components/map/MapContainer";

// Placeholder services shown in the fallback's list view when the map
// fails. Swap this for real data from ServiceContext once it's wired up.
const fallbackServices = [
  { id: "1", name: "Central Library", category: "Library", address: "12 Main St" },
  { id: "2", name: "Riverside Clinic", category: "Clinic", address: "45 River Rd" },
];

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            Service Finder
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            React + TypeScript + TailwindCSS scaffold for the Service Finder
            app.
          </p>
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

          <div className="mt-10">
            <MapErrorBoundary fallbackServices={fallbackServices}>
              <MapContainer />
            </MapErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;