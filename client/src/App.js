import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import { check } from "./api/userApi";
import GridLoader from "react-spinners/GridLoader";

const App = observer( () => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data  => {
      if(data.role === 'admin') {
        user.setIsAdmin(true)
      } 
      user.setUser(true);
      user.setIsAuth(true);
    })
    .catch(error => {
      console.error(error)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  if(loading) {
    return (      
      <GridLoader
        color="#333"
        size={25}
        loading={loading}
    />)
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
