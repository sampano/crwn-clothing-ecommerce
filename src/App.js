import { Routes, Route } from "react-router-dom"; //This will assemble the routing
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import SignIn from "./routes/sign/sign-in.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes> // Routes allows the application to register its route level component
    //index tells that route that when it match the / with nothing after the slash then Home component will render*/
  );
};

export default App;
