import { DragItem, DragItemKey } from 'models/dragItem';
import useCustomDrag from '../hooks/useCustomDrag';

type Props = {
  item: DragItem<DragItemKey>;
  children: React.ReactNode;
  className?: string;
};

/**
 * @deprecated
 */
function Draggable(props: Props) {
  const { item, children, className } = props;
  const ref = useCustomDrag(item);
  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}

export default Draggable;
