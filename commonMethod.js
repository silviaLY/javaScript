//节流
function throttle(fn,wait){
    let pre;
    let context,args;

    return function(){
        let now = +new Date();
        context  = this;
        args = arguments;
        if(now-pre>wait){
            fn.apply(context,args);
            pre = now;
        }
    }
}

//节流
function throttle(fn,wait){
    let timeout;
    let context,args;

    return function(){
        context = this;
        args = arguments;
        if(!timeout){
            timeout = setTimeout(function(){
                timeout = null;
                fn.apply(context,args)
            },wait)
        }
    }
}

//节流
function throttle(fn,wait){
    let timeout,context,args;
    let pre = 0;

    let throttled = function(){
        let now = +new Date();
        let remain = wait-(now-pre);
        context = this;
        args = arguments;

        if(remain<=0 || remain>wait){
            if(timeout){
                clearTimeout(timeout);
                timeout = null;
            }
            pre = now;
            fn.apply(context,args)
        } else if(!timeout){
            timeout = setTimeout(function(){
                pre = now;
                timeout = null;
                fn.apply(context,args)
            },remain)
        }
    };

    throttled.cancel = function(){
        pre = 0;
        clearTimeout(timeout);
        timeout = null;

    };
    return throttled;

}

//节流
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };

    throttled.cancel = function(){
        previous = 0;
        clearTimeout(timeout);
        timeout = null;

    };

    return throttled;
}

//防抖
function decounce(fn,wait){
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function(){
            fn.apply(context,args)
        }, wait);
    }
}

//防抖
function decounce(fn,wait,immediate){
    let timeout,result;

    let debounced = function(){
        let context = this;
        let args = arguments;
        if(timeout){
            clearTimeout(timeout)
        }
        if(immediate){
            let count = !timeout;

            timeout = setTimeout(function(){
                timeout = null;
            },wait);

            if(count){
                result = fn.apply(context,args)
            }

        } else{
            timeout = setTimeout(function(){
                fn.apply(context,args)
            },wait)

        }
        return result;
    };

    debounced.cancel = function(){
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}
