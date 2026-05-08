/* SmartCriteria — Teacher screens */

const TeacherShell = ({ children, active = 'criteria', t, onNavigate }) => {
  const items = [
    { id: 'home', label: 'Басты бет', icon: 'compass' },
    { id: 'criteria', label: t.criteriaGen, icon: 'sparkle' },
    { id: 'catalog', label: t.catalog, icon: 'book' },
    { id: 'class', label: t.classMgmt, icon: 'users' },
    { id: 'analytics', label: 'Аналитика', icon: 'chart' },
    { id: 'chat', label: t.feedback, icon: 'chat' },
  ];
  return (
    <div className="sc-root" style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '232px 1fr' }}>
      {/* Sidebar */}
      <aside style={{
        background: 'var(--surface)', borderRight: '1px solid var(--line)',
        display: 'flex', flexDirection: 'column', padding: '16px 0',
      }}>
        <div
          style={{ padding: '4px 16px 20px', cursor: 'pointer' }}
          onClick={() => onNavigate && onNavigate('landing')}
          title="Басты бетке оралу"
        >
          <Logo size="sm" />
        </div>
        <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 1 }}>
          {items.map(it => (
            <div key={it.id}
              onClick={() => onNavigate && onNavigate(it.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                borderRadius: 'var(--radius-sm)', fontSize: 13,
                background: active === it.id ? 'var(--surface-2)' : 'transparent',
                color: active === it.id ? 'var(--ink)' : 'var(--ink-2)',
                fontWeight: active === it.id ? 500 : 400,
                cursor: 'pointer',
                transition: 'background .12s',
              }}
              onMouseEnter={e => { if (active !== it.id) e.currentTarget.style.background = 'var(--surface-2)'; }}
              onMouseLeave={e => { if (active !== it.id) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon name={it.icon} size={15} />
              <span>{it.label}</span>
            </div>
          ))}
        </div>
        <div className="sc-divider" style={{ margin: '16px 0' }}></div>
        <div style={{ padding: '0 16px' }}>
          <div className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>Сыныптарым</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[{ k: '9А', n: 24, c: 'var(--accent)' }, { k: '9Б', n: 22, c: 'var(--accent-2)' }, { k: '10А', n: 26, c: 'var(--success)' }].map(c => (
              <div key={c.k} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-2)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: c.c }}></span>
                <span style={{ flex: 1 }}>{c.k}</span>
                <span className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>{c.n}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 'auto', padding: '12px 16px', borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 13 }}>Е</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Ерлан Қ.</div>
            <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>Физика мұғалімі</div>
          </div>
          <div
            style={{ cursor: 'pointer', color: 'var(--ink-3)' }}
            onClick={() => onNavigate && onNavigate('landing')}
            title="Шығу"
          >
            <Icon name="logout" size={14} />
          </div>
        </div>
      </aside>
      {/* Main */}
      <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
};

const TeacherTopBar = ({ title, subtitle, actions }) => (
  <div style={{
    padding: '20px 32px', borderBottom: '1px solid var(--line)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: 'var(--bg)',
  }}>
    <div>
      <div className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 4 }}>{subtitle}</div>
      <div className="sc-display" style={{ fontSize: 24, letterSpacing: '-0.02em' }}>{title}</div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {actions}
      <button className="sc-btn sc-btn-ghost" style={{ padding: '8px 10px' }}><Icon name="bell" size={14} /></button>
    </div>
  </div>
);

const CriteriaGen = ({ t, onNavigate }) => (
  <TeacherShell active="criteria" t={t} onNavigate={onNavigate}>
    <TeacherTopBar
      subtitle="Генератор · AI"
      title={t.criteriaGen}
      actions={<>
        <button className="sc-btn sc-btn-ghost"><Icon name="upload" size={14} /> Файл жүктеу</button>
        <button className="sc-btn sc-btn-accent"><Icon name="sparkle" size={14} /> {t.generate}</button>
      </>}
    />
    <div style={{ flex: 1, overflow: 'auto', padding: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      {/* Left: input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="sc-card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em' }}>01 · Есептің шарты</span>
            <span className="sc-chip">Физика</span>
          </div>
          <div style={{
            border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)',
            padding: 14, minHeight: 180, background: 'var(--surface-2)',
            fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink)',
          }}>
            Машина 5 секундта 0-ден 20 м/с-ке дейін біркелкі үдейді. Машинаның массасы 1200 кг. Машинаны үдететін күш қандай? Жауапты Ньютон <span className="sc-mono">(Н)</span> бойынша көрсетіңіздер.
            <div style={{ height: 1, background: 'var(--line)', margin: '14px -14px' }}></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['9-сынып', 'Динамика', 'Ньютон заңдары', 'Алгоритмдік'].map(tag => (
                <span key={tag} className="sc-chip" style={{ background: 'var(--surface)' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="sc-card sc-pad" style={{ padding: 20 }}>
          <div className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>Параметрлер</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Сынып" value="9-сынып" />
            <Field label="Күрделілік" value="Орта" />
            <Field label="Дескриптор саны" value="4" />
            <Field label="Бағалау түрі" value="Қалыптастырушы" />
          </div>
        </div>

        <div className="sc-card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12, background: 'var(--surface-2)' }}>
          <Icon name="lightning" size={16} />
          <div style={{ fontSize: 12.5, color: 'var(--ink-2)', flex: 1 }}>
            Akyl 4 дескриптор шығарды. <strong style={{ color: 'var(--ink)' }}>2.4 секунд.</strong>
          </div>
          <span className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>v1 · 14:32</span>
        </div>
      </div>

      {/* Right: output */}
      <div className="sc-card" style={{ padding: 20, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em' }}>02 · {t.criteria} & {t.descriptors}</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="sc-btn sc-btn-ghost" style={{ padding: '4px 10px', fontSize: 11 }}><Icon name="edit" size={12} /> Өңдеу</button>
            <button className="sc-btn sc-btn-ghost" style={{ padding: '4px 10px', fontSize: 11 }}><Icon name="send" size={12} /> {t.share}</button>
          </div>
        </div>

        <div className="sc-display" style={{ fontSize: 17, marginBottom: 16, lineHeight: 1.35 }}>
          Күшті табу есебінің бағалау критерийлері
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { n: 1, title: 'Берілгенді дұрыс анықтайды', desc: 'v₀ = 0; v = 20 м/с; t = 5 с; m = 1200 кг шамаларын ажыратады', pts: 1 },
            { n: 2, title: 'Үдеуді есептейді', desc: 'a = (v − v₀) / t формуласын қолданады, a = 4 м/с² мәнін табады', pts: 2 },
            { n: 3, title: 'Ньютонның 2-заңын қолданады', desc: 'F = m · a формуласын дұрыс таңдайды және қояды', pts: 2 },
            { n: 4, title: 'Сандық жауапты алады және өлшем бірлігін көрсетеді', desc: 'F = 4800 Н нәтижесін көрсетеді', pts: 1 },
          ].map(c => (
            <div key={c.n} style={{
              display: 'flex', gap: 12, padding: '12px 0',
              borderTop: c.n > 1 ? '1px dashed var(--line)' : 'none',
            }}>
              <span className="sc-num">{c.n}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 4 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>{c.desc}</div>
              </div>
              <div className="sc-mono" style={{ fontSize: 11, color: 'var(--ink-2)', flexShrink: 0 }}>{c.pts} б.</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          <div className="sc-mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>Барлығы · 6 балл</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="sc-btn sc-btn-ghost" onClick={() => onNavigate && onNavigate('catalog')}>
              <Icon name="book" size={13} /> Каталогқа қосу
            </button>
            <button className="sc-btn" onClick={() => onNavigate && onNavigate('class')}>
              <Icon name="send" size={13} /> Сыныпқа жіберу
            </button>
          </div>
        </div>
      </div>
    </div>
  </TeacherShell>
);

const Field = ({ label, value }) => (
  <div>
    <div className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</div>
    <div style={{
      padding: '8px 12px', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)',
      background: 'var(--surface)', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <span>{value}</span>
      <Icon name="arrow-right" size={12} strokeWidth={1} />
    </div>
  </div>
);

const Catalog = ({ t, onNavigate }) => {
  const tasks = [
    { sub: t.algebra, code: 'AL-09-014', title: 'Квадрат теңдеуді дискриминант арқылы шешу', cls: '9', diff: 'Орта', criteria: 4, used: 142 },
    { sub: t.physics, code: 'PH-09-022', title: 'Ньютонның 2-заңы. Күшті табу', cls: '9', diff: 'Орта', criteria: 4, used: 88 },
    { sub: t.geometry, code: 'GE-08-031', title: 'Пифагор теоремасы. Тікбұрышты үшбұрыш', cls: '8', diff: 'Жеңіл', criteria: 3, used: 211 },
    { sub: t.algebra, code: 'AL-10-007', title: 'Логарифмдік теңсіздіктер', cls: '10', diff: 'Қиын', criteria: 5, used: 34 },
    { sub: t.physics, code: 'PH-09-018', title: 'Кинематика. Тең үдемелі қозғалыс', cls: '9', diff: 'Орта', criteria: 4, used: 67 },
    { sub: t.geometry, code: 'GE-09-009', title: 'Шеңбер. Хорда мен диаметр', cls: '9', diff: 'Жеңіл', criteria: 3, used: 95 },
    { sub: t.algebra, code: 'AL-11-002', title: 'Туынды. Функцияның экстремумы', cls: '11', diff: 'Қиын', criteria: 5, used: 22 },
    { sub: t.physics, code: 'PH-10-014', title: 'Энергияның сақталу заңы', cls: '10', diff: 'Орта', criteria: 4, used: 53 },
  ];
  const subColor = (s) => s === t.algebra ? 'var(--accent)' : s === t.physics ? 'var(--accent-2)' : 'var(--success)';
  return (
    <TeacherShell active="catalog" t={t} onNavigate={onNavigate}>
      <TeacherTopBar
        subtitle="Каталог · 1247 есеп"
        title={t.catalog}
        actions={<>
          <button className="sc-btn sc-btn-ghost"><Icon name="filter" size={14} /> Сүзгі</button>
          <button className="sc-btn"><Icon name="plus" size={14} /> {t.new}</button>
        </>}
      />
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* subject filters */}
        <div style={{ padding: '20px 32px', display: 'flex', gap: 12, alignItems: 'center', borderBottom: '1px solid var(--line)' }}>
          <div className="sc-input" style={{ flex: 1, maxWidth: 320, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px' }}>
            <Icon name="search" size={14} />
            <span style={{ color: 'var(--ink-3)', fontSize: 13 }}>Есеп іздеу...</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Барлығы', t.algebra, t.geometry, t.physics].map((s, i) => (
              <button key={s} className="sc-btn sc-btn-ghost" style={{
                padding: '6px 12px', fontSize: 12,
                background: i === 0 ? 'var(--surface-2)' : 'transparent',
                borderColor: i === 0 ? 'var(--line-2)' : 'var(--line)',
              }}>{s}</button>
            ))}
          </div>
          <div style={{ flex: 1 }}></div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['7', '8', '9', '10', '11'].map((g, i) => (
              <span key={g} className="sc-chip" style={{ background: i === 2 ? 'var(--ink)' : 'var(--surface)', color: i === 2 ? 'var(--bg)' : 'var(--ink-2)', borderColor: i === 2 ? 'var(--ink)' : 'var(--line)', cursor: 'pointer' }}>{g}</span>
            ))}
          </div>
        </div>

        {/* table */}
        <div style={{ padding: '0 32px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '90px 1fr 80px 100px 120px 80px 120px',
            padding: '12px 16px', fontSize: 10, color: 'var(--ink-3)',
            textTransform: 'uppercase', letterSpacing: '.08em', borderBottom: '1px solid var(--line)',
            fontFamily: 'var(--font-mono)',
          }}>
            <div>Код</div><div>Атауы</div><div>Сынып</div><div>Деңгей</div><div>Критерийлер</div><div>Қолданылды</div><div></div>
          </div>
          {tasks.map(task => (
            <div key={task.code} style={{
              display: 'grid', gridTemplateColumns: '90px 1fr 80px 100px 120px 80px 120px',
              padding: '14px 16px', fontSize: 13, alignItems: 'center',
              borderBottom: '1px solid var(--line)',
            }}>
              <div className="sc-mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{task.code}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 2, background: subColor(task.sub) }}></span>
                  <span style={{ color: 'var(--ink-3)', fontSize: 11 }}>{task.sub}</span>
                </div>
                <div style={{ marginTop: 2 }}>{task.title}</div>
              </div>
              <div className="sc-mono" style={{ fontSize: 11 }}>{task.cls}-сын.</div>
              <div>
                <span className="sc-chip" style={{
                  background: task.diff === 'Қиын' ? 'color-mix(in oklch, var(--danger) 12%, transparent)'
                    : task.diff === 'Орта' ? 'color-mix(in oklch, var(--warn) 12%, transparent)'
                    : 'color-mix(in oklch, var(--success) 12%, transparent)',
                  color: task.diff === 'Қиын' ? 'var(--danger)' : task.diff === 'Орта' ? 'var(--warn)' : 'var(--success)',
                  borderColor: 'transparent',
                }}>{task.diff}</span>
              </div>
              <div style={{ display: 'flex', gap: 3 }}>
                {Array.from({ length: task.criteria }).map((_, i) => (
                  <span key={i} style={{ width: 18, height: 4, background: 'var(--ink-2)', borderRadius: 1, opacity: 0.7 }}></span>
                ))}
              </div>
              <div className="sc-mono" style={{ fontSize: 11, color: 'var(--ink-2)' }}>{task.used}×</div>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                <button className="sc-btn sc-btn-ghost" style={{ padding: '4px 8px', fontSize: 11 }}>{t.print}</button>
                <button className="sc-btn sc-btn-ghost" style={{ padding: '4px 8px', fontSize: 11 }}><Icon name="send" size={11} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TeacherShell>
  );
};

const ClassMgmt = ({ t, onNavigate }) => {
  const students = [
    { name: 'Айдана Мұқашева', avg: 87, weak: 'Алгебра · көбейту', streak: 12, fails: { c1: 2, c2: 1, c3: 4, c4: 0 } },
    { name: 'Дамир Серіков', avg: 74, weak: 'Физика · өлшем бірлігі', streak: 5, fails: { c1: 1, c2: 3, c3: 2, c4: 6 } },
    { name: 'Аяулым Қасым', avg: 92, weak: '—', streak: 24, fails: { c1: 0, c2: 1, c3: 1, c4: 0 } },
    { name: 'Нұрбек Ахметов', avg: 68, weak: 'Геометрия · теорема', streak: 0, fails: { c1: 4, c2: 2, c3: 5, c4: 3 } },
    { name: 'Әсем Бекенова', avg: 81, weak: 'Алгебра · теңсіздік', streak: 8, fails: { c1: 2, c2: 2, c3: 3, c4: 1 } },
    { name: 'Қанат Жұманов', avg: 79, weak: 'Физика · формула', streak: 14, fails: { c1: 1, c2: 4, c3: 2, c4: 2 } },
    { name: 'Мадина Сейтбек', avg: 95, weak: '—', streak: 31, fails: { c1: 0, c2: 0, c3: 1, c4: 1 } },
    { name: 'Тимур Оразов', avg: 71, weak: 'Алгебра · түбір', streak: 3, fails: { c1: 3, c2: 2, c3: 3, c4: 4 } },
  ];
  return (
    <TeacherShell active="class" t={t} onNavigate={onNavigate}>
      <TeacherTopBar
        subtitle="9Б · Физика · 22 оқушы"
        title={t.classMgmt}
        actions={<>
          <button className="sc-btn sc-btn-ghost"><Icon name="upload" size={14} /> Экспорт</button>
          <button className="sc-btn"><Icon name="plus" size={14} /> Тапсырма беру</button>
        </>}
      />
      <div style={{ flex: 1, overflow: 'auto', padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <Stat label={t.students} value="22" sub="2 жаңа осы аптада" />
          <Stat label={t.avgScore} value="78" sub="↑ 4 өткен айдан" />
          <Stat label="Тапсырмалар" value="14" sub="3 тексеруде" />
          <Stat label="Әлсіз нүкте" value="Крит. 3" sub="Формуланы қолдану" highlight />
        </div>

        {/* heatmap + table */}
        <div className="sc-card" style={{ overflow: 'hidden' }}>
          <div style={{
            padding: '14px 20px', borderBottom: '1px solid var(--line)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div className="sc-mono" style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
              Оқушылар үлгерімі · қателер картасы
            </div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 11, color: 'var(--ink-3)' }}>
              <span>аз</span>
              {[0.15, 0.35, 0.6, 0.85].map(o => <span key={o} style={{ width: 14, height: 10, background: 'var(--danger)', opacity: o, borderRadius: 1 }}></span>)}
              <span>көп</span>
            </div>
          </div>
          <div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1.6fr 80px 1.4fr 80px 50px 50px 50px 50px',
              padding: '10px 20px', fontSize: 10, color: 'var(--ink-3)',
              textTransform: 'uppercase', letterSpacing: '.08em', fontFamily: 'var(--font-mono)',
              borderBottom: '1px solid var(--line)',
            }}>
              <div>Оқушы</div><div>Орт. балл</div><div>Әлсіз нүкте</div><div>Streak</div>
              <div>К1</div><div>К2</div><div>К3</div><div>К4</div>
            </div>
            {students.map((s, i) => (
              <div key={s.name} style={{
                display: 'grid', gridTemplateColumns: '1.6fr 80px 1.4fr 80px 50px 50px 50px 50px',
                padding: '12px 20px', fontSize: 13, alignItems: 'center',
                borderBottom: i < students.length - 1 ? '1px solid var(--line)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                    {s.name[0]}
                  </div>
                  <span>{s.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div className="sc-mono" style={{ fontWeight: 500, color: s.avg >= 85 ? 'var(--success)' : s.avg < 75 ? 'var(--danger)' : 'var(--ink)' }}>{s.avg}</div>
                  <div className="sc-bar" style={{ flex: 1 }}><i style={{ width: `${s.avg}%`, background: s.avg >= 85 ? 'var(--success)' : s.avg < 75 ? 'var(--danger)' : 'var(--accent)' }}></i></div>
                </div>
                <div style={{ fontSize: 12, color: s.weak === '—' ? 'var(--ink-3)' : 'var(--ink-2)' }}>{s.weak}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                  <Icon name="flame" size={12} />
                  <span className="sc-mono">{s.streak}</span>
                </div>
                {[s.fails.c1, s.fails.c2, s.fails.c3, s.fails.c4].map((f, j) => (
                  <div key={j}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 28, height: 22, borderRadius: 3,
                      background: f === 0 ? 'var(--surface-2)' : `color-mix(in oklch, var(--danger) ${f * 14}%, var(--surface-2))`,
                      fontSize: 11, color: f >= 4 ? '#fff' : f === 0 ? 'var(--ink-3)' : 'var(--ink-2)',
                      fontFamily: 'var(--font-mono)', fontWeight: 500,
                    }}>{f}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </TeacherShell>
  );
};

const Stat = ({ label, value, sub, highlight }) => (
  <div className="sc-card" style={{ padding: 20, background: highlight ? 'var(--ink)' : 'var(--surface)', color: highlight ? 'var(--bg)' : 'var(--ink)' }}>
    <div className="sc-mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: highlight ? 'rgba(255,255,255,.6)' : 'var(--ink-3)', marginBottom: 8 }}>{label}</div>
    <div className="sc-display" style={{ fontSize: 36, lineHeight: 1, marginBottom: 6, letterSpacing: '-0.03em' }}>{value}</div>
    <div style={{ fontSize: 11, color: highlight ? 'rgba(255,255,255,.7)' : 'var(--ink-3)' }}>{sub}</div>
  </div>
);

Object.assign(window, { TeacherShell, TeacherTopBar, CriteriaGen, Catalog, ClassMgmt });
