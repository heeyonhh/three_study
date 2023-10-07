import * as THREE from "../build/three.module.js";

class App {
  constructor() {
    const divContainer = document.querySelector("#webgl-container");
    //다른 method에서 참조할수 있도록 field로 정의
    this._divContainer = divContainer;

    //모니터 생성 옵션 : antialias:true 오브젝트들 계단 현상없앰
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    //PixelRatio 얻기 (디스플레이 속성 크키 항목 150%)
    renderer.setPixelRatio(window.devicePixelRatio);
    //생성된 renderer divContainer의 자식으로 추가
    divContainer.appendChild(renderer.domElement);
    this._renderer = renderer;

    //호출
    const scene = new THREE.Scene();
    this._scene = scene;

    this._setupCamera();
    this._setupLight();
    this._setupModel();

    //창크기가 변경될때마다 renderer camera 리사이즈
    window.onresize = this.resize.bind(this);
    this.resize();

    //render 메소드(3차원 그래픽을 만들어주는 장면을 만들어주는)를 requestAnimationFrame api에 넘겨 호출
    requestAnimationFrame(this.render.bind(this));
  }

  _setupModel() {
    const solarSystem = new THREE.Object3D();
    this._scene.add(solarSystem);

    //반지름 1 구 생성
    const radius = 1;
    const widthSegments = 12;
    const heightSegments = 12;
    const spherGeometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );

    //태양 재질 생성
    const sunMaterial = new THREE.MeshPhongMaterial({
      emissive: 0xffff00,
      flatShading: true,
    });

    //xyz 3배
    const sunMesh = new THREE.Mesh(spherGeometry, sunMaterial);
    sunMesh.scale.set(3, 3, 3);
    solarSystem.add(sunMesh);

    //지구
    const earthOrbit = new THREE.Object3D();
    solarSystem.add(earthOrbit);

    const earthMaterial = new THREE.MeshPhongMaterial({
        color: 0x2233ff, emissive: 0x112244, flatShading: true});

    const earthMesh = new THREE.Mesh(spherGeometry, earthMaterial);
    earthOrbit.position.x = 10;
    earthOrbit.add(earthMesh);

    //달
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);

    const moonMaterial = new THREE.MeshPhongMaterial({
        color: 0x888888, emissive: 0x222222, flatShading: true});

    const moonMesh = new THREE.Mesh(spherGeometry, moonMaterial);
    moonMesh.scale.set(0.5, 0.5, 0.5);
    moonOrbit.add(moonMesh);

    this._solarSystem = solarSystem;
    //지구 자전
    this._earthOrbit = earthOrbit;
    //달 자전
    this._moonOrbit = moonOrbit;
  }

  _setupCamera() {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    //카메라시점
    camera.position.z = 25;
    this._camera = camera;
  }

  //광원 생성
  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    //광원의 위치
    light.position.set(-1, 2, 4);
    //광원을 scene 객체의 구성 요소로 추가
    this._scene.add(light);
  }

  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }

  //랜더링이 시작된 이후 경과된 시간 값 단위 milli-second
  render(time) {
    //renderer가 scene을 카메라의 시점으로 렌더링하라는 코드
    this._renderer.render(this._scene, this._camera);
    //속성값을 변경 애니메이션 효과를 발생
    this.update(time);
    //render 메소드를 빠르게 requestAnimationFrame api에 넘겨 호출
    requestAnimationFrame(this.render.bind(this));
  }

  update(time) {
    time *= 0.001;

    //회전 코드
    this._solarSystem.rotation.y = time / 2;
    this._earthOrbit.rotation.y = time * 2;
    this._moonOrbit.rotation.y = time * 5;
  }
}

window.onload = function () {
  new App();
};
