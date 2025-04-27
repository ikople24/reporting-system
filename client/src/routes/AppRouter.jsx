import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import PrivateRoute from "../components/PrivateRoute";
import Forbidden from "../pages/Forbidden";
import Home from "../pages/Home";
import Dashbord from "../pages/admin/Dashbord";
import Navbar from "../components/navbar/Navbar";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="About" element={<h1>About</h1>} />
          <Route path="map" element={<h1>Map</h1>} />
        </Route>

        {/* Private Admin FIXME: and Layout Gruping  Note หลังPart จะแสดงลูกๆ*/}
        <Route
          path="admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Navbar />
              <Outlet />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashbord />} />
          <Route path="settings" element={<h1>Settings</h1>} />
        </Route>

        {/* Notfound */}
        <Route path="*" element={<h1>Page Notfound</h1>} />
        <Route path="/403" element={<Forbidden />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
