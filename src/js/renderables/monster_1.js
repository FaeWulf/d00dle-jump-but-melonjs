import * as me from 'melonjs/dist/melonjs.module.js';

export default class monster_2 extends me.Sprite {
    constructor(x, y) {
        super(x, y, {
            image: "monster_1",
            framewidth: 46,
            frameheight: 37
        });

        //hitbox
        this.body = new me.Body(this);
        this.body.addShape(new me.Rect(11, 11, 20, 16));

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