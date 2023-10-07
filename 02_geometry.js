import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
//마우스 회전 컨트롤
import { FontLoader } from "../examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from "../examples/jsm/geometries/TextGeometry.js"

class App {
  constructor() {
    const divContainer = document.querySelector("#webgl-container");
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    divContainer.appendChild(renderer.domElement);

    this._renderer = renderer;

    const scene = new THREE.Scene();
    this._scene = scene;

    this._setupCamera();
    this._setupLight();
    this._setupModel();
    this._setupControls();

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  _setupControls() {
    new OrbitControls(this._camera, this._divContainer);
  }

  _setupModel() {
    const fontLoader = new FontLoader();
    async function loadFont(that){
      const url = "../examples/fonts/helvetiker_regular.typeface.json";
      const font = await new Promise((resolve, reject) => {
        fontLoader.load(url, resolve, undefined, reject);
      });

      const geometry = new TextGeometry("GIS", {
        font: font, // fontLoader를 통해서 얻어온 객체
        size: 9, // 텍스트 메쉬의 크기이다. 기본값은 100
        height: 1.8, // 깊이 값이다. 기본값은 50
        curveSegments: 5, // 하나의 커브를 구성하는 정점의 갯수이다. 기본값은 12
        // setting for ExtrudeGeometry
        bevelEnabled: true, // 베벨링 처리를 할 것인지의 여부. 기본값은 true
        bevelThickness: 1.5, // 베벨링에 대한 두께 값이다. 기본값은 6이다.
        bevelSize : 1.7,  // shape의 외곽선으로부터 얼마나 멀리 베벨링 할 것인지에 대한 거리. 기본값은 2
        bevelOffset : 0,  // 텍스트 윤곽선 베벨에서 시작하는 거리이다. * 이 값을 반드시 지정
        bevelSegments: 3 // 베벨링 단계 수. 기본값은 3이다.
      });

      const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
      const cube = new THREE.Mesh(geometry, fillMaterial);
  
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
      const line = new THREE.LineSegments(
        new THREE.WireframeGeometry(geometry),
        lineMaterial
      );
  
      const group = new THREE.Group();
      group.add(cube);
      group.add(line);
  
      that._scene.add(group);
      that._cube = group;

    };
    loadFont(this);
  }

  _setupCamera() {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    //카메라시점
    camera.position.z = 15;
    this._camera = camera;
  }

  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this._scene.add(light);
  }

  update(time) {
    time *= 0.001; // second unit
  }

  render(time) {
    this._renderer.render(this._scene, this._camera);
    this.update(time);

    requestAnimationFrame(this.render.bind(this));
  }
  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }
}

window.onload = function () {
  new App();
};