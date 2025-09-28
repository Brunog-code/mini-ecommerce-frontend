import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [divUser, setDivUser] = useState(false);
  const [divItemsCart, setDivItemsCart] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // se for mobile -> fecha divUser
        setDivUser(false);
        setDivItemsCart(false);
      } else {
        // se for desktop -> fecha drawer
        setDrawerOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    // Executa imediatamente caso já esteja acima de 640px
    // handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [drawerOpen]);

  //usa o contexto do carrinho
  const { cart } = useCart();

  //soma a qtde de itens no carrinho
  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      className={`fixed top-0 left-0 rounded-b-lg shadow-lg h-14 w-full z-50 transition-colors duration-300 ${
        scroll ? "bg-cyan-600/80" : "bg-cyan-600"
      }`}
    >
      {/* nav dispositivos >=md */}
      <nav className="flex justify-between items-center px-5 h-[100%]">
        {/* Logo */}
        <h1 className="font-bold text-white text-2xl">
          <Link to="/">Dev shop</Link>
        </h1>

        <div className="flex justify-between w-[60%]">
          <ul className="hidden md:flex items-center gap-6 text-white">
            {/* Home */}
            <li className="hover:bg-cyan-700 p-2 rounded-md text-white transition duration-300 ease-in-out cursor-pointer">
              <Link to="/" className="flex items-center">
                <HomeIcon />
                <span className="ml-1 text-xl">Home</span>
              </Link>
            </li>

            {/* carrinho */}
            <li
              className="flex items-center hover:bg-cyan-700 p-1 rounded-md text-white transition duration-300 ease-in-out relativo"
              onClick={() => {
                if (cartQuantity > 0) {
                  setDivItemsCart(!divItemsCart);
                }
              }}
            >
              <div className="relative flex items-center">
                <ShoppingCartIcon className="text-white" />
                {cartQuantity > 0 && (
                  <span className="-top-2 -right-2 absolute flex justify-center items-center bg-red-600 rounded-full w-5 h-5 text-white text-xs">
                    {cartQuantity}
                  </span>
                )}
              </div>
              {cart.length <= 0 ? (
                <>
                  <Link to="/shopping">
                    <span className="ml-1 text-xl cursor-pointer">
                      Carrinho
                    </span>
                  </Link>
                </>
              ) : (
                <span className="ml-1 text-xl cursor-pointer">Carrinho</span>
              )}

              {divItemsCart && (
                <ul className="top-13 absolute flex flex-col space-y-2 bg-white shadow-lg p-2 rounded-md min-w-32 text-gray-600">
                  {cart.map((item) => (
                    <li key={item.id} className="flex gap-2">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-6 h-6 object-cover"
                      />
                      <span>{`${item.title} (${item.quantity})`}</span>
                    </li>
                  ))}
                  <hr className="border-gray-300 border-t-2" />
                  <div className="flex justify-center">
                    <Link to="/shopping">
                      <span className="hover:bg-cyan-500/50 p-1 rounded-md font-medium hover:text-white cursor-pointer">
                        Ver carrinho
                      </span>
                    </Link>
                  </div>
                </ul>
              )}
            </li>
          </ul>

          {/* User logado */}
          <div className="hidden relative md:flex flex-col items-center text-white cursor-pointer">
            <span className="mr-2 text-lg">Bem vindo, Bruno</span>
            <AccountCircleIcon onClick={() => setDivUser(!divUser)} />
          </div>

          {divUser && (
            <div className="top-14 right-20 absolute flex flex-col bg-white shadow-lg p-2 rounded-lg cursor-pointer">
              <span className="hover:bg-blue-500/50 hover:shadow-md p-1 rounded-md text-gray-500 hover:text-white">
                Minha conta
              </span>
              <span className="hover:bg-blue-500/50 hover:shadow-md p-1 rounded-md text-gray-500 hover:text-white">
                Sair
              </span>
            </div>
          )}
        </div>

        {/* Botão hamburguer (mobile) */}
        <button
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setDrawerOpen(true)}
        >
          ☰
        </button>
      </nav>

      {/* drawer mobile */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.aside
            initial={{ x: "100%" }} //posição inicial (fora da tela)
            animate={{ x: 0 }} //posição final (visível)
            exit={{ x: "100%" }} //posição de saída (sai para direita)
            transition={{ duration: 0.3 }}
            className="top-0 right-0 fixed flex flex-col gap-4 bg-white shadow-lg border-1 border-gray-100 rounded-l-lg w-64 h-full"
          >
            <button
              className="self-start ml-6 pt-4 text-gray-500 text-2xl cursor-pointer"
              onClick={() => setDrawerOpen(false)}
            >
              <ChevronRightIcon />
            </button>

            <div>
              <div className="flex flex-col justify-center items-center bg-gray-100/50 rounded-md text-gray-500">
                <AccountCircleIcon sx={{ fontSize: 60 }} />
                <span className="text-xl">Bruno Gonçalves</span>
                <span>bruno@gmail.com</span>
                <div className="flex flex-col justify-center items-center mt-2 w-full">
                  <span className="hover:bg-blue-500/50 hover:shadow-md p-1 w-full hover:text-white text-lg text-center cursor-pointer">
                    Minha conta
                  </span>
                  <span className="hover:bg-blue-500/50 hover:shadow-md p-1 w-full hover:text-white text-lg text-center cursor-pointer">
                    Sair
                  </span>
                </div>
              </div>
            </div>
            <hr className="border-gray-300 border-t-1" />

            <ul className="flex flex-col items-center gap-4 text-gray-500 text-lg">
              <li
                onClick={() => setDrawerOpen(false)}
                className="hover:bg-blue-500/50 hover:shadow-md p-2 w-full hover:text-white cursor-pointer"
              >
                <Link to="/" className="flex justify-center items-center">
                  <HomeIcon />
                  <span className="ml-1 text-xl">Home</span>
                </Link>
              </li>
              <li
                onClick={() => setDrawerOpen(false)}
                className="group hover:bg-blue-500/50 hover:shadow-md p-2 w-full hover:text-white cursor-pointer"
              >
                <Link
                  to="/shopping"
                  className="flex justify-center items-center"
                >
                  <div className="relative flex items-center">
                    <ShoppingCartIcon className="text-gray-500 group-hover:text-white transition" />
                    {cartQuantity > 0 && (
                      <span className="-top-2 -right-2 absolute flex justify-center items-center bg-red-600 rounded-full w-5 h-5 text-white text-xs">
                        {cartQuantity}
                      </span>
                    )}
                  </div>
                  <span className="ml-1 text-xl">Carrinho</span>
                </Link>
              </li>
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
};
