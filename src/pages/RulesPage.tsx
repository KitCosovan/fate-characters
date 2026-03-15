// src/pages/RulesPage.tsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ALL_SYSTEM_RULES, type SystemRules, type RulesBlock } from '../data/rulesContent'
import { ALL_SYSTEM_RULES_EN } from '../data/rulesContentEn'

function ContentBlock({ block }: { block: RulesBlock }) {
  if (block.type === 'text') return (
    <p style={{ fontSize: '14px', color: 'var(--text-dim)', margin: '0 0 8px', lineHeight: 1.6 }}>{block.text}</p>
  )
  if (block.type === 'list') return (
    <ul style={{ margin: '0 0 8px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {block.items.map((item, i) => <li key={i} style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.5 }}>{item}</li>)}
    </ul>
  )
  if (block.type === 'tip') return (
    <div style={{ padding: '10px 14px', borderRadius: '10px', marginBottom: '8px', background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.2)' }}>
      <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: 0, lineHeight: 1.5 }}>{block.text}</p>
    </div>
  )
  if (block.type === 'warning') return (
    <div style={{ padding: '10px 14px', borderRadius: '10px', marginBottom: '8px', background: 'rgba(224,112,112,0.08)', border: '1px solid rgba(224,112,112,0.2)' }}>
      <p style={{ fontSize: '13px', color: '#e07070', margin: 0, lineHeight: 1.5 }}>{block.text}</p>
    </div>
  )
  if (block.type === 'table') return (
    <div style={{ overflowX: 'auto', marginBottom: '8px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr>
            {block.headers.map((h, i) => (
              <th key={i} style={{ padding: '8px 12px', textAlign: 'left', background: 'var(--surface-3)', color: 'var(--text-muted)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            >
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '8px 12px', color: j === 0 ? 'var(--text)' : 'var(--text-dim)', fontWeight: j === 0 ? 600 : 400, lineHeight: 1.4, verticalAlign: 'top' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
  return null
}

function RulesSection({ section, accentColor }: { section: SystemRules['sections'][0]; accentColor: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden', ...(open ? { borderColor: `${accentColor}44` } : {}) }}>
      <button onClick={() => setOpen(v => !v)} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
        fontFamily: 'Cinzel, serif', fontSize: '15px', fontWeight: 700,
        color: open ? accentColor : 'var(--text)', textAlign: 'left', transition: 'color 0.15s',
      }}>
        <span>{section.title}</span>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'inline-block', transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s', flexShrink: 0 }}>▼</span>
      </button>
      {open && (
        <div style={{ borderTop: `1px solid ${accentColor}22`, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {section.content.map((block, i) => <ContentBlock key={i} block={block} />)}
        </div>
      )}
    </div>
  )
}

export default function RulesPage() {
  const { t, i18n } = useTranslation()
  const [activeSystem, setActiveSystem] = useState('fate-core')
  const rules = i18n.language.startsWith('en') ? ALL_SYSTEM_RULES_EN : ALL_SYSTEM_RULES
  const system = rules.find(s => s.id === activeSystem)!

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '32px' }}>
      <div>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', margin: '0 0 4px' }}>
          {t('rules.title')}
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>{t('rules.subtitle')}</p>
      </div>

      <div style={{ display: 'flex', gap: '4px', background: 'var(--surface)', borderRadius: '14px', padding: '4px', border: '1px solid var(--border)' }}>
        {rules.map(s => (
          <button key={s.id} onClick={() => setActiveSystem(s.id)} style={{
            flex: 1, padding: '10px 8px', borderRadius: '10px', border: 'none', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 600, transition: 'all 0.15s',
            background: activeSystem === s.id ? 'var(--surface-3)' : 'transparent',
            color: activeSystem === s.id ? s.accentColor : 'var(--text-muted)',
          }}>{s.name}</button>
        ))}
      </div>

      <div style={{ padding: '16px 20px', borderRadius: '16px', background: 'var(--surface)', border: `1px solid ${system.accentColor}33`, borderLeft: `3px solid ${system.accentColor}` }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '18px', fontWeight: 700, color: system.accentColor, margin: '0 0 4px' }}>{system.name}</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: 0 }}>{system.tagline}</p>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', alignSelf: 'center' }}>
          {system.sections.length} {t('rules.sections', '{{count}} разделов', { count: system.sections.length })}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {system.sections.map(section => (
          <RulesSection key={section.id} section={section} accentColor={system.accentColor} />
        ))}
      </div>
    </div>
  )
}
