import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import type { CartItem } from "../contexts/CartContext";

interface ICartItemProps {
  id: number;
  title: string;
  description: string;
  img: string;
  quantity: number;
  price: number;
  removeFromCart: (id: number) => void;
  decrementFromCart: (id: number) => void;
  addToCart: (item: CartItem) => void;
}

export const CartItemCard = ({
  id,
  title,
  description,
  img,
  quantity,
  price,
  removeFromCart,
  decrementFromCart,
  addToCart,
}: ICartItemProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        mb: 2,
        alignItems: "center",
        p: 1,
        transition: "transform 0.2s, box-shadow 0.2s, background-color 0.2s",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
          cursor: "pointer",
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      {/* Imagem do produto */}
      <CardMedia
        component="img"
        sx={{ width: 80, height: 80, objectFit: "cover", borderRadius: 1 }}
        image={img}
        alt={title}
      />

      {/* Conteúdo */}
      <CardContent sx={{ flex: 1, pl: 2 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        <Typography variant="body2" mt={1}>
          Preço unitário:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price)}
        </Typography>

        <Typography variant="body2">
          Subtotal do item:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(quantity * price)}
        </Typography>
      </CardContent>

      {/* Botão de excluir */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: 1,
          pr: 1,
        }}
      >
        {/* Box para os botões de quantidade */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="primary"
            onClick={() => decrementFromCart(id)}
            size="small"
          >
            <RemoveIcon />
          </IconButton>

          <Typography sx={{ minWidth: 20, textAlign: "center" }}>
            {quantity}
          </Typography>

          <IconButton
            color="primary"
            onClick={() =>
              addToCart({
                id,
                title,
                description,
                img,
                price,
                quantity: 1,
                category: "",
              })
            }
            size="small"
          >
            <AddIcon />
          </IconButton>
        </Box>

        {/* Box para o botão de deletar */}
        <Box sx={{ mt: { xs: 1, sm: 0 } }}>
          <IconButton color="error" onClick={() => removeFromCart(id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};
