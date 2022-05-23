import * as me from 'melonjs/dist/melonjs.module.js';
import buttons from "../GUI_Objects/menu"

class menuScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        var backgroundImage = new me.Sprite(me.game.viewport.width / 2, me.game.viewport.height / 2, {
				image: me.loader.getImage('background'),
			}
		);

        var title_menu = new me.Sprite(me.game.viewport.width / 2, 100, {
				image: me.loader.getImage('title_menu'),
                framewidth: 404,
                frameheight: 92
			}
		);
        var menu_tutorial = new me.Sprite(me.game.viewport.width - 314, me.game.viewport.height / 2, {
				image: me.loader.getImage('tutorial'),
                framewidth: 314,
                frameheight: 148
			}
		);
        var menu_tutorial2 = new me.Sprite(me.game.viewport.width / 4, me.game.viewport.height / 2 + 150, {
				image: me.loader.getImage('tutorial2'),
                framewidth: 300,
                frameheight: 28
			}
		);

        menu_tutorial.scale(1.5, 1.5)

        backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);
        me.game.world.addChild(backgroundImage, 0);
        me.game.world.addChild(menu_tutorial, 10);
        me.game.world.addChild(menu_tutorial2, 10);
        me.game.world.addChild(title_menu, 10);

        me.game.world.addChild(new buttons.play(me.game.viewport.width / 2, me.game.viewport.height / 2 + 100), 10)

        me.game.world.addChild(new buttons.dummy(me.game.viewport.width / 4, me.game.viewport.height / 3), 1)


        
        me.game.world.addChild(
                me.pool.pull("platform_d",
                me.game.viewport.width / 4, 
                me.game.viewport.height / 2 + 100
        ),2);
    }

    onDestroyEvent() {
    }
};

export default menuScreen;