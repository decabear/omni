$(function(){
  var port = chrome.extension.connect();

  port.onMessage.addListener(function(msg){
    console.log('context:', msg)
  })

  port.postMessage({
    innerText: document.body.innerText,
    title: document.title,
    url: location.href
  });
});

