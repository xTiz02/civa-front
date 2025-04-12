import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Buses from "./pages/Buses";
import BusDetail from "./pages/BusDetail";
import { AuthProvider } from "./context/auth-context";
import Layout from "./layout/Layout";

function App() {
  return (
    //NOTA : Para mejor seguridad y rendimiento se podria implementar Guards en las rutas
    <Router> 
      <AuthProvider>
      
        <Routes>
          <Route path="/" element={<Navigate to="/buses" />} />
          <Route path="/login" element={<Login />} />
          
          <Route element={<Layout />}>
            <Route path="/buses" element={<Buses />} />
            <Route path="/bus/:id" element={<BusDetail />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
    
  )
}

export default App
