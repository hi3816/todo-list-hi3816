# 📝 Supabase Todo App

A simple and clean Todo List application built with **Next.js 14 (App Router)**, **TypeScript**, and **Supabase**.  
Includes **user authentication**, allowing only logged-in users to access and manage their todo lists.

<br/>

## 🚀 Demo

👉 [배포 링크 바로가기](https://your-vercel-url.vercel.app)  
※ 로그인 후 할 일 관리 기능 이용 가능

<br/>

## 🔐 Features

- ✅ Supabase Auth 기반 **이메일/비밀번호 로그인 인증**
- ✅ 로그인한 사용자만 접근 가능한 **보호 페이지 (`/todos`)**
- ✅ Supabase를 통한 **실시간 데이터 CRUD (할 일 추가/수정/삭제)**
- ✅ **React Query**를 활용한 캐싱 및 상태 관리
- ✅ Tailwind CSS를 활용한 **반응형 UI**

<br/>

## ✨ 주요 기능 흐름

| 기능        | 설명                                                                 |
|-------------|----------------------------------------------------------------------|
| 회원가입     | Supabase Auth를 통한 이메일/비밀번호 회원가입                         |
| 로그인       | 인증 완료 시 JWT 토큰 발급 및 세션 저장                                |
| 인증 보호 라우팅 | 인증되지 않은 사용자는 자동으로 `/login`으로 리디렉션됨                  |
| 할 일 목록  | 로그인한 사용자만 todo 목록 조회 가능                                 |
| 할 일 추가  | 입력 후 Enter 또는 추가 버튼 클릭 시 항목 등록                         |
| 할 일 수정  | 체크박스로 완료/미완료 상태 변경 가능                                 |
| 할 일 삭제  | ❌ 버튼 클릭 시 해당 항목 삭제                                         |

<br/>

## 🛠️ Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **Supabase (Auth + Database)**
- **React Query**
- **Tailwind CSS**

<br/>

## 🧪 로컬 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev
