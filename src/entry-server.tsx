// Серверный вход для пререндера: при сборке страница рендерится в готовый HTML,
// чтобы поисковые роботы (в первую очередь Яндекс) видели текст без исполнения JS.
import { renderToString } from 'react-dom/server';
import App from './App';

export function render(): string {
  return renderToString(<App />);
}
