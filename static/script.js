//SHOP
let basket = JSON.parse(localStorage.getItem("data")) || [];

let shop = document.getElementById("book-container");
let modal = document.getElementById("modal");
let inptotal = document.getElementById("inptotal");
let divtotal = document.getElementById("divtotal");
let cartItems = document.getElementById("cartItems");

document.getElementById("cartAmount").innerHTML = JSON.parse(localStorage.getItem("data")) === null ? 0 : JSON.parse(localStorage.getItem("data")).length;

document.getElementById("sm-cart").innerHTML = JSON.parse(localStorage.getItem("data")) === null ? 0 : JSON.parse(localStorage.getItem("data")).length;


let shopItemsData = [
  {
    id: 1,
    name: "The Arts: A Visual Encyclopedia",
    genre: "Art",
    author: "by DK",
    des: "From the first strokes of paint on prehistoric caves to contemporary street art in the 21st century, every artistic style and movement is explored and explained in stunning detail. Special features celebrate the lives of groundbreaking painters, sculptors, and photographers, from Dutch master Johannes Vermeer to photography pioneer Julia Margaret Cameron. DK's Visual Encyclopedias are the first substantial series of encyclopedias aimed at young children, designed to excite and entertain, while offering a comprehensive overview of core subjects. From science and the human body to animals, the ocean, space, and more, each book combines fun facts, amazing pictures, and crystal-clear explanations to take kids into the wonders of our world.",
    img: "images/books/1.jpg",
    price: "25.17",
  },
  {
    id: 2,
    name: "Music: The Definitive Visual History",
    genre: "Art",
    author: "by DK",
    des: "This magnificent book about music charts and explains the entire global history of music, whether it’s music in the Middle Ages, to the Sounds of Soul, music in the Romance period to the Renaissance and so much more. This new edition of Music has been updated with the latest facts and information, including the latest on streaming music, with specially-commissioned photography including a Stradivarius guitar, the earliest cello known to survive and a guitar used personally by BobDylan! ",
    img: "images/books/2.jpg",
    price: "43.36",
  },
  {
    id: 3,
    name: "Playing Changes: Jazz for the New Century",
    genre: "Music",
    author: "by Nate Chinen",
    des: "“Playing changes,” in jazz parlance, has long referred to an improviser’s resourceful path through a chord progression. Playing Changes boldly expands on the idea, highlighting a host of significant changes—ideological, technological, theoretical, and practical—that jazz musicians have learned to navigate since the turn of the century. Nate Chinen, who has chronicled this evolution firsthand throughout his journalistic career, vividly sets the backdrop, charting the origins of jazz historicism and the rise of an institutional framework for the music..",
    img: "images/books/3.jpg",
    price: "24.23",
  },
  {
    id: 4,
    name: "Architectural Styles: A Visual Guide",
    genre: "Architecture",
    author: "by Margaret Fletcher",
    des: "Architectural Styles is an incomparable guide to architectural styles across the centuries and around the world. Modeled after an architect's plein air sketchbook, the volume features hundreds of detailed drawings by esteemed architectural illustrator Robbie Polley alongside incisive and informative descriptions. This unique guidebook takes readers from Europe and the Americas to Egypt, China, and India. It covers a host of historical and contemporary architectural styles, from ancient and classical to Pre-Columbian, Romanesque, Renaissance, Palladian, art nouveau, Brutalist, and biomorphic.",
    img: "images/books/4.jpg",
    price: "19.47",
  },
  {
    id: 5,
    name: "The Movie Book: Big Ideas Simply Explained",
    genre: "Movie",
    author: "by DK",
    des: "This book brings cinema to life with iconic quotes and film stills, posters, biographies of directors, actors, and actresses, along with narrative timeline and infographics exploring key themes. If you thought it was difficult to learn about the best cinematic masterpieces, The Movie Book presents key information in an easy to follow layout. Learn everything about your favorite movies, as well as celebrated classics and the films to watch before you die, through iconic quotes and stills, posters, biographies, memorabilia and narrative timelines, through fantastic mind maps and step-by-step summaries.",
    img: "images/books/6.jpg",
    price: "10.12",
  },
  {
    id: 6,
    name: "TA Dictionary Of Color Combinations",
    genre: "Art",
    author: "by Sanzo Wada",
    des: "Sanzo Wada (1883-1967) was an artist, teacher, costume and kimono designer duringa turbulent time in avant-garde Japanese art and cinema. Wada was ahead of his time in developing traditional and Western influenced colour combinations, helping to lay the foundations for contemporary colour research. Based on his original 6-volume work from the 1930s, this book offers 348 color combinations, as attractive and sensuous as the books own design.",
    img: "images/books/8.jpg",
    price: "19.55",
  },
];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, author, des, img, price } = x;
      return `
      <div class="card">
        <img src="${img}" alt="${name}" />
        <div class="des">
          <span>${author}</span>
          <h5>${name}</h5>
          <div class="star">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <h4>$${price}</h4>
        </div>
        <button onclick=openmodal(${id}) class="openmodal myBtn">Add to Cart</button>
      </div>

`
    })
    .join(""));
};

// CART
let total = 0;

let generateCart = () => {
  total = 0;
  let data = JSON.parse(localStorage.getItem("data"));
  let counts = {};
  document.getElementById("cartAmount").innerHTML = JSON.parse(localStorage.getItem("data")) === null ? 0 : JSON.parse(localStorage.getItem("data")).length;
  document.getElementById("sm-cart").innerHTML = JSON.parse(localStorage.getItem("data")) === null ? 0 : JSON.parse(localStorage.getItem("data")).length;
  data.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
  keys = Object.keys(counts).map(key => parseInt(key));
  (cartItems.innerHTML = keys.map((x) => {
    let search = shopItemsData.find((searchItem) => searchItem.id === x ) || [];
    let subtotal = search.price * counts[x];
    total = subtotal + total;
    return `
    <tr>
      <td><a href="#" onclick="removeItem(${search.id})"><i class="fa-regular fa-circle-xmark"></i></a></td>
      <td><img src=${search.img} class=cartImg /></td>
      <td>${search.name}</td>
      <td>$${search.price}</td>
      <td>${counts[x]}</td>
      <td>$${round(subtotal,2)}</td>
    </tr>`;
  }).join(""));
  cartItems.innerHTML = cartItems.innerHTML + `
  <tr id="last_row">
    <td  class="total_cart">Total</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td  class="total_cart">$${round(total,2)}</td>
  </tr>`;
}

let openCheckout = () => {
  modal.style.display="block";
  inptotal.value = total;
  divtotal.innerHTML = "Total: $" + total;
}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function removeItem(id){
  let data = JSON.parse(localStorage.getItem("data"));
  data.indexOf(id) !== -1 && data.splice(data.indexOf(id),1)
  localStorage.setItem("data", JSON.stringify(data));
  generateCart();
}

try {
  generateShop();
} catch (error) {
  console.log();
}

try {
  generateCart();
} catch (error) {
  console.log();
}

let openmodal = (sid) => {

  modal.style.display="block";
  let search = shopItemsData.find((searchItem) => searchItem.id === sid) || [];

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="document.getElementById('modal').style.display='none'" >&times;</span>
      <div class="product-img">
        <img src=${search.img} alt="" />
      </div>
      <div class="info">
        <h3>${search.name}</h3>
        <p>${search.author}</p>
        <p class="text-p">${search.des}</p>
        <div class="star">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <h4 class="price">$${search.price}</h4>
        <div class="add-btn">
          <button onclick=addToCart(${search.id})><i id="add-icon" class="fa-solid fa-cart-shopping"></i></button>
        </div>
      </div>
    </div>
  `;
};

let addToCart = (sid) => {
  basket.concat(JSON.parse(localStorage.getItem("data")));
  basket.push(sid);

  localStorage.setItem("data", JSON.stringify(basket));
  document.getElementById("cartAmount").innerHTML = JSON.parse(localStorage.getItem("data")).length;
  document.getElementById("sm-cart").innerHTML = JSON.parse(localStorage.getItem("data")).length;
}
//NAVBAR
const bar = document.querySelector("#bar");
const nav = document.querySelector("#navbar");
const close = document.querySelector("#close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}
