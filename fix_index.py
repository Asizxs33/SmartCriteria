import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken HTML part
broken_part = """              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, color: s.avg >= 85 ? 'var(--success)' : s.avg < 75 ? 'var(--danger)' : 'var(--ink)' }}>{s.avg}</span>
      </div>
    </div>
  );"""

correct_part = """              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, color: s.avg >= 85 ? 'var(--success)' : s.avg < 75 ? 'var(--danger)' : 'var(--ink)' }}>{s.avg}</span>
                <div className="sc-bar" style={{ flex: 1 }}><i style={{ width: `${s.avg}%`, background: s.avg >= 85 ? 'var(--success)' : s.avg < 75 ? 'var(--danger)' : 'var(--accent)' }} /></div>
              </div>
              <div style={{ fontSize: 12, color: s.weak === '—' ? 'var(--ink-3)' : 'var(--ink-2)' }}>{s.weak}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}><Icon name="flame" size={12} /><span style={{ fontFamily: 'var(--font-mono)' }}>{s.streak}</span></div>
              {s.f.map((f, j) => (
                <div key={j}><span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 22, borderRadius: 3, background: f === 0 ? 'var(--surface-2)' : `color-mix(in oklch, var(--danger) ${f * 14}%, var(--surface-2))`, fontSize: 11, color: f >= 4 ? '#fff' : f === 0 ? 'var(--ink-3)' : 'var(--ink-2)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{f}</span></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

/* ═══════════════════════════════════════
   STUDENT APP
═══════════════════════════════════════ */
const TabBar = ({ active, onNav }) => {
  const tabs = [['home','compass','Басты'],['tasks','book','Есептер'],['tutor','sparkle','Akyl'],['tree','tree','Ағаш']];
  const activeIdx = tabs.findIndex(([id]) => id === active);
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--surface)', borderTop: '1px solid var(--line)', padding: '10px 16px 28px' }}>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ position: 'absolute', top: -6, left: `calc(${activeIdx * 25}% + 12.5% - 18px)`, width: 36, height: 3, background: 'var(--ink)', borderRadius: 999, transition: 'left .28s cubic-bezier(.34,1.56,.64,1)' }} />
        {tabs.map(([id,ic,lb]) => (
          <div key={id} onClick={() => onNav(id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: active === id ? 'var(--ink)' : 'var(--ink-3)', cursor: 'pointer', fontWeight: active === id ? 500 : 400, transition: 'color .15s', width: '25%' }}>
            <Icon name={ic} size={22} /><span style={{ fontSize: 10 }}>{lb}</span>
          </div>
        ))}
      </div>
    </div>
  );"""

content = content.replace(broken_part, correct_part)

# Also apply the image fix that failed
target_photo = """      {tab === 'photo' && (
        <>
          <div className="sc-card" style={{ padding: 12, marginBottom: 12, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, borderRadius: 6, background: '#1a1a1a', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, minHeight: 120 }}>
              <div style={{ position: 'absolute', inset: 10, background: 'repeating-linear-gradient(transparent 0 22px,rgba(255,255,255,.07) 22px 23px),#f5f1e6', borderRadius: 4, padding: 14, transform: 'rotate(-2deg)', fontFamily: 'var(--font-display)', fontStyle: 'italic', color: '#3a3020', fontSize: 13, lineHeight: '23px' }}>
                <div>Машина 5 секундта 0-ден</div><div>20 м/с-ке дейін үдейді.</div><div>m = 1200 кг. F = ? Н</div>
              </div>
              <div style={{ position: 'absolute', top: 8, right: 8 }}>
                <span style={{ padding: '3px 8px', borderRadius: 99, background: 'rgba(212,255,59,.85)', color: '#0f1115', fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{extracting ? '...' : '96% ✓'}</span>
              </div>
            </div>"""

replacement_photo = """      {tab === 'photo' && (
        <>
          <div className="sc-card" style={{ padding: 12, marginBottom: 12, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, borderRadius: 6, background: '#1a1a1a', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, minHeight: 120 }}>
              {uploadedImage ? (
                <img src={uploadedImage} alt="Task" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ position: 'absolute', inset: 10, background: 'repeating-linear-gradient(transparent 0 22px,rgba(255,255,255,.07) 22px 23px),#f5f1e6', borderRadius: 4, padding: 14, transform: 'rotate(-2deg)', fontFamily: 'var(--font-display)', fontStyle: 'italic', color: '#3a3020', fontSize: 13, lineHeight: '23px' }}>
                  <div>Машина 5 секундта 0-ден</div><div>20 м/с-ке дейін үдейді.</div><div>m = 1200 кг. F = ? Н</div>
                </div>
              )}
              <div style={{ position: 'absolute', top: 8, right: 8 }}>
                <span style={{ padding: '3px 8px', borderRadius: 99, background: 'rgba(212,255,59,.85)', color: '#0f1115', fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{extracting ? '...' : '96% ✓'}</span>
              </div>
            </div>"""

content = content.replace(target_photo, replacement_photo)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixes applied successfully.")
