/*var product = [{
    id: 1,
    img: 'https://images.unsplash.com/photo-1628253747716-0c4f5c90fdda?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'yellow shoes',
    price: 3000,
    description: 'Yellow shoes Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima quibusdam, non dolores eveniet excepturi beatae veritatis necessitatibus dicta, iste nobis quos aut voluptatum similique reiciendis. Minus,nemoomnis.Blanditiis, perferendis?',
    type: 'shoes'
}, {
    id: 2,
    img: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=2815&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'black shoes',
    price: 3500,
    description: 'Black shoes Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima quibusdam, non dolores eveniet excepturi beatae veritatis necessitatibus dicta, iste nobis quos aut voluptatum similique reiciendis. Minus,nemoomnis.Blanditiis, perferendis?',
    type: 'shoes'

}, {
    id: 3,
    img: 'https://plus.unsplash.com/premium_photo-1680859126205-1c593bb4f9e8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'white cap',
    price: 800,
    description: 'White cap Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima quibusdam, non dolores eveniet excepturi beatae veritatis necessitatibus dicta, iste nobis quos aut voluptatum similique reiciendis. Minus,nemoomnis.Blanditiis, perferendis?',
    type: 'hat'
}, {
    id: 4,
    img: 'https://images.unsplash.com/photo-1551854321-1432edd90a5c?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'red shirt',
    price: 900,
    description: 'Red shirt Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima quibusdam, non dolores eveniet excepturi beatae veritatis necessitatibus dicta, iste nobis quos aut voluptatum similique reiciendis. Minus,nemoomnis.Blanditiis, perferendis?',
    type: 'shirt'
}];*/

var product;

$(document).ready(() => {

    $.ajax({
        method: 'get',
        url: './api/getallproduct.php',
        success: function (response) {
            console.log(response)
            if (response.RespCode == 200) {

                product = response.Result;

                var html = '';
                for (let i = 0; i < product.length; i++) {
                    html += `<div onclick="openproductdetail(${i})" class="product-item ${product[i].type}">
                <img src="./img/${product[i].img}">
                <p>${product[i].name}</p>
                <p>${numberWithCommas(product[i].price)} THB</p>
            </div>`;
                }
                $("#productlist").html(html);
            }
        }, error: function (err) {
            console.log(err)
        }
    })


})

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function searchsomething(elem) {
    //console.log(elem.id)
    var value = $('#' + elem.id).val()
    console.log(value)

    var html = '';
    for (let i = 0; i < product.length; i++) {
        if (product[i].name.includes(value.toLocaleLowerCase())) {
            html += `<div onclick="openproductdetail(${i})" class="product-item ${product[i].type}">
                <img src="./img/${product[i].img}">
                <p>${product[i].name}</p>
                <p>${numberWithCommas(product[i].price)} THB</p>
                </div>`;
        }
    }

    if (html == '') {
        $("#productlist").html(`<p>Not found product<p>`);
    }
    else {
        $("#productlist").html(html);
    }
}

function searchproduct(param) {
    $(".product-item").css('display', 'none')
    if (param == 'all') {
        $(".product-item").css('display', 'block')
    }
    else {
        $("." + param).css('display', 'block')
    }
}

var productindex = 0;
function openproductdetail(index) {
    productindex = index;
    $("#modalDesc").css('display', 'flex')
    $("#mdd-img").attr('src', './img/' + product[index].img);
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text(numberWithCommas(product[index].price) + ' THB')
    $("#mdd-desc").text(product[index].description)
}

function Closemodal() {
    $(".modal").css('display', 'none')
}

var cart = [];
function addtocart() {
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if (productindex == cart[i].index) {
            cart[i].count++;
            pass = false;
        }
    }

    if (pass) {
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        //console.log(obj)
        cart.push(obj)
    }
    console.log(cart)

    Swal.fire({
        icon: 'success',
        title: 'Added ' + product[productindex].name + ' to cart.'
    })

    $("#cartcount").css('display', 'flex').text(cart.length)
}

function opencart() {
    $('#modalcart').css('display', 'flex')
    rendercart();
}

function rendercart() {
    if (cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div class="cart-row">
                <div class="cart-list">
                    <img
                        src="./img/${cart[i].img}">

                    <div class="cart-list-name">
                        <h3>${cart[i].name}</h3>
                        <p>${(numberWithCommas((cart[i].price) * (cart[i].count)))}</p>
                    </div>
                </div>
                <div class="cart-amount">
                    <p onclick="deinitems('-',${i})" class="btnc">-</p>
                    <p id="countitems${i}" >${cart[i].count}</p>
                    <p onclick="deinitems('+',${i})" class="btnc">+</p>
                </div>
            </div>`;
        }
        $("#mycart").html(html)
    }

    else {
        $("#mycart").html(`<p>Not found product list<p>`)
    }
}

function deinitems(action, index) {
    if (action == '-') {
        if (cart[index].count > 0) {
            cart[index].count--;
            $("#countitems" + index).text(cart[index].count)
        }

        if (cart[index].count <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Confirm delete?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancle'
            }).then((res => {
                if (res.isConfirmed) {
                    cart.splice(index, 1)
                    rendercart();
                    $("#cartcount").css('display', 'flex').text(cart.length)

                    if (cart.length <= 0) {
                        $("#cartcount").css('display', 'none')
                    }
                }
                else {
                    cart[index].count++;
                    $("#countitems" + index).text(cart[index].count)
                }
            }))

        }
    }

    else if (action == '+') {
        cart[index].count++;
        $("#countitems" + index).text(cart[index].count)
    }
}

function buynow() {
    $.ajax({
        method: 'post',
        url: './api/buynow.php',
        data: {
            product: cart
        }, success: function (response) {
            console.log(response)
            if (response.RespCode == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thank you',
                    html: `<p> Amount : ${response.Amount.Amount}</p>
                    <p> Shipping : ${response.Amount.Shipping}</p>
                    <p> Vat : ${response.Amount.Vat}</p>
                    <p> Netamount : ${response.Amount.Netamount}</p>
                    `
                }).then((res) => {
                    if(res.isConfirmed) {
                        cart = [];
                        Closemodal();
                        $("#cartcount").css('display','none');
                    }
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong'
                })
            }
        }, error: function (err) {
            console.log(err)
        }
    })
}