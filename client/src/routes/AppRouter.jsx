import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";

import PrivateRoute from "../components/PrivateRoute";
import Forbidden from "../pages/Forbidden";
import Home from "../pages/Home";

import ProfilePage from "@/pages/ProfilePage";
import Settings from "@/pages/admin/Settings";
import MigrateListProbs from "@/pages/MigrateListProbs";
import AdminListProbs from "@/pages/admin/AdminListProbs";
import AdminDashboard from "@/pages/admin/AdminDashbord";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Private Admin FIXME: and Layout Gruping  Note หลังPart จะแสดงลูกๆ*/}
        <Route
          path="admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminLayout/>
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="migrate-listprobs" element={<MigrateListProbs />} />
          <Route path="settings" element={<h1>Settings</h1>} />
          <Route path="listprobs" element={<AdminListProbs />} />
        </Route>

        {/* Notfound */}
        <Route path="*" element={<h1>Page Notfound</h1>} />
        <Route path="/403" element={<Forbidden />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
