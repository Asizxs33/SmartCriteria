/* SmartCriteria — Student mobile screens (390x844 iPhone) */

const PhoneShell = ({ children, gamified = true, t, label = '9:41' }) => (
  <div className="sc-root phone-screen">
    <div className="phone-status">
      <span>{label}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
        <span style={{ display: 'inline-block', width: 16, height: 10, border: '1px solid var(--ink)', borderRadius: 2, position: 'relative' }}>
          <span style={{ position: 'absolute', inset: 1, background: 'var(--ink)', borderRadius: 1, width: '70%' }}></span>
        </span>
      </span>
    </div>
    {children}
    <div className="phone-home"></div>
  </div>
);

const PhoneTabBar = ({ active = 'home', t, onNavigate }) => {
  const items = [
    { id: 'home', icon: 'compass', label: 'Басты' },
    { id: 'tasks', icon: 'book', label: 'Есептер' },
    { id: 'tutor', icon: 'sparkle', label: 'Akyl' },
    { id: 'tree', icon: 'tree', label: 'Ағаш' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'var(--surface)', borderTop: '1px solid var(--line)',
      padding: '10px 20px 28px', display: 'flex', justifyContent: 'space-around',
    }}>
      {items.map(it => (
        <div key={it.id}
          onClick={() => onNavigate && onNavigate(it.id)}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: active === it.id ? 'var(--ink)' : 'var(--ink-3)',
            fontWeight: active === it.id ? 500 : 400,
            cursor: 'pointer',
          }}
        >
          <Icon name={it.icon} size={20} />
          <span style={{ fontSize: 10 }}>{it.label}</span>
        </div>
      ))}
    </div>
  );
};

// 1. Upload screen — text/photo/voice
const StudentUpload = ({ t, gamified, onNavigate }) => (
  <PhoneShell t={t}>
    <div style={{ padding: '12px 20px 100px', height: 'calc(100% - 44px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <Icon name="arrow-left" size={20} />
        <div className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Жаңа есеп · 02</div>
        <Icon name="x" size={20} />
      </div>

      <div className="sc-display" style={{ fontSize: 26, marginBottom: 6, letterSpacing: '-0.02em' }}>{t.upload}</div>
      <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 24 }}>
        Қалай жүктегің келеді? Үш әдіс бар — ыңғайлысын таңда.
      </div>

      {/* method tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
        {[
          { icon: 'edit', label: t.type, active: false },
          { icon: 'camera', label: t.photo, active: true },
          { icon: 'mic', label: t.voice, active: false },
        ].map(m => (
          <div key={m.label} className="sc-card" style={{
            padding: '14px 8px', textAlign: 'center',
            background: m.active ? 'var(--ink)' : 'var(--surface)',
            color: m.active ? 'var(--bg)' : 'var(--ink-2)',
            borderColor: m.active ? 'var(--ink)' : 'var(--line)',
            cursor: 'pointer',
          }}>
            <Icon name={m.icon} size={16} />
            <div style={{ fontSize: 11, marginTop: 6 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* photo preview */}
      <div className="sc-card" style={{ padding: 14, marginBottom: 14 }}>
        <div style={{
          height: 220, borderRadius: 'var(--radius-sm)',
          background: '#1a1a1a', position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* fake notebook page */}
          <div style={{
            position: 'absolute', inset: 12,
            background: 'repeating-linear-gradient(transparent 0 22px, rgba(255,255,255,.08) 22px 23px), #f5f1e6',
            borderRadius: 4, padding: 16, transform: 'rotate(-2deg)',
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            color: '#3a3020', fontSize: 14, lineHeight: '23px',
          }}>
            <div style={{ marginBottom: 6 }}>Машина 5 секундта 0-ден</div>
            <div style={{ marginBottom: 6 }}>20 м/с-ке дейін үдейді.</div>
            <div style={{ marginBottom: 6 }}>m = 1200 кг.</div>
            <div>F = ? Н</div>
          </div>
          {/* corner brackets */}
          {[
            { top: 8, left: 8, br: ['top', 'left'] },
            { top: 8, right: 8, br: ['top', 'right'] },
            { bottom: 8, left: 8, br: ['bottom', 'left'] },
            { bottom: 8, right: 8, br: ['bottom', 'right'] },
          ].map((c, i) => (
            <div key={i} style={{
              position: 'absolute', width: 18, height: 18,
              borderTop: c.br.includes('top') ? '2px solid var(--accent)' : 'none',
              borderBottom: c.br.includes('bottom') ? '2px solid var(--accent)' : 'none',
              borderLeft: c.br.includes('left') ? '2px solid var(--accent)' : 'none',
              borderRight: c.br.includes('right') ? '2px solid var(--accent)' : 'none',
              ...c,
            }}></div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-2)' }}>
            <Icon name="sparkle" size={14} />
            <span>Akyl мәтінді танып жатыр...</span>
          </div>
          <div className="sc-mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>96%</div>
        </div>
        <div className="sc-bar" style={{ marginTop: 8 }}><i style={{ width: '96%' }}></i></div>
      </div>

      <div className="sc-card sc-pad" style={{ padding: 14, marginBottom: 14, background: 'var(--surface-2)' }}>
        <div className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Танылды</div>
        <div style={{ fontSize: 13, lineHeight: 1.5 }}>
          Машина 5 с-та 0 → 20 м/с үдейді. <span className="sc-mono">m = 1200 кг.</span> Күшті табу керек.
        </div>
      </div>

      <button
        className="sc-btn sc-btn-accent"
        style={{ marginTop: 'auto', padding: '14px 18px' }}
        onClick={() => onNavigate && onNavigate('criteria')}
      >
        {t.startTask} <Icon name="arrow-right" size={14} />
      </button>
    </div>
    <PhoneTabBar active="tasks" t={t} onNavigate={onNavigate} />
  </PhoneShell>
);

// 2. Criteria checklist + solution
const StudentCriteria = ({ t, gamified, onNavigate }) => (
  <PhoneShell t={t}>
    <div style={{ padding: '12px 20px 100px', height: 'calc(100% - 44px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ cursor: 'pointer' }} onClick={() => onNavigate && onNavigate('tasks')}>
          <Icon name="arrow-left" size={20} />
        </div>
        <div className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Физика · 9 · {t.minLeft.replace('қалды', '')} 12 қалды</div>
        <Icon name="bell" size={18} />
      </div>

      {/* problem card */}
      <div className="sc-card" style={{ padding: 16, marginBottom: 16, background: 'var(--surface-2)' }}>
        <div className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Есеп · PH-09-022</div>
        <div className="sc-display" style={{ fontSize: 16, lineHeight: 1.35 }}>
          Машина 5 с-та 0-ден 20 м/с-ке үдейді. m = 1200 кг. Күшті тап.
        </div>
      </div>

      {/* requirements */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{t.requirements} · 4</div>
        {gamified && <div style={{ fontSize: 11, color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name="star" size={12} /> +6 {t.xp}
        </div>}
      </div>

      <div className="sc-card" style={{ padding: 0, marginBottom: 14 }}>
        {[
          { n: 1, label: 'Берілгенді анықта (v₀, v, t, m)', state: 'done' },
          { n: 2, label: 'Үдеуді тап: a = (v − v₀) / t', state: 'done' },
          { n: 3, label: 'Ньютон 2-заңын қолдан: F = m·a', state: 'active' },
          { n: 4, label: 'Жауапты жаз және өлшем бірлігін көрсет', state: 'pending' },
        ].map((c, i) => (
          <div key={c.n} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px',
            borderTop: i > 0 ? '1px solid var(--line)' : 'none',
            background: c.state === 'active' ? 'var(--surface-2)' : 'transparent',
          }}>
            <span className={`sc-check ${c.state === 'done' ? 'done' : ''}`}>
              {c.state === 'done' && <Icon name="check" size={11} strokeWidth={2.5} />}
              {c.state === 'active' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }}></span>}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: c.state === 'pending' ? 'var(--ink-3)' : 'var(--ink)', textDecoration: c.state === 'done' ? 'line-through' : 'none' }}>{c.label}</div>
              {c.state === 'active' && (
                <div className="sc-mono" style={{ fontSize: 10, marginTop: 4, color: 'var(--accent)' }}>← қазір осында</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* solution input */}
      <div className="sc-card" style={{ padding: 12, marginBottom: 12 }}>
        <div className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>{t.yourSolution}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.7, color: 'var(--ink-2)' }}>
          a = 20/5 = <span style={{ color: 'var(--ink)' }}>4 м/с²</span><br/>
          F = m·a = 1200 · 4 = <span style={{ background: 'color-mix(in oklch, var(--accent) 18%, transparent)', padding: '0 4px', borderRadius: 3, color: 'var(--ink)' }}>4800</span>_
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
        <button
          className="sc-btn sc-btn-ghost"
          style={{ flex: 1 }}
          onClick={() => onNavigate && onNavigate('tutor')}
        >
          <Icon name="sparkle" size={14} /> {t.explain}
        </button>
        <button className="sc-btn sc-btn-accent" style={{ flex: 1.4 }}>
          <Icon name="check" size={14} /> {t.send}
        </button>
      </div>
    </div>
    <PhoneTabBar active="tasks" t={t} onNavigate={onNavigate} />
  </PhoneShell>
);

// 3. Akyl tutor explanation chat
const StudentTutor = ({ t, gamified, onNavigate }) => (
  <PhoneShell t={t}>
    <div style={{ padding: '12px 0 100px', height: 'calc(100% - 44px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ cursor: 'pointer' }} onClick={() => onNavigate && onNavigate('criteria')}>
          <Icon name="arrow-left" size={20} />
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: 'var(--accent)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon name="sparkle" size={16} /></div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.1 }}>Akyl</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>AI-тьютор · қол жетімді</div>
          </div>
        </div>
        <Icon name="menu" size={18} />
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Akyl intro */}
        <Bubble from="akyl">
          <div style={{ marginBottom: 6 }}>Жақсы, бірге қарайық. Алдымен <strong>Ньютонның 2-заңын</strong> еске түсірейік.</div>
          <div className="sc-card" style={{
            padding: 10, background: 'var(--surface-2)', marginTop: 8,
            fontFamily: 'var(--font-mono)', fontSize: 14, textAlign: 'center',
          }}>
            F = m · a
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: 'var(--ink-3)' }}>
            мұндағы <span className="sc-mono">m</span> — масса, <span className="sc-mono">a</span> — үдеу.
          </div>
        </Bubble>

        <Bubble from="akyl">
          Үдеу қандай? Жылдамдық 0-ден 20 м/с-ке <em>5 секундта</em> өзгерді. Сондықтан:
          <div className="sc-card" style={{
            padding: 10, background: 'var(--surface-2)', marginTop: 6,
            fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.5,
          }}>
            a = (v − v₀) / t<br/>
            a = (20 − 0) / 5 = <strong style={{ color: 'var(--accent)' }}>4 м/с²</strong>
          </div>
        </Bubble>

        <Bubble from="me">
          Енді F = 1200 · 4 = <strong>4800 Н</strong>?
        </Bubble>

        <Bubble from="akyl" warm>
          Дәл солай! Тек өлшем бірлігін ұмытпа — <span className="sc-mono">Н</span> (Ньютон). 🎯<br/>
          Барлық 4 критерийге сай шықты.
        </Bubble>

        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          {[t.similarTask, 'Тағы 1 мысал', t.askTeacher].map(s => (
            <span key={s} className="sc-chip" style={{ padding: '6px 12px', fontSize: 11.5, background: 'var(--surface)', cursor: 'pointer' }}>
              <Icon name="sparkle" size={11} /> {s}
            </span>
          ))}
        </div>
      </div>

      {/* Composer */}
      <div style={{ padding: '12px 16px 0', borderTop: '1px solid var(--line)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <Icon name="plus" size={18} />
        <div className="sc-input" style={{ flex: 1, padding: '10px 14px', borderRadius: 999 }}>
          <span style={{ color: 'var(--ink-3)' }}>Akyl-ға жаз...</span>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', background: 'var(--ink)', color: 'var(--bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}><Icon name="send" size={14} /></div>
      </div>
    </div>
    <PhoneTabBar active="tutor" t={t} onNavigate={onNavigate} />
  </PhoneShell>
);

const Bubble = ({ children, from, warm }) => {
  const isMe = from === 'me';
  return (
    <div style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', alignItems: 'flex-start', gap: 8 }}>
      {!isMe && (
        <div style={{
          width: 24, height: 24, borderRadius: 6, background: 'var(--accent)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 4,
        }}><Icon name="sparkle" size={12} /></div>
      )}
      <div className="sc-card" style={{
        maxWidth: '78%',
        padding: '10px 14px',
        background: isMe ? 'var(--ink)' : 'var(--surface)',
        color: isMe ? 'var(--bg)' : 'var(--ink)',
        borderColor: isMe ? 'var(--ink)' : 'var(--line)',
        borderRadius: 14,
        borderTopLeftRadius: !isMe ? 4 : 14,
        borderTopRightRadius: isMe ? 4 : 14,
        fontSize: 13, lineHeight: 1.5,
      }}>
        {children}
      </div>
    </div>
  );
};

// 4. Achievements / Knowledge Tree
const StudentAchievements = ({ t, gamified, onNavigate }) => {
  const branches = [
    { sub: t.algebra, total: 12, done: 9 },
    { sub: t.geometry, total: 10, done: 6 },
    { sub: t.physics, total: 14, done: 10 },
  ];
  return (
    <PhoneShell t={t}>
      <div style={{ padding: '12px 20px 100px', height: 'calc(100% - 44px)', overflow: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <Icon name="arrow-left" size={20} />
          <div className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Менің прогрессім</div>
          <Icon name="bell" size={18} />
        </div>

        {/* hero */}
        <div className="sc-card" style={{
          padding: 20, marginBottom: 16, background: 'var(--ink)', color: 'var(--bg)', borderColor: 'var(--ink)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div className="sc-mono" style={{ fontSize: 10, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '.08em' }}>{gamified ? `${t.level} 7 · Зерттеуші` : 'Үлгерімім'}</div>
              <div className="sc-display" style={{ fontSize: 28, marginTop: 6, letterSpacing: '-0.02em' }}>Айдана</div>
            </div>
            {gamified && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="flame" size={14} />
                  <span className="sc-mono" style={{ fontSize: 14 }}>12</span>
                </div>
                <div style={{ fontSize: 10, opacity: 0.6 }}>{t.streak}</div>
              </div>
            )}
          </div>

          {gamified && <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, marginBottom: 6, opacity: 0.7 }}>
              <span>2,140 {t.xp}</span><span>3,000</span>
            </div>
            <div className="sc-bar" style={{ background: 'rgba(255,255,255,.15)' }}><i style={{ width: '71%', background: 'var(--accent-2)' }}></i></div>
          </>}

          {!gamified && (
            <div style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.8 }}>
              74% критерийлер тапсырылды · 25 есеп шығарылды · 3 пән бойынша.
            </div>
          )}
        </div>

        {/* knowledge tree */}
        <div className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>{t.knowledgeTree}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {branches.map(b => (
            <div key={b.sub} className="sc-card" style={{ padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name={b.sub === t.physics ? 'beaker' : b.sub === t.geometry ? 'compass' : 'sigma'} size={14} />
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{b.sub}</span>
                </div>
                <span className="sc-mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{b.done}/{b.total}</span>
              </div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {Array.from({ length: b.total }).map((_, i) => (
                  <span key={i} className={`sc-leaf ${i < b.done ? '' : i < b.done + 1 ? 'partial' : 'empty'}`}></span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* badges */}
        {gamified && <>
          <div className="sc-mono" style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Жетістіктер · 7</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { ic: 'flame', name: '7 күн', sub: 'Streak' },
              { ic: 'star', name: 'Үздік', sub: '5 крит. қатарынан' },
              { ic: 'lightning', name: 'Жылдам', sub: '< 5 мин' },
              { ic: 'sigma', name: 'Алгебра', sub: '10 есеп' },
              { ic: 'compass', name: 'Геометр', sub: '5 теор.' },
              { ic: 'lock', name: '?', sub: 'Жабық', locked: true },
            ].map((b, i) => (
              <div key={i} className="sc-card" style={{
                padding: 10, textAlign: 'center', opacity: b.locked ? 0.5 : 1,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', margin: '0 auto 6px',
                  background: b.locked ? 'var(--surface-2)' : 'var(--ink)', color: b.locked ? 'var(--ink-3)' : 'var(--bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><Icon name={b.ic} size={14} /></div>
                <div style={{ fontSize: 11, fontWeight: 500 }}>{b.name}</div>
                <div style={{ fontSize: 9, color: 'var(--ink-3)' }}>{b.sub}</div>
              </div>
            ))}
          </div>
        </>}
      </div>
      <PhoneTabBar active="tree" t={t} onNavigate={onNavigate} />
    </PhoneShell>
  );
};

// 5. Feedback chat with teacher
const StudentFeedback = ({ t, gamified, onNavigate }) => (
  <PhoneShell t={t}>
    <div style={{ padding: '12px 0 100px', height: 'calc(100% - 44px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <Icon name="arrow-left" size={20} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', background: 'var(--surface-2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14,
          }}>Е</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.1 }}>Ерлан Қ.</div>
            <div style={{ fontSize: 11, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' }}></span>
              Желіде
            </div>
          </div>
        </div>
        <Icon name="chart" size={18} />
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ textAlign: 'center', fontSize: 10, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '8px 0' }}>
          Бүгін · 14:32
        </div>

        <Bubble from="me">
          Сәлеметсіз бе! Мен PH-09-022 есебінде 3-критерийде қайталай қателесіп жатырмын.
        </Bubble>

        <Bubble from="me">
          <div className="sc-card" style={{ padding: 8, background: 'rgba(255,255,255,.08)', marginBottom: 6 }}>
            <div style={{ fontSize: 10, opacity: 0.7, fontFamily: 'var(--font-mono)' }}>Тіркелген</div>
            <div style={{ fontSize: 12 }}>Есеп: Ньютонның 2-заңы</div>
          </div>
          F = m·a жазып, бірақ үдеуді теріс белгімен аламын. Неге?
        </Bubble>

        <Bubble from="akyl">
          Сәтті сұрақ. Үдеу <em>теріс</em> болады, егер қозғалыс <strong>баяулау</strong> болса. Мысал есепте машина жылдамдайды → үдеу <span className="sc-mono">+</span>.
        </Bubble>

        <div style={{ textAlign: 'center', fontSize: 10, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '8px 0' }}>
          Ерлан Қ. жазып жатыр...
        </div>
      </div>

      <div style={{ padding: '12px 16px 0', borderTop: '1px solid var(--line)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <Icon name="camera" size={18} />
        <div className="sc-input" style={{ flex: 1, padding: '10px 14px', borderRadius: 999 }}>
          <span style={{ color: 'var(--ink-3)' }}>Хабарлама...</span>
        </div>
        <Icon name="mic" size={18} />
      </div>
    </div>
    <PhoneTabBar active="home" t={t} onNavigate={onNavigate} />
  </PhoneShell>
);

Object.assign(window, { StudentUpload, StudentCriteria, StudentTutor, StudentAchievements, StudentFeedback });
