## :closed_book: 친친네 가계부_Front_Service(업데이트 중)

## :bulb: 개요

1. 시스템 구성도
<img src="https://user-images.githubusercontent.com/32257949/226171436-8bbc95b4-081a-48a6-b256-dd5288043cb8.jpeg"  width="750" height="370">
<img src="https://user-images.githubusercontent.com/32257949/226171446-79f0ebda-7b24-4a45-97f1-44e97ce3d4fe.jpeg"  width="750" height="370">

  * 모놀리식 아키텍처로 구현해도 무리없는 프로젝트이나 분산 아키텍처 개념 및 학습을 위해 (서비스 기반)분산 아키텍처로 구상하여 개발 진행 중
  * 모든 서비스는 이중화를 고려하여, 랜덤 포트를 사용하도록 구현
  * 모든 요청은 Gateway-Service를 통해 전달
  * (현재)서비스 도메인을 철저히 분리하여 서비스 간 호출을 고려하지 않음
  * (현재)단일 데이터 베이스 사용(MariaDB)
  * (계획)Apache Kafka를 사용하여 서비스에서 레코드를 발행, 데이터 베이스에서 소비 구조로 변경
  * (계획)CQRS 패턴을 구현하여 Query 요청은 MongoDB에서 조회
  * (계획)화면단 이벤트를 Elasticsearch에 저장 및 시각화 처리

2. 구현 화면
<img src="https://user-images.githubusercontent.com/32257949/226219670-dcc3a309-f127-4f1c-95a3-fa6f6b3167bb.png"  width="750" height="370">
<img src="https://user-images.githubusercontent.com/32257949/226219674-b3e4cd78-b4f9-4b34-a127-da81910cbfad.png"  width="750" height="370">
<img src="https://user-images.githubusercontent.com/32257949/226805831-dcf1bb07-84ba-482b-a6e7-b01c1fe32754.png"  width="750" height="370">
<img src="https://user-images.githubusercontent.com/32257949/226805828-6512b7bd-e5e5-453a-843f-d39359cd0f70.png"  width="750" height="370">

3. 기술 스택 및 설명
<div align="left">
  <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white">
</div>

  * 친친네에서 사용할 가계부의 화면단 서비스
  * 한달 예산을 설정하고, 수입과 지출을 관리할 목적으로 개발
  * 카테고리를 지정하여 수입 및 지출 내역을 저장하고, 해당 내역은 통계로 시각화 처리

4. 구현(예정) 기능
  * 로그인
  * 한달 예산 설정, 구매 리스트 관리, 지출 통계 시각화 등의 서비스 개발 예정