// import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import NutritionTable from "../src/components/NutritionTable";

function App() {
  return (
    <PrimeReactProvider>
      <NutritionTable familyMember="Siva Venkat" />
    </PrimeReactProvider>
  );
}

export default App;
