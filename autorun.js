$(function(){
  //alert('sup brah')
  
  console.log('this works')

  //console.log(chrome.browserAction)
  //chrome.browserAction.setBadgeText("keegan")

  console.log('asdasdf')

  var port = chrome.extension.connect({name: 'asdf'});

  port.onMessage.addListener(function(msg){
    console.log('cli msg', msg)
  })

  port.postMessage('hi')

  console.log(port)
})

