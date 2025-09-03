import * as Plot from '@observablehq/plot';
import { useEffect, useRef, useState } from 'react';
import { erechnungenperformer, erechnungendispatcher, rpaaktencloud, neuzuweisungen, einbuergerungbzr, einbuergerungdispatcher, einbuergerungperformer } from './graphs';
import RadioButton from './components/RadioButton';

export default function App() {
  const [selectedOption, setSelectedOption] = useState<string | undefined>('rpaaktencloud');
  const containerRef = useRef<HTMLDivElement>(null);

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
        <fieldset className="flex flex-row justify-center rounded border border-cyan-400 p-2">
          <legend>XAML graphs</legend>
          <RadioButton
            id="view-erechnungenperformer"
            name="view"
            value="erechnungenperformer"
            label="E-Rechnungen Performer"
            selectedOption={selectedOption}
            onChange={() => setSelectedOption('erechnungenperformer')}
          />
          <RadioButton
            id="view-erechnungendispatcher"
            name="view"
            value="erechnungendispatcher"
            label="E-Rechnung Dispatcher"
            selectedOption={selectedOption}
            onChange={() => setSelectedOption('erechnungendispatcher')}
          />
          <RadioButton
            id="view-rpaaktencloud"
            name="view"
            value="rpaaktencloud"
            label="RPA Akten Cloud"
            selectedOption={selectedOption}
            onChange={() => setSelectedOption('rpaaktencloud')}
          />
          <RadioButton
            id="view-neuzuweisungen"
            name="view"
            value="neuzuweisungen"
            label="Neuzuweisungen"
            selectedOption={selectedOption}
            onChange={() => setSelectedOption('neuzuweisungen')}
          />
          <RadioButton
            id="view-einbuergerungbzr"
            name="view"
            value="einbuergerungbzr"
            label="Einbürgerung BZR"
            selectedOption={selectedOption}
            onChange={() => setSelectedOption('einbuergerungbzr')}
          />
          <RadioButton
            id="view-einbuergerungdispatcher"
            name="view"
            value="einbuergerungdispatcher"
            label="Einbürgerung Dispatcher"
            selectedOption={selectedOption}
            onChange={() => setSelectedOption('einbuergerungdispatcher')}
          />
          <RadioButton
            id="view-einbuergerungperformer"
            name="view"
            value="einbuergerungperformer"
            label="Einbürgerung Performer"
            selectedOption={selectedOption}
            onChange={() => setSelectedOption('einbuergerungperformer')}
          />
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
