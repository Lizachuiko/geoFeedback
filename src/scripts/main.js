
jQuery( document ).ready(function(){
	if( 'devicePixelRatio' in window && window.devicePixelRatio > 1 ){
	  var img_to_replace = jQuery( '#static-page-content img' ).get();

	  for (var i=0,l=img_to_replace.length; i<l; i++) {
		var src = img_to_replace[i].src;
		src = src.replace(/\.(png|jpg|gif)+$/i, '@2x.$1');
		img_to_replace[i].src = src;
	  };
	}
  });
