import { createContext, useReducer, type ReactNode } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  img: string;
  description: string;
  category: string;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void; //recebe o item completo, incluindo description e quantity
  removeFromCart: (id: number) => void;
  decrementFromCart: (id: number) => void;
}

//cria o contexto
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

//Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  type Action =
    | { type: "add"; product: CartItem }
    | { type: "delete"; id: number }
    | { type: "decrement"; id: number };

  const handleItemsCart = (state: CartItem[], action: Action) => {
    switch (action.type) {
      case "add":
        const existingItem = state.find((item) => item.id == action.product.id);

        if (existingItem) {
          const updateItem = state.map((item) =>
            item.id == action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          localStorage.setItem("cart", JSON.stringify(updateItem));
          return updateItem;
        }

        //incluir no localStorage
        localStorage.setItem(
          "cart",
          JSON.stringify([...state, action.product])
        );

        return [...state, action.product];
      case "delete":
        const cartItemDeleted = state.filter((item) => item.id !== action.id);

        //deletar do localSorage
        localStorage.setItem("cart", JSON.stringify(cartItemDeleted));
        return cartItemDeleted;

      case "decrement":
        const decrementItem = state
          .map((item) =>
            item.id == action.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0);

        localStorage.setItem("cart", JSON.stringify(decrementItem));
        return decrementItem;

      default:
        return state;
    }
  };

  //state carrinho
  const [cart, dispatch] = useReducer(handleItemsCart, [], () =>
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const addToCart = (product: CartItem) => {
    dispatch({ type: "add", product });
    toast.success("Produto adicionado ao carrinho!");
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "delete", id: id });
    toast.success("Produto removido do carrinho!");
  };

  const decrementFromCart = (id: number) => {
    const item = cart.find((item) => item.id == id);
    if (!item) return;

    if (item.quantity == 1) {
      toast.success("Produto removido do carrinho!");
    } else {
      toast.success("Quantidade atualizada!");
    }

    dispatch({ type: "decrement", id: id });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decrementFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
