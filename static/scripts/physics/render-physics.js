var RenderPhysics=pc.createScript("renderPhysics");RenderPhysics.attributes.add("drawShapes",{type:"boolean",default:!1,title:"Draw Shapes",description:"Draw representations of physics collision shapes"}),RenderPhysics.attributes.add("opacity",{type:"number",default:.5,min:0,max:1,title:"Opacity",description:"Opacity of physics collision shapes"}),RenderPhysics.attributes.add("castShadows",{type:"boolean",default:!0,title:"Cast Shadows",description:"Cast shadows from physics collision shapes"}),RenderPhysics.prototype.initialize=function(){this.on("attr:castShadows",(function(e,t){this.debugRoot.children.forEach((function(t){t.model.castShadows=e}))}),this),this.on("attr:opacity",(function(e,t){this.debugRoot.children.forEach((function(t){t.model.meshInstances.forEach((function(t){var i=t.material;i.opacity=e,i.update()}))}),this)}),this),this.debugRoot=new pc.Entity("Physics Debug Root"),this.app.root.addChild(this.debugRoot),this.on("enable",(function(){this.debugRoot=new pc.Entity("Physics Debug Root"),this.app.root.addChild(this.debugRoot)})),this.on("disable",(function(){this.app.root.findComponents("collision").forEach((function(e){e.hasOwnProperty("_debugShape")&&delete e._debugShape})),this.debugRoot.destroy()}))},RenderPhysics.prototype.createModel=function(e,t){var i=new pc.GraphNode,a=new pc.MeshInstance(e,t,i),s=new pc.Model;return s.graph=i,s.meshInstances=[a],s},RenderPhysics.prototype.postUpdate=function(e){this.debugRoot.children.forEach((function(e){e.updated=!1})),this.drawShapes&&this.app.root.findComponents("collision").forEach((function(e){if(e.enabled&&e.entity.enabled){var t=!1;if(e._debugShape)if(e._debugShape._collisionType!==e.type)t=!0;else switch(e.type){case"box":e._debugShape._halfExtents.equals(e.halfExtents)||(t=!0);break;case"cone":case"cylinder":case"capsule":e._debugShape._height===e.height&&e._debugShape._radius===e.radius||(t=!0);break;case"sphere":e._debugShape._radius!==e.radius&&(t=!0)}if(t&&(e._debugShape.destroy(),delete e._debugShape),!e._debugShape){var i=new pc.StandardMaterial;i.diffuse.set(Math.random(),Math.random(),Math.random()),i.opacity=this.opacity,i.blendType=pc.BLEND_NORMAL,i.update();var a,s=new pc.Entity;switch(e.type){case"box":a=pc.createBox(this.app.graphicsDevice,{halfExtents:e.halfExtents}),s._halfExtents=e.halfExtents.clone();break;case"cone":a=pc.createCone(this.app.graphicsDevice,{height:e.height,radius:e.radius}),s._height=e.height,s._radius=e.radius,s._axis=e.axis;break;case"cylinder":a=pc.createCylinder(this.app.graphicsDevice,{height:e.height,radius:e.radius}),s._height=e.height,s._radius=e.radius,s._axis=e.axis;break;case"sphere":a=pc.createSphere(this.app.graphicsDevice,{radius:e.radius}),s._radius=e.radius;break;case"capsule":a=pc.createCapsule(this.app.graphicsDevice,{height:e.height,radius:e.radius}),s._height=e.height,s._radius=e.radius,s._axis=e.axis}a&&(s.addComponent("model",{castShadows:this.castShadows,type:"asset"}),s.model.model=this.createModel(a,i)),this.debugRoot.addChild(s),s._collision=e,s._collisionType=e.type,e._debugShape=s}if(e.entity.rigidbody){var o=e.entity.rigidbody.body;if(o){var h=o.getWorldTransform(),d=h.getOrigin(),n=h.getRotation();e._debugShape.setPosition(d.x(),d.y(),d.z()),e._debugShape.setRotation(n.x(),n.y(),n.z(),n.w())}}else e._debugShape.setPosition(e.entity.getPosition()),e._debugShape.setRotation(e.entity.getRotation());"capsule"!==e.type&&"cone"!==e.type&&"cylinder"!==e.type||(0===e._debugShape._axis?e._debugShape.rotateLocal(0,0,-90):2===e._debugShape._axis&&e._debugShape.rotateLocal(90,0,0)),e._debugShape.updated=!0}}),this),this.debugRoot.children.forEach((function(e){e.updated||(delete e._collision._debugShape,delete e._collision,e.destroy())}))};