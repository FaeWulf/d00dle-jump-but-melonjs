import * as me from 'melonjs/dist/melonjs.module.js';
import data from "../data"

let button = {}

class restart extends me.GUI_Object {
    constructor(x, y) {
        var settings = {}
        settings.image = "button_restart";
        settings.framewidth = 224;
        settings.frameheight = 82;
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

class menu extends me.GUI_Object {
    constructor(x, y) {
        var settings = {}
        settings.image = "button_menu";
        settings.framewidth = 112;
        settings.frameheight = 41;
        // super constructor
        super(x, y, settings);
        // define the object z order
        this.pos.z = 4;
    }

    // output something in the console
    // when the object is clicked
    onClick(e) {

        me.state.change(me.state.MENU)

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

        this.rotate(me.Math.degToRad(me.Math.random(0, 225)))

        this.velocity = .05
        this.gravity = 0.15
        this.deltaY = 0

        //hitbox
        this.body = new me.Body(this);
        this.body.ignoreGravity = false
        this.body.addShape(new me.Rect(15, 13, 31, 46));

        this.body.setMaxVelocity(3, 15);
        this.body.setFriction(0.4, 0);
        this.body.force.set(4, 0);

        this.addAnimation("idle", [5,6,7], 25)

        this.setCurrentAnimation("idle")
    }
}

class score extends me.Renderable {
    /**
     *
     * @param x
     * @param y
     */
    constructor(x, y) {
        super(x, y, 10, 10);

        // create the font object
        this.font = new me.BitmapText(0, 0, {
            font: "doodleFont",
            textAlign: "left",
            textBaseline: "top"
        });

        // font alignment to right, bottom
        // local copy of the global score

        this.score = -1;
    }

    /**
     *
     * @returns {boolean}
     */
    update() {

        // we don't do anything fancy here, so just
        // return true if the score has been updated
        if (this.score !== data.score) {
            this.score = data.score;
            return true;
        }
        return false;
    }


    /**
     * draw the score
     */
    draw(renderer) {
        this.font.draw(renderer, "Your score: " + data.score, me.game.viewport.width / 3, me.game.viewport.height / 2.5);
    }
}

button.restart = restart
button.dummy = Playerdummy
button.score = score
button.menu = menu

export default button