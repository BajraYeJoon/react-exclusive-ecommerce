
import './App.css'
import { Banner, Hero, Navbar, SalesCard } from "./pages";

function App() {
  return (
    <main className="mx-auto">
      <Banner />
      <Navbar />
      <div className="flex flex-col gap-40 max-3xl:gap-32 max-2xl:gap-28 mb-28 mx-64 max-3xl:mx-24 max-2xl:mx-14 ">
        <Hero />
        <SalesCard />
      </div>
    </main>
  );
}

export default App
