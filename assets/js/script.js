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


/*

    <div class="owl-item active" style="width: 201.667px; margin-right: 20px;">
                                        <div class="item deal-item">
                                           
                                            <div class="deal-content">
                                            
                                                <div class="deal-content-bottom">
                                                    <p><i class="fa fa-clock-o"></i> 0 days, 0h Remaining</p>
                                                    <a type="button" data-toggle="modal" data-target="#coupon-code"
                                                        class="btn btn-sm">Get It</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



*/

function loadDiscounts(response) {
    console.log(response)
    $(".products").empty();
    for (let deal in response.deals) {

        for (let item in response.deals[deal]) {
            let itemDeal = response.deals[deal][item];

            let owlItem = $("<div>")
            $(owlItem).addClass("owl-item");
            $(owlItem).addClass("product-container");

            let dealItem=$("<div>");
            $(dealItem).addClass("item");
            $(dealItem).addClass("deal-item");


            let dealThumb=$("<div>");
            $(dealThumb).addClass("deal-thumb");

            let img=$("<img>");
            $(img).addClass("img-responsive");
            $(img).attr("src",itemDeal.image_url);

            let badge=$("<div>");
            $(badge).addClass("deal-badge");
            $(badge).html((itemDeal.discount_percentage*100).toPrecision(4)+"%");
            
            $(dealThumb).append(img);
            $(dealThumb).append(badge);           
            
            let dealContent=$("<div>");
            $(dealContent).addClass("deal-content");

            let p=$("<p>");
            $(p).html(itemDeal.title);            
            $(dealContent).append(p)

            let dealContentBottom=$("<div>");
            $(dealContentBottom).addClass("deal-content-bottom");
            $(dealContent).append(dealContentBottom)

            let date=new Date(itemDeal.expires_at);
            let expireDate=$("<p>");
            $(expireDate).addClass("expire-date");
          
            let i=$("<i>");
            $(i).addClass("fa fa-clock-o");
            $(expireDate).append(i);
            $(expireDate).append(" <span>"+date.getDate()+'/'+date.getMonth()+1+'/'+date.getFullYear()+"</span>")

            $(dealContentBottom).append(expireDate);

            let a=$("<a>");
            $(a).attr("type","button");
            $(a).data("toggle","modal");
            $(a).data("target","#coupon_code");
            $(a).addClass("btn");
            $(a).addClass("btn-sm");
            $(a).html("Get it");
            $(dealContentBottom).append(a);

            
            $(dealItem).append(dealThumb);
            $(dealItem).append(dealContent);

            $(owlItem).append(dealItem);

            $(".products").append(owlItem);      
        }
    }

}

function loadCoupons(response) {

}