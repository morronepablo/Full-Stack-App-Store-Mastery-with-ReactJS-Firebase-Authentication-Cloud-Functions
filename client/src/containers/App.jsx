import { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AdminLayout, AuthLayout, Layout } from "../layouts";
import { AdminHome, Authentication, Home, UserProfile } from "../pages";
import { auth } from "../config/firebase.config";

const App = () => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token);
        });
      }
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [auth]);

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
