let scene;
let clone, sunflower, rose;
window.onload = function () {
    scene = document.querySelector("a-scene");
    sunflower = document.getElementById("sunflowerModel");
    for (let i = 0; i < 1; i++) {
        clone = sunflower.cloneNode(true);
        clone.setAttribute("position", { x: -5.90*i, y: 0, z: 0 });
        scene.append(clone);
    }
}