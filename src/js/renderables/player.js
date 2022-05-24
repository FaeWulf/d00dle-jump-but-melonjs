import * as me from 'melonjs/dist/melonjs.module.js';
import jetpack from "../particles/jetpack"
import data from "../data"

export default class PlayerEntity extends me.Sprite {
    /**
     * constructor
     */
    constructor() {
        super(
            me.game.viewport.width / 2 - 32 / 2,
            me.game.viewport.height - 32 - 100,
            { image: "player", width: 32, height: 32, framewidth: 62, frameheight: 60 }
        );

        this.maxX = me.game.viewport.width - this.width;
        this.maxY = me.game.viewport.height;
        this.vecto = 0
        this.velocity = .05
        this.gravity = 0.15
        this.deltaY = 0

        this.jetpacking = false
        this.stun = false


        this.movementSpeed = 110
        this.jumpPower = 300


        //hitbox
        this.body = new me.Body(this);
        this.body.ignoreGravity = true
        this.body.addShape(new me.Rect(15, 13, 31, 46));
        this.body.setMaxVelocity(0, 0);
        this.body.setFriction(0, 0);
        this.body.force.set(0, 0);

        this.addAnimation("idle", [0], 1)
        this.addAnimation("jump", [1], 1)
        this.addAnimation("jetpack", [2, 3, 4], 10)
        this.addAnimation("stun", [5, 6, 7], 30)

        this.setCurrentAnimation("idle")

        me.game.viewport.follow(this, me.game.viewport.AXIS.VERTICAL);

        data.score = 0
    }

    /**
     * update the sprite
     */
    update(dt) {
        // change body force based on inputs
        //....
        // call the parent method
        super.update(dt)
        var time = me.game.world.fps

        if (me.input.isKeyPressed("left")) {
            this.pos.x -= this.movementSpeed * time / 1000;
            this.flipX(false)
        }

        if (me.input.isKeyPressed("right")) {
            this.pos.x += this.movementSpeed * time / 1000;
            this.flipX(true)
        }

        //remove jetpack effect
        if (this.jetpacking && this.jump <= 0) {
            me.audio.fade("jetpack", 1.0, 0.0, 1000)
            let jetpackParticle = new jetpack(this.pos.x, this.pos.y)
            me.game.world.addChild(jetpackParticle)

            setTimeout(() => {
                me.game.world.removeChild(jetpackParticle)
            }, 5000);
        }


        if (this.jump > 0) {
            if (this.jetpacking)
                this.setCurrentAnimation("jetpack")
            else
                this.setCurrentAnimation("jump")
        }
        else if (this.stun)
            this.setCurrentAnimation("stun")
        else {
            this.setCurrentAnimation("idle")
            this.jetpacking = false
        }


        if (this.jump > 0) {
            let currentPosY = this.pos.y - this.jump * time / 1000;

            if (currentPosY < me.game.viewport.height / 2.5) {

                let children = me.game.world.getChildren()

                children.forEach(E => {
                    if (
                        E.body?.collisionType === me.collision.types.WORLD_SHAPE
                        || E.body?.collisionType === me.collision.types.COLLECTABLE_OBJECT
                        || E.body?.collisionType === me.collision.types.NPC_OBJECT
                    ) {
                        E.pos.y += this.jump * time / 1000;
                    }
                })

                for (var i = 0; i < children.length; i++) {
                    if (children[i].body?.collisionType === me.collision.types.WORLD_SHAPE && children[i].pos.y > me.game.viewport.height) {
                        me.game.world.removeChild(children[i])
                        this.spawnPlatform()
                    }
                    else
                        if ((children[i].body?.collisionType === me.collision.types.COLLECTABLE_OBJECT || children[i].body?.collisionType === me.collision.types.NPC_OBJECT) && children[i].pos.y > me.game.viewport.height) {
                            me.game.world.removeChild(children[i])
                        }
                }

                data.score += ~~(this.jump * time / 1000 * 0.1)
            }
            else {
                this.pos.y -= this.jump * time / 1000;
            }

            this.jump -= this.jump > 0 ? 10 : 0
        }

        let previousPosY = this.pos.y
        this.velocity += this.gravity
        if (this.velocity > 20)
            this.velocity = 20

        this.pos.y += this.velocity

        this.deltaY = previousPosY - this.pos.y


        if (this.pos.x < 0) this.pos.x = me.game.viewport.width;   // add this screen wrapping
        if (this.pos.x > me.game.viewport.width) this.pos.x = 0;   // add this screen wrapping

        this.pos.y = me.Math.clamp(this.pos.y, 0, this.maxY);

        if (this.pos.y >= this.maxY) {
            me.state.change(me.state.GAMEOVER)
            me.audio.play("lose")
        }

        return true;
    }

    /**
      * collision handler
      * (called when colliding with other objects)
      */
    onCollision(response, other) {

        if (this.stun) {
            return false
        }

        if (other.body.collisionType == me.collision.types.NPC_OBJECT && !this.jetpacking) {
            this.stun = true
            me.audio.play("stun", false, undefined, 0.5)
            this.setCurrentAnimation("stun")
            return false
        }
        // Make all other objects solid
        if (other.body.collisionType == me.collision.types.COLLECTABLE_OBJECT) {
            if (this.deltaY < -4.0) {
                if (other.name == "spring") {
                    other.name = "spring_used"
                    this.doJump(this.jumpPower * 1.5)
                }

                if (other.name == "jetpack") {
                    this.doJump(this.jumpPower * 4.0)
                    me.audio.play("jetpack")
                    this.jetpacking = true
                    other.pos.y = me.game.viewport.height + 20
                }
            }
        }
        else
            if (other.body.collisionType == me.collision.types.WORLD_SHAPE) {
                if (this.deltaY < -5.0) {
                    if (other.name == "brown" || other.name == "brown_break") {
                        other.name = "brown_break"
                        setTimeout(() => {
                            if (other != undefined && other.pos != undefined)
                                other.pos.y = me.game.viewport.height + 20
                        }, 270);
                    }
                    else {
                        if (other.name == "white") {
                            other.pos.y = me.game.viewport.height + 20
                        }
                        this.doJump()
                    }
                }
            }

        return false;
    }

    doJump(force = this.jumpPower) {
        this.jump = force;
        this.velocity = 0
        me.audio.play("jump")
    }

    spawnPlatform() {

        let platforms = 0
        me.game.world.getChildren().forEach(E => {
            if (E.body?.collisionType === me.collision.types.WORLD_SHAPE)
                platforms++
        })

        if (platforms > 20)
            return

        let choose = me.Math.random(0, 6)

        if (me.Math.random(0, 50) == 30 && data.score > 150) {
            let choose = me.Math.random(1, 4)
            me.game.world.addChild(
                me.pool.pull("monster_" + choose,
                    me.Math.random(0, me.game.viewport.width),
                    -20
                ), 1);



            if (!this.jetpacking && choose != 3) {
                me.audio.fade("monster", 0.5, 0.0, 2000)
                me.audio.play("monster", false, undefined, 0.5)
            }
        }

        switch (choose) {
            case 0: case 1: {
                let x = me.Math.random(0, me.game.viewport.width)
                let y = me.Math.random(-10, 10)
                me.game.world.addChild(
                    me.pool.pull("platform_d",
                        x,
                        y
                    ), 1);

                if (me.Math.random(0, 7) == 6)
                    me.game.world.addChild(
                        me.pool.pull("item_spring",
                            me.Math.random(x, x + 20),
                            y - 17
                        ), 2)
                else if (me.Math.random(0, 15) == 14)
                    me.game.world.addChild(
                        me.pool.pull("item_jetpack",
                            me.Math.random(x, x + 20),
                            y - 17
                        ), 2)
            }

                break;
            case 2:
                me.game.world.addChild(
                    me.pool.pull("platform_m",
                        me.Math.random(0, me.game.viewport.width),
                        me.Math.random(-10, 10)
                    ), 1);
                break;
            case 3: case 4:
                me.game.world.addChild(
                    me.pool.pull("platform_w",
                        me.Math.random(0, me.game.viewport.width),
                        me.Math.random(-10, 10)
                    ), 1);
                break;
            case 5: {
                let count = 0
                me.game.world.getChildren().forEach(element => {
                    if (element.name == "brown")
                        count++
                });

                me.game.world.addChild(
                    me.pool.pull(count <= 5 ? "platform_b" : "platform_d",
                        me.Math.random(0, me.game.viewport.width),
                        me.Math.random(-10, 10)
                    ), 1);

            }

                break;
        }

        if(platforms < 17)
            this.spawnPlatform()
    }
}; 