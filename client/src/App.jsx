import { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";


const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Redirect = lazy(() => import("./components/Redirect"));

function App() {
  return (
    <div className="App">
      <NoteState>
          <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Redirect />} />
            </Routes>
          </Suspense>
      </NoteState>
    </div>
  );
}

export default App;
