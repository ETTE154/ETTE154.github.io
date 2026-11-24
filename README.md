# 전채욱 (Chae-Uk Jeon) 개인 포트폴리오

동의대학교 인공지능학과 박사과정 전채욱 (Chae-Uk Jeon)의 국문 포트폴리오입니다. Astro가 정적 HTML을 만들고 GitHub Pages에서 제공합니다. [공개 사이트](https://ette154.github.io/)

## 로컬 실행

Node.js 24와 npm을 사용합니다.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

## 콘텐츠 수정

| 파일 | 내용 |
| --- | --- |
| `src/content/profile.yaml` | 이름, 소속, 연구실, 소개, 프로필 링크와 검색 소유권 확인 |
| `src/content/news.yaml` | 소식 날짜와 제목, 선택 링크 |
| `src/content/experience.yaml` | 경력과 학력, 시작일과 종료일, 소속과 역할 |
| `src/content/projects/*.md` | 프로젝트별 YAML 머리말. `public: true`는 공개 목록에, `has_detail: true`는 상세 경로에 반영 |
| `src/content/image-sources.md` | 사용 사진의 원본 출처 |
| `src/i18n/ko.ts` | 화면의 공통 문구 |

날짜는 `"YYYY.MM"`, 창업일처럼 일이 확인된 상세 날짜는 `"YYYY.MM.DD"`로 입력합니다. 경력·학력의 종료일이 비어 있으면 현재로 표시합니다. 소식은 6건 이후에 펼침 영역을 제공합니다. 공개 링크와 검색 소유권 확인 값은 입력했을 때 표시합니다. 사진은 `src/assets/images/`에 추가하고 데이터에 상대 경로와 대체 텍스트를 적습니다. Astro가 표시용 이미지를 만듭니다.

논문과 프로젝트 상세 화면은 개발 서버의 `/preview/publications/`, `/preview/project/`에서 확인할 수 있습니다. `src/content/_samples/` 자료는 개발 서버에서만 사용하며, 공개 빌드는 미리보기 경로나 `[TODO` 문구가 출력되면 실패합니다.

## 배포

`.github/workflows/pages.yml`의 공식 Astro 액션이 검사와 빌드를 실행하고 GitHub Pages에 게시합니다. 저장소의 Pages 소스는 GitHub Actions를 사용합니다. [Astro GitHub Pages 문서](https://docs.astro.build/en/guides/deploy/github/)
