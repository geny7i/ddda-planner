import { CharacterInfo } from 'models/playerInfo';
import { WeightClass } from 'models/status';
import { VocationId } from 'models/vocation';

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

function getCodeForPath(path: VocationId[]): string {
  const code = path.map((vocationId) => VocationsMap[vocationId]).join('');
  return code;
}

function getPathForCode(code: string): VocationId[] {
  const path = code.split('').map((cd) => InvertedVocationsMap[cd]);
  return path;
}

// TODO
// function compress(rawCode: string): string {
//   let compressed = "";
//   let count = 0;
//   let currentChar = rawCode[0];
//   rawCode.split("").forEach((cd) => {
//     if (cd === currentChar) {
//       count += 1;
//     } else {
//       compressed += count!==0 ? `${currentChar}${count}` : currentChar;
//       currentChar = cd;
//       count = 1;
//     }
//   });
//   return compressed;
// }

// TODO
// function decompress(compressedCode: string): string {
//   const vocationCodes = Object.values(VocationsMap);
//   compressedCode
// }

export function parseCode(code: RestoreCode): CharacterInfo {
  const pathCodes = code.split('-');
  const weightClass = pathCodes[0];
  const pathForOnlyLv1 = getPathForCode(pathCodes[1]);
  const pathForLv10 = getPathForCode(pathCodes[2]);
  const pathForLv100 = getPathForCode(pathCodes[3]);
  const pathForLv200 = getPathForCode(pathCodes[4]);
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
  return `${weightClass}-${pathCodes.join('-')}`;
}
