/* eslint no-else-return: "off" */

import RNFS from 'react-native-fs';
import {IsAndroid} from './Helpers';

export const LoadModel = async (modelName: string): Promise<string> => {
  if (IsAndroid) {
    const outputPath = `${RNFS.CachesDirectoryPath}/${modelName}`;

    await RNFS.writeFile(
      outputPath,
      await RNFS.readFileAssets(`custom/${modelName}`, 'base64'),
      'base64',
    );

    return `file:${outputPath}`;
  } else {
    return `${RNFS.MainBundlePath}/${modelName}`;
  }
};
