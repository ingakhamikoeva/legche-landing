// Тизеры «что меняем» для карточки результата (правка Инги №4, 04.07).
// Ключ — recipeId из light-version.ts. Поле необязательное: если тизера нет,
// карточка показывается без этой строки. Тексты пишет Инга — по одной строке
// на рецепт, начиная с витринно-чипсовых; новые добавляются вместе с рецептом.
// Формат-образец: «мука → овсяная, сахар → вдвое меньше за счёт яблок,
// остальное — как у бабушки».

export const REPLACEMENT_TEASERS: Record<string, string> = {
  // 'sharlotka': 'текст от Инги',
  // 'nezhnost': 'текст от Инги',
  // 'bliny': 'текст от Инги',
};

export function replacementTeaser(recipeId: string): string | null {
  return REPLACEMENT_TEASERS[recipeId] ?? null;
}
