/*
  LightBox v0.03 by Andreas Watterott (www.watterott.net)

  Tested with:
    FF2, FF3, IE6, Opera9.5, Safari3.1
  Known Issues:
    small Y-scroll problem in FF2

  based on Lightbox JS by Lokesh Dhakar (www.huddletogether.com)

  Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
  (basically, do anything you want, just leave my name and link)
*/

var loadingImage = '/lightbox.gif';
var resizeBorder = 80; //lightBox=windowSize-resizeBorder

var img_w=0, img_h=0, img_orgw=0, img_orgh=0;


function getWindowSize()
{
  var w, h, wnd;

  if(window.innerWidth) //all except IE
  {
    w = window.innerWidth;
  }
  else if(document.documentElement && document.documentElement.clientWidth) //IE6+ Strict Mode
  { 
    w = document.documentElement.clientWidth;
  }
  else
  {
    w = document.body.clientWidth;
  }

  if(window.innerHeight) //all except IE
  {
    h = window.innerHeight;
  }
  else if(document.documentElement && document.documentElement.clientHeight) //IE6+ Strict Mode
  { 
    h = document.documentElement.clientHeight;
  }
  else
  {
    h = document.body.clientHeight;
  }

  wnd = new Array(w, h);
  return wnd;
}


function getPageScroll()
{
  var x=0, y=0, scroll;

  if(window.pageXOffset) //Netscape
  {
    x = window.pageXOffset;
  }
  else if(document.documentElement && document.documentElement.scrollLeft) //IE6 Strict
  {
    x = document.documentElement.scrollLeft;
  }
  else if(document.body && document.body.scrollLeft) //DOM, all other IE
  {
    x = document.body.scrollLeft;
  }

  if(window.pageYOffset) //Netscape
  {
    y = window.pageYOffset;
  }
  else if(document.documentElement && document.documentElement.scrollTop) //IE6 Strict
  {
    y = document.documentElement.scrollTop;
  }
  else if(document.body && document.body.scrollTop) //DOM, all other IE
  {
    y = document.body.scrollTop;
  }

  scroll = new Array(x, y);
  return scroll;
}


function pause(ms)
{
  var now = new Date();
  var end = now.getTime() + ms;

  while(now.getTime() < end)
  {
    now = new Date();
  }
}


function showLightbox(objLink)
{
  var objOverlay         = document.getElementById('overlay');
  var objOverlayImage    = document.getElementById('overlayImage');
  var objLightbox        = document.getElementById('lightbox');
  var objImage           = document.getElementById('lightboxImage');
  var objDetails         = document.getElementById('lightboxDetails');

  var pageScroll = getPageScroll();
  var windowSize = getWindowSize();

  //set height of overlay to take up whole page and show
  objOverlay.style.left = (pageScroll[0] + 'px');
  objOverlay.style.top  = (pageScroll[1] + 'px');
  //update overlay width/height in IE
  if(navigator.appVersion.indexOf("MSIE") != -1)
  {
    objOverlay.style.width  = (windowSize[0] + 'px');
    objOverlay.style.height = (windowSize[1] + 'px');
  }
  objOverlay.style.display = 'block';

  //show overlayImage if it exists
  if(objOverlayImage)
  {
    objOverlayImage.style.left    = ((windowSize[0] - objOverlayImage.width) / 2)  + 'px';
    objOverlayImage.style.top     = ((windowSize[1] - objOverlayImage.height) / 2) + 'px';
    objOverlayImage.style.display = 'block';
  }

  //preload image
  imgPreload = new Image();
  imgPreload.onload = function()
  {
    objImage.src = objLink.href;

    img_w = img_orgw = imgPreload.width;
    img_h = img_orgh = imgPreload.height;

    if(objLink.getAttribute('title'))
    {
      objDetails.innerHTML = objLink.getAttribute('title');
    }
    else
    {
      objDetails.innerHTML = "";
    }

    if(navigator.appVersion.indexOf("MSIE") != -1) //IE
    {
      //a small pause between the image loading and displaying is required with IE,
      //this prevents the previous image displaying for a short burst causing flicker.
      pause(250);
      //hide select boxes as they will 'peek' through the image in IE
      var selects = document.getElementsByTagName("select");
      for (i = 0; i != selects.length; i++)
      {
        selects[i].style.visibility = "hidden";
      }
    }

    //hide loadingImage
    if(objOverlayImage)
    {
      objOverlayImage.style.display = 'none';
    }

    //show image
    if(objOverlay.style.display == 'block')
    {
      //update Lightbox size
      resizeLightbox();
      //show LightBox
      objLightbox.style.display = 'block';
    }

    return false;
  }

  imgPreload.src = objLink.href;

  //capture events
  window.onresize = resizeLightbox;
  window.onscroll = scrollLightbox;
}


function resizeLightbox()
{
  var objImage   = document.getElementById('lightboxImage');
  var objDetails = document.getElementById('lightboxDetails');
  
  var windowSize = getWindowSize();
  
  if(img_orgw && img_orgh)
  {
    img_w = img_orgw;
    img_h = img_orgh;

    var wnd_w = (windowSize[0]-resizeBorder);
    var wnd_h = (windowSize[1]-resizeBorder);
	
    if(objDetails.innerHTML) //description text
    {
      wnd_h -= resizeBorder/2;
    }

    if((img_w > wnd_w) || (img_h > wnd_h))
    {
      ratio = (wnd_w/img_w) < (wnd_h/img_h) ? (wnd_w/img_w) : (wnd_h/img_h);
      img_w = Math.floor(img_w*ratio);
      img_h = Math.floor(img_h*ratio);
    }

    objImage.style.width  = (img_w < 0) ? '0px' : img_w + 'px';
    objImage.style.height = (img_h < 0) ? '0px' : img_h + 'px';
  }
  else
  {
    objImage.style.width  = '0px';
    objImage.style.height = '0px';
  }

  scrollLightbox();
}


function scrollLightbox()
{
  var objOverlay  = document.getElementById('overlay');
  var objLightbox = document.getElementById('lightbox');

  var pageScroll = getPageScroll();
  var windowSize = getWindowSize();

  var lightboxLeft = pageScroll[0] + ((windowSize[0] - (img_w + 40)) / 2);
  var lightboxTop  = pageScroll[1] + ((windowSize[1] - (img_h + 40)) / 2);

  objLightbox.style.left = (lightboxLeft < 0) ? '0px' : lightboxLeft + 'px';
  objLightbox.style.top  = (lightboxTop  < 0) ? '0px' : lightboxTop  + 'px';

  objOverlay.style.left = (pageScroll[0] + 'px');
  objOverlay.style.top  = (pageScroll[1] + 'px');

  //update overlay width/height in IE
  if(navigator.appVersion.indexOf("MSIE") != -1)
  {
    objOverlay.style.width  = (windowSize[0] + 'px');
    objOverlay.style.height = (windowSize[1] + 'px');
  }
}


function hideLightbox()
{
  //get objects
  var objOverlay  = document.getElementById('overlay');
  var objLightbox = document.getElementById('lightbox');

  img_w = img_orgw = 0;
  img_h = img_orgh = 0;

  //hide lightbox and overlay
  objOverlay.style.display  = 'none';
  objLightbox.style.display = 'none';

  if(navigator.appVersion.indexOf("MSIE") != -1) //IE
  {
    //make select boxes visible
    var selects = document.getElementsByTagName("select");
    for(i = 0; i != selects.length; i++)
    {
      selects[i].style.visibility = "visible";
    }
  }

  //disable events
  window.onresize = 0;
  window.onscroll = 0;
}


function initLightbox()
{
  if(document.getElementById("lightbox"))
  {
    return; 
  }
  if(!document.getElementsByTagName)
  {
    return;
  }

  //loop through all anchor tags
  var anchors = document.getElementsByTagName("a");
  for(var i=0; i<anchors.length; i++)
  {
    var anchor = anchors[i];
    if((anchor.getAttribute("rel") == "lightbox") && anchor.getAttribute("href"))
    {
      anchor.onclick = function(){ showLightbox(this); return false; }
    }
  }

  //the rest of this code inserts html at the top of the page that looks like this:
  // <div id="overlay">
  //   <a href="#" onclick="hideLightbox(); return false;"><img id="overlayImage"></a>
  // </div>
  // <div id="lightbox">
  //   <a href="#" onclick="hideLightbox(); return false;" title="Click to close">
  //     <img id="lightboxImage">
  //   </a>
  //   <div id="lightboxDetails">
  //   </div>
  // </div>

  var objBody = document.getElementsByTagName("body").item(0);

  //create overlay div
  var objOverlay = document.createElement("div");
  objOverlay.setAttribute('id','overlay');
  objOverlay.onclick        = function() { hideLightbox(); return false; }
  objOverlay.style.display  = 'none';
  objOverlay.style.position = 'absolute';
  objOverlay.style.top      = '0';
  objOverlay.style.left     = '0';
  objBody.insertBefore(objOverlay, objBody.firstChild);

  //preload and create loader image
  var imgPreloader = new Image();
  imgPreloader.onload = function()
  {
    var objOverlayLink = document.createElement("a");
    objOverlayLink.setAttribute('href','#');
    objOverlayLink.onclick = function(){ hideLightbox(); return false; }
    objOverlay.appendChild(objOverlayLink);

    var objOverlayImage = document.createElement("img");
    objOverlayImage.src = loadingImage;
    objOverlayImage.setAttribute('id','overlayImage');
    objOverlayImage.style.display  = 'none';
    objOverlayImage.style.position = 'absolute';
    objOverlayLink.appendChild(objOverlayImage);

    imgPreloader.onload = function(){}; //clear onLoad, as IE will flip out w/animated gifs

    return false;
  }
  imgPreloader.src = loadingImage;

  //create lightbox div, same note about styles as above
  var objLightbox = document.createElement("div");
  objLightbox.setAttribute('id','lightbox');
  objLightbox.style.display  = 'none';
  objLightbox.style.position = 'absolute';
  objBody.insertBefore(objLightbox, objOverlay.nextSibling);

  //create lightbox link
  var objLink = document.createElement("a");
  objLink.setAttribute('href','#');
  objLink.setAttribute('title','Click to close');
  objLink.onclick = function(){ hideLightbox(); return false; }
  objLightbox.appendChild(objLink);

  //create lightbox image
  var objImage = document.createElement("img");
  objImage.setAttribute('id','lightboxImage');
  objLink.appendChild(objImage);

  //create lightbox details div
  var objDetails = document.createElement("div");
  objDetails.setAttribute('id','lightboxDetails');
  objLightbox.appendChild(objDetails);
}
