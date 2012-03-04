$(function(){
  var port = chrome.extension.connect({name: 'asdf'});

  port.onMessage.addListener(function(msg){
    console.log('context:', msg)
  })

  console.log('getting current tab');
  chrome.tabs.getCurrent(function(tab) {
    console.log('current tab', tab, arguments);
    port.postMessage({type: 'get-context', tabId: tab.id})
  });

});

