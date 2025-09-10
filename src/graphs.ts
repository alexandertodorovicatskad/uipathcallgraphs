// Import the new graphs array and expose backward-compatible named exports.
// Import namespace and read the named `graphs` export.
import * as graphsModule from './graphs.js';
const graphs: any = (graphsModule as any).graphs;

type GraphEntry = { id: number; title: string; description?: string; graph: any[] };

const byKey = new Map<string, any[]>(
  (graphs as GraphEntry[]).map((g) => [g.title.toLowerCase(), g.graph]),
);

export const erechnungenperformer: any = byKey.get('erechnungenperformer') ?? [];
export const erechnungendispatcher: any = byKey.get('erechnungendispatcher') ?? [];
export const rpaaktencloud: any = byKey.get('rpaaktencloud') ?? [];
export const neuzuweisungen: any = byKey.get('neuzuweisungen') ?? [];
export const einbuergerungbzr: any = byKey.get('einbuergerungbzr') ?? [];
export const einbuergerungdispatcher: any = byKey.get('einbuergerungdispatcher') ?? [];
export const einbuergerungperformer: any = byKey.get('einbuergerungperformer') ?? [];
export const pachtvertragdispatcher: any = byKey.get('pachtvertragdispatcher') ?? [];
export const pachtvertragperformer: any = byKey.get('pachtvertragperformer') ?? [];
export const wohngeldperformer: any = byKey.get('wohngeldperformer') ?? [];
export const wohngeldperformerrv1: any = byKey.get('wohngeldperformerrv1') ?? [];
export const wohngeldperformerrv2: any = byKey.get('wohngeldperformerrv2') ?? [];
export const wohngeldemailloader: any = byKey.get('wohngeldemailloader') ?? [];
export const wohngelddudispatcher: any = byKey.get('wohngelddudispatcher') ?? [];
export const wohngeldduantraege: any = byKey.get('wohngeldduantraege') ?? [];

export default graphs as any;
