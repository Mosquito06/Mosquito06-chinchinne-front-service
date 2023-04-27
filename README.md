## :closed_book: 친친네 가계부_Front_Service(업데이트 중)

## :bulb: 개요

1. 시스템 구성도
<img src="https://user-images.githubusercontent.com/32257949/233838423-f7f16d7a-cdb1-460d-83fa-ca221ff7280d.jpeg"  width="750" height="370">
<img src="https://user-images.githubusercontent.com/32257949/233838425-47434a10-b0f1-4d82-97ec-c7c45d2382e4.jpeg"  width="750" height="370">

  * 모놀리식 아키텍처로 구현해도 무리없는 프로젝트이나 분산 아키텍처 개념 및 학습을 위해 (서비스 기반)분산 아키텍처로 구상하여 개발 진행 중
  * 모든 서비스는 이중화를 고려하여, 랜덤 포트를 사용하도록 구현
  * 모든 요청은 Gateway-Service를 통해 전달
  * 서비스 도메인을 철저히 분리하여 서비스 간 호출을 고려하지 않음
  * Global Transaction으로 MariaDB, MongoDB에 데이터 동시 저장
  * Global Transaction 사용을 위해 MongoDB는 Replica Set으로 구현
  * (진행중) CQRS 패턴을 구현하여 Query 요청은 MongoDB에서 조회
  * (계획) 화면단 이벤트를 Apache Kafka를 통해 발행하고, Elasticsearch에 적재 및 시각화
  * (계획) Spring Actuator를 통해 서버 메트릭을 Elasticsearch에 적재 및 시각화
  * (계획) Pinpoint 세팅 및 Locust를 통한 부하테스트

2. 구현 화면
<img src="https://user-images.githubusercontent.com/32257949/226219670-dcc3a309-f127-4f1c-95a3-fa6f6b3167bb.png"  width="750" height="370">
<img src="https://user-images.githubusercontent.com/32257949/233873108-4f3330cb-8b62-4e90-b607-052b393834f4.png"  width="750" height="370">
<img src="https://user-images.githubusercontent.com/32257949/233872707-91f24aa5-0a10-4c5d-8432-b1761bc19dd6.png"  width="750" height="370">
<img src="https://user-images.githubusercontent.com/32257949/233872702-fcba2f3a-23b7-46dc-8923-7cf1467635c8.png"  width="750" height="370">
<img src="https://user-images.githubusercontent.com/32257949/230909498-d92b82c5-3f01-4541-a64e-0edf2757b264.png"  width="750" height="370">
<img src="https://user-images.githubusercontent.com/32257949/233872704-eb03a934-e0c5-42a8-8926-243010b1ce0f.png"  width="750" height="370">
<img src="https://user-images.githubusercontent.com/32257949/233872705-8eaef71b-9660-46ed-8704-a84b440ffa3e.png"  width="750" height="370">

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
  * 한달 예산 설정, 구매 리스트 관리, 지출 통계 시각화 등의 서비스 개발
