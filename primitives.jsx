/* SmartCriteria — shared UI primitives */

const Logo = ({ size = 'md', mono = false }) => {
  const fontSize = size === 'lg' ? 28 : size === 'sm' ? 16 : 20;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span className="sc-logo-mark" style={{ width: fontSize * 1.05, height: fontSize * 1.05, fontSize: fontSize * 0.5 }}>SC</span>
      <span className="sc-logo" style={{ fontSize, lineHeight: 1 }}>
        Smart<span style={{ fontStyle: 'normal', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>Criteria</span>
      </span>
    </div>
  );
};

// Tiny stroke icons - all 16x16, currentColor stroke
const Icon = ({ name, size = 16, strokeWidth = 1.5 }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 16 16',
    fill: 'none', stroke: 'currentColor', strokeWidth,
    strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (name) {
    case 'check': return <svg {...props}><path d="M3 8l3.5 3.5L13 4.5" /></svg>;
    case 'x': return <svg {...props}><path d="M4 4l8 8M12 4l-8 8" /></svg>;
    case 'plus': return <svg {...props}><path d="M8 3v10M3 8h10" /></svg>;
    case 'arrow-right': return <svg {...props}><path d="M3 8h10M9 4l4 4-4 4" /></svg>;
    case 'arrow-left': return <svg {...props}><path d="M13 8H3M7 4L3 8l4 4" /></svg>;
    case 'sparkle': return <svg {...props}><path d="M8 2v4M8 10v4M2 8h4M10 8h4" /><path d="M4 4l1.5 1.5M10.5 10.5L12 12M12 4l-1.5 1.5M5.5 10.5L4 12" /></svg>;
    case 'book': return <svg {...props}><path d="M3 3h4a2 2 0 0 1 2 2v8a1.5 1.5 0 0 0-1.5-1.5H3V3z" /><path d="M13 3H9a2 2 0 0 0-2 2v8a1.5 1.5 0 0 1 1.5-1.5H13V3z" /></svg>;
    case 'chart': return <svg {...props}><path d="M2 13h12M4 11V7M7 11V4M10 11V8M13 11V5" /></svg>;
    case 'users': return <svg {...props}><circle cx="6" cy="6" r="2.2" /><path d="M2.5 13c0-2 1.6-3.5 3.5-3.5s3.5 1.5 3.5 3.5" /><circle cx="11" cy="5.5" r="1.7" /><path d="M9.5 9.2c.4-.2.9-.3 1.5-.3 1.7 0 3 1.2 3 3" /></svg>;
    case 'upload': return <svg {...props}><path d="M8 11V3M5 6l3-3 3 3M3 13h10" /></svg>;
    case 'camera': return <svg {...props}><rect x="2" y="4.5" width="12" height="9" rx="1.5" /><circle cx="8" cy="9" r="2.2" /><path d="M6 4.5l1-1.5h2l1 1.5" /></svg>;
    case 'mic': return <svg {...props}><rect x="6" y="2" width="4" height="7" rx="2" /><path d="M3.5 8a4.5 4.5 0 0 0 9 0M8 13v1.5" /></svg>;
    case 'edit': return <svg {...props}><path d="M11 2.5l2.5 2.5-8 8H3v-2.5l8-8z" /></svg>;
    case 'send': return <svg {...props}><path d="M14 2L2 7l5 2 2 5 5-12z" /><path d="M7 9l3-3" /></svg>;
    case 'search': return <svg {...props}><circle cx="7" cy="7" r="4" /><path d="M10 10l3 3" /></svg>;
    case 'filter': return <svg {...props}><path d="M2 3h12l-4.5 6v4l-3 1.5V9L2 3z" /></svg>;
    case 'menu': return <svg {...props}><path d="M2 4h12M2 8h12M2 12h12" /></svg>;
    case 'bell': return <svg {...props}><path d="M4 11V7a4 4 0 0 1 8 0v4l1 1.5H3L4 11z" /><path d="M6.5 13.5a1.5 1.5 0 0 0 3 0" /></svg>;
    case 'star': return <svg {...props}><path d="M8 2l1.8 3.7 4 .5-3 2.8.7 4L8 11.2 4.5 13l.7-4-3-2.8 4-.5L8 2z" /></svg>;
    case 'flame': return <svg {...props}><path d="M8 14c2.8 0 5-2 5-4.5 0-3-3-3.5-2.5-7C9 2.5 7.5 4.5 7 6.5c-.5-.5-1-1.5-1-2.5C3.5 6 3 8 3 9.5 3 12 5.2 14 8 14z" /></svg>;
    case 'tree': return <svg {...props}><path d="M8 14V8M8 8L4 5M8 8l4-3M8 8L5.5 10.5M8 8l2.5 2.5" /><circle cx="8" cy="3" r="1.2" /><circle cx="3.5" cy="5" r="1.2" /><circle cx="12.5" cy="5" r="1.2" /></svg>;
    case 'logout': return <svg {...props}><path d="M9 3H3v10h6M11 5l3 3-3 3M14 8H7" /></svg>;
    case 'chat': return <svg {...props}><path d="M2 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H6l-3 2.5V11a1 1 0 0 1-1-1V4z" /></svg>;
    case 'shield': return <svg {...props}><path d="M8 2l5 1.5v5c0 3-2.5 5-5 5.5-2.5-.5-5-2.5-5-5.5v-5L8 2z" /></svg>;
    case 'sun': return <svg {...props}><circle cx="8" cy="8" r="3" /><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M13 3l-1.5 1.5M4.5 11.5L3 13" /></svg>;
    case 'moon': return <svg {...props}><path d="M13 9.5A6 6 0 0 1 6.5 3a6 6 0 1 0 6.5 6.5z" /></svg>;
    case 'globe': return <svg {...props}><circle cx="8" cy="8" r="6" /><path d="M2 8h12M8 2c2 2 2 10 0 12M8 2c-2 2-2 10 0 12" /></svg>;
    case 'play': return <svg {...props}><path d="M5 3l8 5-8 5V3z" /></svg>;
    case 'lock': return <svg {...props}><rect x="3" y="7" width="10" height="7" rx="1" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" /></svg>;
    case 'lightning': return <svg {...props}><path d="M9 1L3 9h4l-1 6 6-8H8l1-6z" /></svg>;
    case 'dot': return <svg {...props}><circle cx="8" cy="8" r="2" fill="currentColor" /></svg>;
    case 'mortar': return <svg {...props}><path d="M2 6l6-3 6 3-6 3-6-3z" /><path d="M5 7.5v2.5c0 1 1.5 1.5 3 1.5s3-.5 3-1.5V7.5" /><path d="M14 6v3" /></svg>;
    case 'beaker': return <svg {...props}><path d="M6 2v4L3 13a1 1 0 0 0 .9 1.5h8.2A1 1 0 0 0 13 13l-3-7V2" /><path d="M5 2h6" /></svg>;
    case 'compass': return <svg {...props}><circle cx="8" cy="8" r="6" /><path d="M10 6l-1 4-4 1 1-4 4-1z" /></svg>;
    case 'sigma': return <svg {...props}><path d="M4 3h8v2L7 8l5 3v2H4" /></svg>;
    default: return <svg {...props}></svg>;
  }
};

// "i18n" - tiny dictionary for KZ and RU
const dict = {
  kz: {
    teacher: 'Мен Мұғаліммін', student: 'Мен Оқушымын',
    signin: 'Кіру', signup: 'Тіркелу',
    teacherDash: 'Мұғалім кабинеті', studentDash: 'Оқушы кабинеті',
    criteriaGen: 'Критерийлер генераторы', catalog: 'Пәндер каталогы',
    classMgmt: 'Сыныпты басқару', upload: 'Есепті жүктеу',
    achievements: 'Жетістіктерім', knowledgeTree: 'Білім ағашы',
    explain: 'Түсіндіру', send: 'Жіберу', generate: 'Критерий жасау',
    descriptors: 'Дескрипторлар', criteria: 'Критерийлер',
    algebra: 'Алгебра', geometry: 'Геометрия', physics: 'Физика',
    grade: 'Сынып', students: 'Оқушылар', avgScore: 'Орт. балл',
    recent: 'Соңғы есептер', new: 'Жаңа', print: 'Басып шығару',
    share: 'Сілтеме', startTask: 'Есепті бастау', requirements: 'Талаптар',
    yourSolution: 'Сенің шешімің', tutorChat: 'Akyl-мен сөйлесу',
    streak: 'күн қатарынан', xp: 'XP', level: 'Деңгей',
    similarTask: 'Ұқсас есеп', askTeacher: 'Мұғалімнен сұрау',
    feedback: 'Кері байланыс', minLeft: 'мин қалды',
    correctStep: 'дұрыс орындалған', stepsTotal: 'қадам',
    type: 'Жазу', photo: 'Сурет', voice: 'Дауыс',
  },
  ru: {
    teacher: 'Я Учитель', student: 'Я Ученик',
    signin: 'Войти', signup: 'Регистрация',
    teacherDash: 'Кабинет учителя', studentDash: 'Кабинет ученика',
    criteriaGen: 'Генератор критериев', catalog: 'Каталог предметов',
    classMgmt: 'Управление классом', upload: 'Загрузить задачу',
    achievements: 'Мои достижения', knowledgeTree: 'Дерево знаний',
    explain: 'Объяснить', send: 'Отправить', generate: 'Сгенерировать',
    descriptors: 'Дескрипторы', criteria: 'Критерии',
    algebra: 'Алгебра', geometry: 'Геометрия', physics: 'Физика',
    grade: 'Класс', students: 'Ученики', avgScore: 'Ср. балл',
    recent: 'Недавние задачи', new: 'Новая', print: 'Печать',
    share: 'Ссылка', startTask: 'Начать задачу', requirements: 'Требования',
    yourSolution: 'Твоё решение', tutorChat: 'Чат с Akyl',
    streak: 'дней подряд', xp: 'XP', level: 'Уровень',
    similarTask: 'Похожая задача', askTeacher: 'Спросить учителя',
    feedback: 'Обратная связь', minLeft: 'мин осталось',
    correctStep: 'правильно выполнено', stepsTotal: 'шагов',
    type: 'Текст', photo: 'Фото', voice: 'Голос',
  },
};

Object.assign(window, { Logo, Icon, dict });
