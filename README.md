<img src="https://github.com/heeyonhh/img/blob/main/three.png" />

- Renderer : 모니터 출력 장치 (렌더링 할 수 있는)

- Scene : 3차원 객체로 구성되는 장면

- Light (광원)

- Mesh (Object3d의 파생 클래스) : Geometry(형상) / Material(색상 & 투명도) )

- Camera : 렌더링 되는 시점

_ : App 클래스 내부에서만 사용되는 private field, method App 클래스 외부 호출 불가

- BufferGeometry : 정점 인덱스, 수직 벡터, 정점 색상, 사용자 정의 데이터 -> GPU

      const geometry = new TextGeometry("GIS", {
          font: font, // fontLoader를 통해서 얻어온 객체
          size: 9, // 텍스트 메쉬의 크기 기본값 100
          height: 1.8, // 깊이 값 기본값 50 
          curveSegments: 5, // 하나의 커브를 구성하는 정점의 갯수 기본값은 12
          
          // setting for ExtrudeGeometry
          bevelEnabled: true, // 베벨링 처리를 할 것인지의 여부. 기본값은 true true로 설정해주어야 다음 설정값이 적용
          bevelThickness: 1.5, // 베벨링에 대한 두께 값 기본값은 6이다.
          bevelSize : 1.7,  // shape의 외곽선으로부터 얼마나 멀리 베벨링 할 것인지에 대한 거리. 기본값은 2
          bevelOffset : 0,  // 텍스트 윤곽선 베벨에서 시작하는 거리 * 이 값을 반드시 지정
          bevelSegments: 3 // 베벨링 단계 수. 기본값은 3이다.
        });
      bevelOffset : 0,  <= 이 값이 꼭 필요
