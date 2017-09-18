import * as PIXI from "pixi.js";

let moon, earth = null;
let centerPoint = null;

let renderer = PIXI.autoDetectRenderer(1024, 768)
document.body.appendChild(renderer.view);

let stage = new PIXI.Container();

PIXI.loader
  .add('moon', '/texture/moon.png')
  .add('earth', '/texture/earth.png')
  .load(setup);

function setup()
{
  moon = new PIXI.Sprite(
    PIXI.loader.resources['moon'].texture
  );
  earth = new PIXI.Sprite(
    PIXI.loader.resources['earth'].texture
  );

  stage.addChild(earth);
  stage.addChild(moon);

  // Поменьше земельку, текстура большая сильно
  earth.scale.set(0.5, 0.5);
  centerPoint = {
    x: (renderer.width / 2),
    y: (renderer.height / 2)
  }
  earth.anchor.set(0.5, 0.5);
  earth.x = centerPoint.x;
  earth.y = centerPoint.y;

  moon.scale.set(0.2, 0.2);
  moon.x = centerPoint.x - (moon.width / 2);
  moon.y = centerPoint.y - (moon.height / 2);

  moon.anchor.set(2,2.5)

  animationLoop();

  window.moon = moon;
}

function animationLoop()
{
  requestAnimationFrame(animationLoop)

  moon.rotation += 0.01;
  earth.rotation -= 0.01;
  renderer.render(stage);
}
