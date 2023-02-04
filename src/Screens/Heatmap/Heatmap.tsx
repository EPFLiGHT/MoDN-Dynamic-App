/* eslint react/no-array-index-key: "off" */

import {useMemo, useRef} from 'react';
import {Alert, Linking, ScrollView, View} from 'react-native';
import {Button} from 'react-native-paper';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import FileViewer from 'react-native-file-viewer';
import {check, request, PERMISSIONS, openSettings} from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import ViewShot from 'react-native-view-shot';
import colorInterpolate from 'color-interpolate';
import ImageToPDF from 'react-native-image-to-pdf';
import {PageContainer} from '../../Containers';
import {Text} from '../../Components';
import {useTheme} from '../../Hooks';
import {DateWithTime, DpiSafeSize, IsAndroid} from '../../Utils/Helpers';
import {RootHeatmapScreenProps} from '../../Typings/NavigationTypes';
import getStyles from './Heatmap.styles';
import Decoders from '../../Models/decoders';
import Questions from '../../Models/questions';

type Props = RootHeatmapScreenProps;

const QUESTION_FONT_SIZE = 13;

const ITEM_SIZE = {
  width: DpiSafeSize(34),
  height: DpiSafeSize(34),
};

const Heatmap: React.FC<Props> = ({route}) => {
  const {predictions} = route.params;

  const theme = useTheme();
  const viewShotRef = useRef<ViewShot>(null);

  const interpolate = colorInterpolate(theme.gradients.heatmap);

  const styles = getStyles(theme);

  const questionNames = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(predictions).map(([encoderKey, questionValue]) => {
          const question = Questions[encoderKey as keyof Questions];

          return questionValue.answer === null
            ? [encoderKey, encoderKey]
            : [
                encoderKey,
                `${
                  question.title.length > 32 ? `${question.title.slice(0, 32)}...` : question.title
                } : ${
                  typeof questionValue.answer === 'object'
                    ? JSON.stringify(questionValue.answer)
                    : question.choices[questionValue.answer]
                }`,
              ];
        }),
      ),
    [predictions],
  );

  const maxTextSize = useMemo(
    () =>
      Math.max(...Object.values(questionNames).map((name) => name.length / 1.7)) *
      (QUESTION_FONT_SIZE / 2),
    [questionNames],
  );

  const decoderCount = Object.keys(Decoders).length;

  return (
    <PageContainer withSafeArea withPadding>
      <View style={styles.container}>
        <ScrollView>
          <View>
            <ScrollView horizontal contentContainerStyle={styles.heatmap}>
              <ViewShot
                ref={viewShotRef}
                options={{
                  fileName: `Heatmap-${DateWithTime()}`,
                }}
              >
                <View style={styles.viewShot}>
                  <View style={styles.row}>
                    <View style={styles.col}>
                      {Object.keys(Decoders).map((decoderKey, idx) => (
                        <View
                          key={idx.toString()}
                          style={[
                            styles.classNames,
                            {
                              height: ITEM_SIZE.height,
                            },
                          ]}
                        >
                          <Text>{Decoders[decoderKey as keyof Decoders]}</Text>
                        </View>
                      ))}
                    </View>

                    {Object.entries(predictions).map(([encoderKey, questionValue]) => (
                      <View key={encoderKey}>
                        <View style={styles.col}>
                          {Object.entries(questionValue.probability).map(
                            ([, probability], probabilityIndex) => (
                              <View
                                key={probabilityIndex.toString()}
                                style={{
                                  backgroundColor: interpolate(probability),
                                  width: ITEM_SIZE.width,
                                  height: ITEM_SIZE.height,
                                }}
                              />
                            ),
                          )}
                        </View>

                        <View style={styles.row}>
                          <View
                            style={[
                              styles.questionNameContainer,
                              {
                                width: ITEM_SIZE.width,
                                height: maxTextSize,
                              },
                            ]}
                          >
                            <View
                              style={[
                                styles.questionNameContent,
                                {
                                  width: maxTextSize,
                                  height: ITEM_SIZE.width,
                                },
                              ]}
                            >
                              <Text fontSize={QUESTION_FONT_SIZE} style={styles.questionName}>
                                {questionNames[encoderKey]}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}

                    <View style={[styles.gradientRow, {height: decoderCount * ITEM_SIZE.height}]}>
                      <LinearGradient
                        colors={theme.gradients.heatmap}
                        start={{x: 0, y: 1}}
                        end={{x: 0, y: 0}}
                        style={[styles.gradient, {height: decoderCount * ITEM_SIZE.height}]}
                      />

                      <View style={styles.gradientNums}>
                        <Text>100%</Text>

                        <Text>0%</Text>

                        <Text>-100%</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ViewShot>
            </ScrollView>
          </View>

          <View style={styles.saveButtons}>
            <Button
              style={styles.saveButton}
              mode="contained"
              onPress={async () => {
                const hasAndroidPermission = async (): Promise<boolean> => {
                  if (IsAndroid) {
                    const permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

                    const hasPermission = await check(permission);
                    if (hasPermission === 'granted') return true;

                    const status = await request(permission);

                    if (status === 'blocked') {
                      Alert.alert(
                        'Permission Denied',
                        'Please allow access to your storage to save the image from app settings.',
                        [
                          {
                            text: 'Open Settings',
                            onPress: openSettings,
                            style: 'default',
                          },
                          {
                            text: 'Cancel',
                            style: 'cancel',
                          },
                        ],
                      );
                    }

                    return status === 'granted';
                  }

                  return true;
                };

                if (await hasAndroidPermission()) {
                  const image = await viewShotRef.current?.capture?.();

                  if (image) {
                    const savedPath = await CameraRoll.save(image, {type: 'photo'});

                    try {
                      await Linking.openURL(savedPath);
                    } catch (_) {
                      //
                    }
                  }
                }
              }}
            >
              Save as Image
            </Button>

            <Button
              style={styles.saveButton}
              mode="contained"
              onPress={async () => {
                const image = await viewShotRef.current?.capture?.();

                if (image) {
                  try {
                    const {filePath} = await ImageToPDF.createPDFbyImages({
                      name: 'Heatmap.pdf',
                      imagePaths: [image.replace('file://', '')],
                    });

                    if (filePath) {
                      const pdfFile = `file://${filePath}`;
                      FileViewer.open(pdfFile, {displayName: 'Heatmap'});
                    }
                  } catch (_) {
                    //
                  }
                }
              }}
            >
              Save as PDF
            </Button>
          </View>
        </ScrollView>
      </View>
    </PageContainer>
  );
};

export default Heatmap;
