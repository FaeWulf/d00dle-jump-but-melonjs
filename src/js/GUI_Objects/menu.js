import * as me from 'melonjs/dist/melonjs.module.js';

let button = {}

class play extends me.GUI_Object {
    constructor(x, y) {
        var settings = {}
        settings.image = "button_play";
        settings.framewidth = 222;
        settings.frameheight = 80;
        // super constructor
        super(x, y, settings);
        // define the object z order
        this.pos.z = 4;
    }

    // output something in the console
    // when the object is clicked
    onClick(e) {

        me.state.change(me.state.PLAY)

        // don't propagate the event
        return false;
    }
}

class Playerdummy extends me.Sprite {
    constructor(x, y) {
        super(
            x,
            y,
            { image: "player", width: 32, height: 32, framewidth: 62, frameheight: 60 }
        );

        this.jump = 0
        this.velocity = 0.1
        this.gravity = 0.1

        //hitbox
        this.body = new me.Body(this);
        this.body.ignoreGravity = true;
        this.body.addShape(new me.Rect(15, 13, 31, 46));

        this.addAnimation("idle", [0], 1)
        this.setCurrentAnimation("idle")
    }

    update(dt) {
        let time = me.game.world.fps
        if (this.jump > 0) {
            this.pos.y -= this.jump * time / 1000;
            this.jump -= this.jump > 0 ? 10 : 0
        }

        this.velocity += this.gravity
        if (this.velocity > 20)
            this.velocity = 20

        this.pos.y += this.velocity
    }

    onCollision(p, other) {
        if (other.body.collisionType == me.collision.types.WORLD_SHAPE) {
            this.jump = 200;
            this.velocity = 0
            me.audio.play("jump")
        }
        return false
    }
}




button.play = play
button.dummy = Playerdummy

export default button