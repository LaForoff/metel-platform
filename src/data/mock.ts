export type Message = {
  id: string;
  direction: "incoming" | "outgoing";
  text: string;
  time: string;
};

export type ChatKind = "personal" | "group" | "channel";

export type Chat = {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  lastMessage: string;
  unread: number;
  kind: ChatKind;
  online?: boolean;
  messages: Message[];
};

export const defaultMessages: Message[] = [
  {
    id: "m-1",
    direction: "outgoing",
    text: "Пойдём пообедаем. Как насчёт пиццы?",
    time: "12:04",
  },
  {
    id: "m-2",
    direction: "incoming",
    text: "Давай сделаем это! Я на встрече до полудня.",
    time: "12:06",
  },
  {
    id: "m-3",
    direction: "outgoing",
    text: "Отлично. На Мейн-стрит открылось новое место, которое я давно хотел проверить. Говорят, у них потрясающая гавайская пицца!",
    time: "12:08",
  },
  {
    id: "m-4",
    direction: "incoming",
    text: "Я не понимаю, почему люди так против пиццы с ананасами. Мне она даже нравится.",
    time: "12:10",
  },
];

const messages = (chatId: string, items: Array<[Message["direction"], string, string]>): Message[] =>
  items.map(([direction, text, time], index) => ({
    id: `${chatId}-${index + 1}`,
    direction,
    text,
    time,
  }));

export const chats: Chat[] = [
  {
    id: "anton",
    name: "Антон Ибрагимов",
    email: "anton@metel.ru",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80",
    lastMessage: "Я не понимаю, почему люди так против...",
    unread: 0,
    kind: "personal",
    online: true,
    messages: [
      ...messages("anton-before", [
        ["incoming", "Доброе утро! Ты сегодня в офисе или на удалёнке?", "09:12"],
        ["outgoing", "В офисе. Нужно подписать пару документов и забрать образцы.", "09:15"],
        ["incoming", "Отлично, тогда поймаю тебя после стендапа.", "09:16"],
        ["outgoing", "Давай. Только после 11:30, до этого созвон с логистикой.", "09:18"],
        ["incoming", "Окей. Я как раз подготовлю вопросы по поставке.", "09:20"],
        ["outgoing", "Если там по срокам, лучше сразу добавь номер заявки.", "09:21"],
        ["incoming", "Добавлю. И ещё хотела уточнить по новой партии крепежа.", "09:23"],
        ["outgoing", "Там вроде всё согласовано, но проверю в системе.", "09:25"],
        ["incoming", "Спасибо. Тогда не отвлекаю до созвона.", "09:26"],
        ["outgoing", "Нормально, пиши если что-то срочное.", "09:27"],
      ]),
      ...defaultMessages,
      ...messages("anton-after", [
        ["outgoing", "Кстати, место работает до 22:00, так что можно не торопиться.", "12:12"],
        ["incoming", "Супер. Тогда после встречи напишу, когда освобожусь.", "12:14"],
        ["outgoing", "Договорились. Я пока закончу отчёт по складу.", "12:15"],
        ["incoming", "Если увидишь по отчёту странные остатки по профилю, не пугайся, это вчерашняя корректировка.", "12:19"],
        ["outgoing", "Хорошо, учту. Спасибо, что предупредила.", "12:21"],
      ]),
    ],
  },
  {
    id: "mikhail",
    name: "Михаил Соколов",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80",
    lastMessage: "Можете уточнить статус моего заказа?",
    unread: 3,
    kind: "personal",
    messages: messages("mikhail", [
      ["incoming", "Добрый день. Можете уточнить статус моего заказа?", "10:12"],
      ["outgoing", "Конечно, сейчас проверю информацию.", "10:14"],
      ["outgoing", "Подскажите, пожалуйста, номер заказа или ИНН компании.", "10:14"],
      ["incoming", "Заказ МТ-48291, компания «Стройкомплект».", "10:16"],
      ["outgoing", "Спасибо, нашёл. Заказ собран, но ожидает подтверждения от транспортной.", "10:18"],
      ["incoming", "А ориентировочно когда будет отгрузка?", "10:19"],
      ["outgoing", "По плану сегодня после 17:00. Если подтверждение придёт раньше, отправим сразу.", "10:21"],
      ["incoming", "Можно будет получить накладную заранее?", "10:22"],
      ["outgoing", "Да, подготовим черновик и пришлём на почту.", "10:24"],
      ["incoming", "Почта прежняя: purchase@stroy.example", "10:25"],
      ["outgoing", "Принял. Также вижу, что в заказе есть позиция с частичной отгрузкой.", "10:27"],
      ["incoming", "Да, это нормально, остаток заберём позже.", "10:28"],
      ["outgoing", "Тогда фиксирую частичную отгрузку и передаю логистике.", "10:30"],
      ["incoming", "Спасибо. Если будут изменения, напишите сюда.", "10:31"],
      ["outgoing", "Обязательно. Как только получу подтверждение, обновлю статус.", "10:32"],
    ]),
  },
  {
    id: "anna",
    name: "Анна Кузнецова",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80",
    lastMessage: "Когда ожидать доставку последней партии?",
    unread: 1,
    kind: "personal",
    online: true,
    messages: messages("anna", [
      ["incoming", "Когда ожидать доставку последней партии?", "09:48"],
      ["outgoing", "Планируем отгрузку сегодня после 16:00.", "09:52"],
      ["incoming", "Сможете предупредить водителя, что разгрузка только через северные ворота?", "09:53"],
      ["outgoing", "Да, добавлю комментарий в маршрутный лист.", "09:55"],
      ["incoming", "Спасибо. Тогда ждём машину вечером.", "09:56"],
    ]),
  },
  {
    id: "dmitry-orlov",
    name: "Дмитрий Орлов",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80",
    lastMessage: "Спасибо за быструю помощь!",
    unread: 0,
    kind: "personal",
    messages: messages("orlov", [
      ["incoming", "Спасибо за быструю помощь!", "Вчера"],
      ["outgoing", "Рад помочь. Если ошибка повторится, пришлите скрин.", "Вчера"],
      ["incoming", "Хорошо, пока всё работает.", "Вчера"],
    ]),
  },
  {
    id: "ekaterina",
    name: "Екатерина Смирнова",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80",
    lastMessage: "Есть вопрос по оплате счёта",
    unread: 0,
    kind: "personal",
    messages: messages("ekaterina", [
      ["incoming", "Есть вопрос по оплате счёта.", "Вчера"],
      ["outgoing", "Слушаю. Что именно смущает?", "Вчера"],
      ["incoming", "В счёте указана доставка отдельной строкой, хотя она должна входить в договор.", "Вчера"],
      ["outgoing", "Проверю условия договора и вернусь с ответом.", "Вчера"],
      ["outgoing", "Да, вы правы. Доставка должна быть включена в стоимость.", "Вчера"],
      ["incoming", "Тогда нужно перевыставить счёт?", "Вчера"],
      ["outgoing", "Да, я уже отправил запрос в бухгалтерию.", "Вчера"],
      ["incoming", "Супер. Когда ждать новую версию?", "Вчера"],
      ["outgoing", "Обычно в течение часа. Если задержится, напишу отдельно.", "Вчера"],
      ["incoming", "Спасибо, нам важно оплатить сегодня.", "Вчера"],
      ["outgoing", "Понимаю. Поставил пометку срочно.", "Вчера"],
      ["incoming", "Получила новый счёт, всё корректно.", "Вчера"],
      ["outgoing", "Отлично. Тогда закрываю вопрос.", "Вчера"],
    ]),
  },
  {
    id: "alexey",
    name: "Алексей Волков",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80",
    lastMessage: "Не могу найти нужный товар",
    unread: 0,
    kind: "personal",
    messages: messages("alexey", [
      ["incoming", "Не могу найти нужный товар.", "Пн"],
      ["outgoing", "Какой артикул или хотя бы описание?", "Пн"],
      ["incoming", "Нужен оцинкованный уголок 40х40, партия от 200 штук.", "Пн"],
      ["outgoing", "Есть аналог на складе. Сейчас пришлю карточку.", "Пн"],
    ]),
  },
  {
    id: "maria",
    name: "Мария Зайцева",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80",
    lastMessage: "Как оформить возврат товара?",
    unread: 0,
    kind: "personal",
    messages: messages("maria", [
      ["incoming", "Как оформить возврат товара?", "Пн"],
      ["outgoing", "Нужно заполнить акт расхождений и приложить фото упаковки.", "Пн"],
      ["incoming", "Фото уже есть. Акт можно отправить сюда?", "Пн"],
      ["outgoing", "Да, можно сюда или на почту отдела качества.", "Пн"],
      ["incoming", "Хорошо, подготовлю до конца дня.", "Пн"],
    ]),
  },
  {
    id: "sergey",
    name: "Сергей Лебедев",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80",
    lastMessage: "Хочу изменить адрес доставки",
    unread: 0,
    kind: "personal",
    messages: messages("sergey", [
      ["incoming", "Хочу изменить адрес доставки.", "Пт"],
      ["outgoing", "Если заказ ещё не передан водителю, успеем изменить.", "Пт"],
      ["incoming", "Новый адрес: Промышленная, 14, склад 3.", "Пт"],
      ["outgoing", "Принял. Сейчас обновлю маршрут.", "Пт"],
    ]),
  },
  {
    id: "irina",
    name: "Ирина Новикова",
    avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80",
    lastMessage: "Всё получил, огромное спасибо!",
    unread: 0,
    kind: "personal",
    messages: messages("irina", [
      ["incoming", "Всё получил, огромное спасибо!", "Пт"],
      ["outgoing", "Отлично. Документы тоже дошли?", "Пт"],
      ["incoming", "Да, комплект полный.", "Пт"],
    ]),
  },
  {
    id: "supply-news",
    name: "Новости снабжения",
    lastMessage: "Новый регламент закупок опубликован",
    unread: 0,
    kind: "channel",
    messages: messages("supply-news", [
      ["incoming", "Новый регламент закупок опубликован.", "Ср"],
      ["incoming", "Пожалуйста, используйте обновлённый шаблон заявки с понедельника.", "Ср"],
      ["incoming", "Старые формы будут приниматься только до конца недели.", "Ср"],
    ]),
  },
  {
    id: "hr-channel",
    name: "HR объявления",
    lastMessage: "Обновили график корпоративных встреч",
    unread: 0,
    kind: "channel",
    messages: messages("hr-channel", [
      ["incoming", "Обновили график корпоративных встреч.", "Ср"],
      ["incoming", "Следующая общая встреча пройдёт в четверг в 15:00.", "Ср"],
    ]),
  },
  {
    id: "it-channel",
    name: "IT поддержка",
    lastMessage: "Плановые работы начнутся в 22:00",
    unread: 0,
    kind: "channel",
    messages: messages("it-channel", [
      ["incoming", "Плановые работы начнутся в 22:00.", "Вт"],
      ["incoming", "Будет недоступен личный кабинет и часть отчётов.", "Вт"],
      ["incoming", "Ориентировочное время работ: 40 минут.", "Вт"],
      ["incoming", "Если у вас запланированы выгрузки, перенесите их до 21:30.", "Вт"],
      ["incoming", "Команда поддержки будет на связи в дежурном канале.", "Вт"],
      ["incoming", "Работы начались. Первые проверки проходят штатно.", "22:03"],
      ["incoming", "Обновление базы завершено.", "22:18"],
      ["incoming", "Проверяем авторизацию и доступ к отчётам.", "22:25"],
      ["incoming", "Нашли задержку в синхронизации справочников, исправляем.", "22:31"],
      ["incoming", "Синхронизация восстановлена.", "22:39"],
      ["incoming", "Личный кабинет снова доступен.", "22:43"],
      ["incoming", "Если заметите ошибки, отправьте скрин в поддержку.", "22:45"],
    ]),
  },
  {
    id: "sales-channel",
    name: "Продажи",
    lastMessage: "Дайджест за неделю готов",
    unread: 0,
    kind: "channel",
    messages: messages("sales-channel", [
      ["incoming", "Дайджест за неделю готов.", "Вт"],
      ["incoming", "Основной рост пришёлся на региональные заказы.", "Вт"],
      ["incoming", "Подробная таблица уже лежит в общей папке.", "Вт"],
    ]),
  },
];
