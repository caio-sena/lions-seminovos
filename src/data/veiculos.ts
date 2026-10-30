export const categorias = ["Hatch", "Sedan", "SUV", "Utilitário"] as const;
export type Categoria = (typeof categorias)[number];

export type Veiculo = {
  id: string;
  marca: string;
  modelo: string;
  versao: string;
  categoria: Categoria;
  ano: number;
  anoModelo: number;
  km: number;
  preco: number;
  cambio: "Manual" | "Automático";
  combustivel: "Flex" | "Gasolina" | "Diesel";
  cor: string;
  destaque?: boolean;
  imagem: string;
};

// Dados fictícios, apenas para demonstração
export const veiculos: Veiculo[] = [
  {
    id: "corolla-xei-2021",
    marca: "Toyota",
    modelo: "Corolla",
    versao: "XEi 2.0",
    categoria: "Sedan",
    ano: 2021,
    anoModelo: 2022,
    km: 48000,
    preco: 124900,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Prata",
    destaque: true,
    imagem: "/carros/CarroCorolla.webp",
  },
  {
    id: "civic-touring-2020",
    marca: "Honda",
    modelo: "Civic",
    versao: "Touring 1.5 Turbo",
    categoria: "Sedan",
    ano: 2020,
    anoModelo: 2020,
    km: 62300,
    preco: 119900,
    cambio: "Automático",
    combustivel: "Gasolina",
    cor: "Preto",
    imagem: "/carros/CarroCivic.jpg",
  },
  {
    id: "compass-longitude-2022",
    marca: "Jeep",
    modelo: "Compass",
    versao: "Longitude 1.3 Turbo",
    categoria: "SUV",
    ano: 2022,
    anoModelo: 2022,
    km: 35100,
    preco: 139900,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Branco",
    destaque: true,
    imagem: "/carros/CarroCompass.webp",
  },
  {
    id: "tcross-highline-2021",
    marca: "Volkswagen",
    modelo: "T-Cross",
    versao: "Highline 1.4 TSI",
    categoria: "SUV",
    ano: 2021,
    anoModelo: 2021,
    km: 44800,
    preco: 109900,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Cinza",
    imagem: "/carros/CarroTCross.webp",
  },
  {
    id: "onix-premier-2022",
    marca: "Chevrolet",
    modelo: "Onix",
    versao: "Premier 1.0 Turbo",
    categoria: "Hatch",
    ano: 2022,
    anoModelo: 2023,
    km: 29700,
    preco: 79900,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Vermelho",
    destaque: true,
    imagem: "/carros/CarroOnix.webp",
  },
  {
    id: "hb20-evolution-2021",
    marca: "Hyundai",
    modelo: "HB20",
    versao: "Evolution 1.0",
    categoria: "Hatch",
    ano: 2021,
    anoModelo: 2022,
    km: 41000,
    preco: 64900,
    cambio: "Manual",
    combustivel: "Flex",
    cor: "Branco",
    imagem: "/carros/CarroHB20.webp",
  },
  {
    id: "toro-freedom-2020",
    marca: "Fiat",
    modelo: "Toro",
    versao: "Freedom 1.8",
    categoria: "Utilitário",
    ano: 2020,
    anoModelo: 2020,
    km: 71500,
    preco: 99900,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Cinza",
    imagem: "/carros/CarroToro.webp",
  },
  {
    id: "hilux-srv-2019",
    marca: "Toyota",
    modelo: "Hilux",
    versao: "SRV 2.8 Diesel",
    categoria: "Utilitário",
    ano: 2019,
    anoModelo: 2019,
    km: 88200,
    preco: 214900,
    cambio: "Automático",
    combustivel: "Diesel",
    cor: "Preto",
    imagem: "/carros/CarroHilux.webp",
  },
  {
    id: "kwid-zen-2022",
    marca: "Renault",
    modelo: "Kwid",
    versao: "Zen 1.0",
    categoria: "Hatch",
    ano: 2022,
    anoModelo: 2023,
    km: 23400,
    preco: 52900,
    cambio: "Manual",
    combustivel: "Flex",
    cor: "Branco",
    imagem: "/carros/CarroKwid.webp",
  },
  {
    id: "polo-highline-2021",
    marca: "Volkswagen",
    modelo: "Polo",
    versao: "Highline 200 TSI",
    categoria: "Hatch",
    ano: 2021,
    anoModelo: 2022,
    km: 38900,
    preco: 89900,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Azul",
    imagem: "/carros/CarroPolo.webp",
  },
];

export const formatarPreco = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const formatarKm = (km: number) => `${km.toLocaleString("pt-BR")} km`;