$(function(){
  var port = chrome.extension.connect({name: 'asdf'});

  port.onMessage.addListener(function(msg){
    console.log('msg from backend:', msg)
  })

  port.postMessage('hi')
});

