import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuperHeroes from "./pages/SuperHeroes";
import { SUPERHEROES_ROUTE } from "./utils/consts";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <BrowserRouter>
     {/* <Routes>
        <Route path={SUPERHEROES_ROUTE} element={<SuperHeroes />}/>
     </Routes> */}
     <AppRouter />
    </BrowserRouter>
  );
}

export default App;
