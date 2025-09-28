import { RouterProvider } from "react-router-dom";
import { AppRouters } from "./routes";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "sonner";

const theme = createTheme({});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <RouterProvider router={AppRouters} />
      </CartProvider>
      <Toaster richColors position="bottom-right" />
    </ThemeProvider>
  );
}
