import { loadAnimation } from "./loadanimation"

export class Speler {
    constructor(game) {
        this.game = game
    }
    idle(x, y) {
        const frames = [
            './images/chef/keyframes/__black_hair_chef_idle_000.png',
            './images/chef/keyframes/__black_hair_chef_idle_001.png',
            './images/chef/keyframes/__black_hair_chef_idle_002.png',
            './images/chef/keyframes/__black_hair_chef_idle_003.png',
            './images/chef/keyframes/__black_hair_chef_idle_004.png',
            './images/chef/keyframes/__black_hair_chef_idle_005.png',
            './images/chef/keyframes/__black_hair_chef_idle_006.png',
            './images/chef/keyframes/__black_hair_chef_idle_007.png',
            './images/chef/keyframes/__black_hair_chef_idle_008.png',
            './images/chef/keyframes/__black_hair_chef_idle_009.png',
            './images/chef/keyframes/__black_hair_chef_idle_010.png',
            './images/chef/keyframes/__black_hair_chef_idle_011.png',
            './images/chef/keyframes/__black_hair_chef_idle_012.png',
            './images/chef/keyframes/__black_hair_chef_idle_013.png',
            './images/chef/keyframes/__black_hair_chef_idle_014.png',
            './images/chef/keyframes/__black_hair_chef_idle_015.png',
            './images/chef/keyframes/__black_hair_chef_idle_016.png',
        ]
        loadAnimation(frames, x, y)
    }

}