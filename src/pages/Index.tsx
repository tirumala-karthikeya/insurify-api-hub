
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ApiDocumentation from "../components/ApiDocumentation";
import ApiUsePanel from "../components/ApiUsePanel";
import { apiEndpoints } from "../data/apiData";

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  value?: string;
}

const Index = () => {
  const [activeEndpoint, setActiveEndpoint] = useState("get-all-policies");
  const [showApiUsePanel, setShowApiUsePanel] = useState(false);

  const currentEndpoint = apiEndpoints[activeEndpoint];

  const handleUseApi = () => {
    setShowApiUsePanel(prev => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        activeEndpoint={activeEndpoint}
        setActiveEndpoint={(id) => {
          setActiveEndpoint(id);
          // Close API use panel when changing endpoints
          setShowApiUsePanel(false);
        }}
      />
      <div className="flex-1 overflow-auto">
        <ApiDocumentation
          endpoint={currentEndpoint.title}
          method={currentEndpoint.method}
          title={currentEndpoint.title}
          baseUrl={currentEndpoint.baseUrl.replace("spectrum", "xpectrum")}
          path={currentEndpoint.path}
          queryParams={currentEndpoint.queryParams as Parameter[]}
          headerParams={currentEndpoint.headerParams as Parameter[]}
          bodyParams={currentEndpoint.bodyParams as Parameter[]}
          responseExample={currentEndpoint.responseExample}
          onUseApi={handleUseApi}
          isApiPanelOpen={showApiUsePanel}
        />
      </div>
      {showApiUsePanel && (
        <ApiUsePanel 
          endpoint={currentEndpoint.title}
          method={currentEndpoint.method}
          baseUrl={currentEndpoint.baseUrl.replace("spectrum", "xpectrum")}
          path={currentEndpoint.path}
          onClose={() => setShowApiUsePanel(false)}
        />
      )}
    </div>
  );
};

export default Index;
