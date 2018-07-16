var Block = function (core, pos, w, h) {
    this.sprite = new Sprite(w, h);
    this.sprite.image = core.assets['./img/block.png'];
    this.sprite.scale(1, 1);
    this.sprite.x = pos.x;
    this.sprite.y = pos.y;
    this.core = core;
    this.pos = new Vector2(0, 0);
    this.pos.x = pos.x;
    this.pos.y = pos.y;
    this.w = w;
    this.h = h;
}
Block.prototype = {
    getSprite: function () {
        return this.sprite;
    },
    getPosition: function () {
        return new Vector2(this.pos.x, this.pos.y);
    },
    IntersectCircle: function (pos, offset, radius) {
        var result = new Vector2(pos.x, pos.y);
        result.plus(offset);
        var Left = this.pos.x - radius;
        var Right = this.pos.x + this.w + radius;
        var Up = this.pos.y - radius;
        var Down = this.pos.y + this.h + radius;
        if (Left + radius < result.x && result.x < Right - radius && Up < result.y && result.y < Down) {
            result.y = (result.y - Up < Down - result.y) ? Up : Down;
        } else if (Up + radius < result.y && result.y < Down - radius && Left < result.x && result.x < Right) {
            result.x = (result.x - Left < Right - result.x) ? Left : Right;
        } else {
            var p = this.getPosition();
            p.x += (this.pos.x < result.x) ? this.w : 0;
            p.y += (this.pos.y < result.y) ? this.h : 0;
            result.minus(p);
            if (result.length() < radius) {
                result = result.normalize();
                result.x *= radius;
                result.y *= radius;
            }
            result.plus(p);
        }
        result.minus(offset);
        return result;
    },
}