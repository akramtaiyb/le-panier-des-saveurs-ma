//loading index
this.addEventListener("load", function () {
  buildMarket(showing_items);
});

// menu effect
let menu_btn = document.getElementById("menu-btn");
var menu_activated = false;
menu_btn.addEventListener("click", function () {
  if (menu_activated == false) {
    var menu = document.getElementById("menu");
    menu.style.left = "70px";
    this.classList.remove("fa-bars");
    this.classList.add("fa-angle-left");
    menu_activated = true;
  } else {
    this.classList.remove("fa-angle-left");
    this.classList.add("fa-bars");
    var menu = document.getElementById("menu");
    menu.style.left = "-375px";
    menu_activated = false;
  }
});

// search bar
let search_icon = document.getElementById("search-icon");
var search_bar_activated = false;
search_icon.addEventListener("click", function () {
  if (search_bar_activated == false) {
    var search_bar = document.getElementById("search-bar");
    search_bar.style.opacity = "1";
    search_bar.disabled = false;
    search_bar_activated = true;
  } else {
    this.classList.remove("fa-angle-left");
    this.classList.add("fa-bars");
    var search_bar = document.getElementById("search-bar");
    search_bar.style.opacity = "0";
    search_bar.disabled = true;
    search_bar_activated = false;
    once = true;
    search_bar.value = "";
    document.getElementById("search-board").innerHTML = "";
    document.getElementById("search-board").style.padding = "0";

    if (x_exists) {
      document.getElementById("xmark-icon").remove();
    }
  }
});

//search bar clear button
var search_bar = document.getElementById("search-bar");
var once = true;
var x_exists = false;
search_bar.addEventListener("input", function () {
  var right_side = document.querySelector(".right-side");
  if (once) {
    once = false;
    var xmark = document.createElement("i");
    xmark.classList.add("fa-solid");
    xmark.classList.add("fa-xmark");
    xmark.id = "xmark-icon";
    right_side.appendChild(xmark);
    x_exists = true;
  }
  if (this.value == "") {
    document.getElementById("xmark-icon").remove();
    once = true;
    x_exists = false;
  } else {
    var xmark = document.getElementById("xmark-icon");
    xmark.addEventListener("click", function () {
      search_bar.value = "";
      this.remove();
      once = true;
      x_exists = false;
      document.getElementById("search-board").innerHTML = "";
      document.getElementById("search-board").style.padding = "0";
    });
  }
});

// Showing Products Cards
var k = 0;
function buildMarket() {
  while (i < showing_items) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "products.json", true);
    xhr.onload = function () {
      if (xhr.status == 200) {
        var dataJSON = this.response;
        var data = JSON.parse(dataJSON);
        var max = data.length;
        if (j < max) {
          var shelf = document.createElement("div");
          shelf.classList.add("shelf");
          var item = document.createElement("div");
          item.classList.add("item");
          var img_container = document.createElement("div");
          img_container.classList.add("img-container");
          var img = document.createElement("img");
          img_container.appendChild(img);
          item.appendChild(img_container);
          var description = document.createElement("div");
          description.classList.add("description");
          var h5 = document.createElement("h5");
          var price = document.createElement("span");
          price.classList.add("price");
          var digital_price = document.createElement("span");
          digital_price.classList.add("digitalprice");
          price.appendChild(digital_price);
          var p = document.createElement("p");
          p.id = "lorem";
          description.appendChild(h5);
          description.appendChild(price);
          description.appendChild(digital_price);
          description.appendChild(p);
          item.appendChild(description);
          var interactive = document.createElement("div");
          interactive.classList.add("interactive");
          var ajouter = document.createElement("input");
          ajouter.classList.add("ajouter");
          ajouter.type = "button";
          ajouter.value = "AJOUTER";
          item.appendChild(description);
          item.appendChild(interactive);
          item.appendChild(ajouter);
          shelf.appendChild(item);
          img.src = "images/products/" + data[j].filename;
          h5.innerHTML = data[j].title;
          price.innerHTML = data[j].price + " MAD/Kg";
          p.innerHTML = data[j].description;
          document.getElementById("market").appendChild(shelf);
          j++;
          cartAdd(k, data);
          k++;
        } else if (j >= max) {
          document.getElementById("more-btn").value = "No More";
          document.getElementById("more-btn").disabled = "true";
        }
      }
    };
    xhr.send();
    i++;
  }
}
var i = 0;
var j = 0;
var showing_items = 6;
// buildMarket();

if (!more_btn_activated) {
  var more_btn = document.createElement("input");
  more_btn.type = "button";
  more_btn.value = "More";
  more_btn.id = "more-btn";
  document.querySelector("section").appendChild(more_btn);
  more_btn_activated = true;
}

// buildMarket(showing_items);

var more_btn_activated = false;

more_btn.addEventListener("click", function updateMarket() {
  showing_items += 3;
  buildMarket();
});

// cart effect
var cart = {
  items: [],
  total: 0,
};
var in_cart = [];
var cart_activated = false;
var notification = document.createElement("div");
notification.id = "cart-alert";
document.body.appendChild(notification);
notification.classList.add("cart-alert");

function cartAdd(k, data) {
  var ajouter = document.getElementsByClassName("ajouter")[k];
  ajouter.addEventListener("click", function (e) {
    var item = ajouter.parentNode.childNodes[1].childNodes[0].innerHTML;
    var in_panier = false;
    for (let i = 0; i < data.length; i++) {
      const title = data[i].title;
      if (item == title) {
        cart.items.forEach((item) => {
          if (item.title == title) {
            in_panier = true;
          }
        });
        if (!in_panier) {
          var chosen = {
            title: data[i].title,
            price: data[i].price,
            quantity: 1,
          };
          in_cart.push(chosen);
          cart.items = in_cart;
          cart.total++;
          document.getElementById("cart-alert").innerHTML = cart.total;
          document.getElementById("cart-alert").style.visibility = "visible";
          var name = document.createElement("td");
          name.innerHTML = in_cart.slice(-1)[0].title;
          var price = document.createElement("td");
          price.innerHTML = in_cart.slice(-1)[0].price;
          price.classList.add("prices");
          var td_qte = document.createElement("td");
          var quantity = document.createElement("input");
          quantity.type = "number";
          quantity.value = "1";
          quantity.min = "1";
          quantity.max = "5";
          quantity.classList.add("qties");
          var delete_icon = document.createElement("i");
          delete_icon.classList.add("fa-solid");
          delete_icon.classList.add("fa-delete-left");
          delete_icon.classList.add("fa-xl");
          delete_icon.classList.add("delete-icon");
          td_qte.appendChild(quantity);
          td_qte.appendChild(delete_icon);
          var tr = document.createElement("tr");
          tr.appendChild(name);
          tr.appendChild(price);
          tr.appendChild(td_qte);
          document.getElementById("cart-table").childNodes[1].appendChild(tr);
          cart_activated = true;
        } else {
          swal({
            title: `Sweet!`,
            text: `We alreay found ${title} in your panier.`,
            button: false,
          });
        }
      }
    }
    $(document).ready(function () {
      // Calculating total amount to pay
      var price = 0;
      for (item of cart.items) {
        price += item.price;
      }
      $("#total").text(parseFloat(price).toFixed(2));
      $(".qties").change(function () {
        var self = $(this).parent().parent().children()[0].innerHTML;
        for (item of cart.items) {
          if (item.title == self) {
            item.quantity = Number($(this).val());
            updateTotal();
          }
        }
      });
      $(".delete-icon").click(function () {
        var deleted = $(this).parent().parent().children()[0].innerHTML;
        $(this).parent().parent().remove();
        for (var i = 0; i < cart.items.length; i++) {
          if (cart.items[i].title == deleted) {
            cart.items.splice(i, 1);
            i--;
            cart.total -= 1;
            $("#cart-alert").text(cart.total);
            if (cart.items.length == 0) {
              $("#cart-alert").css("visibility", "hidden");
            }
          }
        }
        updateTotal();
      });
      function updateTotal() {
        $("#total").text("");
        var somme = 0;
        if (cart.items.length > 0) {
          for (item of cart.items) {
            somme += item.price * item.quantity;
            var test = item.price * item.quantity;
            $("#total").text(somme.toFixed(2));
          }
        } else {
          $("#total").text("0");
        }
      }
    });
  });
}

var panier_activated = false;
var panier = document.getElementById("basket-shopping");
panier.addEventListener("click", function () {
  if (!panier_activated) {
    document.getElementById("cart").style.right = "0";
    // document.getElementById("cart").style.display = "hidden";
    document.getElementById("basket-shopping").style.color = "#00a878";
    document.getElementById("market").style.marginRight = "500px";
    panier_activated = true;
  } else {
    document.getElementById("cart").style.right = "-40%";
    document.getElementById("basket-shopping").style.color = "#4f5d75";
    document.getElementById("market").style.marginRight = "0";
    panier_activated = false;
  }
});

$(document).ready(function () {
  // click on * to hide cart
  $("section").click(function (e) {
    if (e.target.value != "AJOUTER" && e.target.value != "More") {
      $("#cart").css("right", "-40%");
      $("#market").css("margin-right", "0px");
      panier_activated = false;
    }
    $("#basket-shopping").css("color", "#4f5d75");
  });
});

// filtering vs search algorithms
search_bar.addEventListener("input", function search() {
  if (search_bar.value != "") {
    let search = new XMLHttpRequest();
    search.open("GET", "products.json", true);
    search.onload = function () {
      if (search.status == 200) {
        var dataJSON = this.response;
        var data = JSON.parse(dataJSON);
        var missing = search_bar.value.toLowerCase();
        var missing_len = missing.length;
        var possible = [];

        for (var i = 0; i < data.length; i++) {
          var lowerfit = data[i].title.toLowerCase();
          var bluelist = lowerfit.split("");
          var blueword = "";

          for (var j = 0; j < missing_len; j++) {
            blueword += bluelist[j];
          }

          console.log(missing + " / " + blueword);
          if (missing == blueword) {
            possible.push(data[i]);
          }
        }
        for (item of possible) {
          var here = document.getElementById("search-board");
          var possible_item = document.createElement("div");
          var img = document.createElement("img");
          var title = document.createElement("span");
          title.classList.add("span-search");
          title.innerHTML = item.title;
          console.log(title.innerHTML);
          img.src = "images/products/" + item.filename;
          img.classList.add("search-item-img");
          possible_item.classList.add("possible");
          possible_item.appendChild(img);
          possible_item.appendChild(title);
          here.appendChild(possible_item);
          here.style.padding = "10px 0";
        }
      }
    };
    search.send();
  }
  document.getElementById("search-board").innerHTML = "";
  document.getElementById("search-board").style.padding = "0";
});

function filter(type) {
  var k = 0;
  var typeFiltred = [];
  document.getElementById("market").innerHTML = "";
  xhr = new XMLHttpRequest();
  xhr.open("GET", "products.json", true);
  xhr.onload = function () {
    let dataJSON = this.response;
    let data = JSON.parse(dataJSON);
    if (xhr.status == 200) {
      for (i of data) {
        if (i.type == type) {
          var shelf = document.createElement("div");
          shelf.classList.add("shelf");
          var item = document.createElement("div");
          item.classList.add("item");
          var img_container = document.createElement("div");
          img_container.classList.add("img-container");
          var img = document.createElement("img");
          img_container.appendChild(img);
          item.appendChild(img_container);
          var description = document.createElement("div");
          description.classList.add("description");
          var h5 = document.createElement("h5");
          var price = document.createElement("span");
          price.classList.add("price");
          var digital_price = document.createElement("span");
          digital_price.classList.add("digitalprice");
          price.appendChild(digital_price);
          var p = document.createElement("p");
          p.id = "lorem";
          description.appendChild(h5);
          description.appendChild(price);
          description.appendChild(digital_price);
          description.appendChild(p);
          item.appendChild(description);
          var interactive = document.createElement("div");
          interactive.classList.add("interactive");
          var ajouter = document.createElement("input");
          ajouter.classList.add("ajouter");
          ajouter.type = "button";
          ajouter.value = "AJOUTER";
          item.appendChild(description);
          item.appendChild(interactive);
          item.appendChild(ajouter);
          shelf.appendChild(item);
          img.src = "images/products/" + i.filename;
          h5.innerHTML = i.title;
          price.innerHTML = i.price + " MAD/Kg";
          p.innerHTML = i.description;
          document.getElementById("market").appendChild(shelf);
          cartAdd(k, data);
          k++;
          document.getElementById("more-btn").value = "No More";
          document.getElementById("more-btn").disabled = "true";
        }
      }
    }
  };
  xhr.send();
  window.scrollTo(0, 1280);
  title = type[0].toUpperCase() + type.slice(1);
  document.getElementById("main-title").innerHTML = title;
}
