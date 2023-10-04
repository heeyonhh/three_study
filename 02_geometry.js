import * as THREE from '../build/three.module.js';
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js"

class App{
    constructor(){
        const divContainer = document.querySelector("#webgl-container");
        //다른 method에서 참조할수 있도록 field로 정의
        this._divContainer = divContainer;

        //모니터 생성 옵션 : antialias:true 오브젝트들 계단 현상없앰
        const renderer = new THREE.WebGLRenderer({antialias:true});
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
        //컨트롤 클래스 정의, 사용하기 위해 추가
        this._setupControls();

        //창크기가 변경될때마다 renderer camera 리사이즈
        window.onresize = this.resize.bind(this);
        this.resize();

        //render 메소드(3차원 그래픽을 만들어주는 장면을 만들어주는)를 requestAnimationFrame api에 넘겨 호출
        requestAnimationFrame(this.render.bind(this));
    }

    //OrbitControls 객체는 카메라 & 마우스 이벤트 받는 돔 요소 필요
    _setupControls() {
        new OrbitControls(this._camera, this._divContainer);
    }

    //3d mesh 생성
    //BoxGeometry(가로, 세로, 깊이)
    _setupModel(){
        //메쉬 타입 오브젝트
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const fillMaterial = new THREE.MeshPhongMaterial({color: 0x515151});
        const cube = new THREE.Mesh(geometry, fillMaterial);

        //노란 선 & WireframeGeometry 외곽선
        const lineMaterial = new THREE.LineBasicMaterial({color: 0xffff00});
        const line = new THREE.LineSegments(
            new THREE.WireframeGeometry(geometry), lineMaterial);

        //메쉬 & 라인 그룹화
        const group = new THREE.Group()
        // group.add(cube);
        group.add(line);

        //그룹을 씬에 추가
        this._scene.add(group);
        this._cube = group;
    }

    //카메라 객체 생성
    //3차원 그래픽을 출력할 영역에 대한 가로 세로 크기 얻어옴
    _setupCamera(){
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );

        camera.position.z = 2;
        this._camera = camera;
        //this._camera로 접근
    }

    //광원 생성
    _setupLight(){
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        //광원의 위치
        light.position.set(-1, 2, 4);
        //광원을 scene 객체의 구성 요소로 추가
        this._scene.add(light);
    }

    resize(){
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    //랜더링이 시작된 이후 경과된 시간 값 단위 milli-second
    render(time){
        //renderer가 scene을 카메라의 시점으로 렌더링하라는 코드
        this._renderer.render(this._scene, this._camera);
        //속성값을 변경 애니메이션 효과를 발생
        this.update(time);
        //render 메소드를 빠르게 requestAnimationFrame api에 넘겨 호출
        requestAnimationFrame(this.render.bind(this));
    }

    update(time){
        time *= 0.001;

        //자동 회전
        // this._cube.rotation.x = time;
        // this._cube.rotation.y = time;
    }
}

window.onload = function() {
    new App();
}