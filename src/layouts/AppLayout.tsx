import { Navbar, Footer } from "../components";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Header fixo */}
      <Navbar />

      {/* Conteúdo dinâmico das rotas */}
      <main className="flex-1 pt-14">
        <Outlet />
      </main>

      {/* Rodapé fixo */}
      <Footer />
    </div>
  );
};
