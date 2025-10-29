import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Weather from "./components/Weather";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Services />
        <Weather />
      </main>
    </div>
  );
}

export default App;
