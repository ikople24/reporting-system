import { BrowserRouter, Routes, Route } from "react-router";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
            {/* Public */}
        <Route path="/" element={<h1>Page1</h1>} />
        <Route path="About" element={<h1>About</h1>} />
        <Route path="map" element={<h1>Map</h1>} />
        {/* Private */}
        <Route path="settings" element={<h1>Settings</h1>} />
        <Route path="dashbord" element={<h1>Dashbord</h1>} />

        {/* Notfound */}
        <Route path="*" element={<h1>Page Notfound</h1>} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
