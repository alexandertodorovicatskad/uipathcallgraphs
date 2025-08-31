import * as Plot from "@observablehq/plot";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [selectedOption, setSelectedOption] = useState<string | undefined>("xaml");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gods = [
      "Chaos/Gaia/Mountains",
      "Chaos/Gaia/Pontus",
      "Chaos/Gaia/Uranus",
      "Chaos/Gaia/Neptun",
      "Chaos/Eros",
      "Chaos/Toros",
      "Chaos/Erebus",
      "Chaos/Tartarus"
    ];

    const xaml = [
      "Main/Process/Sonderfälle",
      "Main/Process/GetAODRight",
      "Main/Process/MatchAOD",
      "Main/Process/FINN_Kontierung",
      "Main/InitAllSettings",
      "Main/InitAllApplications",
      "Main/SetTransactionStatus",
      "Main/Process"
    ];


    const plot = Plot.plot({
      axis: null,
      height: 100,
      margin: 10,
      marginLeft: 40,
      marginRight: 120,
      marks: [
        Plot.tree(selectedOption === "gods" ? gods : xaml, { textStroke: "white" })
      ]
    });

    containerRef.current?.append(plot);
    return () => plot.remove();
  }, [selectedOption]);

  return (
    <span>
      <div>
        <h2>Visualize XAMLs</h2>
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
          Gods
        </label>
        <label style={{ cursor: "pointer", marginLeft: 8 }}>
          <input
            id="view-xaml"
            type="radio"
            name="view"
            value="xaml"
            checked={selectedOption === "xaml"}
            onChange={() => setSelectedOption("xaml")}
            style={{ marginRight: 6 }}
          />
          XAMLs
        </label>
      </div>
      <div ref={containerRef} />
    </span>
  );
}