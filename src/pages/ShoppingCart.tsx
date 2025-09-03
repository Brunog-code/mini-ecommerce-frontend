import { useCart } from "../hooks/useCart";
import { CartItemCard } from "../components/CartItemCard";
import { useState } from "react";

type ShippingMethod = "PAC" | "SEDEX";

export const ShoppingCart = () => {
  const { cart, removeFromCart } = useCart();
  const [cep, setCep] = useState<string>("");
  const [errorCep, setErrorCep] = useState<boolean>(false);
  const [adress, setAdress] = useState<string>("");
  const [shipping, setShipping] = useState<ShippingMethod | "">("PAC");
  const [shippingValues, setShippingValues] = useState<
    Record<ShippingMethod, number>
  >({
    PAC: 0,
    SEDEX: 0,
  });

  const subTotalCart = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  //consumir api do cep
  const fetchCepValue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cep) {
      setErrorCep(true);
      return;
    }

    setErrorCep(false); // reseta o erro caso tenha digitado algo

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      if (!response.ok) {
        throw new Error(`Cep não encontrado`);
      }

      const data = await response.json();

      const formatedAndress = `${data.logradouro}, ${data.complemento}, ${data.localidade} - ${data.uf}, ${data.cep}`;

      setAdress(formatedAndress);

      setShippingValues({
        PAC: Math.floor(Math.random() * 25) + 10,
        SEDEX: Math.floor(Math.random() * 45) + 20,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Erro ao consultar o CEP: ${error.message}`);
        setErrorCep(true);
      } else {
        console.log("Erro desconhecido");
      }
    }
  };

  const totalCart = subTotalCart + (shipping ? shippingValues[shipping] : 0);

  return (
    <div className="p-4">
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-gray-600 text-2xl font-semibold mb-4">
          Itens no carrinho
        </h1>
        {cart.length > 0 ? (
          <>
            <div className="w-full md:w-[80%] sm:w-[90%]">
              {cart.map((item) => (
                <CartItemCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  img={item.img}
                  quantity={item.quantity}
                  price={item.price}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between w-full mt-5 px-4 mb-5">
              <div className="flex flex-col md:mr-4">
                <div className="mb-4 p-2 rounded-md border border-gray-300">
                  <p className="font-semibold text-gray-600 mb-2">
                    Calcular frete
                  </p>
                  <div>
                    <form
                      onSubmit={(e) => fetchCepValue(e)}
                      className="flex gap-2"
                    >
                      <input
                        className="border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-cyan-300 placeholder-gray-400"
                        type="text"
                        placeholder="Digite o CEP"
                        onChange={(e) => setCep(e.target.value)}
                        value={cep}
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 p-2 rounded text-white cursor-pointer hover:bg-blue-700"
                      >
                        Calcular
                      </button>
                    </form>
                  </div>
                </div>
                {errorCep && (
                  <p className="bg-red-300/50 p-2 text-gray-500 rounded-md">
                    Erro ao consultar o CEP informado
                  </p>
                )}
                {adress && !errorCep && (
                  <div className="flex flex-col text-gray-500 mb-4 p-2 rounded-md border border-gray-300">
                    <span className="text-gray-600 font-semibold  mb-2">
                      Frete
                    </span>
                    <p>
                      <span className="font-semibold">Envio para:</span>{" "}
                      {adress}
                    </p>
                    <div className="mt-2 bg-gray-100 p-2 rounded-md ">
                      <p className="text-gray-600 font-semibold">
                        Opções de envio:
                      </p>
                      <div className="flex gap-5">
                        <div>
                          <input
                            className="mr-1"
                            type="radio"
                            name="shipping"
                            value="PAC"
                            checked={shipping === "PAC"}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "PAC" || value === "SEDEX") {
                                setShipping(value);
                              }
                            }}
                          />
                          <span>PAC</span>
                        </div>
                        <span>
                          {new Intl.NumberFormat("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          }).format(shippingValues.PAC)}
                        </span>
                      </div>
                      <div className="flex gap-5">
                        <div>
                          <input
                            className="mr-1"
                            type="radio"
                            name="shipping"
                            value="SEDEX"
                            checked={shipping === "SEDEX"}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "PAC" || value === "SEDEX") {
                                setShipping(value);
                              }
                            }}
                          />
                          <span>SEDEX</span>
                        </div>
                        <span>
                          {new Intl.NumberFormat("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          }).format(shippingValues.SEDEX)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 md:mt-0 md:w-[50%]  flex flex-col text-start">
                <p className="font-bold text-gray-600 mb-2">Totais</p>
                <div className="flex flex-col w-full gap-1">
                  <div className="flex justify-between w-full bg-gray-300 p-2 rounded-md">
                    <span>Subtotal</span>
                    <span>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(subTotalCart)}
                    </span>
                  </div>
                  <div className="flex justify-between w-full font-semibold bg-gray-200 p-2 rounded-md">
                    <span>Total</span>
                    <span>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(totalCart)}
                    </span>
                  </div>
                </div>
                <button className="bg-blue-600 p-2 rounded text-white cursor-pointer mt-2 hover:bg-blue-700">
                  Continuar
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>Nenhum item no carrinho</p>
        )}
      </section>
    </div>
  );
};
