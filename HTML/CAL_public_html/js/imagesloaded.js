/*!
 * imagesLoaded v3.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function(b, a) {
    if (typeof define === "function" && define.amd) {
        define(["eventEmitter/EventEmitter", "eventie/eventie"], function(d, c) {
            return a(b, d, c)
        })
    } else {
        if (typeof exports === "object") {
            module.exports = a(b, require("eventEmitter"), require("eventie"))
        } else {
            b.imagesLoaded = a(b, b.EventEmitter, b.eventie)
        }
    }
})(this, function factory(i, m, l) {
    var g = i.jQuery;
    var e = i.console;
    var c = typeof e !== "undefined";

    function j(p, o) {
        for (var q in o) {
            p[q] = o[q]
        }
        return p
    }
    var n = Object.prototype.toString;

    function h(o) {
        return n.call(o) === "[object Array]"
    }

    function d(r) {
        var q = [];
        if (h(r)) {
            q = r
        } else {
            if (typeof r.length === "number") {
                for (var p = 0, o = r.length; p < o; p++) {
                    q.push(r[p])
                }
            } else {
                q.push(r)
            }
        }
        return q
    }

    function f(q, p, o) {
        if (!(this instanceof f)) {
            return new f(q, p)
        }
        if (typeof q === "string") {
            q = document.querySelectorAll(q)
        }
        this.elements = d(q);
        this.options = j({}, this.options);
        if (typeof p === "function") {
            o = p
        } else {
            j(this.options, p)
        }
        if (o) {
            this.on("always", o)
        }
        this.getImages();
        if (g) {
            this.jqDeferred = new g.Deferred()
        }
        var r = this;
        setTimeout(function() {
            r.check()
        })
    }
    f.prototype = new m();
    f.prototype.options = {};
    f.prototype.getImages = function() {
        this.images = [];
        for (var r = 0, o = this.elements.length; r < o; r++) {
            var s = this.elements[r];
            if (s.nodeName === "IMG") {
                this.addImage(s)
            }
            var u = s.querySelectorAll("img");
            for (var q = 0, t = u.length; q < t; q++) {
                var p = u[q];
                this.addImage(p)
            }
        }
    };
    f.prototype.addImage = function(o) {
        var p = new k(o);
        this.images.push(p)
    };
    f.prototype.check = function() {
        var t = this;
        var p = 0;
        var r = this.images.length;
        this.hasAnyBroken = false;
        if (!r) {
            this.complete();
            return
        }

        function q(v, u) {
            if (t.options.debug && c) {
                e.log("confirm", v, u)
            }
            t.progress(v);
            p++;
            if (p === r) {
                t.complete()
            }
            return true
        }
        for (var o = 0; o < r; o++) {
            var s = this.images[o];
            s.on("confirm", q);
            s.check()
        }
    };
    f.prototype.progress = function(o) {
        this.hasAnyBroken = this.hasAnyBroken || !o.isLoaded;
        var p = this;
        setTimeout(function() {
            p.emit("progress", p, o);
            if (p.jqDeferred && p.jqDeferred.notify) {
                p.jqDeferred.notify(p, o)
            }
        })
    };
    f.prototype.complete = function() {
        var o = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = true;
        var p = this;
        setTimeout(function() {
            p.emit(o, p);
            p.emit("always", p);
            if (p.jqDeferred) {
                var q = p.hasAnyBroken ? "reject" : "resolve";
                p.jqDeferred[q](p)
            }
        })
    };
    if (g) {
        g.fn.imagesLoaded = function(p, q) {
            var o = new f(this, p, q);
            return o.jqDeferred.promise(g(this))
        }
    }

    function k(o) {
        this.img = o
    }
    k.prototype = new m();
    k.prototype.check = function() {
        var o = b[this.img.src] || new a(this.img.src);
        if (o.isConfirmed) {
            this.confirm(o.isLoaded, "cached was confirmed");
            return
        }
        if (this.img.complete && this.img.naturalWidth !== undefined) {
            this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
            return
        }
        var p = this;
        o.on("confirm", function(q, r) {
            p.confirm(q.isLoaded, r);
            return true
        });
        o.check()
    };
    k.prototype.confirm = function(o, p) {
        this.isLoaded = o;
        this.emit("confirm", this, p)
    };
    var b = {};

    function a(o) {
        this.src = o;
        b[o] = this
    }
    a.prototype = new m();
    a.prototype.check = function() {
        if (this.isChecked) {
            return
        }
        var o = new Image();
        l.bind(o, "load", this);
        l.bind(o, "error", this);
        o.src = this.src;
        this.isChecked = true
    };
    a.prototype.handleEvent = function(o) {
        var p = "on" + o.type;
        if (this[p]) {
            this[p](o)
        }
    };
    a.prototype.onload = function(o) {
        this.confirm(true, "onload");
        this.unbindProxyEvents(o)
    };
    a.prototype.onerror = function(o) {
        this.confirm(false, "onerror");
        this.unbindProxyEvents(o)
    };
    a.prototype.confirm = function(o, p) {
        this.isConfirmed = true;
        this.isLoaded = o;
        this.emit("confirm", this, p)
    };
    a.prototype.unbindProxyEvents = function(o) {
        l.unbind(o.target, "load", this);
        l.unbind(o.target, "error", this)
    };
    return f
});