import * as Plot from "@observablehq/plot";
import { useEffect, useRef, useState } from "react";
import { gods, erechnungen } from "./graphs";

export default function App() {
  const [selectedOption, setSelectedOption] = useState<string | undefined>("gods");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const plot = Plot.plot({
      axis: null,
      height: 100,
      margin: 10,
      marginLeft: 40,
      marginRight: 120,
      marks: [
        Plot.tree(selectedOption === "gods" ? gods : erechnungen, { textStroke: "white", fill: "steelblue" })
      ]
    });

    containerRef.current?.append(plot);
    return () => plot.remove();
  }, [selectedOption]);

  return (
    <main>
      <section className="flex mt-4">
        <fieldset className="border border-gray-300 p-2 rounded ">
          <legend>XAML graphs</legend>
          <div>
            <label style={{ cursor: "pointer", marginLeft: 8 }}>
              <input
                id="view-gods"
                type="radio"
                name="view"
                value="gods"
                checked={selectedOption === "gods"}
                onChange={() => setSelectedOption("gods")}
                style={{ marginRight: 6 }}
              />
              {selectedOption === "gods" ? "Gods" : "Gods"}
            </label>
          </div>
          <div>
            <label style={{ cursor: "pointer", marginLeft: 8 }}>
              <input
                id="view-erechnungen"
                type="radio"
                name="view"
                value="erechnungen"
                checked={selectedOption === "erechnungen"}
                onChange={() => setSelectedOption("erechnungen")}
                style={{ marginRight: 6 }}
              />
              {selectedOption === "erechnungen" ? "E-Rechnungen" : "E-Rechnungen"}
            </label>
          </div>
        </fieldset>
      </section>
      <section className="mt-4">
        <h2 className="text-xl font-semibold">{selectedOption}</h2>
        <div id="content" ref={containerRef} >
          {/* <p>Select an option above to see the process graph.</p> */}
        </div>
      </section>
    </main>
  );
}