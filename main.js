function showproductwindow(element) {
    var category = document.querySelector("h1").innerHTML;
    var ShoppingCart = localStorage.getItem("ShoppingCart" + category);
    var ShoppingCartObject = JSON.parse(ShoppingCart);
    var showWindow = true;

    for(var k in ShoppingCartObject) {
        if (ShoppingCartObject[k].title == element.name) {
            alert("Das Produkt befindet sich bereits im Warenkorb!");
            showWindow = false;
            break;
        }
    }
    
    if (showWindow == true) {
        document.querySelector(".productwindowbackground").classList.add("showproductwindowbackround");
        document.querySelector(".productwindowbackground .productwindow .producttitleBar .producttitle").innerHTML = element.name;
    }
 
}

function closeproductwindow() {
    document.querySelector(".productwindowbackground").classList.remove("showproductwindowbackround");
    document.querySelector(".productwindowbackground .productwindow .productfooter .numberdisplay").innerHTML = "0";
    
    var units;
    units = document.querySelectorAll(".productwindowbackground .productwindow .productinput .unitlist a");
    for (let i = 0; i < units.length; i++) {
        units[i].style.backgroundColor = "";

    }
}
                                    
function typenumberblock(wert) {
    var currentnumber;
    currentnumber = document.querySelector(".productwindowbackground .productwindow .productfooter .numberdisplay").innerHTML;
    
    if (currentnumber == "0") {
        document.querySelector(".productwindowbackground .productwindow .productfooter .numberdisplay").innerHTML = wert;
    
    } else {
        if (currentnumber.length < 10) {
            document.querySelector(".productwindowbackground .productwindow .productfooter .numberdisplay").innerHTML += wert;
        }
    }

}

function deletelastnumber() {
    var currentnumber;
    currentnumber = document.querySelector(".productwindowbackground .productwindow .productfooter .numberdisplay").innerHTML;
    
    if (currentnumber.length == 1) {
        document.querySelector(".productwindowbackground .productwindow .productfooter .numberdisplay").innerHTML = "0";

    } else {
        currentnumber = currentnumber.substring(0, currentnumber.length-1);
        document.querySelector(".productwindowbackground .productwindow .productfooter .numberdisplay").innerHTML = currentnumber;
    }
}

function selectunit(element) {
    var units;
    var unitvalue;
    var unitvalueplural;

    units = document.querySelectorAll(".productwindowbackground .productwindow .productinput .unitlist a");
    unitvalue = document.querySelector(".productwindowbackground .productwindow .unitvalue");
    unitvalueplural = document.querySelector(".productwindowbackground .productwindow .unitvalueplural");

    for (let i = 0; i < units.length; i++) {
        units[i].style.backgroundColor = "";

    }
    element.style.backgroundColor = "var(--bg-header)";
    unitvalue.innerHTML = element.innerHTML;
    unitvalueplural.innerHTML = element.getAttribute("name");
    
}

function addProductToShoppingcart() {
    var displaynumber;
    var unitvalue;
    var producttitle;
    var category;
    var unitvalueplural;

    displaynumber = document.querySelector(".productwindowbackground .productwindow .productfooter .numberdisplay").innerHTML;
    if (displaynumber == "0") {
        alert("Gebe die Menge ein!");
    }
    
    unitvalue = document.querySelector(".productwindowbackground .productwindow .unitvalue").innerHTML;
    if (unitvalue == "") {
        alert(unescape("W%E4hle die Einheit aus!"));
    }
    
    producttitle = document.querySelector(".productwindowbackground .productwindow .producttitleBar .producttitle").innerHTML;
    category = document.querySelector("h1").innerHTML;

    if (displaynumber != "0" && unitvalue != "") {
        unitvalueplural = document.querySelector(".productwindowbackground .productwindow .unitvalueplural").innerHTML;
        if (displaynumber == "1") {
            AddProductToShoppingCart(category, producttitle, displaynumber, unitvalue);
        } else {
            AddProductToShoppingCart(category, producttitle, displaynumber, unitvalueplural);
        }
        
        closeproductwindow();
    }

}

function CreateShoppingCart(category) {
    var ShoppingCart = localStorage.getItem("ShoppingCart" + category);
    if (ShoppingCart == "" || ShoppingCart == null) {
        localStorage.setItem("ShoppingCart" + category, "[]");
    }
    
}

function AddProductToShoppingCart(category, title, number, unit) {
    var ShoppingCart = localStorage.getItem("ShoppingCart" + category);
    var ShoppingCartObject = JSON.parse(ShoppingCart);

    ShoppingCartObject.push({"title":"" + title + "", "number":"" + number + "", "unit":"" + unit + ""});
    localStorage.setItem("ShoppingCart" + category, JSON.stringify(ShoppingCartObject));

    showShoppingcartProductTotal();
}

function getShoppingcartProductTotal() {
    var amount = 0;

    for(var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];

        if (value != "[]") {
            amount++;
        }
    }

    return amount;
}

function showShoppingcartProductTotal() {
    var totalElement = document.getElementById('shoppingCartProductTotal');
    var amount = getShoppingcartProductTotal();

    if(totalElement) {
        if (amount == 0) {
            totalElement.innerHTML = '';
            totalElement.classList.remove('number');
        } else {
            totalElement.innerHTML = amount;
            totalElement.classList.add('number');
        }
    }
   
}


function DeleteProductFromShoppingCart(category, title, number, unit) {
    var ShoppingCart = localStorage.getItem("ShoppingCart" + category);
    var ShoppingCartObject = JSON.parse(ShoppingCart);
    
    for(var k in ShoppingCartObject) {
        if (ShoppingCartObject[k].title == title && ShoppingCartObject[k].number == number && ShoppingCartObject[k].unit == unit) {
            ShoppingCartObject.splice(k, 1);
            break;
        }
    }
    
    localStorage.setItem("ShoppingCart" + category, JSON.stringify(ShoppingCartObject));
    
    document.querySelector(".shoppingcartList").innerHTML = "";
    insertShoppingcartProducts('Verduras');
    insertShoppingcartProducts('Mercadona');
    insertShoppingcartProducts('Eroski');
    insertShoppingcartProducts('Hierbas');
    insertShoppingcartProducts('Cash Lotto');
    insertShoppingcartProducts('Chico');
    insertShoppingcartProducts('Calimax');
    insertShoppingcartProducts('Ibifood');
    insertShoppingcartProducts('Montiel');
    insertShoppingcartProducts('Menorquina');
    insertShoppingcartProducts('Maripol');

    showShoppingcartProductTotal();
}

function ChangeProductShoppingCart(Category, Title, Number, Unit) {
    document.querySelector(".productwindowbackground").classList.add("showproductwindowbackround");
    document.querySelector(".productwindowbackground .productwindow .producttitleBar .producttitle").innerHTML = Title;
    document.querySelector(".productwindowbackground .productwindow .productfooter .shoppingcartbutton").setAttribute("onClick", "overwriteProductShoppingcart('" + Category + "','" + Title + "', '" + Number + "','" + Unit + "')");

}

function overwriteProductShoppingcart(category, title, number, unit) {
    var displaynumber;
    var unitvalue;
    var ShoppingCart = localStorage.getItem("ShoppingCart" + category);
    var ShoppingCartObject = JSON.parse(ShoppingCart);
    var unitvalueplural;

    displaynumber = document.querySelector(".productwindowbackground .productwindow .productfooter .numberdisplay").innerHTML;
    if (displaynumber == "0") {
        alert("Gebe die Menge ein!");
    }
    
    unitvalue = document.querySelector(".productwindowbackground .productwindow .unitvalue").innerHTML;
    if (unitvalue == "") {
        alert(unescape("W%E4hle die Einheit aus!"));
    }
    
    if (displaynumber != "0" && unitvalue != "") {
        unitvalueplural = document.querySelector(".productwindowbackground .productwindow .unitvalueplural").innerHTML;
        if (displaynumber == "1") {
            for(var k in ShoppingCartObject) {
                if (ShoppingCartObject[k].title == title && ShoppingCartObject[k].number == number && ShoppingCartObject[k].unit == unit) {
                    ShoppingCartObject[k].number = displaynumber;
                    ShoppingCartObject[k].unit = unitvalue;
                    break;
                }
            }
        } else {
            for(var k in ShoppingCartObject) {
                if (ShoppingCartObject[k].title == title && ShoppingCartObject[k].number == number && ShoppingCartObject[k].unit == unit) {
                    ShoppingCartObject[k].number = displaynumber;
                    ShoppingCartObject[k].unit = unitvalueplural;
                    break;
                }
            }
        }
        
        localStorage.setItem("ShoppingCart" + category, JSON.stringify(ShoppingCartObject));
        closeproductwindow();
        document.querySelector(".shoppingcartList").innerHTML = "";
        insertShoppingcartProducts('Verduras');
        insertShoppingcartProducts('Mercadona');
        insertShoppingcartProducts('Eroski');
        insertShoppingcartProducts('Hierbas');
        insertShoppingcartProducts('Cash Lotto');
        insertShoppingcartProducts('Chico');
        insertShoppingcartProducts('Calimax');
        insertShoppingcartProducts('Ibifood');
        insertShoppingcartProducts('Montiel');
        insertShoppingcartProducts('Menorquina');
        insertShoppingcartProducts('Maripol');
    }
    
}

function insertShoppingcartProducts(category) {
    var shoppingcartList;
    var ShoppingCart = localStorage.getItem("ShoppingCart" + category);
    var ShoppingCartObject = JSON.parse(ShoppingCart);
    var ShoppingcartTable = "";
    var whatsAppText_ES = "";
    var currentDateTime = new Date();
    var sellername;
    var sellertelephonenumber;
    var url = "";

    if (category == "Verduras" || category == "Mercadona"|| category == "Eroski" || category == "Cash Lotto" || category == "Hierbas") {
        sellername = "Ria";
        sellertelephonenumber = "+34609667979";
    } else if (category == "Chico") {
        sellername = "Guti";
        sellertelephonenumber = "+34626477300";
    } else if (category == "Calimax") {
        sellername = "Frederico";
        sellertelephonenumber = "+34673561370";
    } else if (category == "Ibifood") {
        sellername = "Javier";
        sellertelephonenumber = "+34607488614";
    } else if (category == "Maripol") {
        sellername = "Jose";
        sellertelephonenumber = "+34637310296";
    } else if (category == "Montiel") {
        sellername = "Isidoro";
        sellertelephonenumber = "+34637800567";
    } else if (category == "Menorquina") {
        sellername = "Andres";
        sellertelephonenumber = "+34646311420";
    }

    
    if (sellername != "Ria") {
        whatsAppText_ES += "Hola " + sellername + ",\npara ";
    }

    if (category == "Maripol") {
        whatsAppText_ES += "jueves ";
    } else {
        if (sellername != "Ria") {
            if (currentDateTime.getDay() == 1) {
                whatsAppText_ES += "miércoles ";
            } else {
                if (sellername != "Ria") {
                    whatsAppText_ES += "mañana ";
                }
            }
        }
    }

    if (sellername != "Ria") {
        whatsAppText_ES += "necesito:";
    }
    

    if(ShoppingCart != "[]") {
        ShoppingcartTable += "<div class=\"shoppingCartListItem\">"
        ShoppingcartTable += "<h4>" + category + "</h4>";
        ShoppingcartTable += "<table border=\"1\" width=\"100%\" align=\"center\">";
        
        for(var k in ShoppingCartObject) {
            ShoppingcartTable += "<tr style=\"color: white;\">";
            ShoppingcartTable += "<td width=\"50%\" style=\"text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;\">" + ShoppingCartObject[k].title + "</td>";
            ShoppingcartTable += "<td style=\"text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;\">" + ShoppingCartObject[k].number + " " + ShoppingCartObject[k].unit + "</td>";
            ShoppingcartTable += "<td>";
            ShoppingcartTable += "<img onClick=\"ChangeProductShoppingCart('" + category + "','" + ShoppingCartObject[k].title + "', '" + ShoppingCartObject[k].number + "', '" +  ShoppingCartObject[k].unit + "')\" src=\"Images/editbutton.png\">";
            ShoppingcartTable += "<img onClick=\"DeleteProductFromShoppingCart('" + category + "', '" + ShoppingCartObject[k].title + "', '" + ShoppingCartObject[k].number + "', '" + ShoppingCartObject[k].unit + "')\" src=\"Images/deletebutton.png\">";
            ShoppingcartTable += "</td>";
            ShoppingcartTable += "</tr>";

            whatsAppText_ES += "\n• " + ShoppingCartObject[k].number + " " + ShoppingCartObject[k].unit + " " + ShoppingCartObject[k].title;
        }
        
        ShoppingcartTable += "</table>";   
        
        if (sellername == "Ria") {
            
        } else {
            whatsAppText_ES += "\nGracias Denise"; 
        }

        url = "https://api.whatsapp.com/send/?phone=" + sellertelephonenumber + "&text=" + encodeURI(whatsAppText_ES) + "&app_absent=0";
        ShoppingcartTable += "<div class=\"whatsapp\"><a onClick=\"SendWhatsAppText('" + url + "', '" + category + "')\"><img src=\"Images/whatsappicon.png\"></a></div>";
        
        ShoppingcartTable += "</div>"


        shoppingcartList = document.querySelector(".shoppingcartList");
        shoppingcartList.innerHTML += ShoppingcartTable;
    }
}

function SendWhatsAppText(url, deletecategory) {
    localStorage.setItem("ShoppingCart" + deletecategory, "[]");
    document.querySelector(".shoppingcartList").innerHTML = "";
    insertShoppingcartProducts('Verduras');
    insertShoppingcartProducts('Mercadona');
    insertShoppingcartProducts('Eroski');
    insertShoppingcartProducts('Hierbas');
    insertShoppingcartProducts('Cash Lotto');
    insertShoppingcartProducts('Chico');
    insertShoppingcartProducts('Calimax');
    insertShoppingcartProducts('Ibifood');
    insertShoppingcartProducts('Montiel');
    insertShoppingcartProducts('Menorquina');
    insertShoppingcartProducts('Maripol');
    window.location = url;

    showShoppingcartProductTotal();

}

function insertProductWindowHTML() {
    var productWindowHTML = "";

    productWindowHTML +=    "<div class=\"productwindow\">";
    productWindowHTML +=        "<div class=\"producttitleBar\">";
    productWindowHTML +=            "<div class=\"producttitle\"></div>";
    productWindowHTML +=            "<div class=\"closebutton\" onclick=\"closeproductwindow()\">x</div>";
    productWindowHTML +=        "</div>";
    productWindowHTML +=        "<div class=\"productinput\">";
    productWindowHTML +=            "<div class=\"numberblock\">";
    productWindowHTML +=                "<a onclick=\"typenumberblock('1')\">1</a>";
    productWindowHTML +=                "<a onclick=\"typenumberblock('2')\">2</a>";
    productWindowHTML +=                "<a onclick=\"typenumberblock('3')\">3</a>";
    productWindowHTML +=                "<a onclick=\"typenumberblock('4')\">4</a>";
    productWindowHTML +=                "<a onclick=\"typenumberblock('5')\">5</a>";
    productWindowHTML +=                "<a onclick=\"typenumberblock('6')\">6</a>";
    productWindowHTML +=                "<a onclick=\"typenumberblock('7')\">7</a>";
    productWindowHTML +=                "<a onclick=\"typenumberblock('8')\">8</a>";
    productWindowHTML +=                "<a onclick=\"typenumberblock('9')\">9</a>";
    productWindowHTML +=                "<a></a>";
    productWindowHTML +=                "<a onclick=\"typenumberblock('0')\">0</a>";
    productWindowHTML +=                "<a onclick=\"deletelastnumber()\">&larr;</a>";
    productWindowHTML +=           "</div>";
    productWindowHTML +=            "<div class=\"unitlist\">";
    productWindowHTML +=                "<a onclick=\"selectunit(this)\" name=\"cajas\">caja</a>";
    productWindowHTML +=                "<a onclick=\"selectunit(this)\" name=\"unidades\">unidad</a>";
    productWindowHTML +=                "<a onclick=\"selectunit(this)\" name=\"bolsas\">bolsa</a>";
    productWindowHTML +=                "<a onclick=\"selectunit(this)\" name=\"cubos\">cubo</a>";
    productWindowHTML +=                "<a onclick=\"selectunit(this)\" name=\"kg\">kg</a>";
    productWindowHTML +=                "<a onclick=\"selectunit(this)\" name=\"sacos\">saco</a>";
    productWindowHTML +=                "<a onclick=\"selectunit(this)\" name=\"bandejas\">bandeja</a>";
    productWindowHTML +=                "<a onclick=\"selectunit(this)\" name=\"botellas\">botella</a>";
    productWindowHTML +=                "<a onclick=\"selectunit(this)\" name=\"manojos\">manojo</a>";
    productWindowHTML +=                "<a onclick=\"selectunit(this)\" name=\"paquete\">paquete</a>";
    productWindowHTML +=            "</div>";
    productWindowHTML +=        "</div>";
    productWindowHTML +=        "<div class=\"productfooter\">";
    productWindowHTML +=            "<div class=\"numberdisplay\">0</div>";
    productWindowHTML +=            "<div onclick=\"addProductToShoppingcart()\" class=\"shoppingcartbutton\">Warenkorb</div>";
    productWindowHTML +=        "</div>";
    productWindowHTML +=        "<div class=\"unitvalue\"></div>";
    productWindowHTML +=        "<div class=\"unitvalueplural\"></div>";
    productWindowHTML +=    "</div>";

    document.querySelector(".productwindowbackground").innerHTML = productWindowHTML;
}

function RepairAllLinks() {
    var links;

    links = document.querySelectorAll("a");

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', event => {
            if (links[i].getAttribute("href") != "" && links[i].getAttribute("href") != null) {
                event.preventDefault();
                window.location = links[i].getAttribute("href");
            }
            
        })
    }

}

function disableScrollForProductWindowBackground() {
    var productwindowbackground;

    productwindowbackground = document.querySelector(".productwindowbackground");
    productwindowbackground.addEventListener('mousewheel', event => {
        event.stopPropagation();
        event.preventDefault();
    })
    productwindowbackground.addEventListener('touchmove', event => {
        event.stopPropagation();
        event.preventDefault();
    })


}

document.addEventListener('DOMContentLoaded', () => {
    insertProductWindowHTML();
    RepairAllLinks();
    disableScrollForProductWindowBackground();
    showShoppingcartProductTotal();
});

CreateShoppingCart("Verduras");
CreateShoppingCart('Mercadona');
CreateShoppingCart("Calimax");
CreateShoppingCart("Chico");
CreateShoppingCart("Eroski");
CreateShoppingCart("Hierbas");
CreateShoppingCart("Cash Lotto");
CreateShoppingCart("Ibifood");
CreateShoppingCart("Maripol");
CreateShoppingCart("Menorquina");
CreateShoppingCart("Montiel");

