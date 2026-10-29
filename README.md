# Lions Seminovos · Teste técnico front-end

Aplicação front-end **inspirada no site público da Lions Seminovos**, desenvolvida como desafio técnico para a vaga de desenvolvedor front-end. Reproduz as abas **Página Inicial**, **Catálogo** e **Agende uma Visita**, com layout responsivo.

> ⚠️ Projeto sem fins comerciais, feito somente para avaliação do processo seletivo. Veículos, preços, lojas e horários são **fictícios**. Marca, logotipo e imagens pertencem à Lions Seminovos.

**Demo:** https://SEU-PROJETO.vercel.app

| Página inicial | Catálogo |
|---|---|
| ![Página inicial](docs/home.png) | ![Catálogo](docs/catalogo.png) |

| Agende uma visita | Versão celular |
|---|---|
| ![Agendamento](docs/agendar.png) | ![Celular](docs/mobile.png) |

## Sumário

- [Requisitos do desafio](#requisitos-do-desafio)
- [Como foi resolver o teste](#como-foi-resolver-o-teste)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Decisões técnicas](#decisões-técnicas)
- [Organização do código](#organização-do-código)
- [Responsividade](#responsividade)
- [Acessibilidade](#acessibilidade)
- [Personalização](#personalização)
- [Publicação](#publicação)
- [Limitações e próximos passos](#limitações-e-próximos-passos)
- [Créditos](#créditos)

## Requisitos do desafio

| Requisito | Como foi atendido |
|---|---|
| Aba **Página Inicial** | `src/pages/Home.tsx`: carrossel, categorias, destaques, benefícios e chamadas para ação |
| Aba **Catálogo** | `src/pages/Catalogo.tsx`: busca, filtros, ordenação e cards de veículos |
| Aba **Agende uma Visita** | `src/pages/Agendar.tsx`: formulário com validação e tela de confirmação |
| Elementos gráficos públicos da Lions | Logo, banners e fotos em `public/` (ver [Créditos](#créditos)) |
| Botão para página externa | "Visitar o site oficial" (Home e rodapé), "Fipe" no menu e botão do WhatsApp, todos abrindo em nova aba |
| Layout responsivo | Abordagem mobile-first com Tailwind (ver [Responsividade](#responsividade)) |
| README com o processo, decisões, organização e instruções | Este documento |

## Como foi resolver o teste

**1. Entendendo o site de referência.** Comecei navegando pelo site da Lions e anotando o essencial: menu centralizado sobre fundo preto, vermelho como cor da marca, botões de ação em amarelo, carrossel de banners, blocos de categoria (Utilitários, SUV, Hatch e Sedan), catálogo com filtros laterais e cards brancos, e um formulário de agendamento com texto institucional ao lado.

**2. Definindo o escopo.** O enunciado pedia as três abas, um botão externo e responsividade, e deixava claro que não era para copiar tudo. Escolhi priorizar o que mostra domínio de front-end: componentização, estado, formulários, acessibilidade e responsividade, deixando de fora o que depende de back-end (estoque real, envio do formulário, login).

**3. Base antes das telas.** Montei primeiro o projeto, os tokens de cor, o layout (cabeçalho, rodapé, rotas) e os dados dos veículos. Com os dados tipados em TypeScript, o Catálogo e a Home passaram a consumir a mesma fonte.

**4. Telas, uma por vez.** Home, depois Catálogo (com filtros guardados na URL) e por fim o Agendamento, ligando as telas entre si: o botão "Agendar visita" de cada card leva ao formulário já com o carro escolhido.

**5. Documentação e publicação.** Escrevi este README e publiquei o projeto.

**Uso de ferramentas:** Usei o Claude (IA) como apoio para discutir a estrutura e gerar partes do código. Revisei, testei e ajustei o resultado, e consigo explicar cada decisão.

## Como rodar o projeto

### Pré-requisitos

- **Node.js 20.19 ou superior** (ou 22.12+). Confira com `node -v`.
- npm (já vem com o Node) e Git.

Não há variáveis de ambiente nem back-end: é só instalar e rodar.

### Passo a passo

```bash
git clone https://github.com/SEU-USUARIO/lions-seminovos.git
cd lions-seminovos
npm install
npm run dev
```

Abra o endereço que aparecer no terminal em "Local:" (normalmente http://localhost:5173).

### Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com recarga automática |
| `npm run build` | Verifica os tipos (TypeScript) e gera a versão de produção em `dist/` |
| `npm run preview` | Serve a versão de produção localmente |
| `npm run lint` | Executa o ESLint |

### Problemas comuns

- **Porta ocupada:** o Vite escolhe a próxima porta livre sozinho (5174, 5175...). Use o endereço que o terminal mostrar.
- **Erro de "execução de scripts desabilitada" no PowerShell (Windows):** rode `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` e abra um novo terminal.
- **Página toda preta:** abra o console do navegador (`F12`) e veja a mensagem de erro; costuma ser dependência não instalada (`npm install`).
- **Imagens não aparecem:** o projeto funciona sem elas, mostrando um fundo decorado no lugar. Veja [Personalização](#personalização).

## Funcionalidades

**Página inicial**
- Carrossel de banners com setas, indicadores, troca automática e pausa ao passar o mouse ou focar
- Blocos de categoria que abrem o catálogo já filtrado
- Destaques, benefícios, passo a passo e chamadas para o agendamento
- Botão para o site oficial (página externa)

**Catálogo ("Nosso Estoque")**
- Busca por texto e filtros por categoria, marca, modelo, cor e combustível
- O filtro de modelo mostra só os modelos da marca escolhida
- Ordenação por relevância, preço, quilometragem e ano
- Contador de resultados, estado vazio e botão "Limpar filtros"
- Filtros guardados na URL (por exemplo `/catalogo?categoria=SUV&cor=Branco`), então o link pode ser compartilhado e o botão voltar funciona

**Agende uma visita**
- Campos: nome, telefone (com máscara), e-mail, veículo, loja, data, horário e observações
- Validação com mensagens por campo e data mínima igual a hoje
- Se vier de um card do catálogo, o veículo já aparece selecionado
- Tela de confirmação com o resumo (os dados **não** são enviados nem salvos)

**Geral**
- Menu com versão hambúrguer no celular
- Botão flutuante de WhatsApp
- Página 404 e volta ao topo ao trocar de página

## Decisões técnicas

| Decisão | Motivo |
|---|---|
| **Vite + React + TypeScript** | Ambiente rápido, sem servidor, e tipagem que evita erros nos dados e nos componentes |
| **Tailwind CSS** | Agilidade e consistência; as cores da marca ficam centralizadas em `src/index.css` (`@theme`) |
| **React Router** | Três páginas com layout compartilhado (`Outlet`) e rota 404 |
| **Dados tipados em `src/data/veiculos.ts`** | Simulam uma API; trocar por um `fetch` depois exige mudar um único ponto |
| **Filtros na URL (`useSearchParams`)** | Estado compartilhável, navegação previsível e integração simples com os botões da Home |
| **Carrossel feito à mão** | Controle total de acessibilidade e nenhuma dependência extra |
| **Formulário controlado, sem biblioteca** | O escopo é pequeno; validação e máscara em poucas linhas |
| **Data local no formulário** | Uso a data local (e não `toISOString`, que usa UTC) para o "a partir de hoje" não errar à noite |
| **`FotoVeiculo` com fallback** | Se uma imagem faltar, aparece um placeholder, em vez de uma imagem quebrada |
| **Sem back-end** | Fora do escopo do teste; o envio do formulário é simulado |

## Organização do código

```
├── public/                  # logo, banners, categorias, carros e favicon
├── src/
│   ├── main.tsx             # ponto de entrada (BrowserRouter)
│   ├── App.tsx              # definição das rotas
│   ├── index.css            # Tailwind e tokens de cor/fonte
│   ├── config.ts            # links externos, lojas e horários
│   ├── data/
│   │   └── veiculos.ts      # tipos, dados e formatadores (preço, km)
│   ├── components/
│   │   ├── Layout.tsx       # estrutura comum (cabeçalho, conteúdo, rodapé)
│   │   ├── Header.tsx       # menu responsivo
│   │   ├── Footer.tsx
│   │   ├── Carrossel.tsx    # carrossel reutilizável
│   │   ├── CardVeiculo.tsx  # card usado na Home e no Catálogo
│   │   ├── FotoVeiculo.tsx  # imagem com fallback
│   │   └── WhatsAppFlutuante.tsx
│   └── pages/
│       ├── Home.tsx
│       ├── Catalogo.tsx
│       └── Agendar.tsx
├── vercel.json              # regra de rotas para publicar a SPA
└── vite.config.ts
```

**Princípios:** páginas em `pages/` montam a tela; peças reutilizáveis ficam em `components/`; dados e configurações ficam fora dos componentes, para mudar conteúdo sem mexer na interface.

## Responsividade

Abordagem **mobile-first**: os estilos base valem para celular e os prefixos do Tailwind ampliam a partir de cada largura (`sm` 640 px, `md` 768 px, `lg` 1024 px, `xl` 1280 px).

| Elemento | Celular | Telas maiores |
|---|---|---|
| Menu | Hambúrguer (abaixo de `md`) | Horizontal e centralizado |
| Categorias (Home) | 1 coluna | 2 colunas (`sm`), 4 colunas (`lg`) |
| Destaques (Home) | 1 coluna | 2 (`sm`), 3 (`lg`) |
| Catálogo | Filtros em 2 colunas acima dos cards | Filtros na lateral (`lg`) e cards em até 3 colunas (`xl`) |
| Agendamento | Formulário acima do texto | Duas colunas lado a lado (`lg`) |

## Acessibilidade

- Link "Pular para o conteúdo" e navegação por teclado
- Todos os campos com `label` (visível ou oculto só visualmente)
- Erros do formulário com `aria-invalid`, `aria-describedby` e `role="alert"`
- Contagem de resultados do catálogo anunciada por `aria-live`
- Carrossel com semântica própria, pausa ao passar o mouse ou focar e respeito à preferência "reduzir movimento"
- Links externos com `rel="noopener noreferrer"` e aviso "(abre em nova aba)" para leitores de tela

## Personalização

- **Dados dos veículos:** `src/data/veiculos.ts`
- **Lojas, horários, número do WhatsApp e links externos:** `src/config.ts` (com `WHATSAPP_NUMERO` vazio, o botão abre o WhatsApp para escolher o contato)
- **Cores e fonte:** `src/index.css`
- **Imagens (opcionais):** coloque os arquivos em `public/` com estes nomes:
  - `logo.png`
  - `banners/1.jpg`, `2.jpg`, `3.jpg`
  - `categorias/hatch.jpg`, `sedan.jpg`, `suv.jpg`, `utilitario.jpg`
  - `carros/*.jpg` (nomes em `veiculos.ts`)
  - `agendar-bg.jpg`

## Publicação

O projeto é estático. Na Vercel (ou Netlify), basta importar o repositório; o comando de build é `npm run build` e a pasta de saída é `dist`. O arquivo `vercel.json` garante que acessar `/catalogo` ou `/agendar` direto não retorne 404.

## Limitações e próximos passos

**Limitações atuais**
- Dados fictícios e sem back-end: o formulário apenas simula o envio
- Sem testes automatizados
- Sem página de detalhe do veículo


## Créditos

- Logotipo, banners e fotos de veículos: material público da **Lions Seminovos**, usado exclusivamente para fins de avaliação neste processo seletivo.
- Fonte: [Montserrat](https://fonts.google.com/specimen/Montserrat) (Google Fonts).
- Ícones: SVGs próprios.

## Autor

**Caio Sena Pereira** · [LinkedIn] https://www.linkedin.com/in/caiosena2601/ · [GitHub] https://github.com/caio-sena