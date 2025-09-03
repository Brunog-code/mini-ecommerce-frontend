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
      <nav className="h-[100%] flex justify-between items-center px-5">
        {/* Logo */}
        <h1 className="text-white font-bold">Dev shop</h1>

        <div className="flex justify-between w-[60%]">
          <ul className="hidden md:flex sm:flex gap-6 text-white items-center">
            {/* Home */}
            <li className="text-white hover:bg-cyan-700 transition rounded-md duration-300 ease-in-out cursor-pointer p-2">
              <Link to="/" className="flex items-center">
                <HomeIcon />
                <span className="ml-1">Home</span>
              </Link>
            </li>

            {/* carrinho */}
            <li
              className="text-white relativo hover:bg-cyan-700 transition rounded-md duration-300 ease-in-out cursor-pointer p-1 flex items-center"
              onClick={() => {
                if (cartQuantity > 0) {
                  setDivItemsCart(!divItemsCart);
                }
              }}
            >
              <div className="relative flex items-center">
                <ShoppingCartIcon className="text-white" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartQuantity}
                  </span>
                )}
              </div>
              {cart.length <= 0 ? (
                <>
                  <Link to="/shopping">
                    <span className="ml-1">Carrinho</span>
                  </Link>
                </>
              ) : (
                <span className="ml-1">Carrinho</span>
              )}

              {divItemsCart && (
                <ul className="absolute top-11 bg-white shadow-lg cursor-pointer text-gray-500 min-w-32 p-2 rounded-md flex flex-col space-y-2">
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
                      <span className="font-medium">Ver carrinho</span>
                    </Link>
                  </div>
                </ul>
              )}
            </li>
          </ul>

          {/* User logado */}
          <div className="relative hidden md:flex sm:flex text-white cursor-pointer items-center flex-col">
            <span className="mr-2 text-base">Bem vindo, Bruno</span>
            <AccountCircleIcon onClick={() => setDivUser(!divUser)} />
          </div>

          {divUser && (
            <div className="bg-white p-2 shadow-lg cursor-pointer rounded-lg absolute right-15 top-12 flex flex-col">
              <span className="hover:bg-blue-500/50 text-gray-500 hover:text-white rounded-md p-1 hover:shadow-md">
                Minha conta
              </span>
              <span className="hover:bg-blue-500/50 text-gray-500 hover:text-white rounded-md p-1 hover:shadow-md">
                Sair
              </span>
            </div>
          )}
        </div>

        {/* Botão hamburguer (mobile) */}
        <button
          className="md:hidden sm:hidden text-white text-2xl cursor-pointer"
          onClick={() => setDrawerOpen(true)}
        >
          ☰
        </button>
      </nav>

      {/* drawer mobile */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.aside
            initial={{ x: "100%" }} // posição inicial (fora da tela)
            animate={{ x: 0 }} // posição final (visível)
            exit={{ x: "100%" }} // posição de saída (sai para direita)
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg flex flex-col gap-4 border-1 border-gray-100 rounded-l-lg"
          >
            <button
              className="self-start ml-6 text-2xl text-gray-500 cursor-pointer pt-4"
              onClick={() => setDrawerOpen(false)}
            >
              <ChevronRightIcon />
            </button>

            <div>
              <div className=" flex flex-col justify-center items-center text-gray-500">
                <AccountCircleIcon sx={{ fontSize: 60 }} />
                <span className="text-xl">Bruno Gonçalves</span>
                <span>bruno@gmail.com</span>
                <div className="mt-2 flex flex-col justify-center items-center w-full">
                  <span className="p-1 cursor-pointer text-center w-full hover:bg-blue-500/50 hover:shadow-md hover:text-white text-lg">
                    Minha conta
                  </span>
                  <span className="p-1 cursor-pointer w-full text-center hover:bg-blue-500/50 hover:shadow-md hover:text-white  text-lg">
                    Sair
                  </span>
                </div>
              </div>
            </div>
            <hr className="border-gray-300 border-t-2" />

            <ul className="flex flex-col gap-4 text-lg text-gray-500 items-center">
              <li
                onClick={() => setDrawerOpen(false)}
                className="p-2 cursor-pointer w-full hover:bg-blue-500/50 hover:shadow-md hover:text-white"
              >
                <Link to="/" className="flex items-center justify-center">
                  <HomeIcon />
                  <span className="ml-1 text-xl">Home</span>
                </Link>
              </li>
              <li
                onClick={() => setDrawerOpen(false)}
                className="p-2 cursor-pointer hover:bg-blue-500/50 hover:text-white w-full hover:shadow-md group  "
              >
                <Link
                  to="/shopping"
                  className="flex items-center justify-center"
                >
                  <div className="relative flex items-center ">
                    <ShoppingCartIcon className="text-gray-500 group-hover:text-white transition " />
                    {cartQuantity > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartQuantity}
                      </span>
                    )}
                  </div>
                  <span className="ml-1  text-xl">Carrinho</span>
                </Link>
              </li>
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
};
