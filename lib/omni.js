
var omni = {};

/**
 * Serializer -- tries to save every 100ms (if there are any changes to save, that is)
 */

var createSerializer = function(key, getFn){ 
  var serializer = {},
      dirty = false,
      data;

  if(key in localStorage) {
    console.log('key', key, 'found in localStorage. loading data.');
  } else {
    console.log('key', key, 'not found in localStorage');
    localStorage[key] = '{}';
  }

  data = JSON.parse(localStorage[key]);

  setTimeout(function serialize(){
    setTimeout(serialize, 100);

    if(!dirty) return;
    dirty = false;

    localStorage[key] = JSON.stringify(getFn());
    console.log('flushed data', data, 'for key', key);
  });

  return {
    data: data,
    markDirty: function(){ dirty = true }
  };
};


/**
 * note storage / management / caching
 */

(function(Contexts){

  var contexts = {};
  function Context(arg) {
    if(_.isString(arg)) {
      arg = {title: arg};
    }

    _.extend(this, {notes: [], urls: {}}, arg);
  }

  Contexts.getAll = function(){ return contexts; }

  Contexts.has = function(title){ return title in contexts; }

  Contexts.get = function(title) {
    return contexts[title] || (contexts[title] = new Context(title));
  }

  Contexts.set = function(ctx) {
    if(!ctx.title) throw "contexts need a title, dipfuck";
    contexts[ctx.title] = ctx;
    ctx.save();
  }

  Contexts.query = function(query) {
    return _(contexts).filter(function(ctx){ return ctx.title.indexOf(query) > -1 });
  }

  var serializer = createSerializer('omni-contexts', Contexts.getAll);

  _.each(serializer.data, function(ctx, key){ contexts[key] = new Context(ctx) });

  Contexts.save = serializer.markDirty;

})(omni.Contexts = {});
