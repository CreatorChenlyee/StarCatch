// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        starPrefab:{
            default:null,
            type:cc.Prefab
        },

        ground:{
            default:null,
            type:cc.Node
        },

        player:{
            default:null,
            type:cc.Node
        },

        scoreDisplay:{
            default:null,
            type:cc.Label
        },

        scoreAudio:{
            default:null,
            url:cc.AudioClip
        },

        maxStarDuration:0,
        minStarDuration:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onLoad:function(){
        this.score = 0;
        this.timer = 0;
        this.starDuration = this.maxStarDuration;

        this.groundY = this.ground.y + this.ground.height/2;

        this.spawnNewStar();
    },

    update:function(dt){
        if(this.timer >= this.starDuration){
            this.gameOver();
            return;
        }

        this.timer += dt;
    },

    spawnNewStar:function(){
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent("Star").game = this;

        this.starDuration = this.minStarDuration + cc.random0To1()*(this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition:function(){
        var randx = cc.randomMinus1To1() * this.node.width/2;
        var randy = this.groundY + cc.random0To1()*this.player.getComponent("Player").jumpHeight + 50;
        return cc.p(randx, randy);
    },

    gainScore:function(){
        this.score += 1;
        this.scoreDisplay.string = 'Score:' + this.score.toString();
        this.playAudio();
    },

    gameOver:function(){
        this.player.stopAllActions();
        cc.director.loadScene("Main");
    },

    playAudio:function(){
        cc.audioEngine.playEffect(this.scoreAudio, false);
    }

    // update (dt) {},
});
