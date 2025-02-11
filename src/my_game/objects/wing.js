/* File: minion.js 
 *
 * Creates and initializes a Minion object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";
import WASDObj from "./wasd_obj.js";
import LerpVec2 from "../../engine/utils/lerp_vec2.js";

class Wing extends WASDObj {
    constructor(spriteTexture, atX, atY, parent, isTop) {
        super();
        this.mRenderComponent = new engine.SpriteAnimateRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(atX, atY);
        this.mRenderComponent.getXform().setSize(10, 8);
        this.mRenderComponent.setSpriteSequence(512, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
            204, 164,   // width x height in pixels
            5,          // number of elements in this sequence
            0);         // horizontal padding in between
        this.mRenderComponent.setAnimationType(engine.eAnimationType.eSwing);
        this.mRenderComponent.setAnimationSpeed(5);
        // show each element for mAnimSpeed updates


        let r;
        r = new engine.RigidRectangle(this.getXform(), 10, 8);
        this.setRigidBody(r);
        //this.toggleDrawRenderable();
        this.toggleDrawRigidShape();
        this.Parent = parent;
        this.IsTop = isTop;
    }


    update(aCamera) {
        if (this.parent = null)
            delete this;
        let coord = new LerpVec2(this.mRenderComponent.getXform().getPosition(),120,.05);
        let final;
        if (this.IsTop)
            final = vec2.fromValues(this.Parent.getXform().getXPos()+10,this.Parent.getXform().getYPos()+6);
        else
            final = vec2.fromValues(this.Parent.getXform().getXPos()+10,this.Parent.getXform().getYPos()-6);

        coord.setFinal(final);
        coord._interpolateValue();
        super.update();
        // remember to update renderable's animation
        this.mRenderComponent.updateAnimation();
    }
}

export default Wing;