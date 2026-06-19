import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { ThemeProvider } from "./components/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="metel-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
