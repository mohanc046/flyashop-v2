import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeSelector from "./layouts/theme/ThemeSelector";
import Loader from "./layouts/loader/Loader";
import ThemeRoutes from "./routes/Router"; // Import the ThemeRoutes function

const App = () => {
  const routing = useRoutes(ThemeRoutes()); // Call the ThemeRoutes function here
  const direction = useSelector((state) => state.customizer.isRTL);
  const isMode = useSelector((state) => state.customizer.isDark);

  return (
    <Suspense fallback={<Loader />}>
      <div
        className={`${direction ? "rtl" : "ltr"} ${isMode ? "dark" : ""}`}
        dir={direction ? "rtl" : "ltr"}>
        <ThemeSelector />
        {routing}
      </div>
    </Suspense>
  );
};

export default App;
