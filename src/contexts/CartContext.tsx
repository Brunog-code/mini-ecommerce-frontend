import { createContext, useReducer, type ReactNode } from "react";

interface CartItem {
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
  addToCart: (item: CartItem) => void; // recebe o item completo, incluindo description e quantity
  removeFromCart: (id: number) => void;
}

//cria o contexto
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

//Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  type Action =
    | { type: "add"; product: CartItem }
    | { type: "delete"; id: number };

  const handleItemsCart = (state: CartItem[], action: Action) => {
    switch (action.type) {
      case "add":
        const existingItem = state.find((item) => item.id == action.product.id);

        if (existingItem) {
          return state.map((item) =>
            item.id == action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [...state, action.product];
      case "delete":
        return state.filter((item) => item.id !== action.id);
      default:
        return state;
    }
  };

  const [cart, dispatch] = useReducer(handleItemsCart, []);

  const addToCart = (product: CartItem) => {
    dispatch({ type: "add", product });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "delete", id: id });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
