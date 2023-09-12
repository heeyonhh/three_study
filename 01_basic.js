import * as THREE from '../build/three.module';

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

        //창크기가 변경될때마다 renderer camera 리사이즈
        window.onresize = this.resize.bind(this);
        this.resize();

        //render 메소드(3차원 그래픽을 만들어주는 장면을 만들어주는)를 requestAnimationFrame api에 넘겨 호출
        requestAnimationFrame(this.render.bind(this));
    }

    //카메라 객체 생성
    //3차원 그래픽을 출력할 영역에 대한 가로 세로 크기 얻어옴
    _setupCamera(){
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        camera.getWorldPosition.z = 2;
        this._camera = camera;
        //또다른 메소드에서 사용할수 있도록 정의
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

    //파란색 계열 3d mesh 생성
    //BoxGeometry(가로, 세로, 깊이)
    _setupModel(){
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({color: 0x44a88});

        const cube = new THREE.Mesh(geometry, material);

        //mesh를 scene 객체의 구성 요소로 추가
        this._scene.add(cube);
        //다른 메소드에서 참조 될수 있도록 필드화
        this._cube = cube;
    }
}

window.onload = function() {
    new App();
}