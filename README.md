# AI 여행 추천 서비스

사용자의 여행 조건을 입력하면 어울리는 국내 여행지를 추천해주는 웹서비스입니다.

## 배포 주소
- Vercel 배포 링크: https://a3-my-ai-service.vercel.app/

## 프로젝트 소개
이 서비스는 사용자의 여행 취향과 상황에 맞춰 여행지를 추천합니다.

입력할 수 있는 조건:
- 동행 유형
- 인원 수
- 예산
- 여행 스타일
- 여행 기간

예를 들어,  
`연인 / 2명 / 중간 / 힐링 / 1박2일`  
처럼 입력하면 조건에 어울리는 여행지를 추천해줍니다.

## 사용 기술
- HTML
- CSS
- JavaScript
- Python
- Flask

## 주요 기능
- 블록형 메뉴 UI
- 맞춤형 여행 조건 입력
- 조건별 여행지 추천
- 추천 이유 함께 출력
- 입력값 검증
- API 연동

## 파일 구조
```bash
A3-my-ai-service/
├── api/
│   └── generate.py
├── index.html
├── style.css
├── app.js
├── requirements.txt
└── README.md