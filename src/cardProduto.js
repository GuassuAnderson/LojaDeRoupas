import { catalogo } from "./utilidades";
import { adicionarAoCarrinho } from "./menucarinho";

export function renderizarCatalogo(){
    for (const produtoCatalogo of catalogo) {
        const cartaoProduto =
        `
        <div id="card-produto-${produtoCatalogo.id}" class="border-solid border-2 border-sky-500 w-48 m-2 p-2 flex flex-col justify-between group shadow-xl shadow-slate-500 rounded-lg ${produtoCatalogo.feminino ? 'feminino' : 'masculino'}">
        <img src="./assets/img/${produtoCatalogo.imagem}" alt="produto" class="rounded-lg group-hover:scale-150 duration-300"/>
        <p class="text-sm">${produtoCatalogo.marca}</p>
        <p >${produtoCatalogo.nome}</p>
        <p>$${produtoCatalogo.preco}</p>
        <button id="adicionar-${produtoCatalogo.id}" class="bg-slate-950 hover:bg-cyan-400 transition-colors duration-700 rounded-sm shadow-lg shadow-cyan-800"><i class="fa-solid fa-cart-plus fa-lg" style="color: #3e9882;"></i></button>
        </div>
        `;
    
        document.getElementById('container-produto').innerHTML += cartaoProduto;
    }
    for (const produtoCatalogo of catalogo){
        document.getElementById(`adicionar-${produtoCatalogo.id}`).addEventListener('click', () => adicionarAoCarrinho(produtoCatalogo.id));
    }
}
