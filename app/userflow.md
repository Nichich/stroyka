# Userflow

Здесь схемы пользовательских путей по сайту. Рисовал в mermaid, на GitHub они рендерятся прямо в превью. Разбил на три файла:

- buyer-flow.md - путь обычного покупателя (частник)
- b2b-flow.md - путь оптового клиента / дилера
- admin-flow.md - путь админа в закрытой части

Ниже общая карта переходов по сайту, чтобы было видно, как страницы связаны.

```mermaid
flowchart TD
    Home[Главная] --> Catalog[Каталог]
    Home --> About[О компании]
    Home --> Delivery[Доставка]
    Home --> Certs[Сертификаты]
    Home --> Reviews[Отзывы]
    Home --> Contacts[Контакты]
    Home -->|скачать каталог| PDF[Каталог PDF]

    Catalog --> Product[Карточка товара]
    Product --> Cart[Корзина]
    Catalog --> Cart
    Cart --> Order[Заявка оформлена]

    Contacts --> Order
    Header[Шапка: лого, меню, корзина] -.-> Home
    Header -.-> Catalog
    Header -.-> Cart
    Footer[Подвал: контакты, разделы] -.-> Contacts
```

*схемки нарисовал ии
