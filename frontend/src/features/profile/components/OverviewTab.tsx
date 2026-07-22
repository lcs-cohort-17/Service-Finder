import { useState, type FormEvent } from "react";
import {useAuthStore} from "../../../store/useAuthStore";

function OverviewTab() {
  const user = useAuthStore((state) => state.user);
  const [name, setName] = useState(user ? `${user.first_name} ${user.last_name}` : "");
  // Mock data for now — no "home area" field exists on the backend
  // user profile yet, so this is local state until a real profile API
  // (AUTH-003 / AUTH-007) is wired up.
  const [homeArea, setHomeArea] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: persist to backend once AUTH-003 / AUTH-007 land.
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSave} className="flex max-w-sm flex-col gap-1.5">
      <label htmlFor="name" className="mt-2.5 text-sm font-semibold">
        Name
      </label>
      <input
        id="name"
        type="text"
        className="rounded-lg border border-slate-300 px-3 py-2 text-base"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="home-area" className="mt-2.5 text-sm font-semibold">
        Home area
      </label>
      <input
        id="home-area"
        type="text"
        placeholder="e.g. Umhlanga, Durban"
        className="rounded-lg border border-slate-300 px-3 py-2 text-base"
        value={homeArea}
        onChange={(e) => setHomeArea(e.target.value)}
      />

      <button
        type="submit"
        className="mt-4 w-fit rounded-lg bg-teal-600 px-5 py-2.5 font-semibold text-white hover:bg-teal-700"
      >
        Save changes
      </button>
      {saved && <span className="mt-2 text-sm text-green-700">Saved.</span>}
    </form>
  );
}

export default OverviewTab;