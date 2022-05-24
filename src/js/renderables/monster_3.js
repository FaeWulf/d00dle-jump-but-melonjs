import * as me from 'melonjs/dist/melonjs.module.js';

export default class monster_2 extends me.Sprite {
    constructor(x, y) {
        super(x, y, {
            image: "monster_3",
            framewidth: 74,
            frameheight: 72
        });

        //hitbox
        this.body = new me.Body(this);
        this.body.addShape(new me.Rect(10, 10, 55, 45));

        this.body.vel.set(0,0)
        this.body.collisionType = me.collision.types.NPC_OBJECT;
        

        // ignore gravity so the ship doesn't fall through the bottom of the screen
        this.body.ignoreGravity = true;
        this.name = "monster_2"
    }

    update(dt) {
        super.update(dt);
        return true;
    }

    onCollision(response, target) {
        return false;
    }
}