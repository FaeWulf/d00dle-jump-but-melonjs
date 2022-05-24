import * as me from 'melonjs/dist/melonjs.module.js';

class jetpackDummy extends me.Sprite {
    constructor(x, y) {
        super(
            x,
            y,
            { image: "jetpack", width: 27, height: 72, framewidth: 27, frameheight: 72 }
        );

        this.scale(0.6, 0.6)
        this.rotate(me.Math.degToRad(me.Math.random(-25,25)))

        //hitbox
        this.body = new me.Body(this);
        this.body.ignoreGravity = false;
        this.body.addShape(new me.Rect(0, 0, 27, 72));

        this.body.setMaxVelocity(3, 15);
        this.body.setFriction(0.4, 0);
        this.body.force.set(me.Math.randomFloat(1, 3), -0.7);
    }

    onCollision(p, e) {
        //ignore collision
        return false;
    }
}

export default jetpackDummy