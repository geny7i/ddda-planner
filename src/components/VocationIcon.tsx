import { VocationId } from 'models/vocation';

type Props = {
  vocationId: VocationId;
  size?: FontSize;
};

type FontSize = 'sm' | 'md' | 'lg';

type VocationIconProps = {
  colors: string[];
  content: string;
};

const vocationIconData: Record<VocationId, VocationIconProps> = {
  fighter: { colors: ['#CC7474'], content: 'Fgt' },
  strider: { colors: ['#CCB874'], content: 'Str' },
  mage: { colors: ['#749ACC'], content: 'Mag' },
  warrior: { colors: ['#7A2929'], content: 'War' },
  ranger: { colors: ['#997A41'], content: 'Rgr' },
  sorcerer: { colors: ['#294C66'], content: 'Sor' },
  assassin: { colors: ['#CC7474', '#CCB874'], content: 'Asn' },
  magick_archer: { colors: ['#749ACC', '#CCB874'], content: 'MAr' },
  mystic_knight: { colors: ['#749ACC', '#CC7474'], content: 'MKn' },
};

function fontSize(key: FontSize) {
  switch (key) {
    case 'sm':
      return '0.75em';
    case 'lg':
      return '1.4em';
    default:
      return '1em';
  }
}

export default function VocationIcon(props: Props) {
  const { vocationId, size = 'md' } = props;
  const { colors, content } = vocationIconData[vocationId];
  const leftColor = colors[0];
  const rightColor = colors[1] || colors[0];

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    color: 'white',
    backgroundImage: `linear-gradient(65deg, ${leftColor} 50%, ${rightColor} 50%)`,
    fontSize: fontSize(size),
    width: '2.5em',
    height: '2.5em',
  };

  return <span style={style}>{content}</span>;
}
