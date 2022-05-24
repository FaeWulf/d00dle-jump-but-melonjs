import * as me from 'melonjs/dist/melonjs.module.js';

export default class monster_2 extends me.Sprite {
    constructor(x, y) {
        super(x, y, {
            image: "monster_2",
            framewidth: 76,
            frameheight: 45
        });

        //hitbox
        this.body = new me.Body(this);
        this.body.addShape(new me.Rect(17, 8, 40, 25));

        this.body.vel.set(0,0)
        this.body.collisionType = me.collision.types.NPC_OBJECT;
        

        // ignore gravity so the ship doesn't fall through the bottom of the screen
        this.body.ignoreGravity = true;
        this.name = "monster_2"

        this.addAnimation("idle", [0,1,2,3,4], 50)
        this.setCurrentAnimation("idle")
    }

    update(dt) {
        super.update(dt);
        return true;
    }

    onCollision(response, target) {
        return false;
    }
}