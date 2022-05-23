import * as me from 'melonjs/dist/melonjs.module.js';
import buttons from "../GUI_Objects/gameover"

class LostScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        //me.game.world.addChild(new me.ColorLayer("background", "#FFFFFF"), 0);
        var backgroundImage = new me.Sprite(me.game.viewport.width / 2, me.game.viewport.height / 2, {
				image: me.loader.getImage('background'),
			}
		);

        var title_gameover = new me.Sprite(me.game.viewport.width / 2, 100, {
				image: me.loader.getImage('title_gameover'),
                framewidth: 441,
                frameheight:107
			}
		);

        backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);

        me.game.world.addChild(new buttons.dummy(me.Math.random(me.game.viewport.width / 3, me.game.viewport.width * 2 / 3), -10), 1)

        me.game.world.addChild(backgroundImage, 0);
        me.game.world.addChild(title_gameover, 10);
        me.game.world.addChild(new buttons.score(0,0))

        me.game.world.addChild(new buttons.restart(me.game.viewport.width / 2, me.game.viewport.height / 2 + 100), 10)
        me.game.world.addChild(new buttons.menu(me.game.viewport.width / 1.2, me.game.viewport.height / 1.2), 10)

        
    }

    onDestroyEvent() {
    }
};

export default LostScreen;