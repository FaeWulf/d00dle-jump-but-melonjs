import * as me from 'melonjs/dist/melonjs.module.js';

export default class platForm extends me.Sprite {
    constructor(x, y) {
        super(x, y, {
            image: "item_jetpack",
            width: 24,
            height: 36,
        });

        // give the sprite a physics body so it can collide and stuff
        this.body = new me.Body(this);
        this.body.addShape(new me.Rect(-7, -20, 40, 70));

        this.body.vel.set(0,0)
        this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;
        

        // ignore gravity so the ship doesn't fall through the bottom of the screen
        this.body.ignoreGravity = true;
        this.name = "jetpack"
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