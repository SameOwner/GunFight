var Block = function (core, pos, w, h) {
    this.sprite = new Sprite(w, h);
    this.sprite.image = core.assets['./img/block.png'];
    this.sprite.scale(1, 1);
    this.sprite.x = pos.x;
    this.sprite.y = pos.y;
    this.core = core;
    this.pos = new Vector2(0, 0);
    this.pos.x = pos.x + w / 2;
    this.pos.y = pos.y + h / 2;
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
    IntersectCircle: function (pos, radius) {
        var result = new Vector2(pos.x, pos.y);
        var Left = this.pos.x - radius;
        var Right = this.pos.x + this.w + radius;
        var Up = this.pos.y - radius;
        var Down = this.pos.y + this.h + radius;
        if (Left + radius < pos.x && pos.x < Right - radius && Up < pos.y && pos.y < Down) {
            result.y = (pos.y - Up < Down - pos.y) ? Up : Down;
        } else if (Up + radius < pos.y && pos.y < Down - radius && Left < pos.x && pos.x < Right) {
            result.x = (pos.x - Left < Right - pos.x) ? Left : Right;
        } else {
            var p = this.getPosition();
            p.x + (this.pos.x < pos.x) ? this.w / 2 : -this.w / 2;
            p.y + (this.pos.y < pos.y) ? this.h / 2 : -this.h / 2;
            result.minus(p);
            if (result.length() < radius) {
                result = result.normalize();
                result.x *= radius;
                result.y *= radius;
            }
            result.plus(p);
        }
        return result;
    }
}