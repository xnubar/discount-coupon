var discountQuery = "https://api.discountapi.com/v2/deals";
var discountApiKey = "JxRCqzDw";

//var couponQuery = "https://api.27coupons.com/v2.0/data/search-categories?api_key=a9512be5caaf20a73d906b49846b798ced851b2aeae497fc23fb6ac022b86a0d";
var couponApiKey = "f6a567b2ec0309145538a7fc5fd12df33150c6d7ecadb043a1a1ffa963d767cf";
var couponQuery="https://campaigns.zoho.com/api/coupon/coupondetails"
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
        url: couponQuery
         
       
    }).done(function (response) {
        console.log(response)
    })

})

$(document).on("click",".product-container",function(){
    $(".modal-dialog").show();
})

$(document).on("click",".close",function(){
    $(".modal-dialog").hide();
})


function loadDiscounts(response) {
    $(".products").empty();
    for (let deal in response.deals) {

        for (let item in response.deals[deal]) {
            let itemDeal = response.deals[deal][item];
            let div = $("<div>")
            $(div).addClass("product-container");


            let a = $("<a>");
            // $(a).attr("href",itemDeal.url);
            // $(a).attr("target","_blank");

            let img = $("<img>");
            $(img).attr("src", itemDeal.image_url);
            $(a).append(img);

            let dealBadge=$("<div>")
            $(dealBadge).addClass("deal-badge");
            $(dealBadge).html((itemDeal.discount_percentage*100).toPrecision(4))


            let desc = $("<div>")
            $(desc).addClass("desc");
            $(desc).html(itemDeal.title)

            $(div).append(a);
            $(div).append(dealBadge)
            $(div).append(desc);

            $(".products").append(div);
        }
    }

}

function loadCoupons(response) {

}