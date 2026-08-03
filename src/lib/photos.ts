// Фото рецептов для лендинга. Ключ — recipeId из light-version.ts.
// Нет фото — карточка результата показывает вариант без изображения
// (никаких чужих/стоковых картинок: «каждый рецепт я снимаю сама»).
import nezhnost from '../assets/recipes/nezhnost.webp';
import sharlotka from '../assets/recipes/sharlotka.webp';
import bliny from '../assets/recipes/bliny.webp';
import friedPotatoesMushrooms from '../assets/recipes/fried-potatoes-mushrooms.webp';
import turkeyCutlets from '../assets/recipes/turkey-cutlets.webp';

export const RECIPE_PHOTOS: Record<string, string> = {
  nezhnost,
  sharlotka,
  bliny,
  'fried-potatoes-mushrooms': friedPotatoesMushrooms,
  'turkey-cutlets': turkeyCutlets,
};

export function recipePhoto(recipeId: string): string | null {
  return RECIPE_PHOTOS[recipeId] ?? null;
}
