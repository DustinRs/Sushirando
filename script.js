let meals = [
  {
    meal: "Maki Sake",
    price: 6.0,
    text: "Lachs",
    amount: "1",
  },
  {
    meal: "Maki Kappa",
    price: 4.5,
    text: "Gurke",
    amount: "1",
  },
  {
    meal: "Nigiri Sake",
    price: 6.5,
    text: "Lachs",
    amount: "1",
  },
  {
    meal: "Sake Philadelphia",
    price: 7.0,
    text: "Lachs, Avocado und Frischkäse, Sesam",
    amount: "1",
  },
  {
    meal: "California Tobiko",
    price: 7.5,
    text: "Surimi, Avocado mit Fischrogen ummantelt",
    amount: "1",
  },
  {
    meal: "Ebi Tempura",
    price: 12.5,
    text: "Innen Tempura Garnelen, Gurke, Teriyaki Soße und Fischrogen.",
    amount: "1",
  },
  {
    meal: "Ebi Tempura Salmon",
    price: 13.5,
    text: "Innen leicht frittierte Garnelen, Avocado, außen flambierte Lachs ummantelt.",
    amount: "1",
  },
  {
    meal: "Frühlingsrolle Vegetarisch",
    price: 6.0,
    text: "Gemüsefüllung",
    amount: "1",
  },
  {
    meal: "Frühlingsrolle",
    price: 6.5,
    text: "Hühnchen und Gemüsefüllung",
    amount: "1",
  },
  {
    meal: "Eis",
    price: 3.5,
    text: "1 Kugel Schoko & 1 Kugel Vanille",
    amount: "1",
  },
];

let food = [];
let price = [];
let amount = [];
let basket = [];
let counterCartBasket = [];

function renderMealList() {
  mealList();
  const menu_btn = document.querySelector(".hamburger");
  const mobile_menu = document.querySelector(".mobile-nav");

  menu_btn.addEventListener("click", function () {
    menu_btn.classList.toggle("is-active");
    mobile_menu.classList.toggle("is-active");
  });
  counterCart();
  renderBasket();
  renderOverviewBasket();
  showSubtotal();
}

function mealList() {
  let content = document.getElementById("meals");
  content.innerHTML = "";
  for (let i = 0; i < meals.length; i++) {
    const meal = meals[i];
    content.innerHTML += `<div class="mealsborder"><div class="mealstop"><h2 id="${
      meal["meal"]
    }">${meal["meal"]}</h2>
        <button onclick="addMeal(${i})" class="plusButton">+</button></div>
        <div class="textPrice"><p>${meal["text"]}</p><p class="price">${meal[
      "price"
    ]
      .toFixed(2)
      .replace(".", ",")}€</p></div></div>`;
  }
}

function renderBasket() {
  let content = document.getElementById("basketMeals");
  content.innerHTML = "";
  if (basket.length == 0) {
    content.innerHTML = "<span>Fülle deinen Warenkorb!🍱</span>";
  } else if (basket.length > 0) {
    Basket(content);
  }
}

function Basket(content) {
  for (let i = 0; i < food.length; i++) {
    let f = food[i];
    let p = price[i];
    let a = amount[i];
    let b = basket[i];
    content.innerHTML += `<div class="basketItems">
          <div>${a}x</div>
          <div>${f}</div>
          <div><button onclick="reduceAmount(${b})" class="basketButtons">-</button>
          <button onclick="increaseAmount(${b})" class="basketButtons">+</button></div>
          <div>${p.toFixed(2).replace(".", ",")}€</div>
          <div><img onclick="removeWholeMeal(${i})" class="basketicons" src="./img/bin.png" alt=""></div>
          </div>`;
  }
}

function addMeal(i) {
  let meal = meals[i];
  let index = food.indexOf(meal["meal"]);
  if (index == -1) {
    food.push(meal["meal"]);
    price.push(meal["price"]);
    amount.push(1);
    basket.push(i);
    counterCartBasket.push(1);
  } else {
    counterCartBasket[index] += 1;
    amount[index] += 1;
    price[index] += meal["price"];
  }
  counterCart();
  renderBasket();
  renderOverviewBasket();
  showSubtotal();
}

function increaseAmount(b) {
  let meal = meals[b];
  let index = food.indexOf(meal["meal"]);
  counterCartBasket[index] += 1;
  amount[index] += 1;
  price[index] += meal["price"];
  counterCart();
  renderBasket();
  renderOverviewBasket();
  showSubtotal();
}

function reduceAmount(b) {
  let meal = meals[b];
  let index = food.indexOf(meal["meal"]);
  let amounts = amount[index];
  if (amounts > 1) {
    counterCartBasket[index] -= 1;
    amount[index] -= 1;
    price[index] -= meal["price"];
  } else {
    food.splice(index, 1);
    price.splice(index, 1);
    amount.splice(index, 1);
    basket.splice(index, 1);
    counterCartBasket.splice(index, 1);
  }
  counterCart();
  renderBasket();
  renderOverviewBasket();
  showSubtotal();
}

function removeWholeMeal(b) {
  food.splice(b, 1);
  price.splice(b, 1);
  amount.splice(b, 1);
  basket.splice(b, 1);
  counterCartBasket.splice(b, 1);
  counterCart();
  renderBasket();
  renderOverviewBasket();
  showSubtotal();
}

function clearBasket() {
  food.splice(0, food.length);
  price.splice(0, price.length);
  amount.splice(0, amount.length);
  basket.splice(0, basket.length);
  counterCartBasket.splice(0, counterCartBasket.length);
  showSubtotal();
}

function order() {
  let sum = price;
  if (sum < 10) {
    alert("Mindestbestellwert sind 10€");
    return renderBasket();
  }
  if (basket.length > 0) {
    let content = document.getElementById("basketMeals");
    content.innerHTML =
      "Danke für deine Bestellung!<br> Sie wird in kürze bei dir sein!!";
    document.getElementById("orderOverview").classList.remove("d-none");
    return clearBasket();
  } else {
    alert("Bitte füge dem Warenkorb mindestens ein Gericht hinzu!");
  }

  showSubtotal();
}

function showSubtotal() {
  let sum = 0;
  for (let i = 0; i < price.length; i++) {
    sum += price[i];
  }
  let finalSum = sum + 1;
  document.getElementById("subtotal").innerHTML = sum
    .toFixed(2)
    .replace(".", ",");
  document.getElementById("subFinal").innerHTML = finalSum
    .toFixed(2)
    .replace(".", ",");
}

function renderOverviewBasket() {
  let content = document.getElementById("overViewBasket");
  content.innerHTML = "";
  if (basket.length == 0) {
    content.innerHTML = "<span>Fülle deinen Warenkorb!🍱</span>";
  } else if (basket.length > 0) {
    OverviewBasket(content);
  }
  showSubtotalOverview();
}

function OverviewBasket(content) {
  for (let i = 0; i < food.length; i++) {
    let f = food[i];
    let p = price[i];
    let a = amount[i];
    let b = basket[i];
    content.innerHTML += `<div class="basketOverviewItems">
          <div>${a}x</div>
          <div>${f}</div>
          <div>${p.toFixed(2).replace(".", ",")}€</div>
          </div>`;
  }
}

function showSubtotalOverview() {
  let sum = 0;
  for (let i = 0; i < price.length; i++) {
    sum += price[i];
  }
  let finalSum = sum + 1;

  document.getElementById("subFinalOverview").innerHTML = finalSum
    .toFixed(2)
    .replace(".", ",");
}

function closeOverview() {
  document.getElementById("orderOverview").classList.add("d-none");

  renderBasket();
}

let toggle = true;

function swapHeart() {
  if (toggle) {
    document.getElementById("heartClick").src = "./img/heartRed.png";
  } else {
    document.getElementById("heartClick").src = "./img/heart.png";
  }
  toggle = !toggle;
}

function openBasketMobile() {
  const mobile_basket = document.querySelector(".basket");
  mobile_basket.classList.toggle("is-active");
}

function counterCart() {
  let sum = 0;
  let counter = document.getElementById("counterCart");
  counter.innerHTML = "";
  if (counterCartBasket.length == 0) {
    counter.innerHTML = "0";
  } else if (counterCartBasket.length > 0) {
    for (let s = 0; s < counterCartBasket.length; s++) {
      sum += counterCartBasket[s];
      counter.innerHTML = `${sum}`;
    }
  }
}
