# 🌿 hi3816의 Todo List

할 일을 간편하게 추가하고, 완료 여부를 체크하며, Supabase에 저장하는 투두 리스트입니다.  
(로그인 기능은 제외하고, Supabase와의 CRUD API 연결까지 구현하였습니다.)

---

## 🔗 시연 링크

👉 **[배포된 Todo 앱 바로가기](https://todo-list-hi3816.vercel.app/todos)**  
(*Vercel로 배포된 링크입니다. 실시간으로 사용해보실 수 있어요.*)

> 위 링크는 실제 배포된 프로젝트로, Supabase를 통해 할 일을 저장하고 관리할 수 있습니다.

---

## ✅ 주요 기능

- ✅ 할 일 추가
- ✅ 할 일 완료 체크 / 해제
- ✅ 할 일 삭제
- ✅ 필터링 (전체 / 완료 / 미완료)
- ✅ Supabase를 통한 실시간 데이터 연동

---

## 🛠 기술 스택

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **TanStack Query (React Query)**
- **Supabase** (Database & API)

---

## 🔗 사용된 API

- Supabase 테이블: `todos`
- 컬럼 구성:
  - `id`: 기본 키
  - `title`: 할 일 텍스트
  - `completed`: 완료 여부 (boolean)

---

## ⚙️ 실행 방법

1. Supabase 프로젝트 생성 후 `.env.local`에 환경변수 등록:

```env
NEXT_PUBLIC_SUPABASE_URL=🔑 your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=🔑 your-anon-key
