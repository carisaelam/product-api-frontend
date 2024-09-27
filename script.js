// HTML
const getCardHTML = (product) => {
  const randomNumber = Math.floor(Math.random() * 100 + 20);
  let imageUrl;
  if (product.image === '') {
    imageUrl = `https://picsum.photos/id/${randomNumber}/200`;
  } else {
    imageUrl = product.image;
  }
  return `
        <div class="product__card">
            <h3>${product.name.toUpperCase()}</h3>
            <img src=${imageUrl} />
            <p>Quantity: ${product.quantity}</p>
            <p>Price: $${product.price}</p>
        </div>
    `;
};

const baseUrl = 'https://product-api-backend.onrender.com/';
const endpoint = 'api/products';

async function fetchData() {
  try {
    const response = await fetch(baseUrl + endpoint);

    if (!response.ok) {
      throw new Error('Network response issue');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Problem! ‼️', error);
  }
}

function displayItem(product) {
  const container = document.querySelector('.product__container');
  const cardHTML = getCardHTML(product);
  container.innerHTML += cardHTML;
}

async function getData() {
  const data = await fetchData();
  if (data) {
    data.forEach(displayItem);
  }
}

getData().then((data) => {
  console.log('data', data);
});
