function throttle(fn, delay){
  let curTime = Date.now();
  return function(){
    let context = this,
        args = Array.prototype.slice.call(arguments);
        nowTime = Date.now();
    if(nowTime - curTime >= delay){
      curTime = Date.now();
      return fn.apply(context, args);
    }
  }
}