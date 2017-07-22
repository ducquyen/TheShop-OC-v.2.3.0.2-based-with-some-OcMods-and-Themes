"function" != typeof Object.create && (Object.create = function (o) {
    function i() {
    }

    return i.prototype = o, new i
}), function (o, i, t, n) {
    var e = {
        init: function (i, t) {
            var n = this;
            n.elem = t, n.$elem = o(t), n.imageSrc = n.$elem.data("zoom-image") ? n.$elem.data("zoom-image") : n.$elem.attr("src"), n.options = o.extend({}, o.fn.elevateZoom.options, i), n.options.tint && (n.options.lensColour = "none", n.options.lensOpacity = "1"), "inner" == n.options.zoomType && (n.options.showLens = !1), n.$elem.parent().removeAttr("title").removeAttr("alt"), n.zoomImage = n.imageSrc, n.refresh(1), o("#" + n.options.gallery + " a").click(function (i) {
                return i.preventDefault(), o(this).data("zoom-image") ? n.zoomImagePre = o(this).data("zoom-image") : n.zoomImagePre = o(this).data("image"), n.swaptheimage(o(this).data("image"), n.zoomImagePre), !1
            })
        }, refresh: function (o) {
            var i = this;
            setTimeout(function () {
                i.fetch(i.imageSrc)
            }, o || i.options.refresh)
        }, fetch: function (o) {
            var i = this, t = new Image;
            t.onload = function () {
                i.largeWidth = t.width, i.largeHeight = t.height, i.startZoom(), i.currentImage = i.imageSrc
            }, t.src = o
        }, startZoom: function () {
            var i = this;
            i.nzWidth = i.$elem.width(), i.nzHeight = i.$elem.height(), i.nzOffset = i.$elem.offset(), i.widthRatio = i.largeWidth / i.nzWidth, i.heightRatio = i.largeHeight / i.nzHeight, "window" == i.options.zoomType && (i.zoomWindowStyle = "overflow: hidden;background-position: 0px 0px;background-color:white;text-align:center;width: " + String(i.options.zoomWindowWidth) + "px;height: " + String(i.options.zoomWindowHeight) + "px;float: left;display: none;z-index:100px;border: " + String(i.options.borderSize) + "px solid " + i.options.borderColour + ";background-repeat: no-repeat;position: absolute;"), "inner" == i.options.zoomType && (i.zoomWindowStyle = "overflow: hidden;background-position: 0px 0px;width: " + String(i.nzWidth) + "px;height: " + String(i.nzHeight) + "px;float: left;display: none;cursor:" + i.options.cursor + ";px solid " + i.options.borderColour + ";background-repeat: no-repeat;position: absolute;"), "window" == i.options.zoomType && (i.nzHeight < i.options.zoomWindowWidth / i.widthRatio ? lensHeight = i.nzHeight : lensHeight = String(i.options.zoomWindowHeight / i.heightRatio), i.largeWidth < i.options.zoomWindowWidth ? lensWidth = i.nzHWidth : lensWidth = i.options.zoomWindowWidth / i.widthRatio, i.lensStyle = "background-position: 0px 0px;width: " + String(i.options.zoomWindowWidth / i.widthRatio) + "px;height: " + String(i.options.zoomWindowHeight / i.heightRatio) + "px;float: right;display: none;overflow: hidden;z-index: 999;opacity:" + i.options.lensOpacity + ";filter: alpha(opacity = " + 100 * i.options.lensOpacity + "); zoom:1;width:" + lensWidth + "px;height:" + lensHeight + "px;background-color:" + i.options.lensColour + ";cursor:" + i.options.cursor + ";border: " + i.options.lensBorder + "px solid black;background-repeat: no-repeat;position: absolute;"), i.tintStyle = "display: block;position: absolute;background-color: " + i.options.tintColour + ";opacity: 0;width: " + i.nzWidth + "px;height: " + i.nzHeight + "px;", i.lensRound = "", "lens" == i.options.zoomType && (i.lensStyle = "background-position: 0px 0px;float: left;display: none;border: " + String(i.options.borderSize) + "px solid " + i.options.borderColour + ";width:" + String(i.options.lensSize) + "px;height:" + String(i.options.lensSize) + "px;background-repeat: no-repeat;position: absolute;"), "round" == i.options.lensShape && (i.lensRound = "border-top-left-radius: " + String(i.options.lensSize / 2 + i.options.borderSize) + "px;border-top-right-radius: " + String(i.options.lensSize / 2 + i.options.borderSize) + "px;border-bottom-left-radius: " + String(i.options.lensSize / 2 + i.options.borderSize) + "px;border-bottom-right-radius: " + String(i.options.lensSize / 2 + i.options.borderSize) + "px;"), i.zoomContainer = o('<div class="zoomContainer hidden-mobile hidden-sm hidden-xs hidden-md" style="position:absolute;left:' + i.nzOffset.left + "px;top:" + i.nzOffset.top + "px;height:" + i.nzHeight + "px;width:" + i.nzWidth + 'px;"></div>'), i.$elem.after(i.zoomContainer), i.options.containLensZoom && "lens" == i.options.zoomType && i.zoomContainer.css("overflow", "hidden"), "inner" != i.options.zoomType && (i.zoomLens = o("<div class='zoomLens' style='" + i.lensStyle + i.lensRound + "'>&nbsp;</div>").appendTo(i.zoomContainer).click(function () {
                i.$elem.trigger("click")
            })), i.options.tint && (i.tintContainer = o("<div/>").addClass("tintContainer"), i.zoomTint = o("<div class='zoomTint' style='" + i.tintStyle + "'></div>"), i.zoomLens.wrap(i.tintContainer), i.zoomTintcss = i.zoomLens.after(i.zoomTint), i.zoomTintImage = o('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' + i.nzWidth + "px; height: " + i.nzHeight + 'px;" src="' + i.imageSrc + '">').appendTo(i.zoomLens).click(function () {
                i.$elem.trigger("click")
            })), isNaN(i.options.zoomWindowPosition) ? i.zoomWindow = o("<div style='z-index:999;left:" + i.windowOffsetLeft + "px;top:" + i.windowOffsetTop + "px;" + i.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo("body").click(function () {
                    i.$elem.trigger("click")
                }) : i.zoomWindow = o("<div style='z-index:999;left:" + i.windowOffsetLeft + "px;top:" + i.windowOffsetTop + "px;" + i.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo(i.zoomContainer).click(function () {
                    i.$elem.trigger("click")
                }), i.zoomWindowContainer = o("<div/>").addClass("zoomWindowContainer").css("width", i.options.zoomWindowWidth), i.zoomWindow.wrap(i.zoomWindowContainer), i.options.tint, "lens" == i.options.zoomType && i.zoomLens.css({backgroundImage: "url('" + i.imageSrc + "')"}), "window" == i.options.zoomType && i.zoomWindow.css({backgroundImage: "url('" + i.imageSrc + "')"}), "inner" == i.options.zoomType && i.zoomWindow.css({backgroundImage: "url('" + i.imageSrc + "')"}), i.$elem.bind("mousemove", function (o) {
                i.setPosition(o)
            }), i.zoomContainer.bind("mousemove", function (o) {
                i.setPosition(o)
            }), "inner" != i.options.zoomType && i.zoomLens.bind("mousemove", function (o) {
                i.setPosition(o)
            }), i.options.tint && i.zoomTint.bind("mousemove", function (o) {
                i.setPosition(o)
            }), "inner" == i.options.zoomType && i.zoomWindow.bind("mousemove", function (o) {
                i.setPosition(o)
            }), i.zoomContainer.mouseenter(function () {
                "inner" == i.options.zoomType && (i.options.zoomWindowFadeIn ? i.zoomWindow.stop(!0, !0).fadeIn(i.options.zoomWindowFadeIn) : i.zoomWindow.show()), "window" == i.options.zoomType && (i.options.zoomWindowFadeIn ? i.zoomWindow.stop(!0, !0).fadeIn(i.options.zoomWindowFadeIn) : i.zoomWindow.show()), i.options.showLens && (i.options.lensFadeIn ? i.zoomLens.stop(!0, !0).fadeIn(i.options.lensFadeIn) : i.zoomLens.show()), i.options.tint && (i.options.zoomTintFadeIn ? i.zoomTint.stop(!0, !0).fadeIn(i.options.zoomTintFadeIn) : i.zoomTint.show())
            }).mouseleave(function () {
                i.zoomWindow.hide(), i.options.showLens && i.zoomLens.hide(), i.options.tint && i.zoomTint.hide()
            }), i.$elem.mouseenter(function () {
                "inner" == i.options.zoomType && (i.options.zoomWindowFadeIn ? i.zoomWindow.stop(!0, !0).fadeIn(i.options.zoomWindowFadeIn) : i.zoomWindow.show()), "window" == i.options.zoomType && (i.options.zoomWindowFadeIn ? i.zoomWindow.stop(!0, !0).fadeIn(i.options.zoomWindowFadeIn) : i.zoomWindow.show()), i.options.showLens && (i.options.lensFadeIn ? i.zoomLens.stop(!0, !0).fadeIn(i.options.lensFadeIn) : i.zoomLens.show()), i.options.tint && (i.options.zoomTintFadeIn ? i.zoomTint.stop(!0, !0).fadeIn(i.options.zoomTintFadeIn) : i.zoomTint.show())
            }).mouseleave(function () {
                i.zoomWindow.hide(), i.options.showLens && i.zoomLens.hide(), i.options.tint && i.zoomTint.hide()
            }), "inner" != i.options.zoomType && i.zoomLens.mouseenter(function () {
                "inner" == i.options.zoomType && (i.options.zoomWindowFadeIn ? i.zoomWindow.stop(!0, !0).fadeIn(i.options.zoomWindowFadeIn) : i.zoomWindow.show()), "window" == i.options.zoomType && i.zoomWindow.show(), i.options.showLens && i.zoomLens.show(), i.options.tint && i.zoomTint.show()
            }).mouseleave(function () {
                i.options.zoomWindowFadeOut ? i.zoomWindow.stop(!0, !0).fadeOut(i.options.zoomWindowFadeOut) : i.zoomWindow.hide(), "inner" != i.options.zoomType && i.zoomLens.hide(), i.options.tint && i.zoomTint.hide()
            }), i.options.tint && i.zoomTint.mouseenter(function () {
                "inner" == i.options.zoomType && i.zoomWindow.show(), "window" == i.options.zoomType && i.zoomWindow.show(), i.options.showLens && i.zoomLens.show(), i.zoomTint.show()
            }).mouseleave(function () {
                i.zoomWindow.hide(), "inner" != i.options.zoomType && i.zoomLens.hide(), i.zoomTint.hide()
            }), "inner" == i.options.zoomType && i.zoomWindow.mouseenter(function () {
                "inner" == i.options.zoomType && i.zoomWindow.show(), "window" == i.options.zoomType && i.zoomWindow.show(), i.options.showLens && i.zoomLens.show()
            }).mouseleave(function () {
                i.options.zoomWindowFadeOut ? i.zoomWindow.stop(!0, !0).fadeOut(i.options.zoomWindowFadeOut) : i.zoomWindow.hide(), "inner" != i.options.zoomType && i.zoomLens.hide()
            })
        }, setPosition: function (o) {
            var i = this;
            return i.nzHeight = i.$elem.height(), i.nzWidth = i.$elem.width(), i.nzOffset = i.$elem.offset(), i.options.tint && (i.zoomTint.css({top: 0}), i.zoomTint.css({left: 0})), i.zoomContainer.css({top: i.nzOffset.top}), i.zoomContainer.css({left: i.nzOffset.left}), i.mouseLeft = parseInt(o.pageX - i.nzOffset.left), i.mouseTop = parseInt(o.pageY - i.nzOffset.top), "window" == i.options.zoomType && (i.Etoppos = i.mouseTop < i.zoomLens.height() / 2, i.Eboppos = i.mouseTop > i.nzHeight - i.zoomLens.height() / 2 - 2 * i.options.lensBorder, i.Eloppos = i.mouseLeft < 0 + i.zoomLens.width() / 2, i.Eroppos = i.mouseLeft > i.nzWidth - i.zoomLens.width() / 2 - 2 * i.options.lensBorder), "inner" == i.options.zoomType && (i.Etoppos = i.mouseTop < i.nzHeight / 2 / i.heightRatio, i.Eboppos = i.mouseTop > i.nzHeight - i.nzHeight / 2 / i.heightRatio, i.Eloppos = i.mouseLeft < 0 + i.nzWidth / 2 / i.widthRatio, i.Eroppos = i.mouseLeft > i.nzWidth - i.nzWidth / 2 / i.widthRatio - 2 * i.options.lensBorder), i.mouseLeft < 0 || i.mouseTop <= 0 || i.mouseLeft > i.nzWidth || i.mouseTop > i.nzHeight ? (i.zoomWindow.hide(), i.options.showLens && i.zoomLens.hide(), void(i.options.tint && i.zoomTint.hide())) : ("window" == i.options.zoomType && i.zoomWindow.show(), i.options.tint && i.zoomTint.show(), i.options.showLens && (i.zoomLens.show(), i.lensLeftPos = String(i.mouseLeft - i.zoomLens.width() / 2), i.lensTopPos = String(i.mouseTop - i.zoomLens.height() / 2)), i.Etoppos && (i.lensTopPos = 0), i.Eloppos && (i.windowLeftPos = 0, i.lensLeftPos = 0, i.tintpos = 0), "window" == i.options.zoomType && (i.Eboppos && (i.lensTopPos = Math.max(i.nzHeight - i.zoomLens.height() - 2 * i.options.lensBorder, 0)), i.Eroppos && (i.lensLeftPos = i.nzWidth - i.zoomLens.width() - 2 * i.options.lensBorder)), "inner" == i.options.zoomType && (i.Eboppos && (i.lensTopPos = Math.max(i.nzHeight - 2 * i.options.lensBorder, 0)), i.Eroppos && (i.lensLeftPos = i.nzWidth - i.nzWidth - 2 * i.options.lensBorder)), "lens" == i.options.zoomType && (i.windowLeftPos = String(-1 * ((o.pageX - i.nzOffset.left) * i.widthRatio - i.zoomLens.width() / 2)), i.windowTopPos = String(-1 * ((o.pageY - i.nzOffset.top) * i.heightRatio - i.zoomLens.height() / 2)), i.zoomLens.css({backgroundPosition: i.windowLeftPos + "px " + i.windowTopPos + "px"}), i.setWindowPostition(o)), i.options.tint && i.setTintPosition(o), "window" == i.options.zoomType && i.setWindowPostition(o), "inner" == i.options.zoomType && i.setWindowPostition(o), i.options.showLens && i.zoomLens.css({
                    left: i.lensLeftPos + "px",
                    top: i.lensTopPos + "px"
                }), void 0)
        }, setLensPostition: function (o) {
        }, setWindowPostition: function (i) {
            function t(o) {
                var i = "100%", t = "0px", n = {top: t, bottom: i, left: t, right: i};
                return n[o] || o
            }

            var n = this;
            if (isNaN(n.options.zoomWindowPosition)) n.externalContainer = o("#" + n.options.zoomWindowPosition), n.externalContainerWidth = n.externalContainer.width(), n.externalContainerHeight = n.externalContainer.height(), n.externalContainerOffset = n.externalContainer.offset(), n.windowOffsetTop = n.externalContainerOffset.top, n.windowOffsetLeft = n.externalContainerOffset.left; else switch (n.options.zoomWindowPosition) {
                case 1:
                    n.windowOffsetTop = n.options.zoomWindowOffety, n.windowOffsetLeft = +n.nzWidth;
                    break;
                case 2:
                    n.options.zoomWindowHeight > n.nzHeight && (n.windowOffsetTop = -1 * (n.options.zoomWindowHeight / 2 - n.nzHeight / 2), n.windowOffsetLeft = n.nzWidth);
                    break;
                case 3:
                    n.windowOffsetTop = n.nzHeight - n.zoomWindow.height() - 2 * n.options.borderSize, n.windowOffsetLeft = n.nzWidth;
                    break;
                case 4:
                    n.windowOffsetTop = n.nzHeight, n.windowOffsetLeft = n.nzWidth;
                    break;
                case 5:
                    n.windowOffsetTop = n.nzHeight, n.windowOffsetLeft = n.nzWidth - n.zoomWindow.width() - 2 * n.options.borderSize;
                    break;
                case 6:
                    n.options.zoomWindowHeight > n.nzHeight && (n.windowOffsetTop = n.nzHeight, n.windowOffsetLeft = -1 * (n.options.zoomWindowWidth / 2 - n.nzWidth / 2 + 2 * n.options.borderSize));
                    break;
                case 7:
                    n.windowOffsetTop = n.nzHeight, n.windowOffsetLeft = 0;
                    break;
                case 8:
                    n.windowOffsetTop = n.nzHeight, n.windowOffsetLeft = -1 * (n.zoomWindow.width() + 2 * n.options.borderSize);
                    break;
                case 9:
                    n.windowOffsetTop = n.nzHeight - n.zoomWindow.height() - 2 * n.options.borderSize, n.windowOffsetLeft = -1 * (n.zoomWindow.width() + 2 * n.options.borderSize);
                    break;
                case 10:
                    n.options.zoomWindowHeight > n.nzHeight && (n.windowOffsetTop = -1 * (n.options.zoomWindowHeight / 2 - n.nzHeight / 2), n.windowOffsetLeft = -1 * (n.zoomWindow.width() + 2 * n.options.borderSize));
                    break;
                case 11:
                    n.windowOffsetTop = n.options.zoomWindowOffety, n.windowOffsetLeft = -1 * (n.zoomWindow.width() + 2 * n.options.borderSize);
                    break;
                case 12:
                    n.windowOffsetTop = -1 * (n.zoomWindow.height() + 2 * n.options.borderSize), n.windowOffsetLeft = -1 * (n.zoomWindow.width() + 2 * n.options.borderSize);
                    break;
                case 13:
                    n.windowOffsetTop = -1 * (n.zoomWindow.height() + 2 * n.options.borderSize), n.windowOffsetLeft = 0;
                    break;
                case 14:
                    n.options.zoomWindowHeight > n.nzHeight && (n.windowOffsetTop = -1 * (n.zoomWindow.height() + 2 * n.options.borderSize), n.windowOffsetLeft = -1 * (n.options.zoomWindowWidth / 2 - n.nzWidth / 2 + 2 * n.options.borderSize));
                    break;
                case 15:
                    n.windowOffsetTop = -1 * (n.zoomWindow.height() + 2 * n.options.borderSize), n.windowOffsetLeft = n.nzWidth - n.zoomWindow.width() - 2 * n.options.borderSize;
                    break;
                case 16:
                    n.windowOffsetTop = -1 * (n.zoomWindow.height() + 2 * n.options.borderSize), n.windowOffsetLeft = n.nzWidth;
                    break;
                default:
                    n.windowOffsetTop = n.options.zoomWindowOffety, n.windowOffsetLeft = n.nzWidth
            }
            if (n.windowOffsetTop = n.windowOffsetTop + n.options.zoomWindowOffety, n.windowOffsetLeft = n.windowOffsetLeft + n.options.zoomWindowOffetx, n.zoomWindow.css({top: n.windowOffsetTop}), n.zoomWindow.css({left: n.windowOffsetLeft}), "inner" == n.options.zoomType && (n.zoomWindow.css({top: 0}), n.zoomWindow.css({left: 0})), n.windowLeftPos = String(-1 * ((i.pageX - n.nzOffset.left) * n.widthRatio - n.zoomWindow.width() / 2)), n.windowTopPos = String(-1 * ((i.pageY - n.nzOffset.top) * n.heightRatio - n.zoomWindow.height() / 2)), n.Etoppos && (n.windowTopPos = 0), n.Eloppos && (n.windowLeftPos = 0), n.Eboppos && (n.windowTopPos = -1 * (n.largeHeight - n.zoomWindow.height())), n.Eroppos && (n.windowLeftPos = -1 * (n.largeWidth - n.zoomWindow.width())), "window" == n.options.zoomType)if (n.widthRatio <= 1 && (n.windowLeftPos = 0), n.heightRatio <= 1 && (n.windowTopPos = 0), n.largeHeight < n.options.zoomWindowHeight && (n.windowTopPos = 0), n.largeWidth < n.options.zoomWindowWidth && (n.windowLeftPos = 0), n.options.easing)if (o.easing.zoomsmoothmove = function (o, i, t, n, e) {
                    return i == e ? t + n : n * (-Math.pow(2, -10 * i / e) + 1) + t
                }, o.browser.mozilla) {
                var e = "background-position", s = o.camelCase;
                o.each(["x", "y"], function (i, n) {
                    var d = s(e + "-" + n);
                    o.cssHooks[d] = {
                        get: function (n) {
                            var s = o.css(n, e).split(/\s+/, 2);
                            return t(s[i])
                        }, set: function (n, s) {
                            var d = o.css(n, e).split(/\s+/, 2);
                            d[i] = t(s), o.style(n, e, d.join(" "))
                        }
                    }, o.fx.step[d] = function (i) {
                        o.style(i.elem, i.prop, i.now)
                    }
                }), n.zoomWindow.stop().animate({
                    backgroundPositionY: n.windowTopPos,
                    backgroundPositionX: n.windowLeftPos
                }, {queue: !1, duration: n.options.easingDuration, easing: "zoomsmoothmove"})
            } else n.zoomWindow.animate({
                "background-position-x": n.windowLeftPos,
                "background-position-y": n.windowTopPos
            }, {
                queue: !1,
                duration: n.options.easingDuration,
                easing: "zoomsmoothmove"
            }); else n.zoomWindow.css({backgroundPosition: n.windowLeftPos + "px " + n.windowTopPos + "px"});
            "inner" == n.options.zoomType && n.zoomWindow.css({backgroundPosition: n.windowLeftPos + "px " + n.windowTopPos + "px"})
        }, setTintPosition: function (o) {
            var i = this;
            i.nzOffset = i.$elem.offset(), i.tintpos = String(-1 * (o.pageX - i.nzOffset.left - i.zoomLens.width() / 2)), i.tintposy = String(-1 * (o.pageY - i.nzOffset.top - i.zoomLens.height() / 2)), i.Etoppos && (i.tintposy = 0), i.Eloppos && (i.tintpos = 0), i.Eboppos && (i.tintposy = -1 * (i.nzHeight - i.zoomLens.height() - 2 * i.options.lensBorder)), i.Eroppos && (i.tintpos = -1 * (i.nzWidth - i.zoomLens.width() - 2 * i.options.lensBorder)), i.options.tint && (i.zoomTint.css({opacity: i.options.tintOpacity}).animate().fadeIn("slow"), i.zoomTintImage.css({left: i.tintpos - i.options.lensBorder + "px"}), i.zoomTintImage.css({top: i.tintposy - i.options.lensBorder + "px"}))
        }, swaptheimage: function (o, i) {
            var t = this, n = new Image;
            n.onload = function () {
                t.largeWidth = n.width, t.largeHeight = n.height, t.zoomImage = i, t.swapAction(o, i)
            }, n.src = i
        }, swapAction: function (o, i) {
            var t = this, n = new Image;
            n.onload = function () {
                t.nzHeight = n.height, t.nzWidth = n.width, t.doneCallback()
            }, n.src = o, t.zoomWindow.css({backgroundImage: "url('" + i + "')"}), t.currentImage = i, t.$elem.attr("src", o)
        }, doneCallback: function () {
            var o = this;
            o.options.tint && (o.zoomTintImage.attr("src", largeimage), o.zoomTintImage.attr("height", o.$elem.height()), o.zoomTintImage.css({height: o.$elem.height()}), o.zoomTint.css({height: o.$elem.height()})), o.nzOffset = o.$elem.offset(), o.nzWidth = o.$elem.width(), o.nzHeight = o.$elem.height(), o.widthRatio = o.largeWidth / o.nzWidth, o.heightRatio = o.largeHeight / o.nzHeight, o.nzHeight < o.options.zoomWindowWidth / o.widthRatio ? lensHeight = o.nzHeight : lensHeight = String(o.options.zoomWindowHeight / o.heightRatio), o.largeWidth < o.options.zoomWindowWidth ? lensWidth = o.nzHWidth : lensWidth = o.options.zoomWindowWidth / o.widthRatio, o.zoomLens.css("width", lensWidth), o.zoomLens.css("height", lensHeight)
        }, getCurrentImage: function () {
            var o = this;
            return o.zoomImage
        }, getGalleryList: function () {
            var i = this;
            return i.gallerylist = [], i.options.gallery ? o("#" + i.options.gallery + " a").each(function () {
                    var t = "";
                    o(this).data("zoom-image") ? t = o(this).data("zoom-image") : o(this).data("image") && (t = o(this).data("image")), t == i.zoomImage ? i.gallerylist.unshift({
                            href: "" + t,
                            title: o(this).find("img").attr("title")
                        }) : i.gallerylist.push({href: "" + t, title: o(this).find("img").attr("title")})
                }) : i.gallerylist.push({
                    href: "" + i.zoomImage,
                    title: o(this).find("img").attr("title")
                }), i.gallerylist
        }
    };
    o.fn.elevateZoom = function (i) {
        return this.each(function () {
            var t = Object.create(e);
            t.init(i, this), o.data(this, "elevateZoom", t)
        })
    }, o.fn.elevateZoom.options = {
        easing: !1,
        easingType: "zoomdefault",
        easingDuration: 2e3,
        lensSize: 100,
        zoomWindowWidth: 400,
        zoomWindowHeight: 400,
        zoomWindowOffetx: 0,
        zoomWindowOffety: 0,
        zoomWindowPosition: 1,
        lensFadeIn: !1,
        lensFadeOut: !1,
        debug: !1,
        zoomWindowFadeIn: !1,
        zoomWindowFadeOut: !1,
        zoomWindowAlwaysShow: !1,
        zoomTintFadeIn: !1,
        zoomTintFadeOut: !1,
        borderSize: 4,
        showLens: !0,
        borderColour: "#888",
        lensBorder: 1,
        lensShape: "square",
        zoomType: "window",
        containLensZoom: !1,
        lensColour: "white",
        lensOpacity: .4,
        lenszoom: !1,
        tint: !1,
        tintColour: "#333",
        tintOpacity: .4,
        gallery: !1,
        cursor: "default",
        onComplete: o.noop
    }
}(jQuery, window, document);