import * as Plot from '@observablehq/plot';
import { useEffect, useRef, useState } from 'react';
import {
  erechnungenperformer, erechnungendispatcher, rpaaktencloud, neuzuweisungen, einbuergerungbzr,
  einbuergerungdispatcher, einbuergerungperformer, pachtvertragdispatcher, pachtvertragperformer,
  wohngeldperformer, wohngeldperformerrv1, wohngeldperformerrv2, wohngeldemailloader, wohngelddudispatcher,
  wohngeldduantraege
} from './graphs';
import RadioButton from './components/RadioButton';

export default function App() {
  const [selectedOption, setSelectedOption] = useState<string | undefined>('rpaaktencloud');
  const [filter, setFilter] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const options = [
    { id: 'view-erechnungenperformer', value: 'erechnungenperformer', label: 'E-Rechnungen Performer' },
    { id: 'view-erechnungendispatcher', value: 'erechnungendispatcher', label: 'E-Rechnung Dispatcher' },
    { id: 'view-rpaaktencloud', value: 'rpaaktencloud', label: 'RPA Akten Cloud' },
    { id: 'view-neuzuweisungen', value: 'neuzuweisungen', label: 'Neuzuweisungen' },
    { id: 'view-einbuergerungbzr', value: 'einbuergerungbzr', label: 'Einbürgerung BZR' },
    { id: 'view-einbuergerungdispatcher', value: 'einbuergerungdispatcher', label: 'Einbürgerung Dispatcher' },
    { id: 'view-einbuergerungperformer', value: 'einbuergerungperformer', label: 'Einbürgerung Performer' },
    { id: 'view-pachtvertragdispatcher', value: 'pachtvertragdispatcher', label: 'Pachtvertrag Dispatcher' },
    { id: 'view-pachtvertragperformer', value: 'pachtvertragperformer', label: 'Pachtvertrag Performer' },
    { id: 'view-wohngeldperformer', value: 'wohngeldperformer', label: 'Wohngeld Performer' },
    { id: 'view-wohngeldperformerrv1', value: 'wohngeldperformerrv1', label: 'Wohngeld Performer RV1' },
    { id: 'view-wohngeldperformerrv2', value: 'wohngeldperformerrv2', label: 'Wohngeld Performer RV2' },
    { id: 'view-wohngeldemailloader', value: 'wohngeldemailloader', label: 'Wohngeld Email Loader' },
    { id: 'view-wohngelddudispatcher', value: 'wohngelddudispatcher', label: 'Wohngeld DU Dispatcher' },
    { id: 'view-wohngeldduantraege', value: 'wohngeldduantraege', label: 'Wohngeld DU Anträge' },
    // { id: 'view-stempeln', value: 'stempeln', label: 'Stempeln' },
    // add more here if needed
  ];

  const filtered = options.filter(o => o.label.toLowerCase().includes(filter.toLowerCase()) || o.value.toLowerCase().includes(filter.toLowerCase()));


  useEffect(() => {

    const data = (() => {
      switch (selectedOption) {
        case 'erechnungenperformer':
          return erechnungenperformer;
        case 'erechnungendispatcher':
          return erechnungendispatcher;
        case 'rpaaktencloud':
          return rpaaktencloud;
        case 'neuzuweisungen':
          return neuzuweisungen;
        case 'einbuergerungbzr':
          return einbuergerungbzr;
        case 'einbuergerungdispatcher':
          return einbuergerungdispatcher;
        case 'einbuergerungperformer':
          return einbuergerungperformer;
        case 'pachtvertragdispatcher':
          return pachtvertragdispatcher;
        case 'pachtvertragperformer':
          return pachtvertragperformer;
        case 'wohngeldperformer':
          return wohngeldperformer;
        case 'wohngeldperformerrv1':
          return wohngeldperformerrv1;
        case 'wohngeldperformerrv2':
          return wohngeldperformerrv2;
        case 'wohngeldemailloader':
          return wohngeldemailloader;
        case 'wohngelddudispatcher':
          return wohngelddudispatcher;
        case 'wohngeldduantraege':
          return wohngeldduantraege;
        // case 'stempeln':
        //   return stempeln;
        // add more here if needed
        default:
          return rpaaktencloud;
      }
    })();

    console.log('Selected option:', selectedOption, data, data.length);

    // compute height based on number of elements
    const items = Array.isArray(data) ? data.length : 0;
    const perItem = 18; // px per item (tweak as needed)
    const padding = 80; // room for margins, labels, etc.
    const minHeight = 300;
    const maxHeight = 2200;
    const height = Math.max(minHeight, Math.min(maxHeight, items * perItem + padding));

    const plot = Plot.plot({
      axis: null,
      height,
      // height: 800,
      margin: 10,
      marginLeft: 40,
      marginRight: 120,
      marks: [
        Plot.tree(data, {
          textStroke: 'white',
          fill: 'steelblue',
          stroke: 'blue',
          strokeWidth: 1,
        }),
      ],
    });

    containerRef.current?.append(plot);
    return () => plot.remove();
  }, [selectedOption]);

  return (
    <main className="flex flex-col h-screen">
      <section className="p-2">
        <fieldset className="rounded border border-cyan-400 p-2">
          <legend className="ml-2">XAML graphs</legend>

          <div className="flex gap-2 items-center mb-2">
            <input
              type="search"
              placeholder="Filter..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-2 py-1 border rounded text-sm w-full max-w-sm"
              aria-label="Filter graphs"
            />
            <div className="text-sm text-gray-500">Showing {filtered.length} / {options.length}</div>
          </div>

          {/* responsive multi-column grid with scroll when too many items */}
          <div className="grid gap-2 auto-rows-min grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 overflow-auto max-h-40 p-1">
            {filtered.map(opt => (
              <RadioButton
                key={opt.id}
                id={opt.id}
                name="view"
                value={opt.value}
                label={opt.label}
                selectedOption={selectedOption}
                onChange={(v) => setSelectedOption(v)}
                className="text-xs"
              />
            ))}
          </div>
        </fieldset>
      </section>

      {/* Create a component Graph.tsx for this section */}
      <section className="flex flex-col flex-1 min-h-0 p-2 overflow-hidden">
        <h2 className="text-xl font-semibold mb-2">{selectedOption}</h2>
        <div
          id="content"
          ref={containerRef}
          className="flex-1 min-h-0 min-w-0 overflow-auto rounded border border-gray-300"
        />
      </section>
    </main>
  );
}
