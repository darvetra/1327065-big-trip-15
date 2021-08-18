import Abstract from '../view/abstract.js';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

/**
 * Отрисовывает элемент по шаблону
 * @param container
 * @param child
 * @param place
 */
export const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

/**
 * Создает элемент
 *
 * Принцип работы прост:
 * 1. создаём пустой div-блок
 * 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
 * 3. возвращаем этот DOM-элемент
 *
 * Единственный нюанс, что HTML в строке должен иметь общую обёртку,
 * то есть быть чем-то вроде <nav><a>Link 1</a><a>Link 2</a></nav>,
 * а не просто <a>Link 1</a><a>Link 2</a>
 *
 * @param template
 * @returns {ChildNode}
 */
export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

