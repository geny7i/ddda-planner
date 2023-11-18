import { DragItem, DragItemKey } from 'models/dragItem';
import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { dragAndDropActions } from 'features/drag-and-drop/dragAndDropSlice';

export default function useCustomDrag(item: DragItem<DragItemKey>) {
  const dispatch = useDispatch();
  const [{ isDragging }, ref, preview] = useDrag({
    type: item.type,
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      dispatch(dragAndDropActions.clearDraggingItem());
    },
  });
  useEffect(() => {
    preview(getEmptyImage());
  }, [preview]);
  useEffect(() => {
    if (isDragging) {
      dispatch(dragAndDropActions.setDraggingItem(item));
    }
  }, [isDragging]);
  return ref;
}
