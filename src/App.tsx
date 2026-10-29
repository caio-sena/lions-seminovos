import { Link, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Agendar from "./pages/Agendar";
import Catalogo from "./pages/Catalogo";
import Home from "./pages/Home";

function NaoEncontrada() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Página não encontrada</h1>
      <Link to="/" className="mt-6 inline-block text-destaque hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="agendar" element={<Agendar />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
}