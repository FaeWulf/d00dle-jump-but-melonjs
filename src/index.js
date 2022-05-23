import * as me from 'melonjs/dist/melonjs.module.js';
import 'index.css';

import PlayScreen from 'js/stage/play.js';
import LostScreen from 'js/stage/lost.js';
import menuScreen from 'js/stage/menu.js';
import PlayerEntity from 'js/renderables/player.js';
import platForm_d from 'js/renderables/platForm.js';
import platForm_m from 'js/renderables/platForm_m.js';
import platForm_w from 'js/renderables/platForm_w.js';
import platForm_b from 'js/renderables/platForm_b.js';

import monster_1 from 'js/renderables/monster_1.js';
import monster_2 from 'js/renderables/monster_2.js';
import monster_3 from 'js/renderables/monster_3.js';

import item_spring from 'js/renderables/item_spring.js';
import item_jetpack from 'js/renderables/item_jetpack.js';

import DataManifest from 'manifest.js';


me.device.onReady(function () {

    // initialize the display canvas once the device/browser is ready
    if (!me.video.init(1218, 562, {parent : "screen", scale : "auto", scaleMethod: "flex-width"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // allow cross-origin for image/texture loading
    me.loader.crossOrigin = "anonymous";

    // set and load all resources.
    me.loader.preload(DataManifest, function() {
        // set the user defined game stages
        me.state.set(me.state.PLAY, new PlayScreen());
        me.state.set(me.state.GAMEOVER, new LostScreen());
        me.state.set(me.state.MENU, new menuScreen());
        me.state.transition("fade", "#000000", 250);

        me.state.setTransition(me.state.GAMEOVER, false)

        // add our player entity in the entity pool
        me.pool.register("player", PlayerEntity);
        me.pool.register("platform_d", platForm_d);
        me.pool.register("platform_m", platForm_m);
        me.pool.register("platform_w", platForm_w);
        me.pool.register("platform_b", platForm_b);

        me.pool.register("monster_1", monster_1);
        me.pool.register("monster_2", monster_2);
        me.pool.register("monster_3", monster_3);

        me.pool.register("item_spring", item_spring);
        me.pool.register("item_jetpack", item_jetpack);

        // Start the game.
        me.state.change(me.state.MENU);
    });
});
