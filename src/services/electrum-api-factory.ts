import { ElectrumApi } from './electrum-api';
import { ElectrumApiInterface } from './electrum-api.interface';

export class ElectrumApiFactory {
  constructor(private url: string, private electrumApi?: ElectrumApiInterface) {}
  create() {
    if (this.electrumApi) {
      return this.electrumApi;
    }
    return ElectrumApi.createClient(this.url);
  }
}
