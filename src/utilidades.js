export const catalogo = [{
    id: "1",
    marca: 'Zara',
    nome: 'Camisa Larga com Bolsos',
    preco: 70,
    imagem: 'product-1.jpg',
    feminino: false,
},
{
    id: "2",
    marca: 'Zara',
    nome: 'Casaco Reto com Lã',
    preco: 85,
    imagem: 'product-2.jpg',
    feminino: true,
},
{
    id: "3",
    marca: 'Zara',
    nome: 'Jaqueta com Efeito Camurça',
    preco: 60,
    imagem: 'product-3.jpg',
    feminino: false,
},
{
    id: "4",
    marca: 'Zara',
    nome: 'Sobretudo em Mescla de Lã',
    preco: 160,
    imagem: 'product-4.jpg',
    feminino: false,
},
{
    id: "5",
    marca: 'Zara',
    nome: 'Camisa Larga Acolchoada de Veludo Cotelê',
    preco: 110,
    imagem: 'product-5.jpg',
    feminino: false,
},
{
    id: "6", marca: 'Zara',
    nome: 'Casaco de Lã com Botões',
    preco: 170,
    imagem: 'product-6.jpg',
    feminino: true,
},
{
    id: "7",
    marca: 'Zara',
    nome: 'Casaco com Botões',
    preco: 75,
    imagem: 'product-7.jpg',
    feminino: true,
},
{
    id: "8",
    marca: 'Zara',
    nome: 'Colete Comprido com Cinto',
    preco: 88,
    imagem: 'product-8.jpg',
    feminino: true,
}];

export function salvarLocalStore(chave, informacao) {
    localStorage.setItem(chave, JSON.stringify(informacao)); //stringify transforma o objeto em um texto
    //sem perder as caracteristicas de obj
}

export function lerLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave));
}
export function apagarDoLocalStorage(chave) {
    localStorage.removeItem(chave);
}

export function desenharProdutoNoCarrinhoSimples(idProduto, idContainerHtml, quantidadeDoProduto) {
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinho = document.getElementById(idContainerHtml);
    const elementoArticle = document.createElement("article"); // cria o elemento html
    const articleClasses = ['flex', 'relative', 'bg-cyan-50', 'text-black', 'rounded-md', 'p-2', 'mb-2','w-96'];

    for (const articleClass of articleClasses) {
        elementoArticle.classList.add(articleClass);
    };

    const cardProdutoCarrinho =
        ` 
        <img src="./assets/img/${produto.imagem}" alt="produto ${produto.nome}" class="h-24 rounded-lg">
        <div class="ml-2 p-2 flex flex-col justify-between">
            <p class="font-bold">${produto.nome}</p>
            <p>Tamanho: GG</p>
            <p>$${produto.preco}</p>
        </div>
        <div class="flex text-slate-900 items-end absolute bottom-0 right-2 text-lg font-semibold">
           
            <p id="quantidade-${produto.id}" class="ml-2">${quantidadeDoProduto}</p>
            
        </div>        
        `;
    elementoArticle.innerHTML = cardProdutoCarrinho;
    containerProdutosCarrinho.appendChild(elementoArticle); //appendChil seria juntar mais um filho
    //adiciona mais um elemento ao elemento pai
}
