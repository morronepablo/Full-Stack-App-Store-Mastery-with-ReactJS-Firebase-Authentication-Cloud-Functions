import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AdminLayout, AuthLayout, Layout } from "../layouts";
import { AdminHome, Authentication, Home, UserProfile } from "../pages";

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* client user */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:uid" element={<UserProfile />} />
        </Route>

        {/* admin layout */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
        </Route>

        {/* auth layout */}
        <Route path="/auth/*" element={<AuthLayout />}>
          <Route index element={<Authentication />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
