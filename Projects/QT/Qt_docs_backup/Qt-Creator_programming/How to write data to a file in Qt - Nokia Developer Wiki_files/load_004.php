jQuery(function($){$('div.vectorMenu').each(function(){var self=this;$('h5:first a:first',this).click(function(e){$('.menu:first',self).toggleClass('menuForceShow');e.preventDefault();}).focus(function(){$(self).addClass('vectorMenuFocus');}).blur(function(){$(self).removeClass('vectorMenuFocus');});});});mw.loader.using(['mediawiki.util','ext.jqueryqtip','ext.vector.collapsibleNav'],function(){$("#p-new_page a").addClass("ncs-button-small");$("#ca-talk a").attr("href","#talkhere");$(".talkhere-tomove").appendTo("#talkGoesHere");$(".talkhere-tomove").show();$("#talkGoesHere").show();if(mw.config.get('wgIsMainPage')){$(".talkhere-tomove").hide();$("#talkhere").hide();}if($("#bodyContent #toc li").size()>0){$("#contents-list").html($("#bodyContent #toc ul").html());$("#contents-list li:not('.toclevel-1') a .toctext").each(function(){$(this).text("- "+$(this).text());});$(".tocnumber").remove();$(".toctoggle").remove();$("#mw-panel2").show();}else{$("#mw-panel2").remove();$(
"#mw-panel2-wrapper").remove();}$("#toc").remove();$(".wikitable tr:even").addClass("even");if(talkHistory){$('#ca-talk a').text('Read Comments');$('#ca-talk').qtip({prerender:false,content:'<ul class="userPopup">\
                <li>Last comment by '+talkHistory["username"]+'</li>\
                <li>'+talkHistory["lastmod"]+'</li>\
            </ul>',position:{my:"bottom middle",at:"top middle"},show:{solo:true,ready:false},hide:{fixed:true,delay:750},style:{classes:"ui-tooltip-blue ui-tooltip-rounded ui-tooltip-shadow nd-ui-tooltip ",tip:true}});}$(".wikiEditor-ui + div").css("clear","none");$j('#mw-panel2').addClass('collapsible-nav');$j('div.portal.collapsible-nav:first').addClass('expanded').find('div.body').show();$j('div.portal.collapsible-nav:not(:first)').each(function(){if($j.cookie('vector-nav-'+$j(this).attr('id'))=='true'){$j(this).addClass('expanded').find('div.body').show();}else{$j(this).addClass('collapsed');}});$j(
'div.portal.collapsible-nav > h5, div.portal.collapsible-nav > h5 > span, div.portal.collapsible-nav > div.h5, div.portal.collapsible-nav > div.h5 > span').click(function(){parent=$j(this).parent();if($j(this).is("span")){parent=$j(this).parent().parent();}$j.cookie('vector-nav-'+parent.attr('id'),parent.is('.collapsed'));parent.toggleClass('expanded').toggleClass('collapsed').find('div.body').slideToggle('fast');return false;});});;mw.loader.state({"skins.nokiadev2013":"ready"});

/* cache key: wiki:resourceloader:filter:minify-js:7:ffad82a437589160eddee90bda66df05 */