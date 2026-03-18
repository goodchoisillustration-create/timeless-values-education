# 디자인 시스템 가이드라인: 초시대 가치 교육

본 문서는 '초시대 가치 교육' 프로젝트의 브랜드 일관성과 프리미엄한 디자인 품질을 유지하기 위한 핵심 디자인 요소들을 정의합니다.

## 1. 디자인 컨셉: Warm Humanity (성장과 공감)
- **핵심 가치**: 따뜻함, 교육, 커뮤니티, 연결
- **분위기**: 신뢰감 있는 고전적 가치와 미래 지향적 기술 감각의 조화.
- **특징**: 부드러운 곡선미와 여백을 활용한 여유롭고 프리미엄한 레이아웃.

---

## 2. 컬러 팔레트 (Color Palette)

로고의 무한대 기호에서 추출한 6가지 원색을 기반으로 하며, 따뜻하고 고급스러운 배경색과 조합합니다.

### 핵심 브랜드 컬러 (Logo Colors)
- **Vivid Yellow**: `#f5be00` (에너지, 밝음)
- **Orange**: `#f38218` (열정, 활동성)
- **Red**: `#e63d2e` (사랑, 생명력)
- **Blue**: `#0070bc` (신뢰, 지혜)
- **Cyan**: `#0099a1" (창의성, 조화)
- **Green**: `#90c347` (성장, 평화)

### 레이아웃 컬러 (Layout Colors)
- **Background (Soft Beige)**: `oklch(0.98 0.02 85)` (눈이 편안하고 따뜻한 종이 질감의 배경)
- **Foreground (Deep Charcoal)**: `oklch(0.2 0.02 240)` (높은 가독성과 무게감을 주는 텍스트 컬러)
- **Muted**: `oklch(0.95 0.01 85)` (비활성 요소 또는 보조 텍스트 배경)

---

## 3. 타이포그래피 (Typography)

- **Main Body/UI**: `Geist` (기본 설정) 혹은 `Inter`, `Outfit` 등 현대적이고 가독성이 높은 산세리프(Sans-serif) 폰트.
- **Headings (Option)**: 제목 등 강조가 필요한 부분에는 신뢰감을 주는 클래식한 세리프(Serif) 폰트를 혼용하여 '교과서'라는 본질적인 느낌을 강화할 수 있습니다.

---

## 4. UI 원칙 (UI Principles)

- **Border Radius**: 로고의 곡선미를 반영하여 모든 버튼, 카드, 입력창의 테두리를 매우 부드럽게(`1rem` / `rounded-2xl` 이상) 처리합니다.
- **Glassmorphism**: 상단 네비게이션 등에 `backdrop-blur` 효과를 적용하여 현대적인 기술적 정교함을 표현합니다.
- **Animations**: `Framer Motion`을 활용한 부드러운 페이드인 및 인터랙티브 호버 효과를 지향합니다.

---

## 5. 구현 세부 사항 (Tailwind CSS)

커스텀 디자인 변수는 `src/app/globals.css`에서 다음과 같이 정의되어 있습니다:

```css
:root {
  --logo-yellow: #f5be00;
  --logo-orange: #f38218;
  --logo-red: #e63d2e;
  --logo-blue: #0070bc;
  --logo-cyan: #0099a1;
  --logo-green: #90c347;
}
```

클래스 사용 예시: `bg-logo-blue`, `text-logo-red`, `border-logo-green`
