import { DragItem, DragItemKey } from 'models/dragItem';
import { ConnectDropTarget, useDrop } from 'react-dnd';

export default function useCustomDrop<K extends DragItemKey>(
  type: K,
  onDrop: (item: DragItem<K>) => void,
): [ConnectDropTarget] {
  const [, ref] = useDrop({
    accept: type,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      onDrop(item as DragItem<K>);
    },
  });

  return [ref as ConnectDropTarget];
}
