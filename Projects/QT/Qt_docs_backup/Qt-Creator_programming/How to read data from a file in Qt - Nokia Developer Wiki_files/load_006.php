var isCompatible=function(){if(navigator.appVersion.indexOf('MSIE')!==-1&&parseFloat(navigator.appVersion.split('MSIE')[1])<6){return false;}return true;};var startUp=function(){mw.config=new mw.Map(true);mw.loader.addSource({"local":{"loadScript":"/community/wiki/load.php?v=2241","apiScript":"/community/wiki/api.php"}});mw.loader.register([["site","1397648455",[],"site"],["noscript","1397648455",[],"noscript"],["startup","1398601629",[],"startup"],["user","1397648455",[],"user"],["user.groups","1397648455",[],"user"],["user.options","1398601629",[],"private"],["user.cssprefs","1398601629",["mediawiki.user"],"private"],["user.tokens","1397648455",[],"private"],["filepage","1397648455",[]],["skins.standard","1397648455",[]],["skins.vector","1397648455",[]],["jquery","1397648455",[]],["jquery.appear","1397648455",[]],["jquery.arrowSteps","1397648455",[]],["jquery.async","1397648455",[]],["jquery.autoEllipsis","1397648455",["jquery.highlightText"]],["jquery.byteLength","1397648455",[]],[
"jquery.byteLimit","1397648455",["jquery.byteLength"]],["jquery.checkboxShiftClick","1397648455",[]],["jquery.client","1397648455",[]],["jquery.collapsibleTabs","1397648455",[]],["jquery.color","1397648455",["jquery.colorUtil"]],["jquery.colorUtil","1397648455",[]],["jquery.cookie","1397648455",[]],["jquery.delayedBind","1397648455",[]],["jquery.expandableField","1397648455",["jquery.delayedBind"]],["jquery.farbtastic","1397648455",["jquery.colorUtil"]],["jquery.footHovzer","1397648455",[]],["jquery.form","1397648455",[]],["jquery.getAttrs","1397648455",[]],["jquery.highlightText","1397648455",[]],["jquery.hoverIntent","1397648455",[]],["jquery.json","1397648455",[]],["jquery.localize","1397648455",[]],["jquery.makeCollapsible","1397648498",[]],["jquery.messageBox","1397648455",[]],["jquery.mockjax","1397648455",[]],["jquery.mw-jump","1397648455",[]],["jquery.mwExtension","1397648455",[]],["jquery.placeholder","1397648455",[]],["jquery.qunit","1397648455",[]],[
"jquery.qunit.completenessTest","1397648455",["jquery.qunit"]],["jquery.spinner","1397648455",[]],["jquery.suggestions","1397648455",["jquery.autoEllipsis"]],["jquery.tabIndex","1397648455",[]],["jquery.tablesorter","1397648953",["jquery.mwExtension"]],["jquery.textSelection","1397648455",[]],["jquery.validate","1397648455",[]],["jquery.xmldom","1397648455",[]],["jquery.tipsy","1397648455",[]],["jquery.ui.core","1397648455",["jquery"],"jquery.ui"],["jquery.ui.widget","1397648455",[],"jquery.ui"],["jquery.ui.mouse","1397648455",["jquery.ui.widget"],"jquery.ui"],["jquery.ui.position","1397648455",[],"jquery.ui"],["jquery.ui.draggable","1397648455",["jquery.ui.core","jquery.ui.mouse","jquery.ui.widget"],"jquery.ui"],["jquery.ui.droppable","1397648455",["jquery.ui.core","jquery.ui.mouse","jquery.ui.widget","jquery.ui.draggable"],"jquery.ui"],["jquery.ui.resizable","1397648455",["jquery.ui.core","jquery.ui.widget","jquery.ui.mouse"],"jquery.ui"],["jquery.ui.selectable","1397648455",[
"jquery.ui.core","jquery.ui.widget","jquery.ui.mouse"],"jquery.ui"],["jquery.ui.sortable","1397648455",["jquery.ui.core","jquery.ui.widget","jquery.ui.mouse"],"jquery.ui"],["jquery.ui.accordion","1397648455",["jquery.ui.core","jquery.ui.widget"],"jquery.ui"],["jquery.ui.autocomplete","1397648455",["jquery.ui.core","jquery.ui.widget","jquery.ui.position"],"jquery.ui"],["jquery.ui.button","1397648455",["jquery.ui.core","jquery.ui.widget"],"jquery.ui"],["jquery.ui.datepicker","1397648455",["jquery.ui.core"],"jquery.ui"],["jquery.ui.dialog","1397648455",["jquery.ui.core","jquery.ui.widget","jquery.ui.button","jquery.ui.draggable","jquery.ui.mouse","jquery.ui.position","jquery.ui.resizable"],"jquery.ui"],["jquery.ui.progressbar","1397648455",["jquery.ui.core","jquery.ui.widget"],"jquery.ui"],["jquery.ui.slider","1397648455",["jquery.ui.core","jquery.ui.widget","jquery.ui.mouse"],"jquery.ui"],["jquery.ui.tabs","1397648455",["jquery.ui.core","jquery.ui.widget"],"jquery.ui"],[
"jquery.effects.core","1397648455",["jquery"],"jquery.ui"],["jquery.effects.blind","1397648455",["jquery.effects.core"],"jquery.ui"],["jquery.effects.bounce","1397648455",["jquery.effects.core"],"jquery.ui"],["jquery.effects.clip","1397648455",["jquery.effects.core"],"jquery.ui"],["jquery.effects.drop","1397648455",["jquery.effects.core"],"jquery.ui"],["jquery.effects.explode","1397648455",["jquery.effects.core"],"jquery.ui"],["jquery.effects.fade","1397648455",["jquery.effects.core"],"jquery.ui"],["jquery.effects.fold","1397648455",["jquery.effects.core"],"jquery.ui"],["jquery.effects.highlight","1397648455",["jquery.effects.core"],"jquery.ui"],["jquery.effects.pulsate","1397648455",["jquery.effects.core"],"jquery.ui"],["jquery.effects.scale","1397648455",["jquery.effects.core"],"jquery.ui"],["jquery.effects.shake","1397648455",["jquery.effects.core"],"jquery.ui"],["jquery.effects.slide","1397648455",["jquery.effects.core"],"jquery.ui"],["jquery.effects.transfer","1397648455",[
"jquery.effects.core"],"jquery.ui"],["mediawiki","1397648455",[]],["mediawiki.api","1397648455",["mediawiki.util"]],["mediawiki.api.category","1397648455",["mediawiki.api","mediawiki.Title"]],["mediawiki.api.edit","1397648455",["mediawiki.api","mediawiki.Title"]],["mediawiki.api.parse","1397648455",["mediawiki.api"]],["mediawiki.api.titleblacklist","1397648455",["mediawiki.api","mediawiki.Title"]],["mediawiki.api.watch","1397648455",["mediawiki.api","mediawiki.user"]],["mediawiki.debug","1397648455",["jquery.footHovzer"]],["mediawiki.debug.init","1397648455",["mediawiki.debug"]],["mediawiki.feedback","1397704826",["mediawiki.api.edit","mediawiki.Title","mediawiki.jqueryMsg","jquery.ui.dialog"]],["mediawiki.htmlform","1397648455",[]],["mediawiki.Title","1397648455",["mediawiki.util"]],["mediawiki.Uri","1397648455",[]],["mediawiki.user","1397648455",["jquery.cookie"]],["mediawiki.util","1397648503",["jquery.client","jquery.cookie","jquery.messageBox","jquery.mwExtension"]],[
"mediawiki.action.edit","1397648455",["jquery.textSelection","jquery.byteLimit"]],["mediawiki.action.history","1397648455",["jquery.ui.button"],"mediawiki.action.history"],["mediawiki.action.history.diff","1397648455",[],"mediawiki.action.history"],["mediawiki.action.view.dblClickEdit","1397648455",["mediawiki.util"]],["mediawiki.action.view.metadata","1397649053",[]],["mediawiki.action.view.rightClickEdit","1397648455",[]],["mediawiki.action.watch.ajax","1397648522",["mediawiki.api.watch","mediawiki.util"]],["mediawiki.language","1397648455",[]],["mediawiki.jqueryMsg","1397648455",["mediawiki.language","mediawiki.util"]],["mediawiki.libs.jpegmeta","1397648455",[]],["mediawiki.page.ready","1397648455",["jquery.checkboxShiftClick","jquery.makeCollapsible","jquery.placeholder","jquery.mw-jump","mediawiki.util"]],["mediawiki.page.startup","1397648455",["jquery.client","mediawiki.util"]],["mediawiki.special","1397648455",[]],["mediawiki.special.block","1397648455",["mediawiki.util"]],[
"mediawiki.special.changeemail","1397648455",["mediawiki.util"]],["mediawiki.special.changeslist","1397648455",["jquery.makeCollapsible"]],["mediawiki.special.movePage","1397648455",["jquery.byteLimit"]],["mediawiki.special.preferences","1397648455",[]],["mediawiki.special.recentchanges","1397648455",["mediawiki.special"]],["mediawiki.special.search","1397648455",[]],["mediawiki.special.undelete","1397648455",[]],["mediawiki.special.upload","1398198878",["mediawiki.libs.jpegmeta","mediawiki.util"]],["mediawiki.special.javaScriptTest","1397648455",["jquery.qunit"]],["mediawiki.tests.qunit.testrunner","1397648455",["jquery.qunit","jquery.qunit.completenessTest","mediawiki.page.startup","mediawiki.page.ready"]],["mediawiki.legacy.ajax","1397648455",["mediawiki.util","mediawiki.legacy.wikibits"]],["mediawiki.legacy.commonPrint","1397648455",[]],["mediawiki.legacy.config","1397648455",["mediawiki.legacy.wikibits"]],["mediawiki.legacy.IEFixes","1397648455",["mediawiki.legacy.wikibits"]],[
"mediawiki.legacy.mwsuggest","1397648455",["mediawiki.legacy.wikibits"]],["mediawiki.legacy.preview","1397648455",["mediawiki.legacy.wikibits"]],["mediawiki.legacy.protect","1397648455",["mediawiki.legacy.wikibits","jquery.byteLimit"]],["mediawiki.legacy.shared","1397648455",[]],["mediawiki.legacy.oldshared","1397648455",[]],["mediawiki.legacy.upload","1397648455",["mediawiki.legacy.wikibits","mediawiki.util"]],["mediawiki.legacy.wikibits","1397648455",["mediawiki.util"]],["mediawiki.legacy.wikiprintable","1397648455",[]],["ext.uploadWizard","1397704858",["jquery.autoEllipsis","jquery.ui.core","jquery.ui.dialog","jquery.ui.datepicker","jquery.ui.progressbar","jquery.suggestions","jquery.tipsy","jquery.ui.widget","mediawiki.language","mediawiki.Uri","mediawiki.util","mediawiki.libs.jpegmeta","mediawiki.jqueryMsg","mediawiki.api","mediawiki.api.edit","mediawiki.api.category","mediawiki.api.parse","mediawiki.api.titleblacklist","mediawiki.Title","mediawiki.feedback"],"ext.uploadWizard"],[
"ext.uploadWizard.tests","1397648455",[]],["ext.uploadWizard.campaigns","1397648455",[]],["ext.enhancedCategorySelector","1397648455",["jquery.ui.dialog","jquery.ui.autocomplete"]],["ext.collapsiblesections","1397648455",["jquery.makeCollapsible"]],["ext.categoryTree","1397648566",[]],["ext.categoryTree.css","1397648455",[]],["ext.cite","1397648455",["jquery.tooltip"]],["jquery.tooltip","1397648455",[]],["ext.talkhere","1397648455",["jquery.ui.core","jquery.cookie"]],["ext.jqueryqtip","1397648455",[]],["ext.nokiadev","1397648456",["jquery.ui.core","jquery.cookie"]],["skins.nokiadev2013","1397648460",[]],["ext.vector.collapsibleNav","1397648497",["jquery.client","jquery.cookie","jquery.tabIndex"],"ext.vector"],["ext.vector.collapsibleTabs","1397648455",["jquery.collapsibleTabs","jquery.delayedBind"],"ext.vector"],["ext.vector.editWarning","1397648455",[],"ext.vector"],["ext.vector.expandableSearch","1397648455",["jquery.client","jquery.expandableField","jquery.delayedBind"],"ext.vector"
],["ext.vector.footerCleanup","1397648455",[],"ext.vector"],["ext.vector.sectionEditLinks","1397648455",["jquery.cookie","jquery.clickTracking"],"ext.vector"],["ext.vector.simpleSearch","1397661947",["jquery.client","jquery.suggestions","jquery.autoEllipsis","jquery.placeholder"],"ext.vector"],["contentCollector","1397648455",[],"ext.wikiEditor"],["jquery.wikiEditor","1397668598",["jquery.client","jquery.textSelection","jquery.delayedBind"],"ext.wikiEditor"],["jquery.wikiEditor.iframe","1397648455",["jquery.wikiEditor","contentCollector"],"ext.wikiEditor"],["jquery.wikiEditor.dialogs","1397648455",["jquery.wikiEditor","jquery.wikiEditor.toolbar","jquery.ui.dialog","jquery.ui.button","jquery.ui.draggable","jquery.ui.resizable","jquery.tabIndex"],"ext.wikiEditor"],["jquery.wikiEditor.dialogs.config","1397648455",["jquery.wikiEditor","jquery.wikiEditor.dialogs","jquery.wikiEditor.toolbar.i18n","jquery.suggestions"],"ext.wikiEditor"],["jquery.wikiEditor.highlight","1397648455",[
"jquery.wikiEditor","jquery.wikiEditor.iframe"],"ext.wikiEditor"],["jquery.wikiEditor.preview","1397648455",["jquery.wikiEditor"],"ext.wikiEditor"],["jquery.wikiEditor.previewDialog","1397648455",["jquery.wikiEditor","jquery.wikiEditor.dialogs"],"ext.wikiEditor"],["jquery.wikiEditor.publish","1397648455",["jquery.wikiEditor","jquery.wikiEditor.dialogs"],"ext.wikiEditor"],["jquery.wikiEditor.templateEditor","1397648455",["jquery.wikiEditor","jquery.wikiEditor.iframe","jquery.wikiEditor.dialogs"],"ext.wikiEditor"],["jquery.wikiEditor.templates","1397648455",["jquery.wikiEditor","jquery.wikiEditor.iframe"],"ext.wikiEditor"],["jquery.wikiEditor.toc","1397648455",["jquery.wikiEditor","jquery.wikiEditor.iframe","jquery.ui.draggable","jquery.ui.resizable","jquery.autoEllipsis","jquery.color"],"ext.wikiEditor"],["jquery.wikiEditor.toolbar","1397648455",["jquery.wikiEditor","jquery.wikiEditor.toolbar.i18n"],"ext.wikiEditor"],["jquery.wikiEditor.toolbar.config","1397648455",["jquery.wikiEditor",
"jquery.wikiEditor.toolbar.i18n","jquery.wikiEditor.toolbar","jquery.cookie","jquery.async"],"ext.wikiEditor"],["jquery.wikiEditor.toolbar.i18n","1397648455",[],"ext.wikiEditor"],["ext.wikiEditor","1397648455",["jquery.wikiEditor"],"ext.wikiEditor"],["ext.wikiEditor.dialogs","1397648455",["ext.wikiEditor","ext.wikiEditor.toolbar","jquery.wikiEditor.dialogs","jquery.wikiEditor.dialogs.config"],"ext.wikiEditor"],["ext.wikiEditor.highlight","1397648455",["ext.wikiEditor","jquery.wikiEditor.highlight"],"ext.wikiEditor"],["ext.wikiEditor.preview","1397668598",["ext.wikiEditor","jquery.wikiEditor.preview"],"ext.wikiEditor"],["ext.wikiEditor.previewDialog","1397648455",["ext.wikiEditor","jquery.wikiEditor.previewDialog"],"ext.wikiEditor"],["ext.wikiEditor.publish","1397648455",["ext.wikiEditor","jquery.wikiEditor.publish"],"ext.wikiEditor"],["ext.wikiEditor.templateEditor","1397648455",["ext.wikiEditor","ext.wikiEditor.highlight","jquery.wikiEditor.templateEditor"],"ext.wikiEditor"],[
"ext.wikiEditor.templates","1397648455",["ext.wikiEditor","ext.wikiEditor.highlight","jquery.wikiEditor.templates"],"ext.wikiEditor"],["ext.wikiEditor.toc","1397648455",["ext.wikiEditor","ext.wikiEditor.highlight","jquery.wikiEditor.toc"],"ext.wikiEditor"],["ext.wikiEditor.tests.toolbar","1397648455",["ext.wikiEditor.toolbar"],"ext.wikiEditor"],["ext.wikiEditor.toolbar","1397648455",["ext.wikiEditor","jquery.wikiEditor.toolbar","jquery.wikiEditor.toolbar.config"],"ext.wikiEditor"],["ext.wikiEditor.toolbar.hideSig","1397648455",[],"ext.wikiEditor"],["ext.tabber","1397648455",["jquery.ui.core"]]]);mw.config.set({"wgLoadScript":"/community/wiki/load.php?v=2241","debug":false,"skin":"nokiadev2013","stylepath":"/community/wiki/skins","wgUrlProtocols":"http\\:\\/\\/|https\\:\\/\\/|ftp\\:\\/\\/|irc\\:\\/\\/|ircs\\:\\/\\/|gopher\\:\\/\\/|telnet\\:\\/\\/|nntp\\:\\/\\/|worldwind\\:\\/\\/|mailto\\:|news\\:|svn\\:\\/\\/|git\\:\\/\\/|mms\\:\\/\\/|\\/\\/","wgArticlePath":"/community/wiki/$1",
"wgScriptPath":"/community/wiki","wgScriptExtension":".php","wgScript":"/community/wiki/index.php","wgVariantArticlePath":false,"wgActionPaths":{},"wgServer":"http://developer.nokia.com","wgUserLanguage":"en","wgContentLanguage":"en","wgVersion":"1.19.15","wgEnableAPI":true,"wgEnableWriteAPI":true,"wgDefaultDateFormat":"dmy","wgMonthNames":["","January","February","March","April","May","June","July","August","September","October","November","December"],"wgMonthNamesShort":["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"wgMainPageTitle":"Wiki Home","wgFormattedNamespaces":{"-2":"Media","-1":"Special","0":"","1":"Talk","2":"User","3":"User talk","4":"Nokia Developer Wiki","5":"Nokia Developer Wiki talk","6":"File","7":"File talk","8":"MediaWiki","9":"MediaWiki talk","10":"Template","11":"Template talk","12":"Help","13":"Help talk","14":"Category","15":"Category talk","100":"Tools","101":"Tools Talk","104":"FNWiki","105":"FNWiki Talk","112":"Harmattan","113":
"Harmattan Talk","114":"Archived","115":"Archived Talk"},"wgNamespaceIds":{"media":-2,"special":-1,"":0,"talk":1,"user":2,"user_talk":3,"nokia_developer_wiki":4,"nokia_developer_wiki_talk":5,"file":6,"file_talk":7,"mediawiki":8,"mediawiki_talk":9,"template":10,"template_talk":11,"help":12,"help_talk":13,"category":14,"category_talk":15,"tools":100,"tools_talk":101,"fnwiki":104,"fnwiki_talk":105,"harmattan":112,"harmattan_talk":113,"archived":114,"archived_talk":115,"image":6,"image_talk":7,"project":4,"project_talk":5},"wgSiteName":"Nokia Developer Wiki","wgFileExtensions":["png","gif","jpg","jpeg","doc","txt","zip","mp3","cer","tif","tiff","mxp","tgz","gz","sis","wgz","wgt","mp4"],"wgDBname":"wiki","wgFileCanRotate":true,"wgAvailableSkins":{"vector":"Vector","nokiadev2013":"Nokiadev2013","nokiadev":"Nokiadev"},"wgExtensionAssetsPath":"/community/wiki/extensions","wgCookiePrefix":"wiki","wgResourceLoaderMaxQueryLength":-1,"wgCaseSensitiveNamespaces":[],"wgCollapsibleNavBucketTest":
false,"wgCollapsibleNavForceNewVersion":false});};if(isCompatible()){document.write("\x3cscript src=\"/community/wiki/load.php?v=2241?debug=false\x26amp;lang=en\x26amp;modules=jquery%2Cmediawiki\x26amp;only=scripts\x26amp;skin=nokiadev2013\x26amp;version=20140123T112840Z\"\x3e\x3c/script\x3e");}delete isCompatible;;

/* cache key: wiki:resourceloader:filter:minify-js:7:99ab106113eb19f86347c5a343911f23 */
