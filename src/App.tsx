import * as Plot from '@observablehq/plot';
import { useEffect, useRef, useState } from 'react';
import graphs from './data/graphs';
import RadioButton from './components/RadioButton';

export default function App() {
  const [selectedOption, setSelectedOption] = useState<string | undefined>('rpaaktencloud');
  const [filter, setFilter] = useState('');
  const [nodeCount, setNodeCount] = useState<number | null>(null);
  // initialize graphTitle from the matching graph's description (fallback to a sensible default)
  const _defaultGraph = Array.isArray(graphs)
    ? graphs.find((g: any) => String(g.title).toLowerCase() === String((selectedOption ?? '')).toLowerCase())
    || graphs.find((g: any) => String(g.title).toLowerCase() === 'rpaaktencloud')
    : undefined;
  const [graphTitle, setGraphTitle] = useState<string | undefined>(_defaultGraph?.description ?? undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const options = graphs.map((g: any) => ({
    id: `view-${g.title.toLowerCase().replace(/[^a-z0-9]+/g, '')}`,
    value: g.title,
    label: g.description
  }));

  const filtered = options.filter((o: any) => o.label.toLowerCase().includes(filter.toLowerCase()) || o.value.toLowerCase().includes(filter.toLowerCase()));

  useEffect(() => {
    const selectedTitle = (selectedOption ?? '').toLowerCase();
    const matched = Array.isArray(graphs)
      ? graphs.find((g: any) => String(g.title).toLowerCase() === selectedTitle)
      : undefined;
    const fallback = Array.isArray(graphs)
      ? graphs.find((g: any) => String(g.title).toLowerCase() === 'rpaaktencloud')
      : undefined;
    const data: string[] = Array.isArray(matched?.graph)
      ? matched.graph
      : Array.isArray(fallback?.graph)
        ? fallback.graph
        : [];

    // extract description from matched or fallback (fall back to title or selectedOption if missing)
    const extractedDescription = matched?.description ?? fallback?.description ?? matched?.title ?? selectedOption;
    setGraphTitle(extractedDescription ? String(extractedDescription) : undefined);

    console.log('Selected option:', selectedOption, data, data.length);

    // compute height based on number of elements
    const items = Array.isArray(data) ? data.length : 0;
    // publish node count for the header
    setNodeCount(items);
    const perItem = 18; // px per item (tweak as needed)
    const padding = 80; // room for margins, labels, etc.
    const minHeight = 300;
    const maxHeight = 2200;
    const height = Math.max(minHeight, Math.min(maxHeight, items * perItem + padding));

    const plot = Plot.plot({
      axis: null,
      height,
      margin: 10,
      marginLeft: 160,
      marginRight: 160,
      marks: [
        Plot.tree(data, {
          textStroke: 'white',
          fill: 'steelblue',
          stroke: 'blue',
          strokeWidth: 1,
        }),
      ],
    });

    plot.style.overflow = 'visible';
    containerRef.current?.append(plot);
    return () => plot.remove();
  }, [selectedOption]);

  return (
    <main className="flex flex-col h-screen bg-white text-gray-900">
      <section className="p-4">
        <fieldset className="rounded-xl border border-cyan-200 p-4 bg-white shadow-sm">
          <legend className="ml-2 px-2 text-sm font-semibold text-cyan-700">XAML graphs</legend>

          <div className="flex gap-3 items-center mb-3">
            <input
              type="search"
              placeholder="Filter graphs (name or id)"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm w-full max-w-md focus:outline-none focus:ring-2 focus:ring-cyan-300"
              aria-label="Filter graphs"
            />
            <div className="text-sm text-gray-500">Showing <span className="font-medium text-gray-800">{filtered.length}</span> of <span className="text-gray-600">{options.length}</span></div>
          </div>

          {/* responsive multi-column grid with scroll when too many items */}
          <div className="grid gap-2 auto-rows-min grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 overflow-auto max-h-44 p-1">
            {filtered.map((opt: any) => (
              <div key={opt.id} className="p-0.5">
                <RadioButton
                  id={opt.id}
                  name="view"
                  value={opt.value}
                  label={opt.label}
                  selectedOption={selectedOption}
                  onChange={(v) => setSelectedOption(v)}
                  className="text-sm block"
                />
              </div>
            ))}
          </div>
        </fieldset>
      </section>

      {/* Graph container */}
      <section className="flex flex-col flex-1 min-h-0 p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold tracking-tight text-gray-800">{graphTitle ?? selectedOption}</h2>
          <div className="text-sm text-gray-500">Nodes: <span className="font-medium text-gray-700">{nodeCount ?? '--'}</span></div>
        </div>

        <div
          id="content"
          ref={containerRef}
          className="flex-1 min-h-0 min-w-0 overflow-auto rounded-lg border border-gray-200 bg-white shadow-inner p-4"
        />
      </section>
    </main>
  );
}
