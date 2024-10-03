[![lint-and-test](https://github.com/OzhoginCode/soccer-stat/actions/workflows/lint-and-test.yml/badge.svg)](https://github.com/OzhoginCode/soccer-stat/actions/workflows/lint-and-test.yml)

# Soccer Stat

Фронтенд-приложение для просмотра спортивной статистики «Soccer Stat». В приложении используется [открытое API](https://www.football-data.org/)

## Доступные команды

Для работы приложения требуется склонировать репозиторий и перейти в рабочую директорию:

```bash
git clone https://github.com/OzhoginCode/soccer-stat.git
cd soccer-stat
```

Для выполнения этой команды требуется только Docker:

* `make dev` - открытие приложения в режиме разработки

Для выполнения следующих команд требуется установленный Node.JS версии 18 и выше, npm, а также Make.

* `make install` - установка зависимостей
* `make lint` - проверка кода приложения с помощью линтера
* `make build` - сборка приложения в поддиректорию dist
* `make test` - одиночный прогон тестов
* `make test-watch` - прогон тестов в режиме "watch"

## Описание

Стек: TypeScript, React, Vite, Tailwind, Vitest, React Testing Library, Docker

Проект упакован в Docker Compose. Настроены сборки двух разных образов: для разработки и для прода.

Настроен CI/CD с GitHub Actions. Код проходит проверку тестами и линтером, а затем деплоится на github-pages.

Написаны интеграционные тесты на Vitest, проверяющие основную функциональность.

Реализовано переключение светлой/тёмной темы. Выбранная пользователем тема сохраняется в Local Storage.

#### Проблемы:

* Не работает взаимодействие с API из-под GitHub Pages без специального расширения для браузера (например, [такого](https://chromewebstore.google.com/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino)), так как запросы к API блокирует CORS. Локально всё работает отлично, так как настроено проксирование.

* Обнаружена следующая проблема на стороне GitHub Pages: при открытии или перезагрузки страницы на любом адресе, отличном от корня (/), возникает ошибка 404. Внутри приложения переход по ссылкам работает нормально, но загрузить с нуля GitHub Pages не даёт. Это связано с работой SPA. Решение проблемы вижу только в переходе с GitHub Pages на свой сервер.
