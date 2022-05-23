import * as me from 'melonjs/dist/melonjs.module.js';

export default class platForm_b extends me.Sprite {
    constructor(x, y) {
        super(x, y, {
            image: "platform_b",
            width: 58,
            height: 15,
            framewidth: 58,
            frameheight: 32
        });

        // give the sprite a physics body so it can collide and stuff
        this.body = new me.Body(this);
        this.body.addShape(new me.Rect(0, 0, 58, 15));

        this.body.vel.set(0,0)
        this.body.collisionType = me.collision.types.WORLD_SHAPE;
        

        // ignore gravity so the ship doesn't fall through the bottom of the screen
        this.body.ignoreGravity = true;
        this.name = "brown"

        this.addAnimation("break", [1,2,3], 100)
        this.addAnimation("idle", [0], 1)
        this.setCurrentAnimation("idle")
    }

    /**
     *
     * @param dt
     * @returns {boolean}
     */
    update(dt) {
        super.update(dt);
        if(this.name == "brown_break" && this.isCurrentAnimation("idle")) {
            this.setCurrentAnimation("break")
        }

        return true;
    }

    onCollision(response, target) {
        return false;
    }
}