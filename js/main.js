$(document).ready(function(){setTimeout(function(){$(".main-left").addClass("main-left-loaded")},1e3),$(".menu-button").click(function(){$(".main").removeClass("main-reduced-left"),$(".menu").toggleClass("open"),$(this).toggleClass("open")}),$(".main-right").fullpage({menu:".menu-list",anchors:["about","technologies","portfolio","contacts"],navigation:!0,navigationPosition:"left",continuousVertical:!0,responsiveWidth:768,scrollOverflow:!0}),$("#fp-nav").appendTo("#main-left-fp-nav"),$("#collapse-button").click(function(){$(".main").addClass("main-reduced-left")}),$("#uncollapse-button").click(function(){$(".main").removeClass("main-reduced-left")}),$(".portfolio-item-details-button").click(function(t){t.preventDefault(),$(this).parents(".portfolio-item").find(".portfolio-item-title").clone().appendTo("#modal-title"),$(this).parents(".portfolio-item").find(".portfolio-item-description").clone().appendTo("#modal-text");var e=$(this).siblings(".portfolio-item-view-button").attr("href");$("#modal-view-button").attr("href",e),$(".details-modal").addClass("details-modal-visible")}),$(".modal-close, .modal-background-overlay").click(function(){$(".details-modal").removeClass("details-modal-visible"),setTimeout(function(){$("#modal-title").empty(),$("#modal-text").empty()},500)}),screen.width<768&&$(".portfolio-item").not(":first-child, :nth-child(2), :nth-child(3)").addClass("hidden");var t=3;$("#show-more").click(function(){$(this).addClass("show-more-button-active"),t+=3,setTimeout(function(){$("#show-more").removeClass("show-more-button-active"),$(".portfolio-item:lt("+t+")").removeClass("hidden"),0==$(".portfolio-item.hidden").length&&$("#show-more").css("display","none")},500)}),screen.width>767?$(".menu-button").removeClass("menu-button-hidden"):setTimeout(function(){$(".menu-button").removeClass("menu-button-hidden")},1500),new WOW({mobile:!1}).init()});