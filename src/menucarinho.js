import { catalogo, lerLocalStorage, salvarLocalStore } from "./utilidades";

const idsProdutoCarrinhoQuantidade = lerLocalStorage('carrinho') ?? {};
//operador nulo ?? se for um valor valido passa e for errado ignora e segue o codigo

function abrirCarrinho() {
    document.getElementById("carrinho").classList.add('right-[0px]');
    document.getElementById("carrinho").classList.remove('right-[-360px]');
}
//meu
function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove('right-[0px]');
    document.getElementById("carrinho").classList.add('right-[-360px]')

}

function irParaCheckout(){
    if(Object.keys(idsProdutoCarrinhoQuantidade).length === 0){
        return;
    }
    window.location.href = window.location.origin + "/checkout.html";
}

export function inicializarCarrinho() {
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
    const botaoIrParaCheckout =  document.getElementById("finalizar-compra");

    botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
    botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
    botaoIrParaCheckout.addEventListener("click", irParaCheckout);

}

export function renderizarProdutosCarrinho() {
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho")
    containerProdutosCarrinho.innerHTML = "";
    for (const idProduto in idsProdutoCarrinhoQuantidade) {
        desenharProdutoNoCarrinho(idProduto);
    }
}

function removerDoCarrinho(idProduto) {
    delete idsProdutoCarrinhoQuantidade[idProduto]; //apagando o campo do objeto
    salvarLocalStore("carrinho", idsProdutoCarrinhoQuantidade);
    atualizarPrecoCarrinho();
    renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto) {
    idsProdutoCarrinhoQuantidade[idProduto]++;
    salvarLocalStore("carrinho", idsProdutoCarrinhoQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
}
function decrementarQuantidadeProduto(idProduto) {
    if (idsProdutoCarrinhoQuantidade[idProduto] === 1) {
        removerDoCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhoQuantidade[idProduto]--;
    salvarLocalStore("carrinho", idsProdutoCarrinhoQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto) {
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto) {
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
    const elementoArticle = document.createElement("article"); // cria o elemento html
    const articleClasses = ['flex', 'relative', 'bg-cyan-50', 'text-black', 'rounded-md', 'p-2'];

    for (const articleClass of articleClasses) {
        elementoArticle.classList.add(articleClass);
    };

    const cardProdutoCarrinho =
        ` 
                <button id="remover-item-${produto.id}" class="absolute top-0 right-2 hover:text-red-600">
                    <i class="fa-solid fa-rectangle-xmark"></i>
                </button>
                <img src="./assets/img/${produto.imagem}" alt="produto ${produto.nome}" class="h-24 rounded-lg">
                <div class="ml-2 p-2 flex flex-col justify-between">
                    <p class="font-bold">${produto.nome}</p>
                    <p>Tamanho: GG</p>
                    <p>$${produto.preco}</p>
                </div>
                <div class="flex text-slate-900 items-end absolute bottom-0 right-2 text-lg font-semibold">
                    <button id='decrementar-produto-${produto.id}'>-</button>
                    <p id="quantidade-${produto.id}" class="ml-2">${idsProdutoCarrinhoQuantidade[produto.id]}</p>
                    <button class="ml-2" id='incrementar-produto-${produto.id}'>+</button>
                </div>
            
        `;
    elementoArticle.innerHTML = cardProdutoCarrinho;
    containerProdutosCarrinho.appendChild(elementoArticle); //appendChil seria juntar mais um filho
    //adiciona mais um elemento ao elemento pai

    document.getElementById(`decrementar-produto-${produto.id}`).addEventListener("click", () => decrementarQuantidadeProduto(produto.id));
    document.getElementById(`incrementar-produto-${produto.id}`).addEventListener("click", () => incrementarQuantidadeProduto(produto.id));
    document.getElementById(`remover-item-${produto.id}`).addEventListener("click", () => removerDoCarrinho(produto.id));
}

export function adicionarAoCarrinho(idProduto) {
    if (idProduto in idsProdutoCarrinhoQuantidade) { // o id do produto estadentro do objeto
        incrementarQuantidadeProduto(idProduto);
        return;
    }
    idsProdutoCarrinhoQuantidade[idProduto] = 1;
    desenharProdutoNoCarrinho(idProduto);
    salvarLocalStore("carrinho", idsProdutoCarrinhoQuantidade);
    atualizarPrecoCarrinho();
}

export function atualizarPrecoCarrinho() {
    const  precoCarrinho = document.getElementById("preco-total");
    let precoTotalCarrrinho = 0;
    for(const idProdutoNoCarrinho in idsProdutoCarrinhoQuantidade){
        precoTotalCarrrinho += catalogo.find( p => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoQuantidade[idProdutoNoCarrinho]; 
        //processo para achar o preço do protudo e calcula o preco total
    }
    precoCarrinho.innerText = `Total: $${precoTotalCarrrinho}`;
}