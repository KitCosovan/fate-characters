// src/pages/FaqPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface FaqItem {
  q: string
  a: string
}

interface FaqCard {
  id: string
  title: string
  icon: string
  color: string
  items: FaqItem[]
}

const FAQ_CARDS: FaqCard[] = [
  {
    id: 'start',
    title: 'Начало работы',
    icon: '◎',
    color: '#c8a96e',
    items: [
      { q: 'Что это за приложение?', a: 'Fate Characters — инструмент для управления персонажами в настольных RPG на системе Fate. Создавай листы персонажей, отслеживай стресс во время игры, веди кампании с другими игроками в реальном времени.' },
      { q: 'С чего начать?', a: 'Нажми «+ Создать» на главной, выбери систему (Fate Core, FAE или Книга Пепла) и заполни имя с аспектами. Остальное можно дополнить позже. Для игры с другими — создай кампанию во вкладке «Кампании».' },
      { q: 'Нужен ли аккаунт?', a: 'Нет. Без аккаунта всё работает — персонажи хранятся в браузере. Аккаунт нужен только для синхронизации между устройствами и мультиплеерных кампаний.' },
      { q: 'Работает ли офлайн?', a: 'Да. После первого открытия приложение кешируется и работает без интернета. При восстановлении соединения данные синхронизируются автоматически.' },
      { q: 'Как установить на телефон?', a: 'iOS: Safari → «Поделиться» → «На экран Домой». Android: Chrome предложит установку автоматически или «Меню» → «Добавить на главный экран». После установки работает как нативное приложение.' },
    ]
  },
  {
    id: 'characters',
    title: 'Персонажи',
    icon: '◈',
    color: '#70c0c0',
    items: [
      { q: 'Как создать персонажа?', a: 'Нажми «+ Создать» на главной или во вкладке «Персонажи». Выбери систему, заполни имя, аспекты и навыки. Трюки и снаряжение можно добавить позже.' },
      { q: 'Как отмечать стресс во время игры?', a: 'Открой персонажа, найди блок «Стресс» и нажми на ячейку — она отметится. Для последствий введи текст в нужное поле. Изменения сохраняются автоматически и сразу видны всем участникам кампании.' },
      { q: 'Где управлять жетонами судьбы?', a: 'Жетоны отображаются на листе персонажа. Нажимай «+» и «−» чтобы тратить и получать. Начальный запас = значение обновления (по умолчанию 3).' },
      { q: 'В чём разница между персонажем и НПС?', a: 'Персонажи — игровые персонажи, их создают игроки. НПС — неигровые персонажи ГМ. В кампании ГМ контролирует видимость НПС: можно скрыть или показать только часть характеристик.' },
      { q: 'Как поделиться персонажем?', a: 'Открой персонажа → кнопка «Поделиться». Два варианта ссылки: «Импорт» — получатель добавит копию себе; «Только просмотр» — увидит лист без редактирования. Ссылка просмотра удобна чтобы ГМ ознакомился с персонажем заранее.' },
      { q: 'Как экспортировать / импортировать персонажа?', a: 'Открой персонажа → иконка дискеты → скачается JSON-файл. Для импорта — на главной нажми иконку импорта и выбери файл. Удобно для резервных копий и переноса на другое устройство.' },
    ]
  },
  {
    id: 'campaigns',
    title: 'Кампании',
    icon: '⬡',
    color: '#a070e0',
    items: [
      { q: 'Что такое кампания?', a: 'Общее пространство для ГМ и игроков. В кампании все персонажи видны в реальном времени, ГМ управляет НПС и их видимостью для игроков.' },
      { q: 'Как создать кампанию?', a: 'Вкладка «Кампании» → «Новая кампания». Выбери название, систему и роль — Мастер или Игрок. Роль задаётся один раз при создании.' },
      { q: 'Как пригласить игроков?', a: 'Войди в комнату кампании → «Инвайт». Появится 6-значный код и ссылка. Отправь игроку любое из них — он вводит код на странице /join.' },
      { q: 'Как вступить в кампанию?', a: 'Получи код от ГМ → перейди на страницу /join или используй ссылку из инвайта. Потребуется аккаунт. После вступления кампания появится у тебя с ролью Игрок.' },
      { q: 'Как привязать персонажа к кампании?', a: 'После вступления — вкладка «Кампании», разверни кампанию, нажми «+ в кампанию» рядом со своим персонажем. После этого персонаж появится в комнате и будет виден всем участникам.' },
      { q: 'Обновления стресса видны в реальном времени?', a: 'Да. Когда персонаж привязан к кампании и ты в комнате — стресс, последствия и жетоны обновляются мгновенно у всех участников без перезагрузки страницы.' },
      { q: 'Как ГМ управляет видимостью НПС?', a: 'В комнате кампании у каждого НПС кнопки «Виден/Скрыт» и «Поля». «Поля» позволяют выбрать что видят игроки — например только имя, но не навыки. По умолчанию НПС скрыты от игроков.' },
    ]
  },
  {
    id: 'sync',
    title: 'Синхронизация',
    icon: '↻',
    color: '#70a0e0',
    items: [
      { q: 'Как работает синхронизация?', a: 'При входе в аккаунт локальные и серверные данные объединяются — побеждает более свежая версия по дате обновления. При изменении персонажа данные автоматически уходят на сервер.' },
      { q: 'Как работать с нескольких устройств?', a: 'Войди в один аккаунт на обоих устройствах. Данные синхронизируются при открытии. Для немедленного обновления — нажми иконку синхронизации в меню аккаунта (аватар в правом верхнем углу).' },
      { q: 'Потерял данные — что делать?', a: 'Если есть аккаунт — войди и нажми синхронизацию в меню аккаунта. Если данные были только локально без аккаунта — восстановить нельзя. Рекомендуем регулярно экспортировать персонажей через кнопку дискеты.' },
    ]
  },
]

function FaqCard({ card }: { card: FaqCard }) {
  const [openItem, setOpenItem] = useState<string | null>(null)

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: '20px', overflow: 'hidden',
      borderTop: `3px solid ${card.color}`,
    }}>
      {/* Заголовок карточки */}
      <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '10px', flexShrink: 0,
          background: `${card.color}18`, border: `1px solid ${card.color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', color: card.color, fontWeight: 700,
        }}>
          {card.icon}
        </div>
        <div>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '16px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            {card.title}
          </h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
            {card.items.length} вопросов
          </p>
        </div>
      </div>

      {/* Вопросы */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        {card.items.map((item, i) => {
          const id = `${card.id}-${i}`
          const isOpen = openItem === id
          return (
            <div key={id} style={{ borderBottom: i < card.items.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <button
                onClick={() => setOpenItem(isOpen ? null : id)}
                style={{
                  width: '100%', background: isOpen ? `${card.color}08` : 'none',
                  border: 'none', cursor: 'pointer', padding: '14px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                  textAlign: 'left', transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)' }}
                onMouseLeave={e => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = 'none' }}
              >
                <span style={{ fontSize: '14px', fontWeight: 600, color: isOpen ? card.color : 'var(--text)', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.4, transition: 'color 0.15s' }}>
                  {item.q}
                </span>
                <span style={{
                  fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0,
                  display: 'inline-block',
                  transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 0.2s',
                }}>▼</span>
              </button>
              {isOpen && (
                <div style={{ padding: '0 20px 16px', borderTop: `1px solid ${card.color}22` }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-dim)', margin: '12px 0 0', lineHeight: 1.6 }}>
                    {item.a}
                  </p>
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '32px' }}>
      {/* Шапка */}
      <div>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)', margin: '0 0 4px' }}>
          Частые вопросы
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 0' }}>
          Как пользоваться приложением — для новичков и не только
        </p>
      </div>

      {/* Ссылка на правила */}
      <div style={{
        padding: '14px 18px', borderRadius: '14px',
        background: 'var(--surface)', border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
      }}>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', margin: '0 0 2px' }}>
            Ищешь правила системы?
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Fate Core, FAE и Книга Пепла — краткие справочники по механикам
          </p>
        </div>
        <button onClick={() => navigate('/rules')} style={{
          background: 'var(--accent-glow)', border: '1px solid var(--border-accent)',
          borderRadius: '10px', padding: '8px 14px', cursor: 'pointer',
          fontSize: '12px', fontWeight: 600, color: 'var(--accent)',
          fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          К правилам →
        </button>
      </div>

      {/* Карточки */}
      {FAQ_CARDS.map(card => <FaqCard key={card.id} card={card} />)}
    </div>
  )
}
