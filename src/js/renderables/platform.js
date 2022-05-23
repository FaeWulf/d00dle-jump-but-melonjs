import * as me from 'melonjs/dist/melonjs.module.js';

export default class platForm extends me.Sprite {
    constructor(x, y) {
        super(x, y, {
            image: "platform_d",
            width: 57,
            height: 15,
        });

        // give the sprite a physics body so it can collide and stuff
        this.body = new me.Body(this);
        this.body.addShape(new me.Rect(0, 0, 57, 15));

        this.body.vel.set(0,0)
        this.body.collisionType = me.collision.types.WORLD_SHAPE;
        

        // ignore gravity so the ship doesn't fall through the bottom of the screen
        this.body.ignoreGravity = true;
        this.name = "green"
    }

    /**
     *
     * @param dt
     * @returns {boolean}
     */
    update(dt) {
        super.update(dt);

        return true;
    }

    onCollision(response, target) {
        return false;
    }
} 