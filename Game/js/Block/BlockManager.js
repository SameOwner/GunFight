var BlockManager = function (scene) {
    this.scene = scene;
    this.blocks = [];
}
BlockManager.prototype = {
    AddBlock: function (block) {
        this.blocks.push(block);
        this.scene.addChild(block.getSprite());
    },
    getBlocks: function () {
        return this.blocks;
    },
    Intersect: function (pos, offset, radius) {
        for (var i = 0; i < this.blocks.length; i++) {
            pos = this.blocks[i].IntersectCircle(pos, offset, radius);
        }
        return pos;
    },
    IsCollision: function (pos, offset, radius) {
        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].IsCollisionCircle(pos, offset, radius)) return true;
        }
        return false;
    }
}
