/* SmartCriteria — Landing page (proper SaaS website) */

const Landing = ({ t, dirVariant, onNavigate, lang, onLangChange }) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}>

      {/* ── Navbar ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 60,
        background: scrolled ? 'var(--surface)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'background .2s, border-color .2s',
      }}>
        <Logo />
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, fontSize: 13, color: 'var(--ink-2)' }}>
          <a href="#features" style={{ color: 'inherit', textDecoration: 'none' }}>Мүмкіндіктер</a>
          <a href="#how" style={{ color: 'inherit', textDecoration: 'none' }}>Қалай жұмыс істейді</a>
          <a href="#schools" style={{ color: 'inherit', textDecoration: 'none' }}>Мектептер</a>
          {onLangChange && (
            <button
              onClick={() => onLangChange(lang === 'kz' ? 'ru' : 'kz')}
              style={{ background: 'none', border: '1px solid var(--line)', padding: '4px 10px', borderRadius: 6, color: 'var(--ink-3)', cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font-mono)' }}
            >
              {lang === 'kz' ? 'RU' : 'KZ'}
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ padding: '8px 16px', border: '1px solid var(--line)', borderRadius: 8, background: 'transparent', color: 'var(--ink)', cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font-sans)' }}>
            {t.signin}
          </button>
          <button
            onClick={() => onNavigate && onNavigate('teacher')}
            style={{ padding: '8px 18px', border: 'none', borderRadius: 8, background: 'var(--accent)', color: 'var(--bg)', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-sans)' }}
          >
            Бастау →
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* background glow */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, color-mix(in oklch, var(--accent) 12%, transparent) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: '1px solid var(--line)', borderRadius: 999, fontSize: 12, color: 'var(--ink-3)', marginBottom: 32, background: 'var(--surface)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }}></span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>v1.0 · Akyl AI — ҚР Білім министрлігі стандарты</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 400, lineHeight: 1.0, letterSpacing: '-0.03em', margin: '0 0 24px', maxWidth: 800 }}>
          Критерийлер<br />
          <em style={{ fontWeight: 300, color: 'var(--ink-2)' }}>әділ бағалайды.</em>
        </h1>

        <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 560, margin: '0 0 48px' }}>
          SmartCriteria — мұғалімдер мен оқушыларға арналған AI платформасы.
          Кез келген есептен секундтар ішінде критерийлер, дескрипторлар және AI тьютор.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 80 }}>
          <button
            onClick={() => onNavigate && onNavigate('teacher')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 28px', border: 'none', borderRadius: 10, background: 'var(--ink)', color: 'var(--bg)', cursor: 'pointer', fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-sans)', transition: 'opacity .15s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <Icon name="mortar" size={16} /> Мен Мұғаліммін
          </button>
          <button
            onClick={() => onNavigate && onNavigate('student')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 28px', border: '1px solid var(--line)', borderRadius: 10, background: 'var(--surface)', color: 'var(--ink)', cursor: 'pointer', fontSize: 15, fontWeight: 500, fontFamily: 'var(--font-sans)', transition: 'border-color .15s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--ink)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
          >
            <Icon name="book" size={16} /> Мен Оқушымын
          </button>
        </div>

        {/* product preview card */}
        <div style={{ width: '100%', maxWidth: 860, border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden', background: 'var(--surface)', boxShadow: '0 0 0 1px var(--line), 0 40px 80px rgba(0,0,0,.4)' }}>
          {/* mock browser chrome */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-2)' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }}></span>)}
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ padding: '4px 16px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 6, fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>
                smartcriteria.kz/dashboard
              </div>
            </div>
          </div>
          {/* dashboard preview */}
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', height: 380 }}>
            {/* sidebar */}
            <div style={{ borderRight: '1px solid var(--line)', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ padding: '4px 16px 16px' }}><Logo size="sm" /></div>
              {[
                { icon: 'sparkle', label: 'Критерий AI', active: true },
                { icon: 'book', label: 'Каталог', active: false },
                { icon: 'users', label: 'Сынып', active: false },
                { icon: 'chart', label: 'Аналитика', active: false },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px 7px 16px', fontSize: 12, background: item.active ? 'var(--surface-2)' : 'transparent', color: item.active ? 'var(--ink)' : 'var(--ink-3)', borderRadius: 4, margin: '0 6px' }}>
                  <Icon name={item.icon} size={13} />{item.label}
                </div>
              ))}
            </div>
            {/* main area */}
            <div style={{ padding: 20, overflow: 'hidden' }}>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>Генератор · AI</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 16 }}>Критерийлер генераторы</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, height: 280 }}>
                <div style={{ border: '1px solid var(--line)', borderRadius: 8, padding: 14, background: 'var(--surface-2)', fontSize: 12, lineHeight: 1.6, color: 'var(--ink-2)' }}>
                  <div style={{ fontSize: 10, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>01 · Есеп шарты</div>
                  Машина 5 секундта 0-ден 20 м/с-ке дейін үдейді. Машинаның массасы 1200 кг. Күшті табыңыз...
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 12 }}>
                    {['9-сынып', 'Физика', 'Динамика'].map(t => <span key={t} style={{ fontSize: 10, padding: '2px 8px', border: '1px solid var(--line)', borderRadius: 999, color: 'var(--ink-3)' }}>{t}</span>)}
                  </div>
                </div>
                <div style={{ border: '1px solid var(--line)', borderRadius: 8, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ fontSize: 10, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em' }}>02 · Критерийлер</div>
                  {[
                    { n: 1, text: 'Берілгенді анықтайды', pts: 1 },
                    { n: 2, text: 'Үдеуді есептейді (a = Δv/t)', pts: 2 },
                    { n: 3, text: 'F = ma формуласын қолданады', pts: 2 },
                    { n: 4, text: 'Жауапты дұрыс жазады', pts: 1 },
                  ].map(c => (
                    <div key={c.n} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                      <span style={{ width: 18, height: 18, borderRadius: 999, border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--ink-3)', flexShrink: 0 }}>{c.n}</span>
                      <span style={{ flex: 1, color: 'var(--ink-2)' }}>{c.text}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)' }}>{c.pts}б</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 'auto', display: 'flex', gap: 6 }}>
                    <div style={{ flex: 1, padding: '6px 10px', border: '1px solid var(--line)', borderRadius: 6, fontSize: 11, textAlign: 'center', color: 'var(--ink-2)', cursor: 'pointer' }}>Каталог</div>
                    <div style={{ flex: 1, padding: '6px 10px', background: 'var(--ink)', borderRadius: 6, fontSize: 11, textAlign: 'center', color: 'var(--bg)', cursor: 'pointer' }}>Жіберу</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* trusted by */}
        <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>Сенімді мектептер:</span>
          {['№173 НИШ', '№65 ОЖСМ', 'Bilim Innovation', 'Назарбаев Зияткерлік мект.'].map(s => (
            <span key={s} style={{ fontSize: 12, color: 'var(--ink-3)' }}>{s}</span>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 12 }}>Мүмкіндіктер</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 400, margin: 0, letterSpacing: '-0.02em' }}>
            Мұғалімге де, оқушыға да
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            {
              icon: 'sparkle', color: 'var(--accent)',
              title: 'AI Критерий Генератор',
              desc: 'Кез келген есептен секундтар ішінде бағалау критерийлерін, дескрипторларды және баллдарды жасайды. ChatGPT емес — арнайы педагогикалық AI.'
            },
            {
              icon: 'users', color: 'var(--accent-2)',
              title: 'Сынып Аналитикасы',
              desc: 'Қай критерийде қай оқушы қиналып жатыр? Жылу картасы, streak, орташа балл — барлығы бір экранда.'
            },
            {
              icon: 'chat', color: 'var(--success)',
              title: 'Akyl — AI Тьютор',
              desc: 'Оқушы фотосурет жүктейді → Akyl есепті оқиды → дұрыс бағытта сұрақтар қойып, өзі шешуге жетелейді. Жауапты бермейді — үйретеді.'
            },
          ].map(f => (
            <div key={f.title} style={{ border: '1px solid var(--line)', borderRadius: 16, padding: 32, background: 'var(--surface)', transition: 'border-color .15s, transform .15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--line-2)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = ''; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `color-mix(in oklch, ${f.color} 15%, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: f.color }}>
                <Icon name={f.icon} size={20} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, margin: '0 0 12px', letterSpacing: '-0.01em' }}>{f.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" style={{ padding: '100px 24px', background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 12 }}>Процесс</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 400, margin: 0, letterSpacing: '-0.02em' }}>
              3 қадамда бастау
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
            {[
              { n: '01', who: 'Мұғалім', title: 'Есеп жүктейді', desc: 'Фотосурет, мәтін немесе файл ретінде кез келген есепті жүктейді. Akyl мазмұнды автоматты түрде оқиды.' },
              { n: '02', who: 'AI', title: 'Критерийлер жасайды', desc: 'ЖИ секундтар ішінде 4-6 критерий, дескрипторлар және баллдарды ҚР стандарттарына сай жасайды.' },
              { n: '03', who: 'Оқушы', title: 'Orындайды & Үйренеді', desc: 'Оқушы есепті шешеді, Akyl-тьютор нақты критерий бойынша бағыттайды. Мұғалім барлықты бақылайды.' },
            ].map((step, i) => (
              <div key={step.n} style={{ padding: '32px 40px', borderRight: i < 2 ? '1px solid var(--line)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>{step.n}</span>
                  <span style={{ padding: '3px 10px', border: '1px solid var(--line)', borderRadius: 999, fontSize: 11, color: 'var(--ink-3)' }}>{step.who}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400, margin: '0 0 12px', letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Role CTA ── */}
      <section style={{ padding: '100px 24px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Teacher card */}
          <div
            onClick={() => onNavigate && onNavigate('teacher')}
            style={{ border: '1px solid var(--line)', borderRadius: 20, padding: 40, cursor: 'pointer', background: 'var(--surface)', transition: 'border-color .15s, transform .15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = ''; }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <Icon name="mortar" size={22} />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 10, letterSpacing: '-0.02em' }}>{t.teacher}</div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 24 }}>
              Критерийлер жасаңыз · Сыныпты бақылаңыз · Аналитика
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Criteria gen', 'Catalog', 'Class mgmt', 'Analytics'].map(tag => (
                <span key={tag} style={{ fontSize: 11, padding: '4px 10px', border: '1px solid var(--line)', borderRadius: 6, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Student card */}
          <div
            onClick={() => onNavigate && onNavigate('student')}
            style={{ border: '1px solid transparent', borderRadius: 20, padding: 40, cursor: 'pointer', background: 'var(--ink)', color: 'var(--bg)', transition: 'opacity .15s, transform .15s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = ''; }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: 'var(--bg)' }}>
              <Icon name="book" size={22} />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 10, letterSpacing: '-0.02em' }}>{t.student}</div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,.65)', marginBottom: 24 }}>
              Есеп жүктеңіз · Akyl тьюторыңыз · Білім ағашы
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Akyl tutor', 'XP & streaks', 'Knowledge tree', 'Feedback'].map(tag => (
                <span key={tag} style={{ fontSize: 11, padding: '4px 10px', border: '1px solid rgba(255,255,255,.2)', borderRadius: 6, color: 'rgba(255,255,255,.7)', fontFamily: 'var(--font-mono)' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Schools ── */}
      <section id="schools" style={{ padding: '60px 24px', borderTop: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em' }}>
            Пилоттық мектептер
          </div>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {['№173 НИШ', '№65 ОЖСМ', 'Bilim Innovation', 'Назарбаев Зияткерлік мектебі'].map(s => (
              <span key={s} style={{ fontSize: 14, color: 'var(--ink-2)', fontWeight: 500 }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--line)', padding: '40px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <Logo />
        <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>
          © 2025 SmartCriteria · ҚР Білім министрлігінің стандарты бойынша
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 12, color: 'var(--ink-3)' }}>
          <span style={{ cursor: 'pointer' }}>Конфиденциалдылық</span>
          <span style={{ cursor: 'pointer' }}>Шарттар</span>
          <span style={{ cursor: 'pointer' }}>support@smartcriteria.kz</span>
        </div>
      </footer>
    </div>
  );
};

// Keep RoleCard for potential reuse
const RoleCard = ({ role, icon, title, sub, tags, accent, onClick }) => (
  <div className="sc-card" style={{
    padding: 24, display: 'flex', flexDirection: 'column', gap: 16,
    cursor: 'pointer',
    background: accent ? 'var(--ink)' : 'var(--surface)',
    color: accent ? 'var(--bg)' : 'var(--ink)',
    borderColor: accent ? 'var(--ink)' : 'var(--line)',
    transition: 'transform .15s, opacity .15s',
  }}
  onClick={onClick}
  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
  onMouseLeave={e => e.currentTarget.style.transform = ''}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: accent ? 'rgba(255,255,255,.1)' : 'var(--surface-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={18} />
      </div>
      <Icon name="arrow-right" size={16} />
    </div>
    <div>
      <div className="sc-display" style={{ fontSize: 22, marginBottom: 6, letterSpacing: '-0.02em' }}>{title}</div>
      <div style={{ fontSize: 12.5, lineHeight: 1.5, color: accent ? 'rgba(255,255,255,.7)' : 'var(--ink-3)' }}>{sub}</div>
    </div>
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
      {tags.map(tg => (
        <span key={tg} className="sc-mono" style={{ fontSize: 10, padding: '3px 7px', borderRadius: 4, border: `1px solid ${accent ? 'rgba(255,255,255,.2)' : 'var(--line)'}`, color: accent ? 'rgba(255,255,255,.85)' : 'var(--ink-2)' }}>{tg}</span>
      ))}
    </div>
  </div>
);

window.Landing = Landing;
