import { DragItem, DragItemKey, isDragItemOfType } from 'models/dragItem';
import { useSelector } from 'react-redux';
import useCustomDrop from '../hooks/useCustomDrop';
import { dragAndDropSelectors } from '../dragAndDropSlice';

type Props<K extends DragItemKey> = {
  children: React.ReactNode;
  type: K;
  onDrop: (item: DragItem<K>) => void;
  disableWith?: (item: DragItem<K>) => boolean;
  className?: string;
};

/**
 * @deprecated
 */
function Droppable<K extends DragItemKey>(props: Props<K>) {
  const {
    type,
    children,
    className,
    onDrop,
    disableWith = () => false,
  } = props;
  const draggingItem = useSelector(dragAndDropSelectors.selectDraggingItem);
  const matchItemType = draggingItem?.type === type;
  const disabledWithFn =
    draggingItem &&
    isDragItemOfType(draggingItem, type) &&
    disableWith(draggingItem);
  const dropDisabled = !matchItemType || disabledWithFn;
  const [ref] = useCustomDrop(type, dropDisabled ? () => {} : onDrop);
  const combinedClassName = `${!dropDisabled && 'pulsing-effect'} ${className}`;
  return (
    <div
      className={combinedClassName}
      style={{ width: '100%', height: '100%' }}
      ref={ref}
    >
      {children}
    </div>
  );
}

export default Droppable;
