import { CXT_ROLE, CXT_BG, CXT_MISC, CXT_W, CXT_H, inputParam } from '../global';

// 延时函数
export function delayTimeout(option: DelayOption, fn: () => void) {
  let count = option.count;

  count ? count -= 1 : (count = option.amount) && fn();
  option.count = count;
}

// 清除画布
export function cleanCxt(...types: string[]) {
  const typeArr = types[0] === 'all' ? ['role', 'bg', 'misc'] : types;
  const cxt = { CXT_ROLE, CXT_BG, CXT_MISC };

  typeArr.forEach(ele => cxt[`CXT_${ele.toUpperCase()}`].clearRect(0, 0, CXT_W, CXT_H));
}

// 处理对应按键按下的操作
export function keyboardOperate(operate: Operate) {
  if (inputParam.isPressed && typeof operate[inputParam.pressedKey] === 'function') {
    inputParam.isPressed = false;
    operate[inputParam.pressedKey]();
  }
}

// 确定子弹等级小于1的时候打到砖块后的位置在brickStatus中的数组的索引值
export function getPositionInBrick(positionParams: PositionInBrickInfo) {
  const { x, y, row, col, directionNum } = positionParams;

  return (
    directionNum % 2
      ? (x + (+!(directionNum - 1)) * 8 - col * 16) >> 3
      : (y + directionNum * 4 - row * 16) >> 3
  );
}

export function affirmCenterCoord(coords: number[], distance: number) {
  return coords.map(ele => ele + distance);
}
