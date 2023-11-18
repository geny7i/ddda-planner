type Props = {
  children: React.ReactNode;
};

const style = {
  maxHeight: '100%',
  overflowY: 'scroll' as 'scroll',
};

function Scrollable(props: Props) {
  const { children } = props;
  return <div style={style}>{children}</div>;
}

export default Scrollable;
