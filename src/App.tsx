import * as Plot from '@observablehq/plot';
import { useEffect, useRef, useState } from 'react';
import { erechnungen, rpaaktencloud, neuzuweisungen } from './graphs';
import RadioButton from './components/RadioButton';

export default function App() {
  const [selectedOption, setSelectedOption] = useState<string | undefined>('rpaaktencloud');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const data = (() => {
      switch (selectedOption) {
        case 'erechnungen':
          return erechnungen;
        case 'rpaaktencloud':
          return rpaaktencloud;
        case 'neuzuweisungen':
          return neuzuweisungen;
        default:
          return rpaaktencloud;
      }
    })();

    console.log('Selected option:', selectedOption, data, data.length);

    // compute height based on number of elements
    const items = Array.isArray(data) ? data.length : 0;
    const perItem = 18; // px per item (tweak as needed)
    const padding = 120; // room for margins, labels, etc.
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
            id="view-erechnungen"
            name="view"
            value="erechnungen"
            label="E-Rechnungen"
            selectedOption={selectedOption}
            onChange={() => setSelectedOption('erechnungen')}
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
