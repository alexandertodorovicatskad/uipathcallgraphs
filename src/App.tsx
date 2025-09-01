import * as Plot from '@observablehq/plot';
import { useEffect, useRef, useState } from 'react';
import { gods, erechnungen } from './graphs';

export default function App() {
  const [selectedOption, setSelectedOption] = useState<string | undefined>('gods');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    // compute height based on number of elements
    const data = selectedOption === 'gods' ? gods : erechnungen;
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
        Plot.tree(selectedOption === 'gods' ? gods : erechnungen, {
          textStroke: 'white',
          fill: 'steelblue',
          // treeSort: "node:height",
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
          <div>
            <label className="cursor-pointer ml-2">
              <input
                id="view-gods"
                type="radio"
                name="view"
                value="gods"
                checked={selectedOption === 'gods'}
                onChange={() => setSelectedOption('gods')}
                style={{ marginRight: 6 }}
                className="mr-1"
              />
              {selectedOption === 'gods' ? 'Gods' : 'Gods'}
            </label>
          </div>
          <div>
            <label className="cursor-pointer ml-2">
              <input
                id="view-erechnungen"
                type="radio"
                name="view"
                value="erechnungen"
                checked={selectedOption === 'erechnungen'}
                onChange={() => setSelectedOption('erechnungen')}
                style={{ marginRight: 6 }}
                className="mr-1"
              />
              {selectedOption === 'erechnungen' ? 'E-Rechnungen' : 'E-Rechnungen'}
            </label>
          </div>
        </fieldset>
      </section>
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
