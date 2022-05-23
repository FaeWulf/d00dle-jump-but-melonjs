import * as me from 'melonjs/dist/melonjs.module.js';

export default class platForm extends me.Sprite {
    constructor(x, y) {
        super(x, y, {
            image: "item_spring",
            width: 17,
            height: 12,
            frameheight: 28,
            framewidth: 17
        });

        // give the sprite a physics body so it can collide and stuff
        this.body = new me.Body(this);
        this.body.addShape(new me.Rect(-3, -10, 30, 40));

        this.body.vel.set(0,0)
        this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;
        

        // ignore gravity so the ship doesn't fall through the bottom of the screen
        this.body.ignoreGravity = true;
        this.name = "spring"

        this.addAnimation("idle", [0], 1)
        this.addAnimation("used", [1], 1)

        this.setCurrentAnimation("idle")
    }

    /**
     *
     * @param dt
     * @returns {boolean}
     */
    update(dt) {
        super.update(dt);

        if(this.name == "spring_used" && this.isCurrentAnimation("idle")) {
            me.audio.play("spring")
            this.setCurrentAnimation("used")
        }

        return true;
    }

    onCollision(response, target) {
        return false;
    }
} 