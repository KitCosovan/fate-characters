// src/pages/FaqPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface FaqItem { q: string; a: string }
interface FaqCard { id: string; title: string; icon: string; color: string; items: FaqItem[] }

function useFaqCards(): FaqCard[] {
  const { t } = useTranslation()
  return [
    {
      id: 'start', title: t('faq.cards.start.title'), icon: '◎', color: '#c8a96e',
      items: [
        { q: t('faq.cards.start.q1'), a: t('faq.cards.start.a1') },
        { q: t('faq.cards.start.q2'), a: t('faq.cards.start.a2') },
        { q: t('faq.cards.start.q3'), a: t('faq.cards.start.a3') },
        { q: t('faq.cards.start.q4'), a: t('faq.cards.start.a4') },
        { q: t('faq.cards.start.q5'), a: t('faq.cards.start.a5') },
      ]
    },
    {
      id: 'characters', title: t('faq.cards.characters.title'), icon: '◈', color: '#70c0c0',
      items: [
        { q: t('faq.cards.characters.q1'), a: t('faq.cards.characters.a1') },
        { q: t('faq.cards.characters.q2'), a: t('faq.cards.characters.a2') },
        { q: t('faq.cards.characters.q3'), a: t('faq.cards.characters.a3') },
        { q: t('faq.cards.characters.q4'), a: t('faq.cards.characters.a4') },
        { q: t('faq.cards.characters.q5'), a: t('faq.cards.characters.a5') },
        { q: t('faq.cards.characters.q6'), a: t('faq.cards.characters.a6') },
      ]
    },
    {
      id: 'campaigns', title: t('faq.cards.campaigns.title'), icon: '⬡', color: '#a070e0',
      items: [
        { q: t('faq.cards.campaigns.q1'), a: t('faq.cards.campaigns.a1') },
        { q: t('faq.cards.campaigns.q2'), a: t('faq.cards.campaigns.a2') },
        { q: t('faq.cards.campaigns.q3'), a: t('faq.cards.campaigns.a3') },
        { q: t('faq.cards.campaigns.q4'), a: t('faq.cards.campaigns.a4') },
        { q: t('faq.cards.campaigns.q5'), a: t('faq.cards.campaigns.a5') },
        { q: t('faq.cards.campaigns.q6'), a: t('faq.cards.campaigns.a6') },
        { q: t('faq.cards.campaigns.q7'), a: t('faq.cards.campaigns.a7') },
      ]
    },
    {
      id: 'sync', title: t('faq.cards.sync.title'), icon: '↻', color: '#70a0e0',
      items: [
        { q: t('faq.cards.sync.q1'), a: t('faq.cards.sync.a1') },
        { q: t('faq.cards.sync.q2'), a: t('faq.cards.sync.a2') },
        { q: t('faq.cards.sync.q3'), a: t('faq.cards.sync.a3') },
      ]
    },
  ]
}

function FaqCardComponent({ card }: { card: FaqCard }) {
  const { t } = useTranslation()
  const [openItem, setOpenItem] = useState<string | null>(null)
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden', borderTop: `3px solid ${card.color}` }}>
      <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: 36, height: 36, borderRadius: '10px', flexShrink: 0, background: `${card.color}18`, border: `1px solid ${card.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: card.color, fontWeight: 700 }}>
          {card.icon}
        </div>
        <div>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '16px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>{card.title}</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>{t('common.questions', { count: card.items.length })}</p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--border)' }}>
        {card.items.map((item, i) => {
          const id = `${card.id}-${i}`
          const isOpen = openItem === id
          return (
            <div key={id} style={{ borderBottom: i < card.items.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <button onClick={() => setOpenItem(isOpen ? null : id)} style={{
                width: '100%', background: isOpen ? `${card.color}08` : 'none', border: 'none', cursor: 'pointer',
                padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: '12px', textAlign: 'left', transition: 'background 0.15s',
              }}
                onMouseEnter={e => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)' }}
                onMouseLeave={e => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = 'none' }}
              >
                <span style={{ fontSize: '14px', fontWeight: 600, color: isOpen ? card.color : 'var(--text)', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.4, transition: 'color 0.15s' }}>
                  {item.q}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0, display: 'inline-block', transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}>▼</span>
              </button>
              {isOpen && (
                <div style={{ padding: '0 20px 16px', borderTop: `1px solid ${card.color}22` }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-dim)', margin: '12px 0 0', lineHeight: 1.6 }}>{item.a}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function FaqPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const cards = useFaqCards()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '32px' }}>
      <div>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', margin: '0 0 4px' }}>
          {t('faq.title')}
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>{t('faq.subtitle')}</p>
      </div>

      <div style={{ padding: '14px 18px', borderRadius: '14px', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', margin: '0 0 2px' }}>{t('faq.rules_hint')}</p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{t('faq.rules_hint_sub')}</p>
        </div>
        <button onClick={() => navigate('/rules')} style={{
          background: 'var(--accent-glow)', border: '1px solid var(--border-accent)', borderRadius: '10px',
          padding: '8px 14px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: 'var(--accent)',
          fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap', flexShrink: 0,
        }}>{t('faq.rules_link')}</button>
      </div>

      {cards.map(card => <FaqCardComponent key={card.id} card={card} />)}
    </div>
  )
}
