function debounce(fn, wait){
  let time = null;
  return function(){
    let args = Array.prototype.slice.call(arguments);
    let context = this;
    if(timer){
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait)
  }
}