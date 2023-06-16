function isPromise(f) {  
    return f.constructor.name === 'AsyncFunction' ||
        (typeof f === 'function' && !!f && typeof f().then === 'function') 
}

module.exports = {
    isPromise
}