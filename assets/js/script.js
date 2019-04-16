var discountQuery = "https://api.discountapi.com/v2/deals";
var discountApiKey = "JxRCqzDw";

var couponQuery = "https://api.27coupons.com/v2.0/data/search-categories";
var couponApiKey = "f6a567b2ec0309145538a7fc5fd12df33150c6d7ecadb043a1a1ffa963d767cf";

var subquery;


$(document).on("click", ".discount", function () {
    subquery = $(this).data("value");
    $.ajax({
        url: discountQuery,
        data: {
            api_key: discountApiKey,
            category_slugs: subquery
        }

    }).done(function (response) {
        loadDiscounts(response);
    })
})

$(document).on("click", ".coupon", function () {

    $.ajax({
        url: couponQuery,
        data: {
            api_key: couponApiKey
        },
        headers: '*'
    }).done(function (response) {
        console.log(response)
    })
})

function loadDiscounts(response) {
    $(".products").empty();
    for (let deal in response.deals) {

        for (let item in response.deals[deal]) {
            let itemDeal = response.deals[deal][item];
            console.log(itemDeal)
            let div = $("<div>")
            $(div).addClass("product-container");


            let a = $("<a>");

            let img = $("<img>");
            $(img).attr("src", itemDeal.image_url);
            $(a).append(img);

            let desc = $("<div>")
            $(desc).addClass("desc");
            $(desc).html(itemDeal.title)

            $(div).append(a);
            $(div).append(desc);

            $(".products").append(div);
        }

    }

}

function loadCoupons(response) {

}