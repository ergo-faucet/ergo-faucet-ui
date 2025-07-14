import Searchbar from "@/components/navbar/searchbar";
import ToggleThemeButton from "@/components/navbar/toggle-theme-button";

export default function Home() {
  // temp div for testing purposes
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <ToggleThemeButton />
      <Searchbar />
    </div>
  );
}
