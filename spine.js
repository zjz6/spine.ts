/**
 * Copyright (c) Flyover Games, LLC
 *
 * Isaac Burns isaacburns@gmail.com
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to
 * whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall
 * be included in all copies or substantial portions of the
 * Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
 * KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
System.register([], function (exports_1, context_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    function loadBool(json, key, def) {
        if (def === void 0) { def = false; }
        var value = json[key];
        switch (typeof (value)) {
            case "string": return (value === "true") ? true : false;
            case "boolean": return value;
            default: return def;
        }
    }
    exports_1("loadBool", loadBool);
    function saveBool(json, key, value, def) {
        if (def === void 0) { def = false; }
        if ((typeof (def) !== "boolean") || (value !== def)) {
            json[key] = value;
        }
    }
    exports_1("saveBool", saveBool);
    function loadFloat(json, key, def) {
        if (def === void 0) { def = 0; }
        var value = json[key];
        switch (typeof (value)) {
            case "string": return parseFloat(value);
            case "number": return value;
            default: return def;
        }
    }
    exports_1("loadFloat", loadFloat);
    function saveFloat(json, key, value, def) {
        if (def === void 0) { def = 0; }
        if ((typeof (def) !== "number") || (value !== def)) {
            json[key] = value;
        }
    }
    exports_1("saveFloat", saveFloat);
    function loadInt(json, key, def) {
        if (def === void 0) { def = 0; }
        var value = json[key];
        switch (typeof (value)) {
            case "string": return parseInt(value, 10);
            case "number": return 0 | value;
            default: return def;
        }
    }
    exports_1("loadInt", loadInt);
    function saveInt(json, key, value, def) {
        if (def === void 0) { def = 0; }
        if ((typeof (def) !== "number") || (value !== def)) {
            json[key] = value;
        }
    }
    exports_1("saveInt", saveInt);
    function loadString(json, key, def) {
        if (def === void 0) { def = ""; }
        var value = json[key];
        switch (typeof (value)) {
            case "string": return value;
            default: return def;
        }
    }
    exports_1("loadString", loadString);
    function saveString(json, key, value, def) {
        if (def === void 0) { def = ""; }
        if ((typeof (def) !== "string") || (value !== def)) {
            json[key] = value;
        }
    }
    exports_1("saveString", saveString);
    // from: http://github.com/arian/cubic-bezier
    function BezierCurve(x1, y1, x2, y2, epsilon) {
        /*
        function orig_curveX(t) {
          const v = 1 - t;
          return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
        }
      
        function orig_curveY(t) {
          const v = 1 - t;
          return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
        }
      
        function orig_derivativeCurveX(t) {
          const v = 1 - t;
          return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (- t * t * t + 2 * v * t) * x2;
        }
        */
        if (epsilon === void 0) { epsilon = EPSILON; }
        /*
      
        B(t) = P0*(1-t)^3 + 3*P1*(1-t)^2*t + 3*P2*(1-t)*t^2 + P3*t^3
        B'(t) = P0 - 3*(P0 - P1)*t + 3*(P0 - 2*P1 + P2)*t^2 - (P0 - 3*P1 + 3*P2 - P3)*t^3
      
        if P0:(0,0) and P3:(1,1)
        B(t) = 3*P1*(1-t)^2*t + 3*P2*(1-t)*t^2 + t^3
        B'(t) = 3*P1*t - 3*(2*P1 - P2)*t^2 + (3*P1 - 3*P2 + 1)*t^3
      
        */
        function curveX(t) {
            var t2 = t * t;
            var t3 = t2 * t;
            var v = 1 - t;
            var v2 = v * v;
            return 3 * x1 * v2 * t + 3 * x2 * v * t2 + t3;
        }
        function curveY(t) {
            var t2 = t * t;
            var t3 = t2 * t;
            var v = 1 - t;
            var v2 = v * v;
            return 3 * y1 * v2 * t + 3 * y2 * v * t2 + t3;
        }
        function derivativeCurveX(t) {
            var t2 = t * t;
            var t3 = t2 * t;
            return 3 * x1 * t - 3 * (2 * x1 - x2) * t2 + (3 * x1 - 3 * x2 + 1) * t3;
        }
        return function (percent) {
            var x = percent;
            var t0, t1, t2, x2, d2, i;
            // First try a few iterations of Newton"s method -- normally very fast.
            for (t2 = x, i = 0; i < 8; ++i) {
                x2 = curveX(t2) - x;
                if (Math.abs(x2) < epsilon)
                    return curveY(t2);
                d2 = derivativeCurveX(t2);
                if (Math.abs(d2) < epsilon)
                    break;
                t2 = t2 - (x2 / d2);
            }
            t0 = 0, t1 = 1, t2 = x;
            if (t2 < t0)
                return curveY(t0);
            if (t2 > t1)
                return curveY(t1);
            // Fallback to the bisection method for reliability.
            while (t0 < t1) {
                x2 = curveX(t2);
                if (Math.abs(x2 - x) < epsilon)
                    return curveY(t2);
                if (x > x2)
                    t0 = t2;
                else
                    t1 = t2;
                t2 = (t1 - t0) * 0.5 + t0;
            }
            // Failure
            return curveY(t2);
        };
    }
    exports_1("BezierCurve", BezierCurve);
    // from: spine-libgdx/src/com/esotericsoftware/spine/Animation.java
    function StepBezierCurve(cx1, cy1, cx2, cy2) {
        var bezierSegments = 10;
        var subdiv_step = 1 / bezierSegments;
        var subdiv_step2 = subdiv_step * subdiv_step;
        var subdiv_step3 = subdiv_step2 * subdiv_step;
        var pre1 = 3 * subdiv_step;
        var pre2 = 3 * subdiv_step2;
        var pre4 = 6 * subdiv_step2;
        var pre5 = 6 * subdiv_step3;
        var tmp1x = -cx1 * 2 + cx2;
        var tmp1y = -cy1 * 2 + cy2;
        var tmp2x = (cx1 - cx2) * 3 + 1;
        var tmp2y = (cy1 - cy2) * 3 + 1;
        var curves_0 = (cx1 * pre1 + tmp1x * pre2 + tmp2x * subdiv_step3);
        var curves_1 = (cy1 * pre1 + tmp1y * pre2 + tmp2y * subdiv_step3);
        var curves_2 = (tmp1x * pre4 + tmp2x * pre5);
        var curves_3 = (tmp1y * pre4 + tmp2y * pre5);
        var curves_4 = (tmp2x * pre5);
        var curves_5 = (tmp2y * pre5);
        return function (percent) {
            var dfx = curves_0;
            var dfy = curves_1;
            var ddfx = curves_2;
            var ddfy = curves_3;
            var dddfx = curves_4;
            var dddfy = curves_5;
            var x = dfx, y = dfy;
            var i = bezierSegments - 2;
            while (true) {
                if (x >= percent) {
                    var lastX = x - dfx;
                    var lastY = y - dfy;
                    return lastY + (y - lastY) * (percent - lastX) / (x - lastX);
                }
                if (i === 0)
                    break;
                i--;
                dfx += ddfx;
                dfy += ddfy;
                ddfx += dddfx;
                ddfy += dddfy;
                x += dfx;
                y += dfy;
            }
            return y + (1 - y) * (percent - x) / (1 - x); // Last point is 1,1.
        };
    }
    exports_1("StepBezierCurve", StepBezierCurve);
    function signum(n) { return (n < 0) ? (-1) : (n > 0) ? (1) : (n); }
    exports_1("signum", signum);
    function wrap(num, min, max) {
        if (min < max) {
            if (num < min) {
                return max - ((min - num) % (max - min));
            }
            else {
                return min + ((num - min) % (max - min));
            }
        }
        else if (min === max) {
            return min;
        }
        else {
            return num;
        }
    }
    exports_1("wrap", wrap);
    function tween(a, b, t) {
        return a + ((b - a) * t);
    }
    exports_1("tween", tween);
    function wrapAngleRadians(angle) {
        if (angle <= 0) {
            return ((angle - Math.PI) % (2 * Math.PI)) + Math.PI;
        }
        else {
            return ((angle + Math.PI) % (2 * Math.PI)) - Math.PI;
        }
    }
    exports_1("wrapAngleRadians", wrapAngleRadians);
    function tweenAngleRadians(a, b, t) {
        return wrapAngleRadians(a + (wrapAngleRadians(b - a) * t));
    }
    exports_1("tweenAngleRadians", tweenAngleRadians);
    var EPSILON, Color, Curve, Angle, Vector, Matrix, Affine, Position, Rotation, Scale, Shear, Space, Bone, Constraint, Ikc, Xfc, Ptc, Slot, Attachment, RegionAttachment, BoundingBoxAttachment, MeshAttachment, LinkedMeshAttachment, WeightedMeshAttachment, PathAttachment, SkinSlot, Skin, Event, Keyframe, BoneKeyframe, BonePositionKeyframe, BoneRotationKeyframe, BoneScaleKeyframe, BoneShearKeyframe, BoneTimeline, SlotKeyframe, SlotColorKeyframe, SlotAttachmentKeyframe, SlotTimeline, EventKeyframe, SlotOffset, OrderKeyframe, IkcKeyframe, IkcTimeline, XfcKeyframe, XfcTimeline, PtcKeyframe, PtcMixKeyframe, PtcSpacingKeyframe, PtcPositionKeyframe, PtcRotationKeyframe, PtcTimeline, FfdKeyframe, FfdAttachment, FfdSlot, FfdTimeline, Animation, Skeleton, Data, Pose;
    return {
        setters: [],
        execute: function () {/**
             * Copyright (c) Flyover Games, LLC
             *
             * Isaac Burns isaacburns@gmail.com
             *
             * Permission is hereby granted, free of charge, to any person
             * obtaining a copy of this software and associated
             * documentation files (the "Software"), to deal in the Software
             * without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense,
             * and/or sell copies of the Software, and to permit persons to
             * whom the Software is furnished to do so, subject to the
             * following conditions:
             *
             * The above copyright notice and this permission notice shall
             * be included in all copies or substantial portions of the
             * Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
             * KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
             * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
             * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
             * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
             * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
             * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
             */
            /**
             * A TypeScript API for the Spine JSON animation data format.
             */
            exports_1("EPSILON", EPSILON = 1e-6);
            Color = (function () {
                function Color() {
                    this.r = 1;
                    this.g = 1;
                    this.b = 1;
                    this.a = 1;
                }
                Color.copy = function (color, out) {
                    if (out === void 0) { out = new Color(); }
                    out.r = color.r;
                    out.g = color.g;
                    out.b = color.b;
                    out.a = color.a;
                    return out;
                };
                Color.prototype.copy = function (other) {
                    return Color.copy(other, this);
                };
                Color.prototype.load = function (json) {
                    var rgba = 0xffffffff;
                    switch (typeof (json)) {
                        case "string":
                            rgba = parseInt(json, 16);
                            break;
                        case "number":
                            rgba = 0 | json;
                            break;
                    }
                    this.r = ((rgba >> 24) & 0xff) / 255;
                    this.g = ((rgba >> 16) & 0xff) / 255;
                    this.b = ((rgba >> 8) & 0xff) / 255;
                    this.a = (rgba & 0xff) / 255;
                    return this;
                };
                Color.prototype.toString = function () {
                    return "rgba(" + (this.r * 255).toFixed(0) + "," + (this.g * 255).toFixed(0) + "," + (this.b * 255).toFixed(0) + "," + this.a + ")";
                };
                Color.tween = function (a, b, pct, out) {
                    if (out === void 0) { out = new Color(); }
                    out.r = tween(a.r, b.r, pct);
                    out.g = tween(a.g, b.g, pct);
                    out.b = tween(a.b, b.b, pct);
                    out.a = tween(a.a, b.a, pct);
                    return out;
                };
                Color.prototype.tween = function (other, pct, out) {
                    if (out === void 0) { out = new Color(); }
                    return Color.tween(this, other, pct, out);
                };
                Color.prototype.selfTween = function (other, pct) {
                    return Color.tween(this, other, pct, this);
                };
                return Color;
            }());
            exports_1("Color", Color);
            Curve = (function () {
                function Curve() {
                    this.evaluate = function (t) { return t; };
                }
                Curve.prototype.load = function (json) {
                    // default: linear
                    this.evaluate = function (t) { return t; };
                    if ((typeof (json) === "string") && (json === "stepped")) {
                        // stepped
                        this.evaluate = function (t) { return 0; };
                    }
                    else if ((typeof (json) === "object") && (typeof (json.length) === "number") && (json.length === 4)) {
                        // bezier
                        var x1 = loadFloat(json, 0, 0);
                        var y1 = loadFloat(json, 1, 0);
                        var x2 = loadFloat(json, 2, 1);
                        var y2 = loadFloat(json, 3, 1);
                        // curve.evaluate = BezierCurve(x1, y1, x2, y2);
                        this.evaluate = StepBezierCurve(x1, y1, x2, y2);
                    }
                    return this;
                };
                return Curve;
            }());
            exports_1("Curve", Curve);
            Angle = (function () {
                function Angle(rad) {
                    if (rad === void 0) { rad = 0; }
                    this._rad = 0;
                    this._cos = 1;
                    this._sin = 0;
                    this.rad = rad;
                }
                Object.defineProperty(Angle.prototype, "rad", {
                    get: function () { return this._rad; },
                    set: function (value) {
                        if (this._rad !== value) {
                            this._rad = value;
                            this._cos = Math.cos(value);
                            this._sin = Math.sin(value);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Angle.prototype, "deg", {
                    get: function () { return this.rad * 180 / Math.PI; },
                    set: function (value) { this.rad = value * Math.PI / 180; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Angle.prototype, "cos", {
                    get: function () { return this._cos; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Angle.prototype, "sin", {
                    get: function () { return this._sin; },
                    enumerable: true,
                    configurable: true
                });
                Angle.copy = function (angle, out) {
                    if (out === void 0) { out = new Angle(); }
                    out._rad = angle._rad;
                    out._cos = angle._cos;
                    out._sin = angle._sin;
                    return out;
                };
                Angle.prototype.copy = function (other) {
                    return Angle.copy(other, this);
                };
                Angle.equal = function (a, b, epsilon) {
                    if (epsilon === void 0) { epsilon = EPSILON; }
                    if (Math.abs(wrapAngleRadians(a.rad - b.rad)) > epsilon) {
                        return false;
                    }
                    return true;
                };
                Angle.prototype.equal = function (other, epsilon) {
                    if (epsilon === void 0) { epsilon = EPSILON; }
                    return Angle.equal(this, other, epsilon);
                };
                Angle.tween = function (a, b, pct, out) {
                    if (out === void 0) { out = new Angle(); }
                    out.rad = tweenAngleRadians(a.rad, b.rad, pct);
                    return out;
                };
                Angle.prototype.tween = function (other, pct, out) {
                    if (out === void 0) { out = new Angle(); }
                    return Angle.tween(this, other, pct, out);
                };
                Angle.prototype.selfTween = function (other, pct) {
                    return Angle.tween(this, other, pct, this);
                };
                return Angle;
            }());
            exports_1("Angle", Angle);
            Vector = (function () {
                function Vector(x, y) {
                    if (x === void 0) { x = 0; }
                    if (y === void 0) { y = 0; }
                    this.x = 0;
                    this.y = 0;
                    this.x = x;
                    this.y = y;
                }
                Vector.copy = function (v, out) {
                    if (out === void 0) { out = new Vector(); }
                    out.x = v.x;
                    out.y = v.y;
                    return out;
                };
                Vector.prototype.copy = function (other) {
                    return Vector.copy(other, this);
                };
                Vector.equal = function (a, b, epsilon) {
                    if (epsilon === void 0) { epsilon = EPSILON; }
                    if (Math.abs(a.x - b.x) > epsilon) {
                        return false;
                    }
                    if (Math.abs(a.y - b.y) > epsilon) {
                        return false;
                    }
                    return true;
                };
                Vector.prototype.equal = function (other, epsilon) {
                    if (epsilon === void 0) { epsilon = EPSILON; }
                    return Vector.equal(this, other, epsilon);
                };
                Vector.negate = function (v, out) {
                    if (out === void 0) { out = new Vector(); }
                    out.x = -v.x;
                    out.y = -v.y;
                    return out;
                };
                Vector.add = function (a, b, out) {
                    if (out === void 0) { out = new Vector(); }
                    out.x = a.x + b.x;
                    out.y = a.y + b.y;
                    return out;
                };
                Vector.prototype.add = function (other, out) {
                    if (out === void 0) { out = new Vector(); }
                    return Vector.add(this, other, out);
                };
                Vector.prototype.selfAdd = function (other) {
                    ///return Vector.add(this, other, this);
                    this.x += other.x;
                    this.y += other.y;
                    return this;
                };
                Vector.subtract = function (a, b, out) {
                    if (out === void 0) { out = new Vector(); }
                    out.x = a.x - b.x;
                    out.y = a.y - b.y;
                    return out;
                };
                Vector.prototype.subtract = function (other, out) {
                    if (out === void 0) { out = new Vector(); }
                    return Vector.subtract(this, other, out);
                };
                Vector.prototype.selfSubtract = function (other) {
                    ///return Vector.subtract(this, other, this);
                    this.x -= other.x;
                    this.y -= other.y;
                    return this;
                };
                Vector.scale = function (v, x, y, out) {
                    if (y === void 0) { y = x; }
                    if (out === void 0) { out = new Vector(); }
                    out.x = v.x * x;
                    out.y = v.y * y;
                    return out;
                };
                Vector.prototype.scale = function (x, y, out) {
                    if (y === void 0) { y = x; }
                    if (out === void 0) { out = new Vector(); }
                    return Vector.scale(this, x, y, out);
                };
                Vector.prototype.selfScale = function (x, y) {
                    if (y === void 0) { y = x; }
                    return Vector.scale(this, x, y, this);
                };
                Vector.tween = function (a, b, pct, out) {
                    if (out === void 0) { out = new Vector(); }
                    out.x = tween(a.x, b.x, pct);
                    out.y = tween(a.y, b.y, pct);
                    return out;
                };
                Vector.prototype.tween = function (other, pct, out) {
                    if (out === void 0) { out = new Vector(); }
                    return Vector.tween(this, other, pct, out);
                };
                Vector.prototype.selfTween = function (other, pct) {
                    return Vector.tween(this, other, pct, this);
                };
                return Vector;
            }());
            exports_1("Vector", Vector);
            Matrix = (function () {
                function Matrix() {
                    this.a = 1;
                    this.b = 0;
                    this.c = 0;
                    this.d = 1;
                }
                Matrix.copy = function (m, out) {
                    if (out === void 0) { out = new Matrix(); }
                    out.a = m.a;
                    out.b = m.b;
                    out.c = m.c;
                    out.d = m.d;
                    return out;
                };
                Matrix.prototype.copy = function (other) {
                    return Matrix.copy(other, this);
                };
                Matrix.equal = function (a, b, epsilon) {
                    if (epsilon === void 0) { epsilon = EPSILON; }
                    if (Math.abs(a.a - b.a) > epsilon) {
                        return false;
                    }
                    if (Math.abs(a.b - b.b) > epsilon) {
                        return false;
                    }
                    if (Math.abs(a.c - b.c) > epsilon) {
                        return false;
                    }
                    if (Math.abs(a.d - b.d) > epsilon) {
                        return false;
                    }
                    return true;
                };
                Matrix.prototype.equal = function (other, epsilon) {
                    if (epsilon === void 0) { epsilon = EPSILON; }
                    return Matrix.equal(this, other, epsilon);
                };
                Matrix.determinant = function (m) {
                    return m.a * m.d - m.b * m.c;
                };
                Matrix.identity = function (out) {
                    if (out === void 0) { out = new Matrix(); }
                    out.a = 1;
                    out.b = 0;
                    out.c = 0;
                    out.d = 1;
                    return out;
                };
                Matrix.multiply = function (a, b, out) {
                    if (out === void 0) { out = new Matrix(); }
                    var a_a = a.a, a_b = a.b, a_c = a.c, a_d = a.d;
                    var b_a = b.a, b_b = b.b, b_c = b.c, b_d = b.d;
                    out.a = a_a * b_a + a_b * b_c;
                    out.b = a_a * b_b + a_b * b_d;
                    out.c = a_c * b_a + a_d * b_c;
                    out.d = a_c * b_b + a_d * b_d;
                    return out;
                };
                Matrix.invert = function (m, out) {
                    if (out === void 0) { out = new Matrix(); }
                    var a = m.a, b = m.b, c = m.c, d = m.d;
                    var inv_det = 1 / (a * d - b * c);
                    out.a = inv_det * d;
                    out.b = -inv_det * b;
                    out.c = -inv_det * c;
                    out.d = inv_det * a;
                    return out;
                };
                Matrix.combine = function (a, b, out) {
                    return Matrix.multiply(a, b, out);
                };
                Matrix.extract = function (ab, a, out) {
                    return Matrix.multiply(Matrix.invert(a, out), ab, out);
                };
                Matrix.prototype.selfRotate = function (cos, sin) {
                    return Matrix.rotate(this, cos, sin, this);
                };
                Matrix.rotate = function (m, cos, sin, out) {
                    if (out === void 0) { out = new Matrix(); }
                    var a = m.a, b = m.b, c = m.c, d = m.d;
                    out.a = a * cos + b * sin;
                    out.b = b * cos - a * sin;
                    out.c = c * cos + d * sin;
                    out.d = d * cos - c * sin;
                    return out;
                };
                Matrix.scale = function (m, x, y, out) {
                    if (out === void 0) { out = new Matrix(); }
                    out.a = m.a * x;
                    out.b = m.b * y;
                    out.c = m.c * x;
                    out.d = m.d * y;
                    return out;
                };
                Matrix.transform = function (m, v, out) {
                    if (out === void 0) { out = new Vector(); }
                    var x = v.x, y = v.y;
                    out.x = m.a * x + m.b * y;
                    out.y = m.c * x + m.d * y;
                    return out;
                };
                Matrix.untransform = function (m, v, out) {
                    if (out === void 0) { out = new Vector(); }
                    var a = m.a, b = m.b, c = m.c, d = m.d;
                    var x = v.x, y = v.y;
                    var inv_det = 1 / (a * d - b * c);
                    out.x = inv_det * (d * x - b * y);
                    out.y = inv_det * (a * y - c * x);
                    return out;
                };
                Matrix.tween = function (a, b, pct, out) {
                    if (out === void 0) { out = new Matrix(); }
                    out.a = tween(a.a, b.a, pct);
                    out.b = tween(a.b, b.b, pct);
                    out.c = tween(a.c, b.c, pct);
                    out.d = tween(a.d, b.d, pct);
                    return out;
                };
                Matrix.prototype.tween = function (other, pct, out) {
                    if (out === void 0) { out = new Matrix(); }
                    return Matrix.tween(this, other, pct, out);
                };
                Matrix.prototype.selfTween = function (other, pct) {
                    return Matrix.tween(this, other, pct, this);
                };
                return Matrix;
            }());
            exports_1("Matrix", Matrix);
            Affine = (function () {
                function Affine() {
                    this.vector = new Vector();
                    this.matrix = new Matrix();
                }
                Affine.copy = function (affine, out) {
                    if (out === void 0) { out = new Affine(); }
                    Vector.copy(affine.vector, out.vector);
                    Matrix.copy(affine.matrix, out.matrix);
                    return out;
                };
                Affine.prototype.copy = function (other) {
                    return Affine.copy(other, this);
                };
                Affine.equal = function (a, b, epsilon) {
                    if (epsilon === void 0) { epsilon = EPSILON; }
                    if (!a.vector.equal(b.vector, epsilon)) {
                        return false;
                    }
                    if (!a.matrix.equal(b.matrix, epsilon)) {
                        return false;
                    }
                    return true;
                };
                Affine.prototype.equal = function (other, epsilon) {
                    if (epsilon === void 0) { epsilon = EPSILON; }
                    return Affine.equal(this, other, epsilon);
                };
                Affine.identity = function (out) {
                    if (out === void 0) { out = new Affine(); }
                    Matrix.identity(out.matrix);
                    out.vector.x = 0;
                    out.vector.y = 0;
                    return out;
                };
                Affine.invert = function (affine, out) {
                    if (out === void 0) { out = new Affine(); }
                    Matrix.invert(affine.matrix, out.matrix);
                    Vector.negate(affine.vector, out.vector);
                    Matrix.transform(out.matrix, out.vector, out.vector);
                    return out;
                };
                Affine.combine = function (a, b, out) {
                    if (out === void 0) { out = new Affine(); }
                    Affine.transform(a, b.vector, out.vector);
                    Matrix.combine(a.matrix, b.matrix, out.matrix);
                    return out;
                };
                Affine.extract = function (ab, a, out) {
                    if (out === void 0) { out = new Affine(); }
                    Matrix.extract(ab.matrix, a.matrix, out.matrix);
                    Affine.untransform(a, ab.vector, out.vector);
                    return out;
                };
                Affine.transform = function (affine, v, out) {
                    if (out === void 0) { out = new Vector(); }
                    Matrix.transform(affine.matrix, v, out);
                    Vector.add(affine.vector, out, out);
                    return out;
                };
                Affine.untransform = function (affine, v, out) {
                    if (out === void 0) { out = new Vector(); }
                    Vector.subtract(v, affine.vector, out);
                    Matrix.untransform(affine.matrix, out, out);
                    return out;
                };
                return Affine;
            }());
            exports_1("Affine", Affine);
            Position = (function (_super) {
                __extends(Position, _super);
                function Position() {
                    return _super.call(this, 0, 0) || this;
                }
                return Position;
            }(Vector));
            exports_1("Position", Position);
            Rotation = (function (_super) {
                __extends(Rotation, _super);
                function Rotation() {
                    var _this = _super.call(this, 0) || this;
                    _this.matrix = new Matrix();
                    return _this;
                }
                Rotation.prototype.updateMatrix = function (m) {
                    if (m === void 0) { m = this.matrix; }
                    m.a = this.cos;
                    m.b = -this.sin;
                    m.c = this.sin;
                    m.d = this.cos;
                    return m;
                };
                return Rotation;
            }(Angle));
            exports_1("Rotation", Rotation);
            Scale = (function (_super) {
                __extends(Scale, _super);
                function Scale() {
                    return _super.call(this) || this;
                }
                Object.defineProperty(Scale.prototype, "x", {
                    get: function () { return (Math.abs(this.c) < EPSILON) ? (this.a) : (signum(this.a) * Math.sqrt(this.a * this.a + this.c * this.c)); },
                    set: function (value) { this.a = value; this.c = 0; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Scale.prototype, "y", {
                    get: function () { return (Math.abs(this.b) < EPSILON) ? (this.d) : (signum(this.d) * Math.sqrt(this.b * this.b + this.d * this.d)); },
                    set: function (value) { this.b = 0; this.d = value; },
                    enumerable: true,
                    configurable: true
                });
                return Scale;
            }(Matrix));
            exports_1("Scale", Scale);
            Shear = (function () {
                function Shear() {
                    this.x = new Angle();
                    this.y = new Angle();
                    this.matrix = new Matrix();
                }
                Shear.prototype.updateMatrix = function (m) {
                    if (m === void 0) { m = this.matrix; }
                    m.a = this.x.cos;
                    m.b = -this.y.sin;
                    m.c = this.x.sin;
                    m.d = this.y.cos;
                    return m;
                };
                Shear.copy = function (shear, out) {
                    if (out === void 0) { out = new Shear(); }
                    out.x.copy(shear.x);
                    out.y.copy(shear.y);
                    return out;
                };
                Shear.prototype.copy = function (other) {
                    return Shear.copy(other, this);
                };
                Shear.equal = function (a, b, epsilon) {
                    if (epsilon === void 0) { epsilon = EPSILON; }
                    if (!a.x.equal(b.x, epsilon)) {
                        return false;
                    }
                    if (!a.y.equal(b.y, epsilon)) {
                        return false;
                    }
                    return true;
                };
                Shear.prototype.equal = function (other, epsilon) {
                    if (epsilon === void 0) { epsilon = EPSILON; }
                    return Shear.equal(this, other, epsilon);
                };
                Shear.tween = function (a, b, pct, out) {
                    if (out === void 0) { out = new Shear(); }
                    Angle.tween(a.x, b.x, pct, out.x);
                    Angle.tween(a.y, b.y, pct, out.y);
                    return out;
                };
                Shear.prototype.tween = function (other, pct, out) {
                    if (out === void 0) { out = new Shear(); }
                    return Shear.tween(this, other, pct, out);
                };
                Shear.prototype.selfTween = function (other, pct) {
                    return Shear.tween(this, other, pct, this);
                };
                return Shear;
            }());
            exports_1("Shear", Shear);
            Space = (function () {
                function Space() {
                    this.position = new Position();
                    this.rotation = new Rotation();
                    this.scale = new Scale();
                    this.shear = new Shear();
                    this.affine = new Affine();
                }
                Space.prototype.updateAffine = function (affine) {
                    if (affine === void 0) { affine = this.affine; }
                    Vector.copy(this.position, affine.vector);
                    Matrix.copy(this.rotation.updateMatrix(), affine.matrix);
                    Matrix.multiply(affine.matrix, this.shear.updateMatrix(), affine.matrix);
                    Matrix.multiply(affine.matrix, this.scale, affine.matrix);
                    return affine;
                };
                Space.copy = function (space, out) {
                    if (out === void 0) { out = new Space(); }
                    out.position.copy(space.position);
                    out.rotation.copy(space.rotation);
                    out.scale.copy(space.scale);
                    out.shear.copy(space.shear);
                    return out;
                };
                Space.prototype.copy = function (other) {
                    return Space.copy(other, this);
                };
                Space.prototype.load = function (json) {
                    this.position.x = loadFloat(json, "x", 0);
                    this.position.y = loadFloat(json, "y", 0);
                    this.rotation.deg = loadFloat(json, "rotation", 0);
                    this.scale.x = loadFloat(json, "scaleX", 1);
                    this.scale.y = loadFloat(json, "scaleY", 1);
                    this.shear.x.deg = loadFloat(json, "shearX", 0);
                    this.shear.y.deg = loadFloat(json, "shearY", 0);
                    return this;
                };
                Space.equal = function (a, b, epsilon) {
                    if (epsilon === void 0) { epsilon = EPSILON; }
                    if (!a.position.equal(b.position, epsilon)) {
                        return false;
                    }
                    if (!a.rotation.equal(b.rotation, epsilon)) {
                        return false;
                    }
                    if (!a.scale.equal(b.scale, epsilon)) {
                        return false;
                    }
                    if (!a.shear.equal(b.shear, epsilon)) {
                        return false;
                    }
                    return true;
                };
                Space.prototype.equal = function (other, epsilon) {
                    if (epsilon === void 0) { epsilon = EPSILON; }
                    return Space.equal(this, other, epsilon);
                };
                Space.identity = function (out) {
                    if (out === void 0) { out = new Space(); }
                    out.position.x = 0;
                    out.position.y = 0;
                    out.rotation.rad = 0;
                    out.scale.x = 1;
                    out.scale.y = 1;
                    out.shear.x.rad = 0;
                    out.shear.y.rad = 0;
                    return out;
                };
                Space.translate = function (space, x, y) {
                    Space.transform(space, new Vector(x, y), space.position);
                    return space;
                };
                Space.rotate = function (space, rad) {
                    if (Matrix.determinant(space.scale) < 0.0) {
                        space.rotation.rad = wrapAngleRadians(space.rotation.rad - rad);
                    }
                    else {
                        space.rotation.rad = wrapAngleRadians(space.rotation.rad + rad);
                    }
                    return space;
                };
                Space.scale = function (space, x, y) {
                    Matrix.scale(space.scale, x, y, space.scale);
                    return space;
                };
                Space.invert = function (space, out) {
                    if (out === void 0) { out = new Space(); }
                    if (space === out) {
                        space = Space.copy(space, new Space());
                    }
                    Affine.invert(space.updateAffine(), out.affine);
                    out.position.copy(out.affine.vector);
                    out.shear.x.rad = -space.shear.x.rad;
                    out.shear.y.rad = -space.shear.y.rad;
                    var x_axis_rad = Math.atan2(out.affine.matrix.c, out.affine.matrix.a);
                    out.rotation.rad = wrapAngleRadians(x_axis_rad - out.shear.x.rad);
                    Matrix.combine(out.rotation.updateMatrix(), out.shear.updateMatrix(), out.scale);
                    Matrix.extract(out.affine.matrix, out.scale, out.scale);
                    return out;
                };
                Space.combine = function (a, b, out) {
                    if (out === void 0) { out = new Space(); }
                    if (a === out) {
                        a = Space.copy(a, new Space());
                    }
                    if (b === out) {
                        b = Space.copy(b, new Space());
                    }
                    Affine.combine(a.updateAffine(), b.updateAffine(), out.affine);
                    out.position.copy(out.affine.vector);
                    out.shear.x.rad = wrapAngleRadians(a.shear.x.rad + b.shear.x.rad);
                    out.shear.y.rad = wrapAngleRadians(a.shear.y.rad + b.shear.y.rad);
                    var x_axis_rad = Math.atan2(out.affine.matrix.c, out.affine.matrix.a);
                    out.rotation.rad = wrapAngleRadians(x_axis_rad - out.shear.x.rad);
                    Matrix.combine(out.rotation.updateMatrix(), out.shear.updateMatrix(), out.scale);
                    Matrix.extract(out.affine.matrix, out.scale, out.scale);
                    return out;
                };
                Space.extract = function (ab, a, out) {
                    if (out === void 0) { out = new Space(); }
                    if (ab === out) {
                        ab = Space.copy(ab, new Space());
                    }
                    if (a === out) {
                        a = Space.copy(a, new Space());
                    }
                    Affine.extract(ab.updateAffine(), a.updateAffine(), out.affine);
                    out.position.copy(out.affine.vector);
                    out.shear.x.rad = wrapAngleRadians(ab.shear.x.rad - a.shear.x.rad);
                    out.shear.y.rad = wrapAngleRadians(ab.shear.y.rad - a.shear.y.rad);
                    var x_axis_rad = Math.atan2(out.affine.matrix.c, out.affine.matrix.a);
                    out.rotation.rad = wrapAngleRadians(x_axis_rad - out.shear.x.rad);
                    Matrix.combine(out.rotation.updateMatrix(), out.shear.updateMatrix(), out.scale);
                    Matrix.extract(out.affine.matrix, out.scale, out.scale);
                    return out;
                };
                Space.transform = function (space, v, out) {
                    if (out === void 0) { out = new Vector(); }
                    return Affine.transform(space.updateAffine(), v, out);
                };
                Space.untransform = function (space, v, out) {
                    if (out === void 0) { out = new Vector(); }
                    return Affine.untransform(space.updateAffine(), v, out);
                };
                Space.tween = function (a, b, pct, out) {
                    if (out === void 0) { out = new Space(); }
                    a.position.tween(b.position, pct, out.position);
                    a.rotation.tween(b.rotation, pct, out.rotation);
                    a.scale.tween(b.scale, pct, out.scale);
                    a.shear.tween(b.shear, pct, out.shear);
                    return out;
                };
                Space.prototype.tween = function (other, pct, out) {
                    if (out === void 0) { out = new Space(); }
                    return Space.tween(this, other, pct, out);
                };
                Space.prototype.selfTween = function (other, pct) {
                    return Space.tween(this, other, pct, this);
                };
                return Space;
            }());
            exports_1("Space", Space);
            Bone = (function () {
                function Bone() {
                    this.color = new Color();
                    this.parent_key = "";
                    this.length = 0;
                    this.local_space = new Space();
                    this.world_space = new Space();
                    this.inherit_rotation = true;
                    this.inherit_scale = true;
                    this.transform = "normal";
                }
                Bone.prototype.copy = function (other) {
                    this.color.copy(other.color);
                    this.parent_key = other.parent_key;
                    this.length = other.length;
                    this.local_space.copy(other.local_space);
                    this.world_space.copy(other.world_space);
                    this.inherit_rotation = other.inherit_rotation;
                    this.inherit_scale = other.inherit_scale;
                    this.transform = other.transform;
                    return this;
                };
                Bone.prototype.load = function (json) {
                    this.color.load(json.color || 0x9b9b9bff);
                    this.parent_key = loadString(json, "parent", "");
                    this.length = loadFloat(json, "length", 0);
                    this.local_space.load(json);
                    this.inherit_rotation = loadBool(json, "inheritRotation", true);
                    this.inherit_scale = loadBool(json, "inheritScale", true);
                    this.transform = loadString(json, "transform", "normal");
                    if (json.transform) {
                        switch (json.transform) {
                            case "normal":
                                this.inherit_rotation = this.inherit_scale = true;
                                break;
                            case "onlyTranslation":
                                this.inherit_rotation = this.inherit_scale = false;
                                break;
                            case "noRotationOrReflection":
                                this.inherit_rotation = false;
                                break;
                            case "noScale":
                                this.inherit_scale = false;
                                break;
                            case "noScaleOrReflection":
                                this.inherit_scale = false;
                                break;
                            default:
                                console.log("TODO: Space.transform", json.transform);
                                break;
                        }
                    }
                    return this;
                };
                Bone.flatten = function (bone, bones) {
                    var bls = bone.local_space;
                    var bws = bone.world_space;
                    var parent = bones[bone.parent_key];
                    if (!parent) {
                        bws.copy(bls);
                        bws.updateAffine();
                    }
                    else {
                        Bone.flatten(parent, bones);
                        var pws = parent.world_space;
                        // compute bone world space position vector
                        Space.transform(pws, bls.position, bws.position);
                        // compute bone world affine rotation/scale matrix based in inheritance
                        if (bone.inherit_rotation && bone.inherit_scale) {
                            Matrix.copy(pws.affine.matrix, bws.affine.matrix);
                        }
                        else if (bone.inherit_rotation) {
                            Matrix.identity(bws.affine.matrix);
                            while (parent && parent.inherit_rotation) {
                                var pls = parent.local_space;
                                Matrix.rotate(bws.affine.matrix, pls.rotation.cos, pls.rotation.sin, bws.affine.matrix);
                                parent = bones[parent.parent_key];
                            }
                        }
                        else if (bone.inherit_scale) {
                            Matrix.identity(bws.affine.matrix);
                            while (parent && parent.inherit_scale) {
                                var pls = parent.local_space;
                                var cos = pls.rotation.cos, sin = pls.rotation.sin;
                                Matrix.rotate(bws.affine.matrix, cos, sin, bws.affine.matrix);
                                Matrix.multiply(bws.affine.matrix, pls.scale, bws.affine.matrix);
                                if (pls.scale.x >= 0) {
                                    sin = -sin;
                                }
                                Matrix.rotate(bws.affine.matrix, cos, sin, bws.affine.matrix);
                                parent = bones[parent.parent_key];
                            }
                        }
                        else {
                            Matrix.identity(bws.affine.matrix);
                        }
                        // apply bone local space
                        bls.updateAffine();
                        Matrix.multiply(bws.affine.matrix, bls.affine.matrix, bws.affine.matrix);
                        // update bone world space
                        bws.shear.x.rad = wrapAngleRadians(pws.shear.x.rad + bls.shear.x.rad);
                        bws.shear.y.rad = wrapAngleRadians(pws.shear.y.rad + bls.shear.y.rad);
                        var x_axis_rad = Math.atan2(bws.affine.matrix.c, bws.affine.matrix.a);
                        bws.rotation.rad = wrapAngleRadians(x_axis_rad - bws.shear.x.rad);
                        Matrix.combine(bws.rotation.updateMatrix(), bws.shear.updateMatrix(), bws.scale);
                        Matrix.extract(bws.affine.matrix, bws.scale, bws.scale);
                    }
                    return bone;
                };
                return Bone;
            }());
            exports_1("Bone", Bone);
            Constraint = (function () {
                function Constraint() {
                    this.name = "";
                    this.order = 0;
                }
                Constraint.prototype.load = function (json) {
                    this.name = loadString(json, "name", "");
                    this.order = loadInt(json, "order", 0);
                    return this;
                };
                return Constraint;
            }());
            exports_1("Constraint", Constraint);
            Ikc = (function (_super) {
                __extends(Ikc, _super);
                function Ikc() {
                    var _this = _super.apply(this, arguments) || this;
                    _this.bone_keys = [];
                    _this.target_key = "";
                    _this.mix = 1;
                    _this.bend_positive = true;
                    return _this;
                }
                Ikc.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.bone_keys = json["bones"] || [];
                    this.target_key = loadString(json, "target", "");
                    this.mix = loadFloat(json, "mix", 1);
                    this.bend_positive = loadBool(json, "bendPositive", true);
                    return this;
                };
                return Ikc;
            }(Constraint));
            exports_1("Ikc", Ikc);
            Xfc = (function (_super) {
                __extends(Xfc, _super);
                function Xfc() {
                    var _this = _super.apply(this, arguments) || this;
                    _this.bone_keys = [];
                    _this.target_key = "";
                    _this.position_mix = 1;
                    _this.position = new Position();
                    _this.rotation_mix = 1;
                    _this.rotation = new Rotation();
                    _this.scale_mix = 1;
                    _this.scale = new Scale();
                    _this.shear_mix = 1;
                    _this.shear = new Shear();
                    return _this;
                }
                Xfc.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.bone_keys = json["bones"] || [];
                    this.target_key = loadString(json, "target", "");
                    this.position_mix = loadFloat(json, "translateMix", 1);
                    this.position.x = loadFloat(json, "x", 0);
                    this.position.y = loadFloat(json, "y", 0);
                    this.rotation_mix = loadFloat(json, "rotateMix", 1);
                    this.rotation.deg = loadFloat(json, "rotation", 0);
                    this.scale_mix = loadFloat(json, "scaleMix", 1);
                    this.scale.x = loadFloat(json, "scaleX", 1);
                    this.scale.y = loadFloat(json, "scaleY", 1);
                    this.shear_mix = loadFloat(json, "shearMix", 1);
                    this.shear.x.deg = loadFloat(json, "shearX", 0);
                    this.shear.y.deg = loadFloat(json, "shearY", 0);
                    return this;
                };
                return Xfc;
            }(Constraint));
            exports_1("Xfc", Xfc);
            Ptc = (function (_super) {
                __extends(Ptc, _super);
                function Ptc() {
                    var _this = _super.apply(this, arguments) || this;
                    _this.bone_keys = [];
                    _this.target_key = "";
                    _this.spacing_mode = "length"; // "length", "fixed", "percent"
                    _this.spacing = 0;
                    _this.position_mode = "percent"; // "fixed", "percent"
                    _this.position_mix = 1;
                    _this.position = 0;
                    _this.rotation_mode = "tangent"; // "tangent", "chain", "chainscale"
                    _this.rotation_mix = 1;
                    _this.rotation = new Rotation();
                    return _this;
                }
                Ptc.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.bone_keys = json["bones"] || [];
                    this.target_key = loadString(json, "target", "");
                    this.spacing_mode = loadString(json, "spacingMode", "length");
                    this.spacing = loadFloat(json, "spacing", 0);
                    this.position_mode = loadString(json, "positionMode", "percent");
                    this.position_mix = loadFloat(json, "translateMix", 1);
                    this.position = loadFloat(json, "position", 0);
                    this.rotation_mode = loadString(json, "rotateMode", "tangent");
                    this.rotation_mix = loadFloat(json, "rotateMix", 1);
                    this.rotation.deg = loadFloat(json, "rotation", 0);
                    return this;
                };
                return Ptc;
            }(Constraint));
            exports_1("Ptc", Ptc);
            Slot = (function () {
                function Slot() {
                    this.bone_key = "";
                    this.color = new Color();
                    this.attachment_key = "";
                    this.blend = "normal";
                }
                Slot.prototype.copy = function (other) {
                    this.bone_key = other.bone_key;
                    this.color.copy(other.color);
                    this.attachment_key = other.attachment_key;
                    this.blend = other.blend;
                    return this;
                };
                Slot.prototype.load = function (json) {
                    this.bone_key = loadString(json, "bone", "");
                    this.color.load(json.color);
                    this.attachment_key = loadString(json, "attachment", "");
                    this.blend = loadString(json, "blend", "normal");
                    return this;
                };
                return Slot;
            }());
            exports_1("Slot", Slot);
            Attachment = (function () {
                function Attachment(type) {
                    this.type = "";
                    this.name = "";
                    this.path = "";
                    this.type = type;
                }
                Attachment.prototype.load = function (json) {
                    var attachment_type = loadString(json, "type", "region");
                    if (attachment_type !== this.type) {
                        throw new Error();
                    }
                    this.name = loadString(json, "name", "");
                    this.path = loadString(json, "path", "");
                    return this;
                };
                return Attachment;
            }());
            exports_1("Attachment", Attachment);
            RegionAttachment = (function (_super) {
                __extends(RegionAttachment, _super);
                function RegionAttachment() {
                    var _this = _super.call(this, "region") || this;
                    _this.color = new Color();
                    _this.local_space = new Space();
                    _this.width = 0;
                    _this.height = 0;
                    return _this;
                }
                RegionAttachment.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.color.load(json.color);
                    this.local_space.load(json);
                    this.width = loadFloat(json, "width", 0);
                    this.height = loadFloat(json, "height", 0);
                    return this;
                };
                return RegionAttachment;
            }(Attachment));
            exports_1("RegionAttachment", RegionAttachment);
            BoundingBoxAttachment = (function (_super) {
                __extends(BoundingBoxAttachment, _super);
                function BoundingBoxAttachment() {
                    var _this = _super.call(this, "boundingbox") || this;
                    _this.vertices = [];
                    return _this;
                }
                BoundingBoxAttachment.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    /// The x/y pairs that make up the vertices of the polygon.
                    this.vertices = json.vertices || [];
                    return this;
                };
                return BoundingBoxAttachment;
            }(Attachment));
            exports_1("BoundingBoxAttachment", BoundingBoxAttachment);
            MeshAttachment = (function (_super) {
                __extends(MeshAttachment, _super);
                function MeshAttachment() {
                    var _this = _super.call(this, "mesh") || this;
                    _this.color = new Color();
                    _this.triangles = [];
                    _this.edges = [];
                    _this.vertices = [];
                    _this.uvs = [];
                    _this.hull = 0;
                    return _this;
                }
                MeshAttachment.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.color.load(json.color);
                    this.triangles = json.triangles || [];
                    this.edges = json.edges || [];
                    this.vertices = json.vertices || [];
                    this.uvs = json.uvs || [];
                    this.hull = loadInt(json, "hull", 0);
                    return this;
                };
                return MeshAttachment;
            }(Attachment));
            exports_1("MeshAttachment", MeshAttachment);
            LinkedMeshAttachment = (function (_super) {
                __extends(LinkedMeshAttachment, _super);
                function LinkedMeshAttachment() {
                    var _this = _super.call(this, "linkedmesh") || this;
                    _this.color = new Color();
                    _this.skin_key = "";
                    _this.parent_key = "";
                    _this.inherit_deform = true;
                    _this.width = 0;
                    _this.height = 0;
                    return _this;
                }
                LinkedMeshAttachment.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.color.load(json.color);
                    this.skin_key = loadString(json, "skin", "");
                    this.parent_key = loadString(json, "parent", "");
                    this.inherit_deform = loadBool(json, "deform", true);
                    this.width = loadInt(json, "width", 0);
                    this.height = loadInt(json, "height", 0);
                    return this;
                };
                return LinkedMeshAttachment;
            }(Attachment));
            exports_1("LinkedMeshAttachment", LinkedMeshAttachment);
            WeightedMeshAttachment = (function (_super) {
                __extends(WeightedMeshAttachment, _super);
                function WeightedMeshAttachment() {
                    var _this = _super.call(this, "weightedmesh") || this;
                    _this.color = new Color();
                    _this.triangles = [];
                    _this.edges = [];
                    _this.vertices = [];
                    _this.uvs = [];
                    _this.hull = 0;
                    return _this;
                }
                WeightedMeshAttachment.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.color.load(json.color);
                    this.triangles = json.triangles || [];
                    this.edges = json.edges || [];
                    this.vertices = json.vertices || [];
                    this.uvs = json.uvs || [];
                    this.hull = loadInt(json, "hull", 0);
                    return this;
                };
                return WeightedMeshAttachment;
            }(Attachment));
            exports_1("WeightedMeshAttachment", WeightedMeshAttachment);
            PathAttachment = (function (_super) {
                __extends(PathAttachment, _super);
                function PathAttachment() {
                    var _this = _super.call(this, "path") || this;
                    _this.color = new Color();
                    _this.closed = false;
                    _this.accurate = true;
                    _this.lengths = [];
                    _this.vertex_count = 0;
                    _this.vertices = [];
                    return _this;
                }
                PathAttachment.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.color.load(json.color);
                    this.closed = loadBool(json, "closed", false);
                    this.accurate = loadBool(json, "constantSpeed", true);
                    this.lengths = json.lengths || [];
                    this.vertex_count = loadInt(json, "vertexCount", 0);
                    this.vertices = json.vertices || [];
                    return this;
                };
                return PathAttachment;
            }(Attachment));
            exports_1("PathAttachment", PathAttachment);
            SkinSlot = (function () {
                function SkinSlot() {
                    this.attachments = {};
                    this.attachment_keys = [];
                }
                SkinSlot.prototype.load = function (json) {
                    var _this = this;
                    this.attachment_keys = Object.keys(json || {});
                    this.attachment_keys.forEach(function (attachment_key) {
                        var json_attachment = json[attachment_key];
                        switch (json_attachment.type) {
                            default:
                            case "region":
                                _this.attachments[attachment_key] = new RegionAttachment().load(json_attachment);
                                break;
                            case "boundingbox":
                                _this.attachments[attachment_key] = new BoundingBoxAttachment().load(json_attachment);
                                break;
                            case "mesh":
                                if (json_attachment.vertices.length === json_attachment.uvs.length) {
                                    _this.attachments[attachment_key] = new MeshAttachment().load(json_attachment);
                                }
                                else {
                                    json_attachment.type = "weightedmesh";
                                    _this.attachments[attachment_key] = new WeightedMeshAttachment().load(json_attachment);
                                }
                                break;
                            case "linkedmesh":
                                _this.attachments[attachment_key] = new LinkedMeshAttachment().load(json_attachment);
                                break;
                            case "skinnedmesh":
                                json_attachment.type = "weightedmesh";
                            case "weightedmesh":
                                _this.attachments[attachment_key] = new WeightedMeshAttachment().load(json_attachment);
                                break;
                            case "path":
                                _this.attachments[attachment_key] = new PathAttachment().load(json_attachment);
                                break;
                        }
                    });
                    return this;
                };
                return SkinSlot;
            }());
            exports_1("SkinSlot", SkinSlot);
            Skin = (function () {
                function Skin() {
                    this.name = "";
                    this.slots = {};
                    this.slot_keys = [];
                }
                Skin.prototype.load = function (json) {
                    var _this = this;
                    this.name = loadString(json, "name", "");
                    this.slot_keys = Object.keys(json || {});
                    this.slot_keys.forEach(function (slot_key) {
                        _this.slots[slot_key] = new SkinSlot().load(json[slot_key]);
                    });
                    return this;
                };
                Skin.prototype.iterateAttachments = function (callback) {
                    var _this = this;
                    this.slot_keys.forEach(function (slot_key) {
                        var skin_slot = _this.slots[slot_key];
                        skin_slot.attachment_keys.forEach(function (attachment_key) {
                            var attachment = skin_slot.attachments[attachment_key];
                            callback(slot_key, skin_slot, attachment.name || attachment_key, attachment);
                        });
                    });
                };
                return Skin;
            }());
            exports_1("Skin", Skin);
            Event = (function () {
                function Event() {
                    this.name = "";
                    this.int_value = 0;
                    this.float_value = 0;
                    this.string_value = "";
                }
                Event.prototype.copy = function (other) {
                    this.name = other.name;
                    this.int_value = other.int_value;
                    this.float_value = other.float_value;
                    this.string_value = other.string_value;
                    return this;
                };
                Event.prototype.load = function (json) {
                    this.name = loadString(json, "name", "");
                    if (typeof (json["int"]) === "number") {
                        this.int_value = loadInt(json, "int", 0);
                    }
                    if (typeof (json["float"]) === "number") {
                        this.float_value = loadFloat(json, "float", 0);
                    }
                    if (typeof (json["string"]) === "string") {
                        this.string_value = loadString(json, "string", "");
                    }
                    return this;
                };
                return Event;
            }());
            exports_1("Event", Event);
            Keyframe = (function () {
                function Keyframe() {
                    this.time = 0;
                }
                Keyframe.prototype.drop = function () {
                    this.time = 0;
                    return this;
                };
                Keyframe.prototype.load = function (json) {
                    this.time = 1000 * loadFloat(json, "time", 0); // convert to ms
                    return this;
                };
                Keyframe.prototype.save = function (json) {
                    saveFloat(json, "time", this.time / 1000, 0); // convert to s
                    return this;
                };
                Keyframe.find = function (array, time) {
                    if (!array) {
                        return -1;
                    }
                    if (array.length <= 0) {
                        return -1;
                    }
                    if (time < array[0].time) {
                        return -1;
                    }
                    var last = array.length - 1;
                    if (time >= array[last].time) {
                        return last;
                    }
                    var lo = 0;
                    var hi = last;
                    if (hi === 0) {
                        return 0;
                    }
                    var current = hi >> 1;
                    while (true) {
                        if (array[current + 1].time <= time) {
                            lo = current + 1;
                        }
                        else {
                            hi = current;
                        }
                        if (lo === hi) {
                            return lo;
                        }
                        current = (lo + hi) >> 1;
                    }
                };
                Keyframe.compare = function (a, b) {
                    return a.time - b.time;
                };
                Keyframe.evaluate = function (keyframes, time, callback) {
                    var keyframe0_index = Keyframe.find(keyframes, time);
                    if (keyframe0_index !== -1) {
                        var keyframe1_index = keyframe0_index + 1;
                        var keyframe0 = keyframes[keyframe0_index];
                        var keyframe1 = keyframes[keyframe1_index] || keyframe0;
                        var k = (keyframe0.time === keyframe1.time) ? 0 : (time - keyframe0.time) / (keyframe1.time - keyframe0.time);
                        callback(keyframe0, keyframe0_index, keyframe1, keyframe1_index, k);
                    }
                };
                return Keyframe;
            }());
            exports_1("Keyframe", Keyframe);
            BoneKeyframe = (function (_super) {
                __extends(BoneKeyframe, _super);
                function BoneKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.curve = new Curve();
                    return _this;
                }
                BoneKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.curve.load(json.curve);
                    return this;
                };
                return BoneKeyframe;
            }(Keyframe));
            exports_1("BoneKeyframe", BoneKeyframe);
            BonePositionKeyframe = (function (_super) {
                __extends(BonePositionKeyframe, _super);
                function BonePositionKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.position = new Position();
                    return _this;
                }
                BonePositionKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.position.x = loadFloat(json, "x", 0);
                    this.position.y = loadFloat(json, "y", 0);
                    return this;
                };
                return BonePositionKeyframe;
            }(BoneKeyframe));
            exports_1("BonePositionKeyframe", BonePositionKeyframe);
            BoneRotationKeyframe = (function (_super) {
                __extends(BoneRotationKeyframe, _super);
                function BoneRotationKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.rotation = new Rotation();
                    return _this;
                }
                BoneRotationKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.rotation.deg = loadFloat(json, "angle", 0);
                    return this;
                };
                return BoneRotationKeyframe;
            }(BoneKeyframe));
            exports_1("BoneRotationKeyframe", BoneRotationKeyframe);
            BoneScaleKeyframe = (function (_super) {
                __extends(BoneScaleKeyframe, _super);
                function BoneScaleKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.scale = new Scale();
                    return _this;
                }
                BoneScaleKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.scale.x = loadFloat(json, "x", 1);
                    this.scale.y = loadFloat(json, "y", 1);
                    return this;
                };
                return BoneScaleKeyframe;
            }(BoneKeyframe));
            exports_1("BoneScaleKeyframe", BoneScaleKeyframe);
            BoneShearKeyframe = (function (_super) {
                __extends(BoneShearKeyframe, _super);
                function BoneShearKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.shear = new Shear();
                    return _this;
                }
                BoneShearKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.shear.x.deg = loadFloat(json, "x", 0);
                    this.shear.y.deg = loadFloat(json, "y", 0);
                    return this;
                };
                return BoneShearKeyframe;
            }(BoneKeyframe));
            exports_1("BoneShearKeyframe", BoneShearKeyframe);
            BoneTimeline = (function () {
                function BoneTimeline() {
                    this.min_time = 0;
                    this.max_time = 0;
                }
                BoneTimeline.prototype.load = function (json) {
                    var _this = this;
                    this.min_time = 0;
                    this.max_time = 0;
                    delete this.position_keyframes;
                    delete this.rotation_keyframes;
                    delete this.scale_keyframes;
                    delete this.shear_keyframes;
                    Object.keys(json || {}).forEach(function (key) {
                        switch (key) {
                            case "translate":
                                _this.position_keyframes = [];
                                json.translate.forEach(function (translate_json) {
                                    var position_keyframe = new BonePositionKeyframe().load(translate_json);
                                    _this.position_keyframes.push(position_keyframe);
                                    _this.min_time = Math.min(_this.min_time, position_keyframe.time);
                                    _this.max_time = Math.max(_this.max_time, position_keyframe.time);
                                });
                                _this.position_keyframes.sort(Keyframe.compare);
                                break;
                            case "rotate":
                                _this.rotation_keyframes = [];
                                json.rotate.forEach(function (rotate_json) {
                                    var rotation_keyframe = new BoneRotationKeyframe().load(rotate_json);
                                    _this.rotation_keyframes.push(rotation_keyframe);
                                    _this.min_time = Math.min(_this.min_time, rotation_keyframe.time);
                                    _this.max_time = Math.max(_this.max_time, rotation_keyframe.time);
                                });
                                _this.rotation_keyframes.sort(Keyframe.compare);
                                break;
                            case "scale":
                                _this.scale_keyframes = [];
                                json.scale.forEach(function (scale_json) {
                                    var scale_keyframe = new BoneScaleKeyframe().load(scale_json);
                                    _this.scale_keyframes.push(scale_keyframe);
                                    _this.min_time = Math.min(_this.min_time, scale_keyframe.time);
                                    _this.max_time = Math.max(_this.max_time, scale_keyframe.time);
                                });
                                _this.scale_keyframes.sort(Keyframe.compare);
                                break;
                            case "shear":
                                _this.shear_keyframes = [];
                                json.shear.forEach(function (shear_json) {
                                    var shear_keyframe = new BoneShearKeyframe().load(shear_json);
                                    _this.shear_keyframes.push(shear_keyframe);
                                    _this.min_time = Math.min(_this.min_time, shear_keyframe.time);
                                    _this.max_time = Math.max(_this.max_time, shear_keyframe.time);
                                });
                                _this.shear_keyframes.sort(Keyframe.compare);
                                break;
                            default:
                                console.log("TODO: BoneTimeline::load", key);
                                break;
                        }
                    });
                    return this;
                };
                return BoneTimeline;
            }());
            exports_1("BoneTimeline", BoneTimeline);
            SlotKeyframe = (function (_super) {
                __extends(SlotKeyframe, _super);
                function SlotKeyframe() {
                    return _super.call(this) || this;
                }
                SlotKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    return this;
                };
                return SlotKeyframe;
            }(Keyframe));
            exports_1("SlotKeyframe", SlotKeyframe);
            SlotColorKeyframe = (function (_super) {
                __extends(SlotColorKeyframe, _super);
                function SlotColorKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.curve = new Curve();
                    _this.color = new Color();
                    return _this;
                }
                SlotColorKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.curve.load(json.curve);
                    this.color.load(json.color);
                    return this;
                };
                return SlotColorKeyframe;
            }(SlotKeyframe));
            exports_1("SlotColorKeyframe", SlotColorKeyframe);
            SlotAttachmentKeyframe = (function (_super) {
                __extends(SlotAttachmentKeyframe, _super);
                function SlotAttachmentKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.name = "";
                    return _this;
                }
                SlotAttachmentKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.name = loadString(json, "name", "");
                    return this;
                };
                return SlotAttachmentKeyframe;
            }(SlotKeyframe));
            exports_1("SlotAttachmentKeyframe", SlotAttachmentKeyframe);
            SlotTimeline = (function () {
                function SlotTimeline() {
                    this.min_time = 0;
                    this.max_time = 0;
                }
                SlotTimeline.prototype.load = function (json) {
                    var _this = this;
                    this.min_time = 0;
                    this.max_time = 0;
                    delete this.color_keyframes;
                    delete this.attachment_keyframes;
                    Object.keys(json || {}).forEach(function (key) {
                        switch (key) {
                            case "color":
                                _this.color_keyframes = [];
                                json[key].forEach(function (color) {
                                    var color_keyframe = new SlotColorKeyframe().load(color);
                                    _this.min_time = Math.min(_this.min_time, color_keyframe.time);
                                    _this.max_time = Math.max(_this.max_time, color_keyframe.time);
                                    _this.color_keyframes.push(color_keyframe);
                                });
                                _this.color_keyframes.sort(Keyframe.compare);
                                break;
                            case "attachment":
                                _this.attachment_keyframes = [];
                                json[key].forEach(function (attachment) {
                                    var attachment_keyframe = new SlotAttachmentKeyframe().load(attachment);
                                    _this.min_time = Math.min(_this.min_time, attachment_keyframe.time);
                                    _this.max_time = Math.max(_this.max_time, attachment_keyframe.time);
                                    _this.attachment_keyframes.push(attachment_keyframe);
                                });
                                _this.attachment_keyframes.sort(Keyframe.compare);
                                break;
                            default:
                                console.log("TODO: SlotTimeline::load", key);
                                break;
                        }
                    });
                    return this;
                };
                return SlotTimeline;
            }());
            exports_1("SlotTimeline", SlotTimeline);
            EventKeyframe = (function (_super) {
                __extends(EventKeyframe, _super);
                function EventKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.name = "";
                    _this.int_value = 0;
                    _this.float_value = 0;
                    _this.string_value = "";
                    return _this;
                }
                EventKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.name = loadString(json, "name", "");
                    if (typeof (json["int"]) === "number") {
                        this.int_value = loadInt(json, "int", 0);
                    }
                    if (typeof (json["float"]) === "number") {
                        this.float_value = loadFloat(json, "float", 0);
                    }
                    if (typeof (json["string"]) === "string") {
                        this.string_value = loadString(json, "string", "");
                    }
                    return this;
                };
                return EventKeyframe;
            }(Keyframe));
            exports_1("EventKeyframe", EventKeyframe);
            SlotOffset = (function () {
                function SlotOffset() {
                    this.slot_key = "";
                    this.offset = 0;
                }
                SlotOffset.prototype.load = function (json) {
                    this.slot_key = loadString(json, "slot", "");
                    this.offset = loadInt(json, "offset", 0);
                    return this;
                };
                return SlotOffset;
            }());
            exports_1("SlotOffset", SlotOffset);
            OrderKeyframe = (function (_super) {
                __extends(OrderKeyframe, _super);
                function OrderKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.slot_offsets = [];
                    return _this;
                }
                OrderKeyframe.prototype.load = function (json) {
                    var _this = this;
                    _super.prototype.load.call(this, json);
                    this.slot_offsets = [];
                    Object.keys(json || {}).forEach(function (key) {
                        switch (key) {
                            case "offsets":
                                json[key].forEach(function (offset) {
                                    _this.slot_offsets.push(new SlotOffset().load(offset));
                                });
                                break;
                        }
                    });
                    return this;
                };
                return OrderKeyframe;
            }(Keyframe));
            exports_1("OrderKeyframe", OrderKeyframe);
            IkcKeyframe = (function (_super) {
                __extends(IkcKeyframe, _super);
                function IkcKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.curve = new Curve();
                    _this.mix = 1;
                    _this.bend_positive = true;
                    return _this;
                }
                IkcKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.curve.load(json.curve);
                    this.mix = loadFloat(json, "mix", 1);
                    this.bend_positive = loadBool(json, "bendPositive", true);
                    return this;
                };
                return IkcKeyframe;
            }(Keyframe));
            exports_1("IkcKeyframe", IkcKeyframe);
            IkcTimeline = (function () {
                function IkcTimeline() {
                    this.min_time = 0;
                    this.max_time = 0;
                }
                IkcTimeline.prototype.load = function (json) {
                    var _this = this;
                    this.min_time = 0;
                    this.max_time = 0;
                    this.ikc_keyframes = [];
                    json.forEach(function (ikc) {
                        var ikc_keyframe = new IkcKeyframe().load(ikc);
                        _this.min_time = Math.min(_this.min_time, ikc_keyframe.time);
                        _this.max_time = Math.max(_this.max_time, ikc_keyframe.time);
                        _this.ikc_keyframes.push(ikc_keyframe);
                    });
                    this.ikc_keyframes.sort(Keyframe.compare);
                    return this;
                };
                return IkcTimeline;
            }());
            exports_1("IkcTimeline", IkcTimeline);
            XfcKeyframe = (function (_super) {
                __extends(XfcKeyframe, _super);
                function XfcKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.curve = new Curve();
                    _this.position_mix = 1;
                    _this.rotation_mix = 1;
                    _this.scale_mix = 1;
                    _this.shear_mix = 1;
                    return _this;
                }
                XfcKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.curve.load(json.curve);
                    this.position_mix = loadFloat(json, "translateMix", 1);
                    this.rotation_mix = loadFloat(json, "rotateMix", 1);
                    this.scale_mix = loadFloat(json, "scaleMix", 1);
                    this.shear_mix = loadFloat(json, "shearMix", 1);
                    return this;
                };
                return XfcKeyframe;
            }(Keyframe));
            exports_1("XfcKeyframe", XfcKeyframe);
            XfcTimeline = (function () {
                function XfcTimeline() {
                    this.min_time = 0;
                    this.max_time = 0;
                }
                XfcTimeline.prototype.load = function (json) {
                    var _this = this;
                    this.min_time = 0;
                    this.max_time = 0;
                    this.xfc_keyframes = [];
                    json.forEach(function (xfc) {
                        var xfc_keyframe = new XfcKeyframe().load(xfc);
                        _this.min_time = Math.min(_this.min_time, xfc_keyframe.time);
                        _this.max_time = Math.max(_this.max_time, xfc_keyframe.time);
                        _this.xfc_keyframes.push(xfc_keyframe);
                    });
                    this.xfc_keyframes.sort(Keyframe.compare);
                    return this;
                };
                return XfcTimeline;
            }());
            exports_1("XfcTimeline", XfcTimeline);
            PtcKeyframe = (function (_super) {
                __extends(PtcKeyframe, _super);
                function PtcKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.curve = new Curve();
                    return _this;
                }
                PtcKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.curve.load(json.curve);
                    return this;
                };
                return PtcKeyframe;
            }(Keyframe));
            exports_1("PtcKeyframe", PtcKeyframe);
            PtcMixKeyframe = (function (_super) {
                __extends(PtcMixKeyframe, _super);
                function PtcMixKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.position_mix = 0;
                    _this.rotation_mix = 0;
                    return _this;
                }
                PtcMixKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.position_mix = loadFloat(json, "translateMix", 1);
                    this.rotation_mix = loadFloat(json, "rotateMix", 1);
                    return this;
                };
                return PtcMixKeyframe;
            }(PtcKeyframe));
            exports_1("PtcMixKeyframe", PtcMixKeyframe);
            PtcSpacingKeyframe = (function (_super) {
                __extends(PtcSpacingKeyframe, _super);
                function PtcSpacingKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.spacing = 0;
                    return _this;
                }
                PtcSpacingKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.spacing = loadFloat(json, "spacing", 0);
                    return this;
                };
                return PtcSpacingKeyframe;
            }(PtcKeyframe));
            exports_1("PtcSpacingKeyframe", PtcSpacingKeyframe);
            PtcPositionKeyframe = (function (_super) {
                __extends(PtcPositionKeyframe, _super);
                function PtcPositionKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.position = 0;
                    return _this;
                }
                PtcPositionKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.position = loadFloat(json, "position", 0);
                    return this;
                };
                return PtcPositionKeyframe;
            }(PtcKeyframe));
            exports_1("PtcPositionKeyframe", PtcPositionKeyframe);
            PtcRotationKeyframe = (function (_super) {
                __extends(PtcRotationKeyframe, _super);
                function PtcRotationKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.rotation = new Rotation();
                    return _this;
                }
                PtcRotationKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.rotation.deg = loadFloat(json, "rotation", 0);
                    return this;
                };
                return PtcRotationKeyframe;
            }(PtcKeyframe));
            exports_1("PtcRotationKeyframe", PtcRotationKeyframe);
            PtcTimeline = (function () {
                function PtcTimeline() {
                    this.min_time = 0;
                    this.max_time = 0;
                }
                PtcTimeline.prototype.load = function (json) {
                    var _this = this;
                    this.min_time = 0;
                    this.max_time = 0;
                    this.ptc_mix_keyframes = [];
                    this.ptc_spacing_keyframes = [];
                    this.ptc_position_keyframes = [];
                    this.ptc_rotation_keyframes = [];
                    Object.keys(json || {}).forEach(function (key) {
                        switch (key) {
                            case "mix":
                                json[key].forEach(function (mix_json) {
                                    var ptc_mix_keyframe = new PtcMixKeyframe().load(mix_json);
                                    _this.min_time = Math.min(_this.min_time, ptc_mix_keyframe.time);
                                    _this.max_time = Math.max(_this.max_time, ptc_mix_keyframe.time);
                                    _this.ptc_mix_keyframes.push(ptc_mix_keyframe);
                                });
                                _this.ptc_mix_keyframes.sort(Keyframe.compare);
                                break;
                            case "spacing":
                                json[key].forEach(function (spacing_json) {
                                    var ptc_spacing_keyframe = new PtcSpacingKeyframe().load(spacing_json);
                                    _this.min_time = Math.min(_this.min_time, ptc_spacing_keyframe.time);
                                    _this.max_time = Math.max(_this.max_time, ptc_spacing_keyframe.time);
                                    _this.ptc_spacing_keyframes.push(ptc_spacing_keyframe);
                                });
                                _this.ptc_spacing_keyframes.sort(Keyframe.compare);
                                break;
                            case "position":
                                json[key].forEach(function (position_json) {
                                    var ptc_position_keyframe = new PtcPositionKeyframe().load(position_json);
                                    _this.min_time = Math.min(_this.min_time, ptc_position_keyframe.time);
                                    _this.max_time = Math.max(_this.max_time, ptc_position_keyframe.time);
                                    _this.ptc_position_keyframes.push(ptc_position_keyframe);
                                });
                                _this.ptc_position_keyframes.sort(Keyframe.compare);
                                break;
                            case "rotation":
                                json[key].forEach(function (rotation_json) {
                                    var ptc_rotation_keyframe = new PtcRotationKeyframe().load(rotation_json);
                                    _this.min_time = Math.min(_this.min_time, ptc_rotation_keyframe.time);
                                    _this.max_time = Math.max(_this.max_time, ptc_rotation_keyframe.time);
                                    _this.ptc_rotation_keyframes.push(ptc_rotation_keyframe);
                                });
                                _this.ptc_rotation_keyframes.sort(Keyframe.compare);
                                break;
                            default:
                                console.log("TODO: PtcTimeline::load", key);
                                break;
                        }
                    });
                    return this;
                };
                return PtcTimeline;
            }());
            exports_1("PtcTimeline", PtcTimeline);
            FfdKeyframe = (function (_super) {
                __extends(FfdKeyframe, _super);
                function FfdKeyframe() {
                    var _this = _super.call(this) || this;
                    _this.curve = new Curve();
                    _this.offset = 0;
                    _this.vertices = [];
                    return _this;
                }
                FfdKeyframe.prototype.load = function (json) {
                    _super.prototype.load.call(this, json);
                    this.curve.load(json.curve);
                    this.offset = loadInt(json, "offset", 0);
                    this.vertices = json.vertices || [];
                    return this;
                };
                return FfdKeyframe;
            }(Keyframe));
            exports_1("FfdKeyframe", FfdKeyframe);
            FfdAttachment = (function () {
                function FfdAttachment() {
                    this.min_time = 0;
                    this.max_time = 0;
                }
                FfdAttachment.prototype.load = function (json) {
                    var _this = this;
                    this.min_time = 0;
                    this.max_time = 0;
                    this.ffd_keyframes = [];
                    json.forEach(function (ffd_keyframe_json) {
                        var ffd_keyframe = new FfdKeyframe().load(ffd_keyframe_json);
                        _this.min_time = Math.min(_this.min_time, ffd_keyframe.time);
                        _this.max_time = Math.max(_this.max_time, ffd_keyframe.time);
                        _this.ffd_keyframes.push(ffd_keyframe);
                    });
                    this.ffd_keyframes.sort(Keyframe.compare);
                    return this;
                };
                return FfdAttachment;
            }());
            exports_1("FfdAttachment", FfdAttachment);
            FfdSlot = (function () {
                function FfdSlot() {
                    this.ffd_attachments = {};
                    this.ffd_attachment_keys = [];
                }
                FfdSlot.prototype.load = function (json) {
                    var _this = this;
                    this.ffd_attachments = {};
                    this.ffd_attachment_keys = Object.keys(json || {});
                    this.ffd_attachment_keys.forEach(function (key) {
                        _this.ffd_attachments[key] = new FfdAttachment().load(json[key]);
                    });
                    return this;
                };
                FfdSlot.prototype.iterateAttachments = function (callback) {
                    var _this = this;
                    this.ffd_attachment_keys.forEach(function (ffd_attachment_key) {
                        var ffd_attachment = _this.ffd_attachments[ffd_attachment_key];
                        callback(ffd_attachment_key, ffd_attachment);
                    });
                };
                return FfdSlot;
            }());
            exports_1("FfdSlot", FfdSlot);
            FfdTimeline = (function () {
                function FfdTimeline() {
                    this.min_time = 0;
                    this.max_time = 0;
                    this.ffd_slots = {};
                    this.ffd_slot_keys = [];
                }
                FfdTimeline.prototype.load = function (json) {
                    var _this = this;
                    this.min_time = 0;
                    this.max_time = 0;
                    this.ffd_slots = {};
                    this.ffd_slot_keys = Object.keys(json || {});
                    this.ffd_slot_keys.forEach(function (key) {
                        _this.ffd_slots[key] = new FfdSlot().load(json[key]);
                    });
                    this.iterateAttachments(function (ffd_slot_key, ffd_slot, ffd_attachment_key, ffd_attachment) {
                        _this.min_time = Math.min(_this.min_time, ffd_attachment.min_time);
                        _this.max_time = Math.max(_this.max_time, ffd_attachment.max_time);
                    });
                    return this;
                };
                FfdTimeline.prototype.iterateAttachments = function (callback) {
                    var _this = this;
                    this.ffd_slot_keys.forEach(function (ffd_slot_key) {
                        var ffd_slot = _this.ffd_slots[ffd_slot_key];
                        ffd_slot.iterateAttachments(function (ffd_attachment_key, ffd_attachment) {
                            callback(ffd_slot_key, ffd_slot, ffd_attachment_key, ffd_attachment);
                        });
                    });
                };
                return FfdTimeline;
            }());
            exports_1("FfdTimeline", FfdTimeline);
            Animation = (function () {
                function Animation() {
                    this.name = "";
                    this.bone_timeline_map = {};
                    this.slot_timeline_map = {};
                    this.ikc_timeline_map = {};
                    this.xfc_timeline_map = {};
                    this.ptc_timeline_map = {};
                    this.ffd_timeline_map = {};
                    this.min_time = 0;
                    this.max_time = 0;
                    this.length = 0;
                }
                Animation.prototype.load = function (json) {
                    var _this = this;
                    this.bone_timeline_map = {};
                    this.slot_timeline_map = {};
                    delete this.event_keyframes;
                    delete this.order_keyframes;
                    this.ikc_timeline_map = {};
                    this.xfc_timeline_map = {};
                    this.ptc_timeline_map = {};
                    this.ffd_timeline_map = {};
                    this.min_time = 0;
                    this.max_time = 0;
                    Object.keys(json || {}).forEach(function (key) {
                        switch (key) {
                            case "bones":
                                Object.keys(json[key] || {}).forEach(function (bone_key) {
                                    var bone_timeline = new BoneTimeline().load(json[key][bone_key]);
                                    _this.min_time = Math.min(_this.min_time, bone_timeline.min_time);
                                    _this.max_time = Math.max(_this.max_time, bone_timeline.max_time);
                                    _this.bone_timeline_map[bone_key] = bone_timeline;
                                });
                                break;
                            case "slots":
                                Object.keys(json[key] || {}).forEach(function (slot_key) {
                                    var slot_timeline = new SlotTimeline().load(json[key][slot_key]);
                                    _this.min_time = Math.min(_this.min_time, slot_timeline.min_time);
                                    _this.max_time = Math.max(_this.max_time, slot_timeline.max_time);
                                    _this.slot_timeline_map[slot_key] = slot_timeline;
                                });
                                break;
                            case "events":
                                _this.event_keyframes = [];
                                json[key].forEach(function (event) {
                                    var event_keyframe = new EventKeyframe().load(event);
                                    _this.min_time = Math.min(_this.min_time, event_keyframe.time);
                                    _this.max_time = Math.max(_this.max_time, event_keyframe.time);
                                    _this.event_keyframes.push(event_keyframe);
                                });
                                _this.event_keyframes.sort(Keyframe.compare);
                                break;
                            case "drawOrder":
                            case "draworder":
                                _this.order_keyframes = [];
                                json[key].forEach(function (order) {
                                    var order_keyframe = new OrderKeyframe().load(order);
                                    _this.min_time = Math.min(_this.min_time, order_keyframe.time);
                                    _this.max_time = Math.max(_this.max_time, order_keyframe.time);
                                    _this.order_keyframes.push(order_keyframe);
                                });
                                _this.order_keyframes.sort(Keyframe.compare);
                                break;
                            case "ik":
                                Object.keys(json[key] || {}).forEach(function (ikc_key) {
                                    var ikc_timeline = new IkcTimeline().load(json[key][ikc_key]);
                                    _this.min_time = Math.min(_this.min_time, ikc_timeline.min_time);
                                    _this.max_time = Math.max(_this.max_time, ikc_timeline.max_time);
                                    _this.ikc_timeline_map[ikc_key] = ikc_timeline;
                                });
                                break;
                            case "transform":
                                Object.keys(json[key] || {}).forEach(function (xfc_key) {
                                    var xfc_timeline = new XfcTimeline().load(json[key][xfc_key]);
                                    _this.min_time = Math.min(_this.min_time, xfc_timeline.min_time);
                                    _this.max_time = Math.max(_this.max_time, xfc_timeline.max_time);
                                    _this.xfc_timeline_map[xfc_key] = xfc_timeline;
                                });
                                break;
                            case "paths":
                                Object.keys(json[key] || {}).forEach(function (ptc_key) {
                                    var ptc_timeline = new PtcTimeline().load(json[key][ptc_key]);
                                    _this.min_time = Math.min(_this.min_time, ptc_timeline.min_time);
                                    _this.max_time = Math.max(_this.max_time, ptc_timeline.max_time);
                                    _this.ptc_timeline_map[ptc_key] = ptc_timeline;
                                });
                                break;
                            case "ffd":
                            case "deform":
                                Object.keys(json[key] || {}).forEach(function (ffd_key) {
                                    var ffd_timeline = new FfdTimeline().load(json[key][ffd_key]);
                                    _this.min_time = Math.min(_this.min_time, ffd_timeline.min_time);
                                    _this.max_time = Math.max(_this.max_time, ffd_timeline.max_time);
                                    _this.ffd_timeline_map[ffd_key] = ffd_timeline;
                                });
                                break;
                            default:
                                console.log("TODO: Animation::load", key);
                                break;
                        }
                    });
                    this.length = this.max_time - this.min_time;
                    return this;
                };
                return Animation;
            }());
            exports_1("Animation", Animation);
            Skeleton = (function () {
                function Skeleton() {
                    this.hash = "";
                    this.spine = "";
                    this.width = 0;
                    this.height = 0;
                    this.images = "";
                }
                Skeleton.prototype.load = function (json) {
                    this.hash = loadString(json, "hash", "");
                    this.spine = loadString(json, "spine", "");
                    this.width = loadInt(json, "width", 0);
                    this.height = loadInt(json, "height", 0);
                    this.images = loadString(json, "images", "");
                    return this;
                };
                return Skeleton;
            }());
            exports_1("Skeleton", Skeleton);
            Data = (function () {
                function Data() {
                    this.name = "";
                    this.skeleton = new Skeleton();
                    this.bones = {};
                    this.bone_keys = [];
                    this.ikcs = {};
                    this.ikc_keys = [];
                    this.xfcs = {};
                    this.xfc_keys = [];
                    this.ptcs = {};
                    this.ptc_keys = [];
                    this.slots = {};
                    this.slot_keys = [];
                    this.skins = {};
                    this.skin_keys = [];
                    this.events = {};
                    this.event_keys = [];
                    this.anims = {};
                    this.anim_keys = [];
                }
                Data.prototype.load = function (json) {
                    var _this = this;
                    this.bones = {};
                    this.bone_keys = [];
                    this.ikcs = {};
                    this.ikc_keys = [];
                    this.xfcs = {};
                    this.xfc_keys = [];
                    this.ptcs = {};
                    this.ptc_keys = [];
                    this.slots = {};
                    this.slot_keys = [];
                    this.skins = {};
                    this.skin_keys = [];
                    this.events = {};
                    this.event_keys = [];
                    this.anims = {};
                    this.anim_keys = [];
                    Object.keys(json || {}).forEach(function (key) {
                        switch (key) {
                            case "skeleton":
                                _this.skeleton.load(json[key]);
                                break;
                            case "bones":
                                var json_bones = json[key];
                                json_bones.forEach(function (bone, bone_index) {
                                    _this.bones[bone.name] = new Bone().load(bone);
                                    _this.bone_keys[bone_index] = bone.name;
                                });
                                break;
                            case "ik":
                                var json_ik = json[key];
                                json_ik.forEach(function (ikc, ikc_index) {
                                    _this.ikcs[ikc.name] = new Ikc().load(ikc);
                                    _this.ikc_keys[ikc_index] = ikc.name;
                                });
                                // sort by order
                                _this.ikc_keys.sort(function (a, b) {
                                    var ikc_a = _this.ikcs[a];
                                    var ikc_b = _this.ikcs[b];
                                    return ikc_a.order - ikc_b.order;
                                });
                                break;
                            case "transform":
                                var json_transform = json[key];
                                json_transform.forEach(function (xfc, xfc_index) {
                                    _this.xfcs[xfc.name] = new Xfc().load(xfc);
                                    _this.xfc_keys[xfc_index] = xfc.name;
                                });
                                // sort by order
                                _this.xfc_keys.sort(function (a, b) {
                                    var xfc_a = _this.xfcs[a];
                                    var xfc_b = _this.xfcs[b];
                                    return xfc_a.order - xfc_b.order;
                                });
                                break;
                            case "path":
                                var json_path = json[key];
                                json_path.forEach(function (ptc, ptc_index) {
                                    _this.ptcs[ptc.name] = new Ptc().load(ptc);
                                    _this.ptc_keys[ptc_index] = ptc.name;
                                });
                                // sort by order
                                _this.ptc_keys.sort(function (a, b) {
                                    var ptc_a = _this.ptcs[a];
                                    var ptc_b = _this.ptcs[b];
                                    return ptc_a.order - ptc_b.order;
                                });
                                break;
                            case "slots":
                                var json_slots = json[key];
                                json_slots.forEach(function (slot, slot_index) {
                                    _this.slots[slot.name] = new Slot().load(slot);
                                    _this.slot_keys[slot_index] = slot.name;
                                });
                                break;
                            case "skins":
                                var json_skins_1 = json[key] || {};
                                _this.skin_keys = Object.keys(json_skins_1);
                                _this.skin_keys.forEach(function (skin_key) {
                                    var skin = _this.skins[skin_key] = new Skin().load(json_skins_1[skin_key]);
                                    skin.name = skin.name || skin_key;
                                });
                                break;
                            case "events":
                                var json_events_1 = json[key] || {};
                                _this.event_keys = Object.keys(json_events_1);
                                _this.event_keys.forEach(function (event_key) {
                                    var event = _this.events[event_key] = new Event().load(json_events_1[event_key]);
                                    event.name = event.name || event_key;
                                });
                                break;
                            case "animations":
                                var json_animations_1 = json[key] || {};
                                _this.anim_keys = Object.keys(json_animations_1);
                                _this.anim_keys.forEach(function (anim_key) {
                                    var anim = _this.anims[anim_key] = new Animation().load(json_animations_1[anim_key]);
                                    anim.name = anim.name || anim_key;
                                });
                                break;
                            default:
                                console.log("TODO: Skeleton::load", key);
                                break;
                        }
                    });
                    this.iterateBones(function (bone_key, bone) {
                        Bone.flatten(bone, _this.bones);
                    });
                    return this;
                };
                Data.prototype.loadSkeleton = function (json) {
                    this.skeleton.load(json);
                    return this;
                };
                Data.prototype.loadEvent = function (name, json) {
                    var event = this.events[name] = new Event().load(json);
                    event.name = event.name || name;
                    return this;
                };
                Data.prototype.loadAnimation = function (name, json) {
                    var anim = this.anims[name] = new Animation().load(json);
                    anim.name = anim.name || name;
                    return this;
                };
                Data.prototype.getSkins = function () {
                    return this.skins;
                };
                Data.prototype.getEvents = function () {
                    return this.events;
                };
                Data.prototype.getAnims = function () {
                    return this.anims;
                };
                Data.prototype.iterateBones = function (callback) {
                    var _this = this;
                    this.bone_keys.forEach(function (bone_key) {
                        var data_bone = _this.bones[bone_key];
                        callback(bone_key, data_bone);
                    });
                };
                Data.prototype.iterateAttachments = function (skin_key, callback) {
                    var _this = this;
                    var skin = this.skins[skin_key];
                    var default_skin = this.skins["default"];
                    this.slot_keys.forEach(function (slot_key) {
                        var data_slot = _this.slots[slot_key];
                        var skin_slot = (skin && skin.slots[slot_key]) || default_skin.slots[slot_key];
                        var attachment = skin_slot && skin_slot.attachments[data_slot.attachment_key];
                        var attachment_key = (attachment && attachment.name) || data_slot.attachment_key;
                        if (attachment && (attachment.type === "linkedmesh")) {
                            attachment_key = attachment && attachment.parent_key;
                            attachment = skin_slot && skin_slot.attachments[attachment_key];
                        }
                        callback(slot_key, data_slot, skin_slot, attachment_key, attachment);
                    });
                };
                Data.prototype.iterateSkins = function (callback) {
                    var _this = this;
                    this.skin_keys.forEach(function (skin_key) {
                        var skin = _this.skins[skin_key];
                        callback(skin_key, skin);
                    });
                };
                Data.prototype.iterateEvents = function (callback) {
                    var _this = this;
                    this.event_keys.forEach(function (event_key) {
                        var event = _this.events[event_key];
                        callback(event_key, event);
                    });
                };
                Data.prototype.iterateAnims = function (callback) {
                    var _this = this;
                    this.anim_keys.forEach(function (anim_key) {
                        var anim = _this.anims[anim_key];
                        callback(anim_key, anim);
                    });
                };
                return Data;
            }());
            exports_1("Data", Data);
            Pose = (function () {
                function Pose(data) {
                    this.skin_key = "";
                    this.anim_key = "";
                    this.time = 0;
                    this.prev_time = 0;
                    this.elapsed_time = 0;
                    this.wrapped_min = false;
                    this.wrapped_max = false;
                    this.dirty = true;
                    this.bones = {};
                    this.bone_keys = [];
                    this.slots = {};
                    this.slot_keys = [];
                    this.events = [];
                    this.data = data;
                }
                Pose.prototype.curSkel = function () {
                    return this.data.skeleton;
                };
                Pose.prototype.getSkins = function () {
                    return this.data.skins;
                };
                Pose.prototype.curSkin = function () {
                    return this.data.skins[this.skin_key];
                };
                Pose.prototype.getSkin = function () {
                    return this.skin_key;
                };
                Pose.prototype.setSkin = function (skin_key) {
                    if (this.skin_key !== skin_key) {
                        this.skin_key = skin_key;
                    }
                };
                Pose.prototype.getAnims = function () {
                    return this.data.anims;
                };
                Pose.prototype.curAnim = function () {
                    return this.data.anims[this.anim_key];
                };
                Pose.prototype.curAnimLength = function () {
                    var anim = this.data.anims[this.anim_key];
                    return (anim && anim.length) || 0;
                };
                Pose.prototype.getAnim = function () {
                    return this.anim_key;
                };
                Pose.prototype.setAnim = function (anim_key) {
                    if (this.anim_key !== anim_key) {
                        this.anim_key = anim_key;
                        var anim = this.data.anims[this.anim_key];
                        if (anim) {
                            this.time = wrap(this.time, anim.min_time, anim.max_time);
                        }
                        this.prev_time = this.time;
                        this.elapsed_time = 0;
                        this.dirty = true;
                    }
                };
                Pose.prototype.getTime = function () {
                    return this.time;
                };
                Pose.prototype.setTime = function (time) {
                    var anim = this.data.anims[this.anim_key];
                    if (anim) {
                        time = wrap(time, anim.min_time, anim.max_time);
                    }
                    if (this.time !== time) {
                        this.time = time;
                        this.prev_time = this.time;
                        this.elapsed_time = 0;
                        this.dirty = true;
                    }
                };
                Pose.prototype.update = function (elapsed_time) {
                    this.elapsed_time += elapsed_time;
                    this.dirty = true;
                };
                Pose.prototype.strike = function () {
                    if (!this.dirty) {
                        return;
                    }
                    this.dirty = false;
                    this.prev_time = this.time; // save previous time
                    this.time += this.elapsed_time; // accumulate elapsed time
                    this.elapsed_time = 0; // reset elapsed time for next strike
                    var anim = this.data.anims[this.anim_key];
                    this.wrapped_min = false;
                    this.wrapped_max = false;
                    if (anim) {
                        this.wrapped_min = (this.time < this.prev_time) && (this.time <= anim.min_time);
                        this.wrapped_max = (this.time > this.prev_time) && (this.time >= anim.max_time);
                        this.time = wrap(this.time, anim.min_time, anim.max_time);
                    }
                    this._strikeBones(anim);
                    this._strikeIkcs(anim); // Inverse Kinematic Constraints
                    this._strikeXfcs(anim); // Transform Constraints
                    this._strikeSlots(anim);
                    this._strikePtcs(anim); // Path Constraints
                    this._strikeEvents(anim);
                };
                Pose.prototype._strikeBones = function (anim) {
                    var _this = this;
                    this.data.bone_keys.forEach(function (bone_key) {
                        var data_bone = _this.data.bones[bone_key];
                        var pose_bone = _this.bones[bone_key] || (_this.bones[bone_key] = new Bone());
                        // start with a copy of the data bone
                        pose_bone.copy(data_bone);
                        // tween anim bone if keyframes are available
                        var bone_timeline = anim && anim.bone_timeline_map[bone_key];
                        if (bone_timeline) {
                            Keyframe.evaluate(bone_timeline.position_keyframes, _this.time, function (keyframe0, keyframe0_index, keyframe1, keyframe1_index, k) {
                                var pct = keyframe0.curve.evaluate(k);
                                pose_bone.local_space.position.x += tween(keyframe0.position.x, keyframe1.position.x, pct);
                                pose_bone.local_space.position.y += tween(keyframe0.position.y, keyframe1.position.y, pct);
                            });
                            Keyframe.evaluate(bone_timeline.rotation_keyframes, _this.time, function (keyframe0, keyframe0_index, keyframe1, keyframe1_index, k) {
                                var pct = keyframe0.curve.evaluate(k);
                                pose_bone.local_space.rotation.rad += tweenAngleRadians(keyframe0.rotation.rad, keyframe1.rotation.rad, pct);
                            });
                            Keyframe.evaluate(bone_timeline.scale_keyframes, _this.time, function (keyframe0, keyframe0_index, keyframe1, keyframe1_index, k) {
                                var pct = keyframe0.curve.evaluate(k);
                                pose_bone.local_space.scale.a *= tween(keyframe0.scale.a, keyframe1.scale.a, pct);
                                pose_bone.local_space.scale.d *= tween(keyframe0.scale.d, keyframe1.scale.d, pct);
                            });
                            Keyframe.evaluate(bone_timeline.shear_keyframes, _this.time, function (keyframe0, keyframe0_index, keyframe1, keyframe1_index, k) {
                                var pct = keyframe0.curve.evaluate(k);
                                pose_bone.local_space.shear.x.rad += tweenAngleRadians(keyframe0.shear.x.rad, keyframe1.shear.x.rad, pct);
                                pose_bone.local_space.shear.y.rad += tweenAngleRadians(keyframe0.shear.y.rad, keyframe1.shear.y.rad, pct);
                            });
                        }
                    });
                    this.bone_keys = this.data.bone_keys;
                    this.iterateBones(function (bone_key, bone) {
                        Bone.flatten(bone, _this.bones);
                    });
                };
                Pose.prototype._strikeIkcs = function (anim) {
                    var _this = this;
                    this.data.ikc_keys.forEach(function (ikc_key) {
                        var ikc = _this.data.ikcs[ikc_key];
                        var ikc_mix = ikc.mix;
                        var ikc_bend_positive = ikc.bend_positive;
                        var ikc_timeline = anim && anim.ikc_timeline_map[ikc_key];
                        if (ikc_timeline) {
                            Keyframe.evaluate(ikc_timeline.ikc_keyframes, _this.time, function (keyframe0, keyframe0_index, keyframe1, keyframe1_index, k) {
                                ikc_mix = tween(keyframe0.mix, keyframe1.mix, keyframe0.curve.evaluate(k));
                                // no tweening ik bend direction
                                ikc_bend_positive = keyframe0.bend_positive;
                            });
                        }
                        var alpha = ikc_mix;
                        var bendDir = (ikc_bend_positive) ? (1) : (-1);
                        if (alpha === 0) {
                            return;
                        }
                        var target = _this.bones[ikc.target_key];
                        Bone.flatten(target, _this.bones);
                        switch (ikc.bone_keys.length) {
                            case 1: {
                                var bone = _this.bones[ikc.bone_keys[0]];
                                Bone.flatten(bone, _this.bones);
                                var a1 = Math.atan2(target.world_space.position.y - bone.world_space.position.y, target.world_space.position.x - bone.world_space.position.x);
                                var bone_parent = _this.bones[bone.parent_key];
                                if (bone_parent) {
                                    Bone.flatten(bone_parent, _this.bones);
                                    if (Matrix.determinant(bone_parent.world_space.scale) < 0) {
                                        a1 += bone_parent.world_space.rotation.rad;
                                    }
                                    else {
                                        a1 -= bone_parent.world_space.rotation.rad;
                                    }
                                }
                                bone.local_space.rotation.rad = tweenAngleRadians(bone.local_space.rotation.rad, a1, alpha);
                                break;
                            }
                            case 2: {
                                var parent_1 = _this.bones[ikc.bone_keys[0]];
                                Bone.flatten(parent_1, _this.bones);
                                var child = _this.bones[ikc.bone_keys[1]];
                                Bone.flatten(child, _this.bones);
                                ///const px: number = parent.local_space.position.x;
                                ///const py: number = parent.local_space.position.y;
                                var psx = parent_1.local_space.scale.x;
                                var psy = parent_1.local_space.scale.y;
                                var cy = child.local_space.position.y;
                                var csx = child.local_space.scale.x;
                                var offset1 = 0, offset2 = 0, sign2 = 1;
                                if (psx < 0) {
                                    psx = -psx;
                                    offset1 = Math.PI;
                                    sign2 = -1;
                                }
                                if (psy < 0) {
                                    psy = -psy;
                                    sign2 = -sign2;
                                }
                                if (csx < 0) {
                                    csx = -csx;
                                    offset2 = Math.PI;
                                }
                                var t = Vector.copy(target.world_space.position, new Vector());
                                var d = Vector.copy(child.world_space.position, new Vector());
                                var pp = _this.bones[parent_1.parent_key];
                                if (pp) {
                                    Bone.flatten(pp, _this.bones);
                                    Space.untransform(pp.world_space, t, t);
                                    Space.untransform(pp.world_space, d, d);
                                }
                                Vector.subtract(t, parent_1.local_space.position, t);
                                Vector.subtract(d, parent_1.local_space.position, d);
                                var tx = t.x, ty = t.y;
                                var dx = d.x, dy = d.y;
                                var l1 = Math.sqrt(dx * dx + dy * dy), l2 = child.length * csx, a1 = void 0, a2 = void 0;
                                outer: if (Math.abs(psx - psy) <= 0.0001) {
                                    l2 *= psx;
                                    var cos = (tx * tx + ty * ty - l1 * l1 - l2 * l2) / (2 * l1 * l2);
                                    if (cos < -1)
                                        cos = -1;
                                    else if (cos > 1)
                                        cos = 1; // clamp
                                    a2 = Math.acos(cos) * bendDir;
                                    var adj = l1 + l2 * cos;
                                    var opp = l2 * Math.sin(a2);
                                    a1 = Math.atan2(ty * adj - tx * opp, tx * adj + ty * opp);
                                }
                                else {
                                    cy = 0;
                                    var a = psx * l2;
                                    var b = psy * l2;
                                    var ta = Math.atan2(ty, tx);
                                    var aa = a * a;
                                    var bb = b * b;
                                    var ll = l1 * l1;
                                    var dd = tx * tx + ty * ty;
                                    var c0 = bb * ll + aa * dd - aa * bb;
                                    var c1 = -2 * bb * l1;
                                    var c2 = bb - aa;
                                    var _d = c1 * c1 - 4 * c2 * c0;
                                    if (_d >= 0) {
                                        var q = Math.sqrt(_d);
                                        if (c1 < 0)
                                            q = -q;
                                        q = -(c1 + q) / 2;
                                        var r0 = q / c2, r1 = c0 / q;
                                        var r = Math.abs(r0) < Math.abs(r1) ? r0 : r1;
                                        if (r * r <= dd) {
                                            var y_1 = Math.sqrt(dd - r * r) * bendDir;
                                            a1 = ta - Math.atan2(y_1, r);
                                            a2 = Math.atan2(y_1 / psy, (r - l1) / psx);
                                            break outer;
                                        }
                                    }
                                    var minAngle = 0, minDist = Number.MAX_VALUE, minX = 0, minY = 0;
                                    var maxAngle = 0, maxDist = 0, maxX = 0, maxY = 0;
                                    var angle = void 0, dist = void 0, x = void 0, y = void 0;
                                    x = l1 + a;
                                    dist = x * x;
                                    if (dist > maxDist) {
                                        maxAngle = 0;
                                        maxDist = dist;
                                        maxX = x;
                                    }
                                    x = l1 - a;
                                    dist = x * x;
                                    if (dist < minDist) {
                                        minAngle = Math.PI;
                                        minDist = dist;
                                        minX = x;
                                    }
                                    angle = Math.acos(-a * l1 / (aa - bb));
                                    x = a * Math.cos(angle) + l1;
                                    y = b * Math.sin(angle);
                                    dist = x * x + y * y;
                                    if (dist < minDist) {
                                        minAngle = angle;
                                        minDist = dist;
                                        minX = x;
                                        minY = y;
                                    }
                                    if (dist > maxDist) {
                                        maxAngle = angle;
                                        maxDist = dist;
                                        maxX = x;
                                        maxY = y;
                                    }
                                    if (dd <= (minDist + maxDist) / 2) {
                                        a1 = ta - Math.atan2(minY * bendDir, minX);
                                        a2 = minAngle * bendDir;
                                    }
                                    else {
                                        a1 = ta - Math.atan2(maxY * bendDir, maxX);
                                        a2 = maxAngle * bendDir;
                                    }
                                }
                                var offset = Math.atan2(cy, child.local_space.position.x) * sign2;
                                a1 = (a1 - offset) + offset1;
                                a2 = (a2 + offset) * sign2 + offset2;
                                parent_1.local_space.rotation.rad = tweenAngleRadians(parent_1.local_space.rotation.rad, a1, alpha);
                                child.local_space.rotation.rad = tweenAngleRadians(child.local_space.rotation.rad, a2, alpha);
                                break;
                            }
                        }
                    });
                    this.iterateBones(function (bone_key, bone) {
                        Bone.flatten(bone, _this.bones);
                    });
                };
                Pose.prototype._strikeXfcs = function (anim) {
                    var _this = this;
                    this.data.xfc_keys.forEach(function (xfc_key) {
                        var xfc = _this.data.xfcs[xfc_key];
                        var xfc_position_mix = xfc.position_mix;
                        var xfc_rotation_mix = xfc.rotation_mix;
                        var xfc_scale_mix = xfc.scale_mix;
                        var xfc_shear_mix = xfc.shear_mix;
                        var xfc_timeline = anim && anim.xfc_timeline_map[xfc_key];
                        if (xfc_timeline) {
                            Keyframe.evaluate(xfc_timeline.xfc_keyframes, _this.time, function (keyframe0, keyframe0_index, keyframe1, keyframe1_index, k) {
                                var pct = keyframe0.curve.evaluate(k);
                                xfc_position_mix = tween(keyframe0.position_mix, keyframe1.position_mix, pct);
                                xfc_rotation_mix = tween(keyframe0.rotation_mix, keyframe1.rotation_mix, pct);
                                xfc_scale_mix = tween(keyframe0.scale_mix, keyframe1.scale_mix, pct);
                                xfc_shear_mix = tween(keyframe0.shear_mix, keyframe1.shear_mix, pct);
                            });
                        }
                        var xfc_target = _this.bones[xfc.target_key];
                        var xfc_position = xfc.position;
                        var xfc_rotation = xfc.rotation;
                        var xfc_scale = xfc.scale;
                        var xfc_shear = xfc.shear;
                        var ta = xfc_target.world_space.affine.matrix.a, tb = xfc_target.world_space.affine.matrix.b;
                        var tc = xfc_target.world_space.affine.matrix.c, td = xfc_target.world_space.affine.matrix.d;
                        ///let degRadReflect = ta * td - tb * tc > 0 ? MathUtils.degRad : -MathUtils.degRad;
                        ///let offsetRotation = this.data.offsetRotation * degRadReflect;
                        ///let offsetShearY = this.data.offsetShearY * degRadReflect;
                        xfc.bone_keys.forEach(function (bone_key) {
                            var xfc_bone = _this.bones[bone_key];
                            if (xfc_position_mix !== 0) {
                                ///let temp = this.temp;
                                ///xfc_target.localToWorld(temp.set(xfc_position.x, xfc_position.y));
                                ///xfc_bone.world_space.affine.vector.x += (temp.x - xfc_bone.world_space.affine.vector.x) * xfc_position_mix;
                                ///xfc_bone.world_space.affine.vector.y += (temp.y - xfc_bone.world_space.affine.vector.y) * xfc_position_mix;
                                var xfc_world_position = Space.transform(xfc_target.world_space, xfc_position, new Vector());
                                xfc_bone.world_space.position.tween(xfc_world_position, xfc_position_mix, xfc_bone.world_space.position);
                            }
                            if (xfc_rotation_mix !== 0) {
                                var a = xfc_bone.world_space.affine.matrix.a; ///, b = xfc_bone.world_space.affine.matrix.b;
                                var c = xfc_bone.world_space.affine.matrix.c; ///, d = xfc_bone.world_space.affine.matrix.d;
                                var r = Math.atan2(tc, ta) - Math.atan2(c, a) + xfc_rotation.rad;
                                r = wrapAngleRadians(r);
                                r *= xfc_rotation_mix;
                                var cos = Math.cos(r), sin = Math.sin(r);
                                xfc_bone.world_space.affine.matrix.selfRotate(cos, sin);
                            }
                            if (xfc_scale_mix !== 0) {
                                var s = Math.sqrt(xfc_bone.world_space.affine.matrix.a * xfc_bone.world_space.affine.matrix.a + xfc_bone.world_space.affine.matrix.c * xfc_bone.world_space.affine.matrix.c);
                                var ts = Math.sqrt(ta * ta + tc * tc);
                                if (s > 0.00001)
                                    s = (s + (ts - s + xfc_scale.x) * xfc_scale_mix) / s;
                                xfc_bone.world_space.affine.matrix.a *= s;
                                xfc_bone.world_space.affine.matrix.c *= s;
                                s = Math.sqrt(xfc_bone.world_space.affine.matrix.b * xfc_bone.world_space.affine.matrix.b + xfc_bone.world_space.affine.matrix.d * xfc_bone.world_space.affine.matrix.d);
                                ts = Math.sqrt(tb * tb + td * td);
                                if (s > 0.00001)
                                    s = (s + (ts - s + xfc_scale.y) * xfc_scale_mix) / s;
                                xfc_bone.world_space.affine.matrix.b *= s;
                                xfc_bone.world_space.affine.matrix.d *= s;
                            }
                            if (xfc_shear_mix !== 0) {
                                var b = xfc_bone.world_space.affine.matrix.b, d = xfc_bone.world_space.affine.matrix.d;
                                var by = Math.atan2(d, b);
                                var r = Math.atan2(td, tb) - Math.atan2(tc, ta) - (by - Math.atan2(xfc_bone.world_space.affine.matrix.c, xfc_bone.world_space.affine.matrix.a));
                                r = wrapAngleRadians(r);
                                r = by + (r + xfc_shear.y.rad) * xfc_shear_mix;
                                var s = Math.sqrt(b * b + d * d);
                                xfc_bone.world_space.affine.matrix.b = Math.cos(r) * s;
                                xfc_bone.world_space.affine.matrix.d = Math.sin(r) * s;
                            }
                        });
                    });
                };
                Pose.prototype._strikeSlots = function (anim) {
                    var _this = this;
                    this.data.slot_keys.forEach(function (slot_key) {
                        var data_slot = _this.data.slots[slot_key];
                        var pose_slot = _this.slots[slot_key] || (_this.slots[slot_key] = new Slot());
                        // start with a copy of the data slot
                        pose_slot.copy(data_slot);
                        // tween anim slot if keyframes are available
                        var slot_timeline = anim && anim.slot_timeline_map[slot_key];
                        if (slot_timeline) {
                            Keyframe.evaluate(slot_timeline.color_keyframes, _this.time, function (keyframe0, keyframe0_index, keyframe1, keyframe1_index, k) {
                                keyframe0.color.tween(keyframe1.color, keyframe0.curve.evaluate(k), pose_slot.color);
                            });
                            Keyframe.evaluate(slot_timeline.attachment_keyframes, _this.time, function (keyframe0, keyframe0_index, keyframe1, keyframe1_index, k) {
                                // no tweening attachments
                                pose_slot.attachment_key = keyframe0.name;
                            });
                        }
                    });
                    this.slot_keys = this.data.slot_keys;
                    if (anim) {
                        Keyframe.evaluate(anim.order_keyframes, this.time, function (keyframe0, keyframe0_index, keyframe1, keyframe1_index, k) {
                            _this.slot_keys = _this.data.slot_keys.slice(0); // copy array before reordering
                            keyframe0.slot_offsets.forEach(function (slot_offset) {
                                var slot_index = _this.slot_keys.indexOf(slot_offset.slot_key);
                                if (slot_index !== -1) {
                                    // delete old position
                                    _this.slot_keys.splice(slot_index, 1);
                                    // insert new position
                                    _this.slot_keys.splice(slot_index + slot_offset.offset, 0, slot_offset.slot_key);
                                }
                            });
                        });
                    }
                };
                Pose.prototype._strikePtcs = function (anim) {
                    var _this = this;
                    var skin = this.data.skins[this.skin_key];
                    var default_skin = this.data.skins["default"];
                    this.data.ptc_keys.forEach(function (ptc_key) {
                        var ptc = _this.data.ptcs[ptc_key];
                        var slot_key = ptc.target_key;
                        var slot = _this.slots[slot_key];
                        var skin_slot = (skin && skin.slots[slot_key]) || default_skin.slots[slot_key];
                        var ptc_target = skin_slot && skin_slot.attachments[slot.attachment_key];
                        if (!(ptc_target instanceof PathAttachment))
                            return;
                        var ptc_spacing_mode = ptc.spacing_mode;
                        var ptc_spacing = ptc.spacing;
                        var ptc_position_mode = ptc.position_mode;
                        var ptc_position_mix = ptc.position_mix;
                        var ptc_position = ptc.position;
                        var ptc_rotation_mode = ptc.rotation_mode;
                        var ptc_rotation_mix = ptc.rotation_mix;
                        var ptc_rotation = ptc.rotation;
                        var ptc_timeline = anim && anim.ptc_timeline_map[ptc_key];
                        if (ptc_timeline) {
                            Keyframe.evaluate(ptc_timeline.ptc_mix_keyframes, _this.time, function (keyframe0, keyframe0_index, keyframe1, keyframe1_index, k) {
                                var pct = keyframe0.curve.evaluate(k);
                                ptc_position_mix = tween(keyframe0.position_mix, keyframe1.position_mix, pct);
                                ptc_rotation_mix = tween(keyframe0.rotation_mix, keyframe1.rotation_mix, pct);
                            });
                            Keyframe.evaluate(ptc_timeline.ptc_spacing_keyframes, _this.time, function (keyframe0, keyframe0_index, keyframe1, keyframe1_index, k) {
                                ptc_spacing = tween(keyframe0.spacing, keyframe1.spacing, keyframe0.curve.evaluate(k));
                            });
                            Keyframe.evaluate(ptc_timeline.ptc_position_keyframes, _this.time, function (keyframe0, keyframe0_index, keyframe1, keyframe1_index, k) {
                                ptc_position = tween(keyframe0.position, keyframe1.position, keyframe0.curve.evaluate(k));
                            });
                            Keyframe.evaluate(ptc_timeline.ptc_rotation_keyframes, _this.time, function (keyframe0, keyframe0_index, keyframe1, keyframe1_index, k) {
                                ptc_rotation.rad = tweenAngleRadians(keyframe0.rotation.rad, keyframe1.rotation.rad, keyframe0.curve.evaluate(k));
                            });
                        }
                        ptc.bone_keys.forEach(function (bone_key) {
                            var ptc_bone = _this.bones[bone_key];
                            if (!ptc_bone)
                                return;
                            // TODO: solve path constraint for ptc_bone (Bone) using ptc_target (PathAttachment)
                            switch (ptc_spacing_mode) {
                                case "length":
                                case "fixed":
                                case "percent":
                                    break;
                            }
                            switch (ptc_position_mode) {
                                case "fixed":
                                case "percent":
                                    break;
                            }
                            switch (ptc_rotation_mode) {
                                case "tangent":
                                case "chain":
                                case "chainscale":
                                    break;
                            }
                        });
                    });
                };
                Pose.prototype._strikeEvents = function (anim) {
                    var _this = this;
                    this.events.length = 0;
                    if (anim && anim.event_keyframes) {
                        var make_event_1 = function (event_keyframe) {
                            var pose_event = new Event();
                            var data_event = _this.data.events[event_keyframe.name];
                            if (data_event) {
                                pose_event.copy(data_event);
                            }
                            pose_event.int_value = event_keyframe.int_value || pose_event.int_value;
                            pose_event.float_value = event_keyframe.float_value || pose_event.float_value;
                            pose_event.string_value = event_keyframe.string_value || pose_event.string_value;
                            return pose_event;
                        };
                        if (this.time < this.prev_time) {
                            if (this.wrapped_min) {
                                // min    prev_time           time      max
                                //  |         |                |         |
                                //  ----------x                o<---------
                                // all events between min_time and prev_time, not including prev_time
                                // all events between max_time and time
                                anim.event_keyframes.forEach(function (event_keyframe) {
                                    if (((anim.min_time <= event_keyframe.time) && (event_keyframe.time < _this.prev_time)) ||
                                        ((_this.time <= event_keyframe.time) && (event_keyframe.time <= anim.max_time))) {
                                        _this.events.push(make_event_1(event_keyframe));
                                    }
                                });
                            }
                            else {
                                // min       time          prev_time    max
                                //  |         |                |         |
                                //            o<---------------x
                                // all events between time and prev_time, not including prev_time
                                anim.event_keyframes.forEach(function (event_keyframe) {
                                    if ((_this.time <= event_keyframe.time) && (event_keyframe.time < _this.prev_time)) {
                                        _this.events.push(make_event_1(event_keyframe));
                                    }
                                });
                            }
                        }
                        else {
                            if (this.wrapped_max) {
                                // min       time          prev_time    max
                                //  |         |                |         |
                                //  --------->o                x----------
                                // all events between prev_time and max_time, not including prev_time
                                // all events between min_time and time
                                anim.event_keyframes.forEach(function (event_keyframe) {
                                    if (((anim.min_time <= event_keyframe.time) && (event_keyframe.time <= _this.time)) ||
                                        ((_this.prev_time < event_keyframe.time) && (event_keyframe.time <= anim.max_time))) {
                                        _this.events.push(make_event_1(event_keyframe));
                                    }
                                });
                            }
                            else {
                                // min    prev_time           time      max
                                //  |         |                |         |
                                //            x--------------->o
                                // all events between prev_time and time, not including prev_time
                                anim.event_keyframes.forEach(function (event_keyframe) {
                                    if ((_this.prev_time < event_keyframe.time) && (event_keyframe.time <= _this.time)) {
                                        _this.events.push(make_event_1(event_keyframe));
                                    }
                                });
                            }
                        }
                    }
                };
                Pose.prototype.iterateBones = function (callback) {
                    var _this = this;
                    this.bone_keys.forEach(function (bone_key) {
                        var bone = _this.bones[bone_key];
                        callback(bone_key, bone);
                    });
                };
                Pose.prototype.iterateAttachments = function (callback) {
                    var _this = this;
                    var skin = this.data.skins[this.skin_key];
                    var default_skin = this.data.skins["default"];
                    this.slot_keys.forEach(function (slot_key) {
                        var pose_slot = _this.slots[slot_key];
                        var skin_slot = (skin && skin.slots[slot_key]) || default_skin.slots[slot_key];
                        var attachment = skin_slot && skin_slot.attachments[pose_slot.attachment_key];
                        var attachment_key = (attachment && attachment.name) || pose_slot.attachment_key;
                        if (attachment && (attachment.type === "linkedmesh")) {
                            attachment_key = attachment && attachment.parent_key;
                            attachment = skin_slot && skin_slot.attachments[attachment_key];
                        }
                        callback(slot_key, pose_slot, skin_slot, attachment_key, attachment);
                    });
                };
                return Pose;
            }());
            exports_1("Pose", Pose);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7Ozs7Ozs7O0lBUUgsa0JBQXlCLElBQVMsRUFBRSxHQUFvQixFQUFFLEdBQW9CO1FBQXBCLG9CQUFBLEVBQUEsV0FBb0I7UUFDNUUsSUFBTSxLQUFLLEdBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxDQUFDLE9BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsS0FBSyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7WUFDeEQsS0FBSyxTQUFTLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUM3QixTQUFTLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDdEIsQ0FBQztJQUNILENBQUM7O0lBRUQsa0JBQXlCLElBQVMsRUFBRSxHQUFvQixFQUFFLEtBQWMsRUFBRSxHQUFvQjtRQUFwQixvQkFBQSxFQUFBLFdBQW9CO1FBQzVGLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLENBQUM7SUFDSCxDQUFDOztJQUVELG1CQUEwQixJQUFTLEVBQUUsR0FBb0IsRUFBRSxHQUFlO1FBQWYsb0JBQUEsRUFBQSxPQUFlO1FBQ3hFLElBQU0sS0FBSyxHQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsQ0FBQyxPQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEtBQUssUUFBUSxFQUFFLE1B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RUFBRSxDQUFDO3dDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7d0NBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztvQ0FBQyxDQUFDO29DQUNyRSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztvQ0FDdkMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQ0FDN0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29DQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29DQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQzt3Q0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO3dDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7d0NBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQzt3Q0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO29DQUFDLENBQUM7b0NBQzdFLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7d0NBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzt3Q0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO3dDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7b0NBQUMsQ0FBQztvQ0FDN0UsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0NBQ2xDLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO3dDQUMzQyxFQUFFLEdBQUcsUUFBUSxHQUFHLE9BQU8sQ0FBQztvQ0FD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LFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDN0ssSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztnQ0FDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztvQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQ3RFLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUMxQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQ0FDMUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUN6SyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztnQ0FDbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztvQ0FBQyxDQUFDLEdBQUcsQ0FB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