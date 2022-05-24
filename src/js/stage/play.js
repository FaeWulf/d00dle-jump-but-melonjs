import * as me from 'melonjs/dist/melonjs.module.js';
import HUD from '../HUD/HUDcontainer'
import data from '../data'

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        //me.game.world.addChild(new me.ColorLayer("background", "#ffcd69"), 0);
        var backgroundImage = new me.Sprite(me.game.viewport.width / 2, me.game.viewport.height / 2, {
				image: me.loader.getImage('background'),
			}
		);

        backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);

        me.game.world.addChild(backgroundImage, 0);

        data.score = 0;
        this.HUD = new HUD.Container();
        me.game.world.addChild(this.HUD, 11)
        

        me.game.world.addChild(me.pool.pull("player"), 10);

        me.game.world.addChild(
                me.pool.pull("platform_d",
                me.game.viewport.width / 2 - 32 / 2,
                me.game.viewport.height,
        ),2);


        for(var i = 0; i < 20; i++)
            me.game.world.addChild(
                me.pool.pull("platform_d",
                me.Math.random(0, me.game.viewport.width), 
                me.Math.random(0, me.game.viewport.height)
            ));

        

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.SPACE, "jump");
    }

    onDestroyEvent() {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.A);
        me.input.unbindKey(me.input.KEY.D);
        me.input.unbindKey(me.input.KEY.SPACE);

        me.game.world.removeChild(this.HUD)
    }
};

export default PlayScreen;
