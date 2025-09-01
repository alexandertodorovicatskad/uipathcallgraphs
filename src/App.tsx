import * as Plot from "@observablehq/plot";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [selectedOption, setSelectedOption] = useState<string | undefined>("gods");
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

    const erechnungen = [
      "Main.xaml/Framework/GetTransactionData.xaml",
      "Main.xaml/Framework/Process.xaml",
      "Main.xaml/Framework/SetTransactionStatus.xaml",
      "Main.xaml/Framework/SetTransactionStatus.xaml",
      "Main.xaml/Framework/SetTransactionStatus.xaml",
      "Main.xaml/Framework/InitAllSettings.xaml",
      "Main.xaml/Framework/KillAllProcesses.xaml",
      "Main.xaml/Framework/InitAllApplications.xaml",
      "Main.xaml/Framework/CloseAllApplications.xaml",
      "Main.xaml/Framework/KillAllProcesses.xaml",
      "AOD/MatchAOD.xaml/AOD/ImportAODMapping.xaml",
      "AOD/MatchAOD.xaml/eRechnungPDFExtract/eRechnungenPDFTEXT.xaml",
      "AOD/MatchAOD.xaml/eRechnungPDFExtract/eRechnungenPDFOCR.xaml",
      "AOD/MatchAOD.xaml/AOD/FindAOD_DUFields.xaml",
      "AOD/MatchAOD.xaml/AOD/FindDienststelleAOD.xaml",
      "Framework/InitAllApplications.xaml/FINN/FINN_Login.xaml",
      "Framework/Process.xaml/FINN/FINN_SucheRechnung.xaml",
      "Framework/Process.xaml/FINN/FINN_DownloadRechnung.xaml",
      "Framework/Process.xaml/FINN/FINN_DownloadXML.xaml",
      "Framework/Process.xaml/XML/XRechnungParsing.xaml",
      "Framework/Process.xaml/Document_Understanding/DU_Gesamtanalyse.xaml",
      "Framework/Process.xaml/Document_Understanding/DU_RegexAnalyse.xaml",
      "Framework/Process.xaml/LocalLM/API_vLLM_ChatCompletion_GetFields.xaml",
      "Framework/Process.xaml/Logik/Sonderfälle.xaml",
      "Framework/Process.xaml/FINN/FINN_Rechnungsdaten.xaml",
      "Framework/Process.xaml/Logik/GetAODright.xaml",
      "Framework/Process.xaml/AOD/MatchAOD.xaml",
      "Framework/Process.xaml/FINN/FINN_Vorgangsdaten.xaml",
      "Framework/Process.xaml/FINN/FINN_Kontierung.xaml",
      "Framework/Process.xaml/FINN/FINN_Prüfer.xaml",
      "Framework/Process.xaml/FINN/FINN_ValidateFields.xaml",
      "Framework/Process.xaml/FINN/FINN_RechnungAbschließen.xaml",
      "Framework/SetTransactionStatus.xaml/Framework/TakeScreenshot.xaml",
      "Framework/SetTransactionStatus.xaml/Framework/RetryCurrentTransaction.xaml",
      "Framework/SetTransactionStatus.xaml/Framework/CloseAllApplications.xaml",
      "Framework/SetTransactionStatus.xaml/Framework/KillAllProcesses.xaml",
      "Document_Understanding/DU_Gesamtanalyse.xaml/Document_Understanding/20_Digitize.xaml",
      "Document_Understanding/DU_Gesamtanalyse.xaml/Document_Understanding/30_Classify.xaml",
      "Document_Understanding/DU_Gesamtanalyse.xaml/Document_Understanding/50_Extract.xaml",
      "Document_Understanding/DU_Gesamtanalyse.xaml/Document_Understanding/70_Export.xaml",
      "Tests/MainTestCase.xaml/Main.xaml",
      "Tests/InitAllSettingsTestCase.xaml/Framework/InitAllSettings.xaml",
      "Tests/WorkflowTestCaseTemplate.xaml/Framework/InitAllSettings.xaml",
      "Tests/InitAllApplicationsTestCase.xaml/Framework/InitAllSettings.xaml",
      "Tests/InitAllApplicationsTestCase.xaml/Framework/InitAllApplications.xaml",
      "Tests/InitAllApplicationsTestCase.xaml/Framework/CloseAllApplications.xaml",
      "Tests/ProcessTestCase.xaml/Framework/InitAllSettings.xaml",
      "Tests/ProcessTestCase.xaml/Framework/InitAllApplications.xaml",
      "Tests/ProcessTestCase.xaml/Framework/GetTransactionData.xaml",
      "Tests/ProcessTestCase.xaml/Framework/Process.xaml",
      "Tests/ProcessTestCase.xaml/Framework/CloseAllApplications.xaml",
      "Tests/GetTransactionDataTestCase.xaml/Framework/InitAllSettings.xaml",
      "Tests/GetTransactionDataTestCase.xaml/Framework/GetTransactionData.xaml",
      "FINN/FINN_SucheRechnung.xaml/FINN/FINN_Zuweisung.xaml"
    ]


    const plot = Plot.plot({
      axis: null,
      height: 100,
      margin: 10,
      marginLeft: 40,
      marginRight: 120,
      marks: [
        Plot.tree(selectedOption === "gods" ? gods : erechnungen, { textStroke: "white"})
      ]
    });

    containerRef.current?.append(plot);
    return () => plot.remove();
  }, [selectedOption]);

  return (
    <main>
      <section>
        <fieldset>
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
              Gods
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
              erechnungen
            </label>
          </div>
        </fieldset>
      </section>
      <section>
        <h2>{selectedOption}</h2>
        <div id="content" ref={containerRef} >
          <p>Select an option above to see the process graph.</p>
        </div>
      </section>
    </main>
  );
}