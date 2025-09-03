import { CardProduct, Slider } from "../components";
import { useState } from "react";

interface IproductsData {
  id: number;
  title: string;
  price: number;
  description: string;
  img: string;
  category: string;
}

export const Home = () => {

  //array produtos, simulando database
  const products: IproductsData[] = [
    {
      id: 1,
      title: 'Smart TV LG 55" 4K',
      price: 2799,
      img: "https://a-static.mlcdn.com.br/1500x1500/smart-tv-55-4k-led-lg-55uq8050-ai-processor-wi-fi-bluetooth-hdr-alexa-google-assistente-3-hdmi/magazineluiza/235289100/26b1e287394afb128b066623960168b0.jpg",
      description: "Tela 55'' 4K com qualidade incrível de imagem.",
      category: "TV & Monitores",
    },
    {
      id: 2,
      title: 'Monitor Samsung 24"',
      price: 899,
      img: "https://m.media-amazon.com/images/I/61mLMJMWB-L.jpg",
      description: "Monitor Full HD ideal para trabalho e games.",
      category: "TV & Monitores",
    },
    {
      id: 3,
      title: "Notebook Acer Aspire 5",
      price: 3299,
      img: "https://m.media-amazon.com/images/I/51gEkEbXrHL.jpg",
      description: "Notebook potente com processador moderno e SSD rápido.",
      category: "Computadores",
    },
    {
      id: 4,
      title: "Mouse Gamer RGB",
      price: 159,
      img: "https://b2bleonorashop.vtexassets.com/arquivos/ids/161273/mouse-gamer-rgb-6-botoes-letron-74305-1.png?v=638067298216570000",
      description: "Mouse com iluminação RGB e alta precisão.",
      category: "Periféricos",
    },
    {
      id: 5,
      title: "Teclado Mecânico",
      price: 449,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrFUSCPxgCO2atkREsIGqCPJIcdEk3mmtZNUEdMsJtcijghY7JP_r9pcsrVGfDz6fYrXc&usqp=CAU",
      description: "Teclado mecânico com switches silenciosos.",
      category: "Periféricos",
    },
    {
      id: 6,
      title: "Headset Gamer",
      price: 549,
      img: "https://images.tcdn.com.br/img/img_prod/406359/headphone_gamer_para_ps4_pc_celular_com_microfone_articulado_led_rgb_7_cores_almofada_extra_macia_gh_2779_1_d83b8d0ee94c3593de479555b5752548_20220707114551.jpeg",
      description: "Headset confortável com som surround 7.1.",
      category: "Áudio",
    },
    {
      id: 7,
      title: "Console PlayStation 5",
      price: 4299,
      img: "https://m.media-amazon.com/images/I/51dfg52K-cL._UF1000,1000_QL80_.jpg",
      description: "Console de nova geração com gráficos impressionantes.",
      category: "Console & Jogos",
    },
    {
      id: 8,
      title: "Console Xbox Series X",
      price: 3999,
      img: "https://cdn.awsli.com.br/2500x2500/1919/1919257/produto/130225667/01df7cc858.jpg",
      description: "Desempenho poderoso para jogos em 4K.",
      category: "Console & Jogos",
    },
    {
      id: 9,
      title: "Caixa de Som Bluetooth",
      price: 749,
      img: "https://www.havan.com.br/media/catalog/product/cache/73a52df140c4d19dbec2b6c485ea6a50/c/a/caixa-de-som-acustica-polyvox-800w-bluetooth-xt660t_810926.webp",
      description: "Som potente e portátil, ideal para qualquer ambiente.",
      category: "Áudio",
    },
    {
      id: 10,
      title: "Smartphone Android",
      price: 2199,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD08T5ewaQdQ_cbC0Hk0RhPCQfcjq9jRn9rSsz_p_8iH3Nxo8GfSq-b0tnTO2589j1CRg&usqp=CAU",
      description: "Smartphone com câmera avançada e bateria duradoura.",
      category: "Celulares & Tablets",
    },
    {
      id: 11,
      title: 'Tablet 10"',
      price: 1599,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCh7ep-M6AsgackqnRuUaGEWyZUaoYuC8DnaavBo6g6VIH2GrwbJII__wTeCB0RiJ65J4&usqp=CAU",
      description: "Tablet leve e versátil para entretenimento e estudo.",
      category: "Celulares & Tablets",
    },
    {
      id: 12,
      title: "Câmera de Ação 4K",
      price: 1299,
      img: "https://a-static.mlcdn.com.br/1500x1500/kit-camera-de-acao-m10-4k-bateria-extra-controle-remoto-wifi-filmadora-sport-moto-bike-esportiva-click/clickfull/49192560722/dcb23fcc04438d2524d8ad8083201c9b.jpeg",
      description: "Capture momentos incríveis em 4K e resistente à água.",
      category: "Celulares & Tablets",
    },
    {
      id: 13,
      title: "Roteador Wi-Fi 6",
      price: 599,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSow3vQE8nzMza0ZHs4hCGlIonKYtGRdOgngXbimQ6Tpb6lzFIcK0R9UHnyesmTb7RN7Ns&usqp=CAU",
      description: "Conexão rápida e estável para toda a casa.",
      category: "Acessórios",
    },
    {
      id: 14,
      title: "Impressora Multifuncional",
      price: 1199,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf38uWzXrhNFuKPDE6xYHQso9AxNTt7zPODG_8flQ7D371yaPHLg_Anz6OkiKkotejol4&usqp=CAU",
      description: "Impressora, scanner e copiadora em um único equipamento.",
      category: "Periféricos",
    },
    {
      id: 15,
      title: "Smartwatch",
      price: 899,
      img: "https://t62533.vteximg.com.br/arquivos/ids/945598-1000-1000/1-48149-principal.jpg?v=638624657532530000",
      description:
        "Acompanhe suas atividades físicas e notificações do celular.",
      category: "Celulares & Tablets",
    },
  ];

  //estado do filtro de exibicao
  const [filter, setFilter] = useState("all");

  //sliders nao repetidos
  const [imgsSlides] = useState(() => {
    const indexSet = new Set<number>(); //set de indices unicos

    while (indexSet.size < 3) { //preenche o set com numeros aleatorios
      const randomIndex = Math.floor(Math.random() * products.length);
      indexSet.add(randomIndex); //adiciona 3 numeros unicos
    }

    return Array.from(indexSet).map((i) => ({
      img: products[i].img,
      title: products[i].title,
      price: products[i].price,
    })); //transforma o set em array
  });

  //filtro de produtos
  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true;
    return product.category === filter;
  });

  const categories = ["Todos", ...new Set(products.map((p) => p.category))];

  return (
    <div className="p-4">
      <div>
        <Slider imgsSlides={imgsSlides} />
      </div>

      {/* menu produtos */}
      <section className="mb-5 text-gray-500 font-semibold  ">
        <ul className="w-full border border-gray-400 shadow-md bg-gray-100 p-3 rounded-md overflow-hidden grid grid-cols-2 sm:grid-cols-3 gap-2">
          {categories.map((category) => (
            <li
              className={`hover:bg-blue-500/50 hover:text-white p-1 rounded-md cursor-pointer ${
                (category === "Todos" && filter === "all") ||
                filter === category
                  ? "bg-blue-500/80 text-white"
                  : ""
              }`}
              key={category}
              onClick={() => setFilter(category === "Todos" ? "all" : category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </section>

      {/* produtos */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <CardProduct
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            img={product.img}
            category={product.category}
          />
        ))}
      </section>
    </div>
  );
};
