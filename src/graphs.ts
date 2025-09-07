// Simple shim: import the JS module and re-export its named properties.
// We use `any` for the exports to avoid typing the data structure.
import * as graphs from './graphs.js';

export const erechnungenperformer: any = (graphs as any).erechnungenperformer;
export const erechnungendispatcher: any = (graphs as any).erechnungendispatcher;
export const rpaaktencloud: any = (graphs as any).rpaaktencloud;
export const neuzuweisungen: any = (graphs as any).neuzuweisungen;
export const einbuergerungbzr: any = (graphs as any).einbuergerungbzr;
export const einbuergerungdispatcher: any = (graphs as any).einbuergerungdispatcher;
export const einbuergerungperformer: any = (graphs as any).einbuergerungperformer;
export const pachtvertragdispatcher: any = (graphs as any).pachtvertragdispatcher;
export const pachtvertragperformer: any = (graphs as any).pachtvertragperformer;
export const wohngeldperformer: any = (graphs as any).wohngeldperformer;
export const wohngeldperformerrv1: any = (graphs as any).wohngeldperformerrv1;
export const wohngeldperformerrv2: any = (graphs as any).wohngeldperformerrv2;
export const wohngeldemailloader: any = (graphs as any).wohngeldemailloader;
export const wohngelddudispatcher: any = (graphs as any).wohngelddudispatcher;
export const wohngeldduantraege: any = (graphs as any).wohngeldduantraege;

export default graphs as any;
