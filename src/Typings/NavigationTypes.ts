import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParams = {
  Landing: undefined;
  Questions: undefined;
  Heatmap: {
    predictions: HeatmapPredictions;
  };
};

// Root
export type RootLandingScreenProps = NativeStackScreenProps<RootStackParams, 'Landing'>;

export type RootQuestionsScreenProps = NativeStackScreenProps<RootStackParams, 'Questions'>;

export type RootHeatmapScreenProps = NativeStackScreenProps<RootStackParams, 'Heatmap'>;
