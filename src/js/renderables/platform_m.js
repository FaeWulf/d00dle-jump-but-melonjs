import * as me from 'melonjs/dist/melonjs.module.js';

export default class platForm_m extends me.Sprite {
    constructor(x, y) {
        super(x, y, {
            image: "platform_m",
            width: 57,
            height: 15,
        });

        // give the sprite a physics body so it can collide and stuff
        this.body = new me.Body(this);
        this.body.addShape(new me.Rect(0, 0, 57, 15));

        this.body.vel.set(0,0)
        this.body.collisionType = me.collision.types.WORLD_SHAPE;
        
        this.direction = Math.round(Math.random()) ? 1 : -1;
        this.movementSpeed = 25

        // ignore gravity so the ship doesn't fall through the bottom of the screen
        this.body.ignoreGravity = true;

        this.name = "blue"

    }

    /**
     *
     * @param dt
     * @returns {boolean}
     */
    update(dt) {
        super.update(dt);
        var time = me.game.world.fps

        this.pos.x += this.movementSpeed * this.direction * time / 1000

        if(this.pos.x > me.game.viewport.width || this.pos.x < 0)
            this.direction = -this.direction

        return true;
    }

    onCollision(response, target) {
        return false;
    }
} 