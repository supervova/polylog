$(document).on('click','.blog__more-btn', function(){
	const cat = parseInt($(this).attr('data-cat'))
	const page = parseInt($(this).attr('data-page'))

	$.ajax({
		type : "GET",
		dataType : "JSON",
		url : loadmore_ajax.url,
		beforeSend: function(){
			$('.blog__more').addClass('loading')
		},
		data : { action: "load_more", nonce: loadmore_ajax.nonce, cat: cat, page: page },
		success: function(response,textStatus) {
			$.each(response.posts, function(i, post) {
				let column = '';
			    if ( i < 2 ) {
			    	column = '.card-block__list:eq(0)'
			    } else if ( i < 4 ) {
			    	column = '.card-block__list:eq(1)'
			    } else {
					column = '.card-block__list:eq(2)'
			    }
		    	$(column).append(post)
			});
			if ( !response.next ) {
				$('.blog__more').remove()
			} else {
				$('.blog__more-btn').attr('data-page',page + 1)
			}
			$('.blog__more').removeClass('loading')
		}
	})
})