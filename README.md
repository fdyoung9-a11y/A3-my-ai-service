# A3-my-ai-service

AI 기반 여행 추천 웹서비스입니다.  
사용자가 여행지를 입력하면 추천 문장을 생성해 화면에 보여줍니다.

---

## 1. 서비스 소개

A3-my-ai-service는 사용자가 입력한 여행지를 바탕으로 간단한 여행 추천 결과를 제공하는 웹서비스입니다.  
프론트엔드는 HTML/CSS/JavaScript로 구현했고, 백엔드는 Python 기반 Vercel Serverless Function으로 구성했습니다.

### 주요 기능
- 여행지 입력 기능
- 추천 결과 출력 기능
- 빈 입력 예외 처리
- 블록형 UI 전환
- 모바일 반응형 레이아웃

---

## 2. 프로젝트 목적

이 프로젝트는 프론트엔드와 백엔드를 분리하여 웹서비스를 직접 구현하고,  
사용자 입력 → API 호출 → 결과 출력의 흐름을 학습하기 위해 제작했습니다.

---

## 3. 기술 스택

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Python
- Flask
- Vercel Serverless Functions

### Deployment
- GitHub
- Vercel

---

## 4. 파일 구조

```bash
A3-my-ai-service/
├─ api/
│  └─ generate.py
├─ index.html
├─ style.css
├─ app.js
├─ requirements.txt
├─ README.md
└─ service-plan.md