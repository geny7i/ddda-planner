import { CharacterInfo } from 'models/playerInfo';
import { WeightClass } from 'models/status';
import { VocationId } from 'models/vocation';

const VERSION = 1;

type RestoreCode = string;

const VocationsMap: Record<VocationId, string> = {
  fighter: 'z',
  strider: 'y',
  mage: 'x',
  warrior: 'w',
  ranger: 'v',
  sorcerer: 'u',
  assassin: 't',
  magick_archer: 's',
  mystic_knight: 'r',
} as const;

const InvertedVocationsMap: Record<string, VocationId> = (() => {
  const inverted: Record<string, VocationId> = {};
  Object.entries(VocationsMap).forEach(([vocationId, code]) => {
    inverted[code] = vocationId as VocationId;
  });
  return inverted;
})();

function generateRun(char: string, count: number): string {
  return count === 1 ? char : `${char}${count.toString(16)}`;
}

function compress(rawCode: string): string {
  if (rawCode.length === 0) return '';
  let compressed = '';
  let count = 0;
  let currentChar = rawCode[0];
  rawCode.split('').forEach((cd) => {
    if (cd === currentChar) {
      count += 1;
    } else {
      compressed += generateRun(currentChar, count);
      currentChar = cd;
      count = 1;
    }
  });
  compressed += generateRun(currentChar, count);
  return compressed;
}

const compressKeysStr = Object.values(VocationsMap).join('');
const decompressRegex = new RegExp(
  `([${compressKeysStr}][^${compressKeysStr}]*)`,
  'g',
);

function decompress(compressedCode: string): string {
  const runs = compressedCode.match(decompressRegex) || [];
  const decompressed = runs
    .map((run) => {
      const char = run[0];
      const count = run.length === 1 ? 1 : parseInt(run.slice(1), 16);
      return char.repeat(count);
    })
    .join('');
  return decompressed;
}

function getCodeForPath(path: VocationId[]): string {
  const code = path.map((vocationId) => VocationsMap[vocationId]).join('');
  const compressed = compress(code);
  return compressed;
}

function getPathForCode(code: string): VocationId[] {
  const decompressed = decompress(code);
  const path = decompressed.split('').map((cd) => InvertedVocationsMap[cd]);
  return path;
}

export function parseCode(code: RestoreCode): CharacterInfo {
  const pathCodes = code.split('-');
  const weightClass = pathCodes[1];
  const pathForOnlyLv1 = getPathForCode(pathCodes[2]);
  const pathForLv10 = getPathForCode(pathCodes[3]);
  const pathForLv100 = getPathForCode(pathCodes[4]);
  const pathForLv200 = getPathForCode(pathCodes[5]);
  return {
    vocationPath: {
      onlyLv1: pathForOnlyLv1,
      forLv10: pathForLv10,
      forLv100: pathForLv100,
      forLv200: pathForLv200,
    },
    weightClass: weightClass as WeightClass,
  };
}

export function serializeParams(params: CharacterInfo): RestoreCode {
  const {
    weightClass,
    vocationPath: { onlyLv1, forLv10, forLv100, forLv200 },
  } = params;
  const pathCodes = [onlyLv1, forLv10, forLv100, forLv200].map((path) =>
    getCodeForPath(path),
  );
  return `${VERSION}-${weightClass}-${pathCodes.join('-')}`;
}
