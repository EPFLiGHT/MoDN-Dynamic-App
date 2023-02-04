# MoDN-Dynamic

MoDN Dynamic app for Android and iOS devices by iGH. Written with React Native.

## Getting Started

```bash
npm install
npm run link-models
npm run android
```

### Steps to Create a React Native Application with ONNX Runtime

- Install `react-native-asset` package as dev dependency
- Install `onnxruntime-react-native` and `react-native-fs` dependencies
- Create a script entry at `package.json` file with `react-native link && react-native-asset` command
- Update minSdkVersion to 24 (or higher) for Android devices
- Update iOS platform version to 13 (or higher) for iOS devices
- Add `pod 'onnxruntime-react-native', :path => '../node_modules/onnxruntime-react-native'` to Podfile at main target for IOS
- Add assets path for models to `react-native.config.js` file with path to the models. (`assets: ['./src/Models']`)
- <details>
    <summary>Create a function with the following code:</summary>

    ```ts
    import {Platform} from 'react-native';
    import RNFS from 'react-native-fs';

    export const LoadModel = async (modelName: string): Promise<string> => {
      if (Platform.OS === "android") {
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
    ```

  </details>

Congrats! You can now use onnx runtime with react native.

Keep in mind you need to load the model with the `LoadModel` function created at the last step.

`await InferenceSession.create(await LoadModel('model_name.ort'));`