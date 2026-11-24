# 개인 포트폴리오 프로젝트

- 개인 포트폴리오의 저장소는 `ETTE154/ETTE154.github.io`, 공개 주소는 `https://ette154.github.io/`다.
- RECS Lab 사이트와 배포 및 데이터를 독립적으로 관리한다. 사용자가 지정한 연구실 공개 사진만 원본 출처를 기록하고 복사할 수 있다. 연구실 저장소와 Firebase 설정은 이 작업의 편집 대상에서 제외한다.
- Astro 정적 빌드, TypeScript, 순수 CSS, Content Collections를 사용한다. 실제 콘텐츠는 사용자 확인 자료를 사용하고, 값이 없는 항목과 섹션은 생략한다.
- 이름은 전채욱 (Chae-Uk Jeon)으로 병기한다. 화면 문구는 `src/i18n/ko.ts`에서, 본문 데이터는 `src/content/`에서 관리한다.
- 템플릿 검증 자료는 `src/content/_samples/`에서 개발 모드로만 사용한다. `npm run check`와 `npm run build`로 검사한다.
