import {RootQuestionsScreenProps} from '../../../Typings/NavigationTypes';
import Decoders from '../../../Models/decoders';

export interface PredictionsModalProps {
  navigation: RootQuestionsScreenProps['navigation'];
  predictions?: Record<keyof Decoders, number> | null;
  predictionsPerQuestion: HeatmapPredictions;
}
