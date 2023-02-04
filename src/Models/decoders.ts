import DecodersJSON from './decoders.json';

type Decoders = Record<keyof typeof DecodersJSON, string>;

const Decoders = DecodersJSON as Decoders;

export default Decoders;
