var discountQuery = "https://api.discountapi.com/v2/deals";
var discountApiKey = "JxRCqzDw";
var subquery;


$(document).on("click", ".category", function () {
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


function loadDiscounts(response) {
    $(".products").empty();
    for (let deal in response.deals) {

        for (let item in response.deals[deal]) {
            let  itemDeal=response.deals[deal][item];
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