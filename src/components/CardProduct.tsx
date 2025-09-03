import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

import { useCart } from "../hooks/useCart";

interface ICardProductProps {
  id: number;
  title: string;
  price: number;
  img: string;
  description: string;
  category: string;
}

export const CardProduct = ({
  id,
  title,
  price,
  img,
  description,
  category,
}: ICardProductProps) => {
  const { addToCart } = useCart();

  return (
    <Card
      sx={{
        maxWidth: 345,
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      {/* Imagem do produto */}
      <CardMedia component="img" height="200" image={img} alt={title} />

      {/* Conteúdo: título, categoria, descrição e preço */}
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          gutterBottom
        >
          {category}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          R$ {price.toFixed(2)}
        </Typography>
      </CardContent>

      {/* Botão de ação */}

      <CardActions>
        <Button
          size="small"
          variant="contained"
          fullWidth
          onClick={() =>
            addToCart({
              id,
              title,
              price,
              img,
              description,
              category,
              quantity: 1,
            })
          }
        >
          Adicionar ao carrinho
        </Button>
      </CardActions>
    </Card>
  );
};
