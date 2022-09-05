import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Register from "./pages/register"
import AddPost from "./pages/add-post"
import "./style.css"

const App = () => {

  return (
    <div className="app-body">
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Home />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="*" redirectTo="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div >
  )
}

export default App