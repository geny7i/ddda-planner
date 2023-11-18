import DRAG_ITEM_KEYS from 'constants/dragItemKeys';
import VocationIcon from 'components/VocationIcon';
import { isDragItemOfType } from 'models/dragItem';
import { useMemo } from 'react';
import { useDragLayer } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faArrowRightArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { VocationId } from 'models/vocation';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const layerStyles: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 1000,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function DragPreview(props: { vocationId: VocationId; icon: IconProp }) {
  const { vocationId, icon } = props;
  return (
    <div>
      <FontAwesomeIcon
        icon={icon}
        style={{
          position: 'relative',
          left: '2.7em',
          bottom: '1.3em',
          color: '#FFF',
          filter: 'drop-shadow(0 0 1px #000)',
        }}
      />
      <VocationIcon vocationId={vocationId} />
    </div>
  );
}

function DragLayer() {
  const { itemType, isDragging, item, clientOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      clientOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
    }),
  );

  const offsets = useMemo(() => {
    const zeroOffset = { x: 0, y: 0 };
    if (!item?.data) return zeroOffset;
    switch (itemType) {
      default:
        return zeroOffset;
    }
  }, [item?.data, itemType]);

  const transform = useMemo(() => {
    if (!clientOffset) return undefined;
    let { x, y } = clientOffset;
    x -= offsets.x;
    y -= offsets.y;
    return `translate(${x}px, ${y}px)`;
  }, [clientOffset, offsets]);

  if (!isDragging) {
    return null;
  }

  function renderItem() {
    if (isDragItemOfType(item, DRAG_ITEM_KEYS.VOCATION_SELECTION)) {
      return (
        <div style={{ transform }}>
          <DragPreview vocationId={item.vocationId} icon={faPlus} />
        </div>
      );
    }
    if (isDragItemOfType(item, DRAG_ITEM_KEYS.VOCATION_STACK)) {
      return (
        <div style={{ transform }}>
          <DragPreview
            vocationId={item.vocationId}
            icon={faArrowRightArrowLeft}
          />
        </div>
      );
    }
    return null;
  }

  return (
    <div style={layerStyles}>
      <div>{renderItem()}</div>
    </div>
  );
}

export default DragLayer;
