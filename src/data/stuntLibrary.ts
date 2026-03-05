// src/data/stuntLibrary.ts

export interface LibraryStunt {
  id: string
  name: string
  description: string
  skillId: string
  systems: string[] // 'fate-core' | 'book-of-ashes' | 'all'
}

export const stuntLibrary: LibraryStunt[] = [

  // ── АТЛЕТИКА ──────────────────────────────────────────────────────
  {
    id: 'lib-athletics-1',
    name: 'Акробат',
    description: '+2 к Атлетике когда преодолеваешь препятствие с помощью прыжков, кувырков или акробатики.',
    skillId: 'athletics',
    systems: ['all'],
  },
  {
    id: 'lib-athletics-2',
    name: 'Уклонение',
    description: '+2 к Атлетике при защите от физических атак, если ты двигаешься.',
    skillId: 'athletics',
    systems: ['all'],
  },
  {
    id: 'lib-athletics-3',
    name: 'Спринтер',
    description: 'Можешь переместиться на две зоны бесплатно вместо одной при действии Атлетики на движение.',
    skillId: 'athletics',
    systems: ['all'],
  },
  {
    id: 'lib-athletics-4',
    name: 'Падение кошки',
    description: 'Никогда не получаешь стресс от падения, если руки свободны.',
    skillId: 'athletics',
    systems: ['all'],
  },
  {
    id: 'lib-athletics-5',
    name: 'Паркур',
    description: 'Когда создаёшь преимущество используя окружение (стены, крыши), получаешь дополнительный бесплатный призыв.',
    skillId: 'athletics',
    systems: ['all'],
  },

  // ── ВЗЛОМ ──────────────────────────────────────────────────────────
  {
    id: 'lib-burglary-1',
    name: 'Мастер замков',
    description: '+2 к Взлому при вскрытии замков и механических ловушек.',
    skillId: 'burglary',
    systems: ['all'],
  },
  {
    id: 'lib-burglary-2',
    name: 'Чистые руки',
    description: '+2 к Взлому при карманных кражах и незаметном похищении предметов.',
    skillId: 'burglary',
    systems: ['all'],
  },
  {
    id: 'lib-burglary-3',
    name: 'Знаю как думают охранники',
    description: 'Можешь использовать Взлом вместо Расследования при изучении систем безопасности.',
    skillId: 'burglary',
    systems: ['all'],
  },
  {
    id: 'lib-burglary-4',
    name: 'Быстрый взлом',
    description: 'Раз в сцену можешь вскрыть простой замок или обойти несложную защиту без броска.',
    skillId: 'burglary',
    systems: ['all'],
  },
  {
    id: 'lib-burglary-5',
    name: 'Тихий как тень',
    description: '+2 к Взлому при проникновении в здания, если тебя ещё не заметили.',
    skillId: 'burglary',
    systems: ['all'],
  },

  // ── СВЯЗИ ──────────────────────────────────────────────────────────
  {
    id: 'lib-contacts-1',
    name: 'Нужный человек',
    description: '+2 к Связям когда ищешь специалиста или эксперта в незнакомом месте.',
    skillId: 'contacts',
    systems: ['all'],
  },
  {
    id: 'lib-contacts-2',
    name: 'Слухи с улиц',
    description: 'Можешь использовать Связи вместо Расследования чтобы узнать что происходит в городе.',
    skillId: 'contacts',
    systems: ['all'],
  },
  {
    id: 'lib-contacts-3',
    name: 'Везде есть друг',
    description: 'Раз за сессию можешь объявить что в любом месте у тебя есть знакомый без броска.',
    skillId: 'contacts',
    systems: ['all'],
  },
  {
    id: 'lib-contacts-4',
    name: 'Сеть осведомителей',
    description: '+2 к Связям при сборе информации о криминальных структурах или тайных организациях.',
    skillId: 'contacts',
    systems: ['all'],
  },
  {
    id: 'lib-contacts-5',
    name: 'Рекомендация',
    description: 'Можешь тратить бесплатные призывы от Связей на броски Общения в той же сцене.',
    skillId: 'contacts',
    systems: ['all'],
  },

  // ── РЕМЕСЛО ───────────────────────────────────────────────────────
  {
    id: 'lib-crafts-1',
    name: 'Мастер на все руки',
    description: '+2 к Ремеслу при починке снаряжения в полевых условиях без инструментов.',
    skillId: 'crafts',
    systems: ['all'],
  },
  {
    id: 'lib-crafts-2',
    name: 'Быстрая сборка',
    description: 'Можешь создать импровизированное оружие или инструмент за одно действие.',
    skillId: 'crafts',
    systems: ['all'],
  },
  {
    id: 'lib-crafts-3',
    name: 'Слабое место',
    description: '+2 к Ремеслу при изучении механизма или конструкции — находишь уязвимость.',
    skillId: 'crafts',
    systems: ['all'],
  },
  {
    id: 'lib-crafts-4',
    name: 'Алхимик',
    description: 'Можешь использовать Ремесло вместо Знаний при создании зелий и химических веществ.',
    skillId: 'crafts',
    systems: ['all'],
  },
  {
    id: 'lib-crafts-5',
    name: 'Доработка',
    description: 'Раз за сессию можешь улучшить оружие или снаряжение — оно даёт +1 к броскам до конца сессии.',
    skillId: 'crafts',
    systems: ['all'],
  },

  // ── ОБМАН ─────────────────────────────────────────────────────────
  {
    id: 'lib-deceive-1',
    name: 'Непробиваемая ложь',
    description: '+2 к Обману когда персонаж уже поверил тебе хотя бы раз в этой сцене.',
    skillId: 'deceive',
    systems: ['all'],
  },
  {
    id: 'lib-deceive-2',
    name: 'Мастер личин',
    description: '+2 к Обману при создании и поддержании маскировки или чужой личности.',
    skillId: 'deceive',
    systems: ['all'],
  },
  {
    id: 'lib-deceive-3',
    name: 'Правда наполовину',
    description: 'Можешь использовать Обман вместо Общения когда манипулируешь через частичную правду.',
    skillId: 'deceive',
    systems: ['all'],
  },
  {
    id: 'lib-deceive-4',
    name: 'Отвлечение',
    description: 'Раз за сцену можешь атаковать Обманом не оставляя следов — противник не понимает что его обманули.',
    skillId: 'deceive',
    systems: ['all'],
  },
  {
    id: 'lib-deceive-5',
    name: 'Двойная игра',
    description: '+2 к Обману когда притворяешься союзником врага.',
    skillId: 'deceive',
    systems: ['all'],
  },

  // ── ВОЖДЕНИЕ / ВЕРХОВАЯ ЕЗДА ──────────────────────────────────────
  {
    id: 'lib-drive-1',
    name: 'Опытный наездник',
    description: '+2 к Вождению / Верховой езде при управлении в стрессовых ситуациях.',
    skillId: 'drive',
    systems: ['all'],
  },
  {
    id: 'lib-drive-2',
    name: 'Преследование',
    description: '+2 к Вождению при погонях — как преследователю, так и беглецу.',
    skillId: 'drive',
    systems: ['all'],
  },
  {
    id: 'lib-drive-3',
    name: 'Знаю каждую дорогу',
    description: 'Можешь использовать Вождение вместо Знаний при навигации в знакомой местности.',
    skillId: 'drive',
    systems: ['all'],
  },
  {
    id: 'lib-drive-4',
    name: 'Боевой манёвр',
    description: 'Можешь атаковать Вождением тараня пешего противника — без штрафа к броску.',
    skillId: 'drive',
    systems: ['all'],
  },
  {
    id: 'lib-drive-5',
    name: 'Сроднился с конём',
    description: 'Твоё ездовое животное / транспорт имеет аспект который ты можешь призывать бесплатно раз за сцену.',
    skillId: 'drive',
    systems: ['all'],
  },

  // ── ЭМПАТИЯ ───────────────────────────────────────────────────────
  {
    id: 'lib-empathy-1',
    name: 'Читать людей',
    description: '+2 к Эмпатии при первой встрече с персонажем — сразу чувствуешь его настрой.',
    skillId: 'empathy',
    systems: ['all'],
  },
  {
    id: 'lib-empathy-2',
    name: 'Слушать между слов',
    description: 'Можешь использовать Эмпатию вместо Расследования чтобы понять лжёт ли персонаж.',
    skillId: 'empathy',
    systems: ['all'],
  },
  {
    id: 'lib-empathy-3',
    name: 'Поддержка',
    description: 'Раз за сцену можешь снять с союзника лёгкое последствие разговором и вниманием.',
    skillId: 'empathy',
    systems: ['all'],
  },
  {
    id: 'lib-empathy-4',
    name: 'Чужая боль',
    description: '+2 к Эмпатии когда помогаешь персонажу справиться с эмоциональным кризисом.',
    skillId: 'empathy',
    systems: ['all'],
  },
  {
    id: 'lib-empathy-5',
    name: 'Слабое место',
    description: 'При успешном создании преимущества Эмпатией, союзники получают +1 к броскам против этого персонажа.',
    skillId: 'empathy',
    systems: ['all'],
  },

  // ── БОЙ / ДРАКА ───────────────────────────────────────────────────
  {
    id: 'lib-fight-1',
    name: 'Сокрушительный удар',
    description: '+2 к Бою когда атакуешь безоружного или существенно более слабого противника.',
    skillId: 'fight',
    systems: ['all'],
  },
  {
    id: 'lib-fight-2',
    name: 'Контратака',
    description: 'Когда успешно защищаешься в ближнем бою, можешь нанести урон равный разнице бросков.',
    skillId: 'fight',
    systems: ['all'],
  },
  {
    id: 'lib-fight-3',
    name: 'Вихрь ударов',
    description: 'Раз за сцену можешь атаковать всех врагов в своей зоне одним броском.',
    skillId: 'fight',
    systems: ['all'],
  },
  {
    id: 'lib-fight-4',
    name: 'Оружейник',
    description: 'Можешь использовать Бой вместо Ремесла при оценке или починке оружия.',
    skillId: 'fight',
    systems: ['all'],
  },
  {
    id: 'lib-fight-5',
    name: 'Запугать взглядом',
    description: '+2 к Бою при создании преимущества запугиванием — демонстрация силы в бою.',
    skillId: 'fight',
    systems: ['all'],
  },

  // ── РАССЛЕДОВАНИЕ ─────────────────────────────────────────────────
  {
    id: 'lib-investigate-1',
    name: 'Острый глаз',
    description: '+2 к Расследованию при осмотре места преступления или обыске.',
    skillId: 'investigate',
    systems: ['all'],
  },
  {
    id: 'lib-investigate-2',
    name: 'Дедукция',
    description: 'Можешь использовать Расследование вместо Знаний при анализе улик в своей области экспертизы.',
    skillId: 'investigate',
    systems: ['all'],
  },
  {
    id: 'lib-investigate-3',
    name: 'Всё связано',
    description: 'При успехе с блеском в Расследовании получаешь две подсказки вместо одной.',
    skillId: 'investigate',
    systems: ['all'],
  },
  {
    id: 'lib-investigate-4',
    name: 'Слежка',
    description: '+2 к Расследованию при слежке за персонажем или скрытом наблюдении.',
    skillId: 'investigate',
    systems: ['all'],
  },
  {
    id: 'lib-investigate-5',
    name: 'Вижу ложь',
    description: 'Раз за сцену можешь задать ведущему один вопрос о персонаже — он обязан ответить честно.',
    skillId: 'investigate',
    systems: ['all'],
  },

  // ── ЗНАНИЯ / ОБРАЗОВАННОСТЬ ───────────────────────────────────────
  {
    id: 'lib-lore-1',
    name: 'Ходячая энциклопедия',
    description: '+2 к Знаниям при ответах на вопросы об истории, науке или культуре.',
    skillId: 'lore',
    systems: ['all'],
  },
  {
    id: 'lib-lore-2',
    name: 'Медик',
    description: 'Можешь использовать Знания для лечения физических последствий — раз за сцену.',
    skillId: 'lore',
    systems: ['all'],
  },
  {
    id: 'lib-lore-3',
    name: 'Знаю врага',
    description: '+2 к Знаниям при создании преимущества связанного со слабостями или привычками конкретного типа существ.',
    skillId: 'lore',
    systems: ['all'],
  },
  {
    id: 'lib-lore-4',
    name: 'Быстрое обучение',
    description: 'Раз за сессию можешь заявить что обладаешь нужным знанием в любой области без броска.',
    skillId: 'lore',
    systems: ['all'],
  },
  {
    id: 'lib-lore-5',
    name: 'Тактик',
    description: 'Можешь использовать Знания вместо Боя при создании преимуществ через тактический анализ.',
    skillId: 'lore',
    systems: ['all'],
  },

  // ── ВНИМАНИЕ / ВНИМАТЕЛЬНОСТЬ ─────────────────────────────────────
  {
    id: 'lib-notice-1',
    name: 'Шестое чувство',
    description: '+2 к Вниманию при обнаружении засады или скрытой угрозы.',
    skillId: 'notice',
    systems: ['all'],
  },
  {
    id: 'lib-notice-2',
    name: 'Зоркий глаз',
    description: '+2 к Вниманию на дальних дистанциях и в темноте.',
    skillId: 'notice',
    systems: ['all'],
  },
  {
    id: 'lib-notice-3',
    name: 'Всегда начеку',
    description: 'Никогда не застигнут врасплох — всегда действуешь в первом обмене неожиданного столкновения.',
    skillId: 'notice',
    systems: ['all'],
  },
  {
    id: 'lib-notice-4',
    name: 'Читать обстановку',
    description: 'Можешь использовать Внимание вместо Эмпатии при оценке настроения толпы или группы.',
    skillId: 'notice',
    systems: ['all'],
  },
  {
    id: 'lib-notice-5',
    name: 'Поиск слабостей',
    description: 'Раз за сцену после наблюдения за противником: +2 к следующей атаке против него.',
    skillId: 'notice',
    systems: ['all'],
  },

  // ── ТЕЛОСЛОЖЕНИЕ ──────────────────────────────────────────────────
  {
    id: 'lib-physique-1',
    name: 'Железный организм',
    description: '+2 к Телосложению при сопротивлении яду, болезни или экстремальным условиям.',
    skillId: 'physique',
    systems: ['all'],
  },
  {
    id: 'lib-physique-2',
    name: 'Живая стена',
    description: '+2 к Телосложению при защите союзников — принимаешь удар на себя.',
    skillId: 'physique',
    systems: ['all'],
  },
  {
    id: 'lib-physique-3',
    name: 'Несгибаемый',
    description: 'Раз за сцену можешь игнорировать лёгкое последствие и продолжать действовать.',
    skillId: 'physique',
    systems: ['all'],
  },
  {
    id: 'lib-physique-4',
    name: 'Сила горы',
    description: '+2 к Телосложению при преодолении препятствий требующих грубой силы.',
    skillId: 'physique',
    systems: ['all'],
  },
  {
    id: 'lib-physique-5',
    name: 'Боевой закал',
    description: 'Можешь поглотить одно лёгкое физическое последствие не записывая его раз за сцену.',
    skillId: 'physique',
    systems: ['all'],
  },

  // ── ПРОВОКАЦИЯ ────────────────────────────────────────────────────
  {
    id: 'lib-provoke-1',
    name: 'Холодный взгляд',
    description: '+2 к Провокации при запугивании одного противника в начале конфликта.',
    skillId: 'provoke',
    systems: ['all'],
  },
  {
    id: 'lib-provoke-2',
    name: 'Вывести из равновесия',
    description: 'Можешь использовать Провокацию для атаки ментального стресса даже в физическом конфликте.',
    skillId: 'provoke',
    systems: ['all'],
  },
  {
    id: 'lib-provoke-3',
    name: 'Боевой клич',
    description: 'Раз за сцену: +2 к Провокации при атаке всех врагов в зоне ментальным стрессом.',
    skillId: 'provoke',
    systems: ['all'],
  },
  {
    id: 'lib-provoke-4',
    name: 'Давление',
    description: '+2 к Провокации когда противник уже имеет хотя бы одно последствие.',
    skillId: 'provoke',
    systems: ['all'],
  },
  {
    id: 'lib-provoke-5',
    name: 'Слабое место',
    description: 'При успешном создании преимущества Провокацией, противник получает -1 к броскам Воли до конца сцены.',
    skillId: 'provoke',
    systems: ['all'],
  },

  // ── ОБЩЕНИЕ ───────────────────────────────────────────────────────
  {
    id: 'lib-rapport-1',
    name: 'Первое впечатление',
    description: '+2 к Общению при первой встрече с персонажем.',
    skillId: 'rapport',
    systems: ['all'],
  },
  {
    id: 'lib-rapport-2',
    name: 'Вдохновляющая речь',
    description: 'Раз за сцену можешь дать союзникам +1 к следующим броскам произнеся короткую речь.',
    skillId: 'rapport',
    systems: ['all'],
  },
  {
    id: 'lib-rapport-3',
    name: 'Найти общий язык',
    description: 'Можешь использовать Общение вместо любого социального навыка раз за сцену.',
    skillId: 'rapport',
    systems: ['all'],
  },
  {
    id: 'lib-rapport-4',
    name: 'Харизматичный лидер',
    description: '+2 к Общению при убеждении группы или толпы.',
    skillId: 'rapport',
    systems: ['all'],
  },
  {
    id: 'lib-rapport-5',
    name: 'Сочувствие',
    description: 'Можешь использовать Общение вместо Эмпатии при снятии ментального стресса с союзника.',
    skillId: 'rapport',
    systems: ['all'],
  },

  // ── РЕСУРСЫ (только Fate Core) ────────────────────────────────────
  {
    id: 'lib-resources-1',
    name: 'Деньги решают',
    description: '+2 к Ресурсам когда предлагаешь взятку или платишь за срочную услугу.',
    skillId: 'resources',
    systems: ['fate-core'],
  },
  {
    id: 'lib-resources-2',
    name: 'Запасы',
    description: 'Раз за сессию можешь получить любой обычный предмет без броска — он у тебя просто есть.',
    skillId: 'resources',
    systems: ['fate-core'],
  },
  {
    id: 'lib-resources-3',
    name: 'Связи через деньги',
    description: 'Можешь использовать Ресурсы вместо Связей когда деньги могут открыть нужную дверь.',
    skillId: 'resources',
    systems: ['fate-core'],
  },
  {
    id: 'lib-resources-4',
    name: 'Инвестиции',
    description: '+2 к Ресурсам когда действуешь в своём городе или регионе — там у тебя деловые связи.',
    skillId: 'resources',
    systems: ['fate-core'],
  },
  {
    id: 'lib-resources-5',
    name: 'Снаряжение лучшего качества',
    description: 'Раз за сессию можешь дать союзнику предмет снаряжения дающий +1 до конца сессии.',
    skillId: 'resources',
    systems: ['fate-core'],
  },

  // ── СТРЕЛЬБА ──────────────────────────────────────────────────────
  {
    id: 'lib-shoot-1',
    name: 'Меткий стрелок',
    description: '+2 к Стрельбе при атаке из укрытия или с выгодной позиции.',
    skillId: 'shoot',
    systems: ['all'],
  },
  {
    id: 'lib-shoot-2',
    name: 'Быстрый выстрел',
    description: 'Можешь атаковать Стрельбой в начале конфликта до того как противник успел среагировать.',
    skillId: 'shoot',
    systems: ['all'],
  },
  {
    id: 'lib-shoot-3',
    name: 'Прицельный огонь',
    description: '+2 к Стрельбе если в прошлом обмене не двигался.',
    skillId: 'shoot',
    systems: ['all'],
  },
  {
    id: 'lib-shoot-4',
    name: 'Подавляющий огонь',
    description: 'Раз за сцену можешь создать аспект «Под огнём» на всю зону одним броском Стрельбы.',
    skillId: 'shoot',
    systems: ['all'],
  },
  {
    id: 'lib-shoot-5',
    name: 'Дальняя цель',
    description: 'Не получаешь штраф за стрельбу на дальние дистанции.',
    skillId: 'shoot',
    systems: ['all'],
  },

  // ── СКРЫТНОСТЬ ────────────────────────────────────────────────────
  {
    id: 'lib-stealth-1',
    name: 'Раствориться в тени',
    description: '+2 к Скрытности при укрытии в темноте или при плохом освещении.',
    skillId: 'stealth',
    systems: ['all'],
  },
  {
    id: 'lib-stealth-2',
    name: 'Бесшумный шаг',
    description: '+2 к Скрытности при движении — не производишь шума.',
    skillId: 'stealth',
    systems: ['all'],
  },
  {
    id: 'lib-stealth-3',
    name: 'Удар из тени',
    description: '+2 к Бою или Стрельбе при атаке из скрытного положения + бесплатный буст.',
    skillId: 'stealth',
    systems: ['all'],
  },
  {
    id: 'lib-stealth-4',
    name: 'Исчезнуть',
    description: 'Раз за сцену можешь исчезнуть из виду даже при свидетелях — один бросок Скрытности.',
    skillId: 'stealth',
    systems: ['all'],
  },
  {
    id: 'lib-stealth-5',
    name: 'Слиться с толпой',
    description: 'Можешь использовать Скрытность вместо Обмана при смешивании с группой людей.',
    skillId: 'stealth',
    systems: ['all'],
  },

  // ── ВОЛЯ ──────────────────────────────────────────────────────────
  {
    id: 'lib-will-1',
    name: 'Несломленный',
    description: '+2 к Воле при защите от ментальных атак и запугивания.',
    skillId: 'will',
    systems: ['all'],
  },
  {
    id: 'lib-will-2',
    name: 'Железная воля',
    description: 'Раз за сцену можешь перебросить провальный бросок Воли.',
    skillId: 'will',
    systems: ['all'],
  },
  {
    id: 'lib-will-3',
    name: 'Фокус',
    description: '+2 к Воле при концентрации на сложной умственной задаче под давлением.',
    skillId: 'will',
    systems: ['all'],
  },
  {
    id: 'lib-will-4',
    name: 'Невозмутимость',
    description: 'Можешь использовать Волю вместо Эмпатии при сопротивлении социальному давлению.',
    skillId: 'will',
    systems: ['all'],
  },
  {
    id: 'lib-will-5',
    name: 'Через боль',
    description: 'Раз за сцену можешь игнорировать штраф от лёгкого последствия на один бросок.',
    skillId: 'will',
    systems: ['all'],
  },

  // ── МОЛИТВА (только Книга Пепла) ──────────────────────────────────
  {
    id: 'lib-prayer-1',
    name: 'Свет веры',
    description: '+2 к Молитве при атаке существ Тьмы или нечисти.',
    skillId: 'prayer',
    systems: ['book-of-ashes'],
  },
  {
    id: 'lib-prayer-2',
    name: 'Благословение',
    description: 'Раз за сцену можешь дать союзнику +1 к следующему броску, читая короткую молитву.',
    skillId: 'prayer',
    systems: ['book-of-ashes'],
  },
  {
    id: 'lib-prayer-3',
    name: 'Очищение',
    description: 'Можешь использовать Молитву вместо Знаний при снятии проклятий и тёмных аспектов.',
    skillId: 'prayer',
    systems: ['book-of-ashes'],
  },
  {
    id: 'lib-prayer-4',
    name: 'Огненная защита',
    description: '+2 к Молитве при создании защитного аспекта против магии тьмы.',
    skillId: 'prayer',
    systems: ['book-of-ashes'],
  },
  {
    id: 'lib-prayer-5',
    name: 'Пламя внутри',
    description: 'Раз за сессию можешь полностью восстановить один ментальный стресс-бокс молитвой.',
    skillId: 'prayer',
    systems: ['book-of-ashes'],
  },

  // ── ПУТЕШЕСТВИЯ (только Книга Пепла) ─────────────────────────────
  {
    id: 'lib-travel-1',
    name: 'Следопыт',
    description: '+2 к Путешествиям при выслеживании существ или людей по следам.',
    skillId: 'travel',
    systems: ['book-of-ashes'],
  },
  {
    id: 'lib-travel-2',
    name: 'Знаю эти земли',
    description: 'Можешь использовать Путешествия вместо Знаний в вопросах географии и местной природы.',
    skillId: 'travel',
    systems: ['book-of-ashes'],
  },
  {
    id: 'lib-travel-3',
    name: 'Лёгкий на подъём',
    description: '+2 к Путешествиям при форсированных маршах и переходах в сложных условиях.',
    skillId: 'travel',
    systems: ['book-of-ashes'],
  },
  {
    id: 'lib-travel-4',
    name: 'Ориентирование',
    description: 'Раз за сессию можешь найти безопасный маршрут без броска.',
    skillId: 'travel',
    systems: ['book-of-ashes'],
  },
  {
    id: 'lib-travel-5',
    name: 'Выживальщик',
    description: 'Можешь использовать Путешествия вместо Телосложения при выживании в дикой природе.',
    skillId: 'travel',
    systems: ['book-of-ashes'],
  },

  // ── СДЕЛКИ (только Книга Пепла) ───────────────────────────────────
  {
    id: 'lib-deals-1',
    name: 'Выгодный торг',
    description: '+2 к Сделкам при покупке или продаже — всегда находишь лучшую цену.',
    skillId: 'deals',
    systems: ['book-of-ashes'],
  },
  {
    id: 'lib-deals-2',
    name: 'Социальное лечение',
    description: 'Можешь использовать Сделки для снятия ментального стресса через правильный разговор и торг.',
    skillId: 'deals',
    systems: ['book-of-ashes'],
  },
  {
    id: 'lib-deals-3',
    name: 'Договорняк',
    description: 'Раз за сессию можешь заключить сделку которая даёт постоянный бесплатный призыв аспекта до конца сессии.',
    skillId: 'deals',
    systems: ['book-of-ashes'],
  },
  {
    id: 'lib-deals-4',
    name: 'Знаю цену всему',
    description: '+2 к Сделкам при оценке магических предметов, реликвий или необычных товаров.',
    skillId: 'deals',
    systems: ['book-of-ashes'],
  },
  {
    id: 'lib-deals-5',
    name: 'Взаимная выгода',
    description: 'Можешь использовать Сделки вместо Общения когда предлагаешь честный обмен услугами.',
    skillId: 'deals',
    systems: ['book-of-ashes'],
  },
]

// Утилиты

export function getStuntsForSkill(skillId: string, systemId: string): LibraryStunt[] {
  return stuntLibrary.filter(s =>
    s.skillId === skillId &&
    (s.systems.includes('all') || s.systems.includes(systemId))
  )
}

export function getStuntsForSystem(systemId: string): LibraryStunt[] {
  return stuntLibrary.filter(s =>
    s.systems.includes('all') || s.systems.includes(systemId)
  )
}
