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
}

window.onload = function() {
    new App();
}