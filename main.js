import { atualizarPrecoCarrinho, inicializarCarrinho, renderizarProdutosCarrinho } from "./src/menucarinho";
import { renderizarCatalogo } from "./src/cardProduto";
import { inicializarFiltros } from "./src/filtrosCatalogo";


renderizarCatalogo();
inicializarCarrinho();
renderizarProdutosCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();