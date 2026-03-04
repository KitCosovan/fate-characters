import type { NpcTemplate } from '../types'

// Хелпер для создания боксов стресса
const boxes = (count: number) =>
  Array.from({ length: count }, (_, i) => ({ index: i, checked: false }))

export const npcTemplates: NpcTemplate[] = [
  // 1. БОЕЦ
  {
    id: 'fighter',
    name: 'Боец',
    description: 'Крепкий противник в ближнем бою',
    character: {
      systemId: 'fate-core',
      name: '',
      description: '',
      isNpc: true,
      refresh: 2,
      currentFatePoints: 2,
      aspects: [
        { slotId: 'high-concept', value: 'Закалённый ветеран ближнего боя' },
        { slotId: 'trouble', value: 'Живёт только дракой — мир вне боя чужд ему' },
        { slotId: 'aspect-1', value: 'Шрамы говорят сами за себя' },
        { slotId: 'aspect-2', value: 'Верен тому, кто платит' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'fight', rating: 4 },
        { skillId: 'physique', rating: 3 },
        { skillId: 'athletics', rating: 2 },
        { skillId: 'provoke', rating: 2 },
        { skillId: 'will', rating: 1 },
        { skillId: 'notice', rating: 1 },
      ],
      stunts: [
        {
          id: 'stunt-1',
          name: 'Сокрушительный удар',
          description: '+2 к Драке при атаке противника, у которого нет оружия',
        },
        {
          id: 'stunt-2',
          name: 'Стальное тело',
          description: 'Раз за сцену может поглотить лёгкое последствие без его записи',
        },
      ],
      stressTracks: [
        { trackId: 'physical', boxes: boxes(4) },
        { trackId: 'mental', boxes: boxes(2) },
      ],
      consequences: [
        { severity: 'mild', label: 'Лёгкое', value: '' },
        { severity: 'moderate', label: 'Умеренное', value: '' },
        { severity: 'severe', label: 'Тяжёлое', value: '' },
      ],
      scars: [],
      equipment: [],
    },
  },

  // 2. ПЕРЕГОВОРЩИК
  {
    id: 'socialite',
    name: 'Переговорщик',
    description: 'Мастер слова и манипуляций',
    character: {
      systemId: 'fate-core',
      name: '',
      description: '',
      isNpc: true,
      refresh: 2,
      currentFatePoints: 2,
      aspects: [
        { slotId: 'high-concept', value: 'Хитрый манипулятор с безупречными манерами' },
        { slotId: 'trouble', value: 'Слабое тело — острый язык, но кулаки не помогут' },
        { slotId: 'aspect-1', value: 'У меня есть друзья везде — и враги тоже' },
        { slotId: 'aspect-2', value: 'Правда — лишь инструмент убеждения' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'rapport', rating: 4 },
        { skillId: 'deceive', rating: 3 },
        { skillId: 'empathy', rating: 3 },
        { skillId: 'contacts', rating: 2 },
        { skillId: 'provoke', rating: 2 },
        { skillId: 'resources', rating: 1 },
        { skillId: 'notice', rating: 1 },
      ],
      stunts: [
        {
          id: 'stunt-1',
          name: 'Читать людей',
          description: '+2 к Эмпатии при первом разговоре с незнакомцем',
        },
        {
          id: 'stunt-2',
          name: 'Мастер полуправды',
          description: 'Может использовать Обман вместо Общения при переговорах, если собеседник не подозревает об обмане',
        },
      ],
      stressTracks: [
        { trackId: 'physical', boxes: boxes(2) },
        { trackId: 'mental', boxes: boxes(4) },
      ],
      consequences: [
        { severity: 'mild', label: 'Лёгкое', value: '' },
        { severity: 'moderate', label: 'Умеренное', value: '' },
        { severity: 'severe', label: 'Тяжёлое', value: '' },
      ],
      scars: [],
      equipment: [],
    },
  },

  // 3. МЕЛКИЙ ВРАГ
  {
    id: 'mook',
    name: 'Мелкий враг',
    description: 'Слабый противник, массовка',
    character: {
      systemId: 'fate-core',
      name: '',
      description: '',
      isNpc: true,
      refresh: 1,
      currentFatePoints: 1,
      aspects: [
        { slotId: 'high-concept', value: 'Обычный головорез на жалованье' },
        { slotId: 'trouble', value: 'Трус в душе — бежит при первой возможности' },
        { slotId: 'aspect-1', value: 'Силён в толпе, слаб в одиночку' },
        { slotId: 'aspect-2', value: '' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'fight', rating: 2 },
        { skillId: 'athletics', rating: 1 },
        { skillId: 'physique', rating: 1 },
        { skillId: 'notice', rating: 1 },
      ],
      stunts: [
        {
          id: 'stunt-1',
          name: 'Сила толпы',
          description: '+1 к атаке за каждого союзника в той же зоне (максимум +3)',
        },
      ],
      stressTracks: [
        { trackId: 'physical', boxes: boxes(2) },
        { trackId: 'mental', boxes: boxes(2) },
      ],
      consequences: [
        { severity: 'mild', label: 'Лёгкое', value: '' },
        { severity: 'moderate', label: 'Умеренное', value: '' },
        { severity: 'severe', label: 'Тяжёлое', value: '' },
      ],
      scars: [],
      equipment: [],
    },
  },

  // 4. БОСС
  {
    id: 'boss',
    name: 'Босс',
    description: 'Сильный противник, главный злодей',
    character: {
      systemId: 'fate-core',
      name: '',
      description: '',
      isNpc: true,
      refresh: 3,
      currentFatePoints: 3,
      aspects: [
        { slotId: 'high-concept', value: 'Безжалостный злодей с грандиозным планом' },
        { slotId: 'trouble', value: 'Паранойя и недоверие разрушают его союзы' },
        { slotId: 'aspect-1', value: 'Всегда на шаг впереди противников' },
        { slotId: 'aspect-2', value: 'Власть — единственное что имеет значение' },
        { slotId: 'aspect-3', value: 'У меня есть запасной план' },
      ],
      skills: [
        { skillId: 'fight', rating: 4 },
        { skillId: 'provoke', rating: 4 },
        { skillId: 'deceive', rating: 3 },
        { skillId: 'physique', rating: 3 },
        { skillId: 'will', rating: 3 },
        { skillId: 'notice', rating: 2 },
        { skillId: 'resources', rating: 2 },
        { skillId: 'contacts', rating: 1 },
      ],
      stunts: [
        {
          id: 'stunt-1',
          name: 'Неудержимый',
          description: '+2 к защите от Преодолений направленных против него',
        },
        {
          id: 'stunt-2',
          name: 'Запугивание',
          description: 'Может использовать Провокацию вместо Драки для создания преимуществ в бою',
        },
        {
          id: 'stunt-3',
          name: 'Последний козырь',
          description: 'Раз за сессию может отменить одно последствие в начале своего хода',
        },
      ],
      stressTracks: [
        { trackId: 'physical', boxes: boxes(4) },
        { trackId: 'mental', boxes: boxes(4) },
      ],
      consequences: [
        { severity: 'mild', label: 'Лёгкое', value: '' },
        { severity: 'moderate', label: 'Умеренное', value: '' },
        { severity: 'severe', label: 'Тяжёлое', value: '' },
      ],
      scars: [],
      equipment: [],
    },
  },

  // 5. УБИЙЦА
  {
    id: 'assassin',
    name: 'Убийца',
    description: 'Тихий и смертоносный наёмник',
    character: {
      systemId: 'fate-core',
      name: '',
      description: '',
      isNpc: true,
      refresh: 2,
      currentFatePoints: 2,
      aspects: [
        { slotId: 'high-concept', value: 'Призрак — убивает прежде чем его замечают' },
        { slotId: 'trouble', value: 'Прошлое преследует — кто-то знает его лицо' },
        { slotId: 'aspect-1', value: 'Контракт священен, пока платят' },
        { slotId: 'aspect-2', value: 'Один удар — одна смерть' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'stealth', rating: 4 },
        { skillId: 'fight', rating: 3 },
        { skillId: 'athletics', rating: 3 },
        { skillId: 'notice', rating: 2 },
        { skillId: 'deceive', rating: 2 },
        { skillId: 'investigate', rating: 1 },
        { skillId: 'shoot', rating: 1 },
      ],
      stunts: [
        {
          id: 'stunt-1',
          name: 'Удар из тени',
          description: 'Когда атакует из скрытности, получает +2 к Драке и бесплатное усиление при успехе',
        },
        {
          id: 'stunt-2',
          name: 'Бесследный',
          description: '+2 к Скрытности при попытке исчезнуть в конце сцены',
        },
      ],
      stressTracks: [
        { trackId: 'physical', boxes: boxes(3) },
        { trackId: 'mental', boxes: boxes(3) },
      ],
      consequences: [
        { severity: 'mild', label: 'Лёгкое', value: '' },
        { severity: 'moderate', label: 'Умеренное', value: '' },
        { severity: 'severe', label: 'Тяжёлое', value: '' },
      ],
      scars: [],
      equipment: [],
    },
  },

  // 6. УЧЁНЫЙ / МАГ
  {
    id: 'scholar',
    name: 'Учёный',
    description: 'Знаток тайн и оккультных наук',
    character: {
      systemId: 'fate-core',
      name: '',
      description: '',
      isNpc: true,
      refresh: 2,
      currentFatePoints: 2,
      aspects: [
        { slotId: 'high-concept', value: 'Хранитель запретных знаний' },
        { slotId: 'trouble', value: 'Знания без мудрости — опасное оружие' },
        { slotId: 'aspect-1', value: 'Я читал об этом — это не значит что выжил' },
        { slotId: 'aspect-2', value: 'Любопытство сильнее инстинкта самосохранения' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'lore', rating: 4 },
        { skillId: 'investigate', rating: 3 },
        { skillId: 'will', rating: 3 },
        { skillId: 'crafts', rating: 2 },
        { skillId: 'notice', rating: 2 },
        { skillId: 'rapport', rating: 1 },
        { skillId: 'resources', rating: 1 },
      ],
      stunts: [
        {
          id: 'stunt-1',
          name: 'Энциклопедический разум',
          description: '+2 к Знаниям при первом столкновении с существом или явлением',
        },
        {
          id: 'stunt-2',
          name: 'Слабое место',
          description: 'После успешного броска Знаний на изучение противника — следующая атака союзника получает +2',
        },
      ],
      stressTracks: [
        { trackId: 'physical', boxes: boxes(2) },
        { trackId: 'mental', boxes: boxes(4) },
      ],
      consequences: [
        { severity: 'mild', label: 'Лёгкое', value: '' },
        { severity: 'moderate', label: 'Умеренное', value: '' },
        { severity: 'severe', label: 'Тяжёлое', value: '' },
      ],
      scars: [],
      equipment: [],
    },
  },

  // 7. ТОРГОВЕЦ
  {
    id: 'merchant',
    name: 'Торговец',
    description: 'Богатый и влиятельный делец',
    character: {
      systemId: 'fate-core',
      name: '',
      description: '',
      isNpc: true,
      refresh: 2,
      currentFatePoints: 2,
      aspects: [
        { slotId: 'high-concept', value: 'Богатый купец с длинными руками' },
        { slotId: 'trouble', value: 'Деньги — единственный язык который он понимает' },
        { slotId: 'aspect-1', value: 'У меня есть нужный человек для любого дела' },
        { slotId: 'aspect-2', value: 'Долги не забываются — ни свои ни чужие' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'resources', rating: 4 },
        { skillId: 'contacts', rating: 4 },
        { skillId: 'rapport', rating: 3 },
        { skillId: 'deceive', rating: 2 },
        { skillId: 'empathy', rating: 2 },
        { skillId: 'investigate', rating: 1 },
        { skillId: 'notice', rating: 1 },
      ],
      stunts: [
        {
          id: 'stunt-1',
          name: 'Сеть связей',
          description: '+2 к Контактам при поиске информации или людей в любом городе',
        },
        {
          id: 'stunt-2',
          name: 'Цена всему',
          description: 'Может использовать Ресурсы вместо Общения при переговорах с жадными НПС',
        },
      ],
      stressTracks: [
        { trackId: 'physical', boxes: boxes(2) },
        { trackId: 'mental', boxes: boxes(3) },
      ],
      consequences: [
        { severity: 'mild', label: 'Лёгкое', value: '' },
        { severity: 'moderate', label: 'Умеренное', value: '' },
        { severity: 'severe', label: 'Тяжёлое', value: '' },
      ],
      scars: [],
      equipment: [],
    },
  },

  // 8. СТРАЖ / ЗАЩИТНИК
  {
    id: 'guardian',
    name: 'Страж',
    description: 'Непробиваемый защитник и телохранитель',
    character: {
      systemId: 'fate-core',
      name: '',
      description: '',
      isNpc: true,
      refresh: 2,
      currentFatePoints: 2,
      aspects: [
        { slotId: 'high-concept', value: 'Живой щит — стоит между опасностью и подопечным' },
        { slotId: 'trouble', value: 'Долг важнее жизни — даже собственной' },
        { slotId: 'aspect-1', value: 'Через меня не пройдёт никто' },
        { slotId: 'aspect-2', value: 'Присяга нерушима, пока жив' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'physique', rating: 4 },
        { skillId: 'fight', rating: 3 },
        { skillId: 'athletics', rating: 3 },
        { skillId: 'will', rating: 2 },
        { skillId: 'notice', rating: 2 },
        { skillId: 'empathy', rating: 1 },
      ],
      stunts: [
        {
          id: 'stunt-1',
          name: 'Живой щит',
          description: 'Может принять удар предназначенный союзнику в той же зоне, бросив Атлетику или Телосложение',
        },
        {
          id: 'stunt-2',
          name: 'Несгибаемый',
          description: '+2 к Телосложению при защите от физических атак когда уже есть последствие',
        },
      ],
      stressTracks: [
        { trackId: 'physical', boxes: boxes(4) },
        { trackId: 'mental', boxes: boxes(3) },
      ],
      consequences: [
        { severity: 'mild', label: 'Лёгкое', value: '' },
        { severity: 'moderate', label: 'Умеренное', value: '' },
        { severity: 'severe', label: 'Тяжёлое', value: '' },
      ],
      scars: [],
      equipment: [],
    },
  },

  // 9. ТРИКСТЕР
  {
    id: 'trickster',
    name: 'Трикстер',
    description: 'Обманщик, плут и мастер иллюзий',
    character: {
      systemId: 'fate-core',
      name: '',
      description: '',
      isNpc: true,
      refresh: 2,
      currentFatePoints: 2,
      aspects: [
        { slotId: 'high-concept', value: 'Мастер обмана — никто не знает его настоящего лица' },
        { slotId: 'trouble', value: 'Лжёт даже когда правда выгоднее' },
        { slotId: 'aspect-1', value: 'Всегда есть запасной трюк в рукаве' },
        { slotId: 'aspect-2', value: 'Хаос — лучший союзник' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'deceive', rating: 4 },
        { skillId: 'burglary', rating: 3 },
        { skillId: 'athletics', rating: 3 },
        { skillId: 'rapport', rating: 2 },
        { skillId: 'stealth', rating: 2 },
        { skillId: 'provoke', rating: 1 },
        { skillId: 'notice', rating: 1 },
      ],
      stunts: [
        {
          id: 'stunt-1',
          name: 'Дымовая завеса',
          description: '+2 к Обману при создании отвлекающих преимуществ в конфликте',
        },
        {
          id: 'stunt-2',
          name: 'Чужое лицо',
          description: 'Может принять личность другого человека — +2 к Обману пока маска не сорвана',
        },
      ],
      stressTracks: [
        { trackId: 'physical', boxes: boxes(2) },
        { trackId: 'mental', boxes: boxes(3) },
      ],
      consequences: [
        { severity: 'mild', label: 'Лёгкое', value: '' },
        { severity: 'moderate', label: 'Умеренное', value: '' },
        { severity: 'severe', label: 'Тяжёлое', value: '' },
      ],
      scars: [],
      equipment: [],
    },
  },

  // 10. ФАНАТИК
  {
    id: 'zealot',
    name: 'Фанатик',
    description: 'Одержимый идеей — опасный и непредсказуемый',
    character: {
      systemId: 'fate-core',
      name: '',
      description: '',
      isNpc: true,
      refresh: 2,
      currentFatePoints: 2,
      aspects: [
        { slotId: 'high-concept', value: 'Слепой фанатик — вера важнее жизни и разума' },
        { slotId: 'trouble', value: 'Не слышит доводов — только голос своей веры' },
        { slotId: 'aspect-1', value: 'Боль не имеет значения когда есть цель' },
        { slotId: 'aspect-2', value: 'Все кто против меня — враги истины' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'will', rating: 4 },
        { skillId: 'provoke', rating: 4 },
        { skillId: 'fight', rating: 3 },
        { skillId: 'physique', rating: 2 },
        { skillId: 'athletics', rating: 2 },
        { skillId: 'lore', rating: 1 },
        { skillId: 'rapport', rating: 1 },
      ],
      stunts: [
        {
          id: 'stunt-1',
          name: 'Несломленная вера',
          description: '+2 к Воле при защите от психологических атак и запугивания',
        },
        {
          id: 'stunt-2',
          name: 'Боевой клич',
          description: 'Раз за сцену может использовать Провокацию для атаки всех врагов в зоне одновременно',
        },
        {
          id: 'stunt-3',
          name: 'Мученик',
          description: 'Получив тяжёлое последствие — немедленно совершает бесплатную атаку',
        },
      ],
      stressTracks: [
        { trackId: 'physical', boxes: boxes(3) },
        { trackId: 'mental', boxes: boxes(4) },
      ],
      consequences: [
        { severity: 'mild', label: 'Лёгкое', value: '' },
        { severity: 'moderate', label: 'Умеренное', value: '' },
        { severity: 'severe', label: 'Тяжёлое', value: '' },
      ],
      scars: [],
      equipment: [],
    },
  },
]