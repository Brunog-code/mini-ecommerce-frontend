import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ICartItemProps {
  id: number;
  title: string;
  description: string;
  img: string;
  quantity: number;
  price: number;
  removeFromCart: (id: number) => void;
}

export const CartItemCard = ({
  id,
  title,
  description,
  img,
  quantity,
  price,
  removeFromCart,
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
          Quantidade: {quantity}
        </Typography>
        <Typography variant="body2">
          Preço:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price)}
        </Typography>
      </CardContent>

      {/* Botão de excluir */}
      <Box sx={{ pr: 1 }}>
        <IconButton color="error" onClick={() => removeFromCart(id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};
