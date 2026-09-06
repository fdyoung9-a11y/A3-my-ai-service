# AI 여행 추천 서비스

사용자가 동행 유형, 인원 수, 예산, 여행 스타일, 여행 기간을 입력하면 AI가 조건에 어울리는 국내 여행지와 추천 일정, 여행 팁을 생성해주는 반응형 웹서비스입니다.

## 1. 배포 주소

- Vercel: https://a3-my-ai-service.vercel.app/
- GitHub: https://github.com/fdyoung9-a11y/A3-my-ai-service

## 2. 서비스 소개

여행지를 결정하기 어려운 사용자가 간단한 조건을 선택하면 AI가 맞춤형 국내 여행지를 추천합니다.

다음 정보를 입력할 수 있습니다.

- 동행 유형
- 인원 수
- 예산
- 여행 스타일
- 여행 기간

입력 예시:

```text
연인 / 2명 / 중간 / 힐링 / 1박2일
```

AI는 다음 형식으로 결과를 제공합니다.

- 추천 여행지
- 추천 이유
- 추천 일정
- 여행 팁

## 3. 주요 기능

### 3.1 블록형 메뉴

한 페이지 안에서 다음 3개 섹션을 메뉴로 이동할 수 있습니다.

1. 서비스 소개
2. 여행 추천 받기
3. 이용 안내

### 3.2 맞춤형 여행 조건 입력

사용자가 동행 유형, 인원 수, 예산, 여행 스타일, 여행 기간을 입력할 수 있습니다.

### 3.3 AI 여행 추천

프론트엔드에서 `/api/generate`로 입력값을 전송하면 Python 백엔드가 코디세이 OpenAI 호환 API를 호출합니다.

사용 모델은 `gpt-5-mini`이며, AI가 생성한 추천 결과를 웹 화면에 표시합니다.

### 3.4 입력값 검증 및 실패 처리

다음 상황에 대한 사용자 안내 메시지를 제공합니다.

- 필수 입력값 누락
- 인원 수 오류
- API 키 미설정
- AI API 연결 오류
- 응답 지연 또는 타임아웃
- 기타 예상하지 못한 오류

### 3.5 반응형 화면

CSS 미디어 쿼리를 적용하여 데스크톱과 모바일 화면에서 레이아웃이 깨지지 않도록 구성했습니다.

## 4. 사용 기술

### 프론트엔드

- HTML
- CSS
- JavaScript

### 백엔드

- Python
- Flask
- Vercel Serverless Functions

### AI 및 배포

- 코디세이 OpenAI 호환 API
- `gpt-5-mini`
- GitHub
- Vercel

## 5. 파일 구조

```text
A3-my-ai-service/
├── api/
│   └── generate.py
├── app.js
├── index.html
├── style.css
├── requirements.txt
├── service-plan.md
└── README.md
```

## 6. 동작 흐름

1. 사용자가 웹페이지에서 여행 조건을 입력합니다.
2. JavaScript가 입력값을 확인합니다.
3. `fetch()`를 사용하여 `/api/generate`에 POST 요청을 보냅니다.
4. Vercel Serverless Function의 Python 코드가 요청을 받습니다.
5. Python 백엔드가 환경 변수에서 API 키를 불러옵니다.
6. 백엔드가 코디세이 OpenAI 호환 API를 호출합니다.
7. AI가 맞춤형 여행 추천 결과를 생성합니다.
8. 백엔드가 결과를 JSON 형식으로 반환합니다.
9. JavaScript가 AI 결과를 웹 화면에 표시합니다.

## 7. 로컬 실행 방법

### 7.1 저장소 내려받기

```bash
git clone https://github.com/fdyoung9-a11y/A3-my-ai-service.git
cd A3-my-ai-service
```

### 7.2 패키지 설치

```bash
pip install -r requirements.txt
```

### 7.3 환경 변수 설정

Windows PowerShell:

```powershell
$env:OPENAI_API_KEY="발급받은_API_키"
```

API 키를 코드, README, 스크린샷 또는 GitHub 저장소에 직접 입력하지 않습니다.

### 7.4 실행

```bash
flask --app api.generate run
```

실행 후 브라우저에서 다음 주소로 접속합니다.

```text
http://127.0.0.1:5000
```

## 8. Vercel 배포 방법

1. 프로젝트를 GitHub 저장소에 업로드합니다.
2. Vercel에서 GitHub 저장소를 연결합니다.
3. Vercel 프로젝트의 `Environment Variables` 메뉴를 엽니다.
4. 다음 환경 변수를 등록합니다.

```text
Name: OPENAI_API_KEY
Value: 발급받은 API 키
```

5. 변경 내용을 GitHub의 `main` 브랜치에 push합니다.
6. Vercel 자동 배포가 완료되면 배포 URL에서 기능을 확인합니다.

## 9. API 보안 관리

- API 키는 `OPENAI_API_KEY` 환경 변수로 관리합니다.
- API 키를 프론트엔드 JavaScript에 포함하지 않습니다.
- API 키를 GitHub 저장소에 업로드하지 않습니다.
- API 호출은 Python 백엔드에서만 수행합니다.
- 키가 노출되면 기존 키를 폐기하고 새 키를 발급합니다.

## 10. 테스트 내용

다음 항목을 직접 확인했습니다.

- 3개 메뉴 이동
- 모든 여행 조건 입력
- 빈 입력값 안내
- 1명 미만의 인원 수 차단
- AI 추천 결과 출력
- 데스크톱 화면 표시
- 모바일 반응형 레이아웃
- Vercel 배포 환경에서 API 호출
- API 키의 환경 변수 관리

## 11. AI 코딩 도구 활용

AI 코딩 도구를 활용하여 초기 구조와 코드를 작성하고, 실행 결과와 오류 메시지를 확인하면서 다음 문제를 수정했습니다.

- 프론트엔드와 백엔드 요청 데이터 일치
- 실제 AI API 연결
- 코디세이 OpenAI 호환 Base URL 적용
- 지원 모델명 적용
- 입력값 검증 및 예외 처리
- Vercel 환경 변수 설정
- GitHub 커밋 및 재배포

AI가 생성한 코드를 그대로 사용하는 데 그치지 않고, 오류 원인을 확인하고 수정하여 최종 동작을 검증했습니다.