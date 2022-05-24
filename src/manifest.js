// a melonJS data manifest
// note : this is note a webpack manifest
const DataManifest = [
    //game object
    { name: "player", type: "image", src: "data/img/player.png" },
    { name: "platform_d", type: "image", src: "data/img/platform_d.png" },
    { name: "platform_m", type: "image", src: "data/img/platform_m.png" },
    { name: "platform_w", type: "image", src: "data/img/platform_w.png" },
    { name: "platform_b", type: "image", src: "data/img/platform_b.png" },
    { name: "item_spring", type: "image", src: "data/img/item_spring.png" },
    { name: "item_jetpack", type: "image", src: "data/img/item_jetpack.png" },

    //effect
    { name: "jetpack", type: "image", src: "data/img/jetpack.png" },

    //titles
    { name: "title_gameover", type: "image", src: "data/img/title_gameover.png" },
    { name: "title_menu", type: "image", src: "data/img/title_menu.png" },
    { name: "button_restart", type: "image", src: "data/img/button_play_again.png" },
    { name: "button_play", type: "image", src: "data/img/button_play.png" },
    { name: "button_menu", type: "image", src: "data/img/button_menu.png" },
    { name: "tutorial", type: "image", src: "data/img/tutorial.png" },
    { name: "tutorial2", type: "image", src: "data/img/tutorial2.png" },

    //monsters
    { name: "monster_1", type: "image", src: "data/img/monster_1.png" },
    { name: "monster_2", type: "image", src: "data/img/monster_2.png" },
    { name: "monster_3", type: "image", src: "data/img/monster_3.png" },

    //sounds
    { name: "jump", type: "audio", src: "data/sfx/" },
    { name: "lose", type: "audio", src: "data/sfx/" },
    { name: "spring", type: "audio", src: "data/sfx/" },
    { name: "jetpack", type: "audio", src: "data/sfx/" },
    { name: "monster", type: "audio", src: "data/sfx/" },
    { name: "stun", type: "audio", src: "data/sfx/" },
    { name: "break", type: "audio", src: "data/sfx/" },

    { name: "background", type: "image", src: "data/bgm/background.png" },

    //fonts
    { name: "doodleFont", type: "binary", src: "data/fnt/doodle.fnt" },
    { name: "doodleFont", type: "image", src: "data/fnt/doodle.png" },
];

export default DataManifest;

