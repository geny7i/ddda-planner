import DRAG_ITEM_KEYS from 'constants/dragItemKeys';
import { VocationId } from 'models/vocation';

export type DragItemKey = keyof typeof DRAG_ITEM_KEYS;

export type DragItem<T extends DragItemKey> = DragItems[T];

export function isDragItemOfType<K extends DragItemKey>(
  item: DragItem<DragItemKey> | undefined,
  type: K,
): item is DragItem<K> {
  return !!item && item.type === type;
}

type DragItemRecord = {
  VOCATION_SELECTION: {
    vocationId: VocationId;
    level: number;
  };
  VOCATION_STACK: {
    vocationId: VocationId;
    level: number;
  };
};

type DragItems = {
  [K in DragItemKey]: {
    type: K;
  } & DragItemRecord[K];
};
