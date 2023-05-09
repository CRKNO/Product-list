const productList = document.querySelector(".product-list");
const newProductForm = document.querySelector(".new-product-form");
const newProductAside = document.querySelector(".new-product");
const createProductBtn = document.querySelector(".create-new-product-btn");

const products = [];

const closeIconSrc = "images/cross-23.png";

function newProduct(event){
    event.preventDefault();

    let newproductName = event.target.children[0].children[1].value;
    let newproductPrice = Number(event.target.children[1].children[1].value);
    let newproductImg = event.target.children[2].children[1].value;
    let newProductId = products.length;

    if(newproductName && newproductPrice && newproductImg){
        products.push(new productObj(newproductName, newproductPrice, newproductImg, newProductId));
    }
    
    putProductsOnList(products);
    toggleListAndForm();
}

newProductForm.addEventListener("submit", newProduct);

function productObj(name, price, img, id){
    this.name = name,
    this.price = price,
    this.img = img,
    this.id = id
}

products.push(
    new productObj("Skateboard",
    100,
    "https://images.pexels.com/photos/165236/pexels-photo-165236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
    0),
    
    new productObj("Mountain bike", 
    150, 
    "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    1),


    new productObj("auto", 
    1500, 
    "https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    2)
)

function createProductElement(name, price, img, id){

    /* Create elements */
    const li = document.createElement("li");
    li.classList.add("product-item-container");
    li.setAttribute("identifier", id);

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("product-img-container");

    const productImg = document.createElement("img");
    productImg.classList.add("product-img");
    productImg.setAttribute("src", img);

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("product-info-container");

    const pName = document.createElement("p");
    pName.classList.add("name");
    pName.append(name)

    const pPrice = document.createElement("p");
    pPrice.classList.add("price");
    pPrice.append(`$${price}`);

    const closeContainer = document.createElement("div");
    closeContainer.classList.add("product-close-container");

    const closeIcon = document.createElement("img");
    closeIcon.setAttribute("src", closeIconSrc);
    closeIcon.addEventListener("click", deleteProduct);
    
    
    /* Set elements */
    li.append(imgContainer, infoContainer, closeContainer);
    
    imgContainer.append(productImg);
    
    infoContainer.append(pName, pPrice);

    closeContainer.append(closeIcon);
    
    // <li class="product-item-container">
    //             <div class="product-img-container">
    //                 <img class="product-img" src="https://images.pexels.com/photos/165236/pexels-photo-165236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Skate">
    //             </div>
    //             <div class="product-info-container">
    //                 <p class="name">Skate</p>
    //                 <p class="price">$100</p>
    //             </div>
    //             <div class="product-close">
    //                 <img src="images/cross-23.png" alt="close icon">
    //             </div>
    //         </li>

    /* Put product on list */
    productList.append(li);
}
function deleteProduct(event){
    let identifier = event.target.parentElement.parentElement.getAttribute("identifier");

    products.find(function(product){
        if(product.id == identifier){
            console.log(product.id)
            products[identifier] = "";
            putProductsOnList(products);
        }
    })
}
function putProductsOnList(arr){
    while(productList.childElementCount > 0){
        productList.children[0].remove();
    }
    for(product of arr){
        if(product){
            createProductElement(product.name, product.price, product.img, product.id);
        }
        else{
            console.log("no se dibuja");
        }
    }
}

putProductsOnList(products);

createProductBtn.addEventListener("click", toggleListAndForm);

function toggleListAndForm(){
    productList.classList.toggle("inactive");
    newProductAside.classList.toggle("inactive");
    createProductBtn.classList.toggle("inactive");
}