import Endpoint from './Endpoint';

export default interface Controller {
    prefix: string;
    endpoints: Endpoint[];
}