import { Provider } from './provider.model';
import { RatedModel } from './rated_model.model';

export interface HealthCentre extends RatedModel {
    id?: number,
    name: string,
    address: string,
    providers?: Provider[],
};