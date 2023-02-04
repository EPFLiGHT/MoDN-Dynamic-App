import {Modalize} from '../../../Components';
import Questions from '../../../Models/questions';

export interface BottomBarProps {
  modalRef: React.MutableRefObject<Modalize | null>;
  predictionsPerQuestion: HeatmapPredictions;
  setSelectedQuestion: React.Dispatch<React.SetStateAction<'notSelected' | keyof Questions>>;
}
