// Use Foundation's styles
$(document).foundation();
                                 
// Run when DOM is ready
$(document).ready(function (){
    /**
    *  ----------------------------------------
    *  AJAX retreive data
    */
    $('.ajaxdata').each(function(i){
            var ajaxdata = $(this);
            var url = $(this).attr('data-url');
            if (url != null) {
                 $.ajax({
                        dataType:     "html",
                        url: window.location.origin + url,
                        success: function(results){
                                // console.log(results);
                                ajaxdata.html(results); 
                                
                                // Events Page - Catalogue part
                                 $('.postajax.catalogue-expandable').click(function(e){
                                    $(this).next().toggle();
                                    $(this).toggleClass('selectedHeaderBg');
                                    $(this).find('h3').toggleClass('selectedHeaderText');
                                    $(this).find('.icon-catalogue-right').toggleClass('rotate');
                                });

                                 $('.right-expandable').click(function(e){
                                    $(this).parents('.expandable').find('.expanded').toggle();
                                    $(this).toggleClass('selectedHeaderBg');
                                    $(this).find('h3').toggleClass('selectedHeaderText');
                                    $(this).find('.icon-schedule-right').toggleClass('rotate');
                                });
                            },
                        error: function(results){
                                console.log(results);
                                event.preventDefault();
                        }
                 });
            }
    });

    /**
    *  ----------------------------------------
    *  Profile edit / Terms
    */
                            /* remove, as using abide validation, but dont delete this */
                            /*
                            $('form.editprofile input[type=email]').on('change', function(e) {
                        	$('label[for=profile-email] span.form-error').remove();
                        	emailValidate($(this).val(), 'form.editprofile label[for=profile-email]');
                            });  */
    if (typeof select2 == "function")
    {
    	$("#country").select2();
    	$("#nearestCity").select2({
    		minimumInputLength: 3,
    		initSelection : function (element, callback) {
    			var data = {id: element.val(), text: $('#nearestCityName').val()};
    			callback(data);
    		},
    		query: function(query) {
    			$.ajax({
    				url: '/search/cities/' + query.term + '/' + $('#country').val(),
    				dataType: 'json',
    				type: 'GET',
    				success: function(data) {
    					query.callback({
    						results: data
    					});
    				}
    			})
    		}
    	});
    }
    // terms checkbox validation
    var editProfileFormCheckbox = $('form.editprofile label[for=accept_terms] span.checkbox');
    var editProfileFormCheckboxErr = $('label[for=accept_terms] span.form-error');
    $('form.editprofile').on('submit', function(e) {
        if ( !editProfileFormCheckbox.hasClass('checked') ) {
            $('label[for=accept_terms] span.form-error').remove();
            $('label[for=accept_terms]').prepend('<span class="form-error" style="color:#c12336;display:block;">Please accept the terms of service</span>');
        }
    });
    $(editProfileFormCheckbox).on('click',function(e) {
        if ( !editProfileFormCheckbox.hasClass('checked') ) {
            $('label[for=accept_terms] span.form-error').remove();
        } else {
            $('label[for=accept_terms]').prepend('<span class="form-error" style="color:#c12336;display:block;">Please accept the terms of service</span>');
        }
    });

   /**
    *  ----------------------------------------
    *  Form Email validation 
    *  Don't delete this email validate function
    */
    function emailValidate(val,showErrorHere){
        if ( !(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(val) )
            ) {
                    $(showErrorHere).append('<span class="form-error" style="color:#c12336;">Invalid email address</span>');
                }
    } // function emailvalidate

    // newsletter form
    $('form#mailinglist_form input[type=email]').on('change', function(e) {
        $('label[for=newsletter-email] span.form-error').remove();
        emailValidate($(this).val(), 'form#mailinglist_form label[for=newsletter-email]');
    });
    

    /**
    *  ----------------------------------------
    *  Sidebar menu expand/collapse functionality
    */
    $("ul.sidebar-items a.expandcollapse").click( function(event) {

        event.preventDefault();

        if( $(this).find("i").hasClass('fa-angle-down') == true )
        {
            // Close
            //console.log("close");
            $(this).closest("ul").removeClass('itemsExpanded');
            $(this).closest("li").children("ul").slideToggle();
            $(this).find("i").removeClass("fa-angle-down").addClass("fa-angle-right");
        } else {
            // Open
            //console.log("open");
            $(this).closest("ul").addClass('itemsExpanded');
            $(this).closest("li").children("ul").slideToggle();
            $(this).find("i").removeClass("fa-angle-right").addClass("fa-angle-down");
        }
    });

    /**
    * Go through each li element in the sidebar and check if it
    * has any children li elements. If not, remove the arrow.
    * This is needed if you have a single child entry under a parent entry, but the child entry is closed. 
    * Without this, the parent entry would have an arrow but no visible child entries.
    */
    $("ul.sidebar-items li").each(function(){
        if($(this).find("li").length == 0)
        {
            $(this).find("a.expandcollapse").remove();
        }
    });

    /**
    * All sorts of transvering to
    * 1. show all links above and below the active link, within the current section
    */
    $("ul.sidebar-items").find("li.active").parents("ul").show();
    $("ul.sidebar-items").find("li.active").children("ul").show();
    $("ul.sidebar-items").find("li.active").children("div").children("a.expandcollapse").children("i").removeClass("fa-angle-right").addClass("fa-angle-down");
    

    /**
    *  ----------------------------------------
    *  Sidebar - filtering displayed content
    *  ----------------------------------------
    */
    $(function(){
        var links = $('.sub-nav dd a');
        var filter_crit = $('.sub-nav dd a.filter');
        var show_all = $('.sub-nav dd a.show_all');
        var divs = $('.items div.feed-item');
        $('a.show_all').parent().addClass('active');

        // Add/remove .active class to highlight dd
        links.click(function(event){
            $('.active').removeClass('active');
            $(this).parent().addClass('active');
        });

        // Filter divs based on id
        filter_crit.click(function(event){
           divs.hide();
           divs.filter('.' + event.target.id).show();
        });

        // Show all feed items
        show_all.click(function(event){
            divs.show();
        });
    });


    /**
    *  ----------------------------------------
    *  Devices landing page - reveal/hide modal
    *  ----------------------------------------
    */
    $('.device, .reveal').click(function(){
        $(this).find('.reveal-modal').foundation('reveal', 'open');
    });
    //  -----------------------------------------------


    /**
    *  ----------------------------------------
    *  Generic details expand/collapse functionality
    *  ----------------------------------------
    */
    $(function(){
        // One panel
        $('.nokia-expandable section .title').click(function(e){
            $(this).parent('section').toggleClass('active');
            $(this).toggleClass('exp');
        });

        // All panels
        $('#expandAll').click(function(e){
            $('.nokia-expandable section').addClass("active");
            $('.nokia-expandable section .title').addClass('exp');
        });
        $('#collapseAll').click(function(e){
            $(".nokia-expandable section").removeClass("active");
            $('.nokia-expandable section .title').removeClass('exp');
        });
    });
    //  -----------------------------------------------



    /**
    *  ----------------------------------------
    *  Downloads landing page - search
    *  ----------------------------------------
    */
    $(function(){
        $('.downloads select#dl_type, .downloads select#dl_platform').change(function(){
            var url = '/resources/downloads/search';
            if ($('.downloads select#dl_type').length > 0 && $('.downloads select#dl_type').val() != '')
            {
                url = url + '&cf_download_type=' + $('.downloads select#dl_type').val();
            }
            if ($('.downloads select#dl_platform').length > 0 && $('.downloads select#dl_platform').val() != '')
            {
                url = url + '&category=' + $('.downloads select#dl_platform').val();
            }
            window.location.href    = url;
        });
    });


    /**
    *  ----------------------------------------
    *  Downloads detail page - eula
    *  ----------------------------------------
    */
    $(function(){
        $('.downloads form#dl_eula_form').submit(function(){
            $('.downloads input#dl_accept_eula').closest('label').removeClass('error');
            $('.downloads #dl_eula_error').hide();
            if ($('.downloads input#dl_accept_eula:checked').length == 0){
                $('.downloads input#dl_accept_eula').closest('label').addClass('error');
                $('.downloads #dl_eula_error').show();
                return false;
            }
        });
    });
    

    /**
    *  ----------------------------------------
    *  DEVICE  LANDING PAGE 
    *  ----------------------------------------
    */
    $(function(){
		$("form#devicefilter select#customDropdown1").change(function() {
			var url = '/devices/searchresults/search';
			if ($(this).val() != '')
			{
				url = url + '&keywords=' + $(this).val();
			
				if ($("form#devicefilter input[name='search_in']").length > 0 && $("form#devicefilter input[name='search_in']").val() != '')
				{
					url = url + '&search_in=' + $("form#devicefilter input[name='search_in']").val();
				}
			}
			window.location.href    = url;
		});
    });
    

	/**
    *  ----------------------------------------
    *  RESOURCE PAGES
    *  ----------------------------------------
    */
    $(function(){
		$('form#resourcefilter select#platform, form#resourcefilter select#downloadlevel').change(function() {
			var url = $.trim($('form#resourcefilter').attr('action'));
			if (url.indexOf("/search&") != -1){
				url = url.substring(0, url.indexOf("/search&"));
			}
			url	= url + '/search';
            if ($('form#resourcefilter select#platform').length > 0 && $('form#resourcefilter select#platform').val() != '')
            {
                url = url + '&category=' + $('form#resourcefilter select#platform').val();
            }
            if ($('form#resourcefilter select#downloadlevel').length > 0 && $('form#resourcefilter select#downloadlevel').val() != '')
            {
            	var name = $('form#resourcefilter select#downloadlevel').attr('name');
                url = url + '&' + name + '=' + $('form#resourcefilter select#downloadlevel').val();
            }
			window.location.href    = url;
		});
    });
    

    /**
    *  ----------------------------------------
    *  The submit buttonless form
    *  ----------------------------------------
    */
    $("form.searchform select").change(function (event) {
        $(this).closest("form").submit();
    });


    /**
    *  ----------------------------------------
    *  Events & webinars expand/collapse functionality
    *  ----------------------------------------
    */
    $(function(){
        // Top schedule part
        $('.right-expandable').click(function(e){
            $(this).parents('.expandable').find('.expanded').toggle();
            $(this).toggleClass('selectedHeaderBg');
            $(this).find('h3').toggleClass('selectedHeaderText');
            $(this).find('.icon-schedule-right').toggleClass('rotate');
        });

        // Catalogue part
         $('.catalogue-expandable').click(function(e){
            $(this).next().toggle();
            $(this).toggleClass('selectedHeaderBg');
            $(this).find('h3').toggleClass('selectedHeaderText');
            $(this).find('.icon-catalogue-right').toggleClass('rotate');
        });
    });
    //  -----------------------------------------------



  /**
    *  ----------------------------------------
    *  SEARCH
    */
    $(function(){
        $('#search-form').on('submit', function(e){ 
            e.preventDefault();
            var url = '/search/results' + '/search&channel=web' + '&limit=20';
            var inputsearch = $('#search-form input#search');
            var category = $('#search-form input:checked.search-category');
            
            if (/^[%]*$/.test(inputsearch.val()) ) { 
                $('#search-form span.form-error').remove();
                $('#search-form').append('<span class="form-error" style="color:#c12336;">Please type in keywords</span>');
                return false;
            }

            if (inputsearch.length > 0 && inputsearch.val() != '') {
                var keywords = inputsearch.val().replace(/ /g, '+');
                keywords =  keywords.replace(/%/g, '');
                if ( category.val() == '' ) category = 'all';
                url = url + '&keywords=' + keywords + '&category=' + category.val()  + '/';
            }
            window.location.href = url;
        });
    });

                                            
  /**
    *  ----------------------------------------
    *  items from footer (Dec. 11, 2013)
    *  ----------------------------------------
    */
    $('.accmenu li:first').addClass('active');
    $(".accmenu li").hover(function(){
        $(this).addClass('active');
        $('.accmenu li').not(this).removeClass('active');
        $(this).animate({width: "360px"}, {duration:200});
        $('.accmenu li').not(this).animate({width: "144px"}, {duration:200});
    });

    $('.gallery ul').foundation('orbit');
    $('.greygallery ul').foundation('orbit');

    $(document).foundation('orbit', {
      timer_speed: 3500,
      animation_speed: 500,
      pause_on_hover: true,
      resume_on_mouseout: true,
      navigation_arrows: false,
      slide_number: false,
      bullets_container_class: 'orbit-bullets',
      bullets_active_class: 'active',
      variable_height:false,
      bullets: true,
      timer: false
    });
    //  -----------------------------------------------


    /**
    *  ----------------------------------------
    *  XID refresh
    *  Fetches a fresh XID when interacting with a form
    *  ----------------------------------------
    */
   $("form").on('click', function (){

        theForm = $(this);

        // Check if the form has an XID.
        // Also check if the XID is already fresh, 
        // to avoid unnecessary ajax calls

        if(theForm.find("input[name=XID]").length > 0 && theForm.find("input[name=XID]").attr("data-fresh_xid") === undefined)
        {
            $.ajax({
                        type:     "GET",
                        url: window.location.origin + '/?ACT=69&which=fetch_xid',
                        success: function(results){
                                //console.log(results);
                                theForm.find("input[name=XID]").val(results).attr("data-fresh_xid", "");
                            },
                        error: function(results){
                                console.log(results);
                        }
            });
        }
   });
   //  -----------------------------------------------

}); //