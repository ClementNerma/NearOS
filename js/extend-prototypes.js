
/**
  * This file is under MIT license
  */

Object.fullFreeze = function(object) {

    for(var i in object)
        if(object.hasOwnProperty(i))
            if(Object.is(object[i]) || Array.isArray(object[i]))
                Object.fullFreeze(object[i]);

    Object.freeze(object);

};

Object.compare = function(obj1, obj2) {
    if(!Object.is(obj1) || !Object.is(obj2))
        return false;

    if(obj1.length !== obj2.length)
        return false;

    for(var i in obj1)
        if(obj1.hasOwnProperty(i)) {
            if(Object.is(obj1[i]) && !Object.is(obj1[i]))
                return false;
            else if(Object.is(obj1[i]) && !Object.is(obj1[i]))
                return false;
            else if(Array.is(obj1[i])) {
                if(!Array.compare(obj1[i], obj2[i]))
                    return false;
            } else if(Object.is(obj1[i])) {
                if(!Object.compare(obj1[i], obj2[i]))
                    return false;
            } else if(obj1[i] !== obj2[i])
                return false;
        }

    return true;
};

Object.merge = function(model, merge) {
    model = (model || {});
    merge = (merge || {});

    for(var i in merge)
        if(merge.hasOwnProperty(i))
            model[i] = merge[i];

    return model;
};

Object.clone = function(e){var n;if(null==e||"object"!=typeof e)return e;if(e instanceof Date)return n=new Date,n.setTime(e.getTime()),n;if(e instanceof Array){n=[];for(var t=0,r=e.length;r>t;t++)n[t]=Object.clone(e[t]);return n}if(e instanceof Object){n={};for(var o in e)e.hasOwnProperty(o)&&(n[o]=Object.clone(e[o]));return n}throw new Error("Unable to copy obj! Its type isn't supported.")};

Object.is = function(obj) {
    return (obj && typeof(obj) === 'object' && !Array.isArray(obj));
};

Object.lengthOf = function(obj) {
    return Object.keys(obj).length;
};

Number.is = function(num) {
    return (typeof num === 'number');
};

Boolean.is = function(bool) {
    return (bool === true || bool === false);
};

String.is = function(str) {
    return (typeof str === 'string');
};

String.cutHTML = function(str) {
    return str
        .replace(/</g, '')
        .replace(/>/g, '');
};

String.prototype.cutHTML = function() {
    return String.cutHTML(this);
};

Math.randomInt = function(max) {
    return Math.floor(Math.random() * max) + 1;
};

Array.is = Array.isArray;

Array.compare = function(arr1, arr2) {
    if(!Array.isArray(arr1) || !Array.isArray(arr2))
        return false;

    if(arr1.length !== arr2.length)
        return false;

    for(var i = 0; i < arr1.length; i += 1)
        if(Array.isArray(arr1[i]) && !Array.isArray(arr1[i]))
            return false;
        else if(Object.is(arr1[i]) && !Object.is(arr1[i]))
            return false;
        else if(Array.isArray(arr1[i])) {
            if(!Array.compare(arr1[i], arr2[i]))
                return false;
        } else if(Object.is(arr1[i])) {
            if(!Object.compare(arr1[i], arr2[i]))
                return false;
        } else if(arr1[i] !== arr2[i])
            return false;

    return true;
};

Array.create = function(rows, columns, fill) {
    var result = [];

    for(var y = 0; y < rows; y += 1) {
        result.push(new Array(columns));
        for(var x = 0; x < columns; x += 1)
            result[y][x] = fill;
    }

    return result;
};

Array.randomOne = Object.randomOne = function(obj) {
    var keys = Object.keys(obj);
    return obj[keys[Math.randomInt(keys.length) - 1]];
};

Array.sum = function(arr) {
    var sum = 0;

    for(var i = 0; i < arr.length; i += 1)
        sum += arr[i];

    return sum;
};

Image.create = function(url) {
    var img = new Image();
    img.src = url;
    return img;
};

Image.toBase64 = function(image) {
    if(!image.width || image.height)
        return false;

    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    return canvas.toDataURL();
};

Image.prototype.toBase64 = function() {
    return Image.toBase64(this);
};

Function.prototype.behove = function(obj) {
    for(var i in obj)
        if(obj.hasOwnProperty(i))
            if(obj[i] === this)
                return true;

    return false;
};

/* DOM create element shortcut for jQuery */

$.create = function(tag, attr) {
    if(!attr) attr = {};
    var e = $(document.createElement(tag));

    if(attr.content) {
        e.html(attr.content);
        delete attr.content;
    }

    if(attr.class) {
        e.addClass(attr.class);
        delete attr.class;
    }

    return e.attr(attr);
};

/* Download and Upload progress events for jQuery */
/* Thanks to @nebirhos from GitHub */

(function addXhrProgressEvent($) {
    var originalXhr = $.ajaxSettings.xhr;
    $.ajaxSetup({
        xhr: function() {
            var req = originalXhr(), that = this;
            if (req) {
                if (typeof req.addEventListener == "function" && that.progress !== undefined) {
                    req.addEventListener("progress", function(evt) {
                        that.progress(evt);
                    }, false);
                }
                if (typeof req.upload == "object" && that.progressUpload !== undefined) {
                    req.upload.addEventListener("progress", function(evt) {
                        that.progressUpload(evt);
                    }, false);
                }
            }
            return req;
        }
    });
})(jQuery);
