
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ApiDocumentation from "../components/ApiDocumentation";
import ApiUsePanel from "../components/ApiUsePanel";
import { apiEndpoints } from "../data/apiData";

const Index = () => {
  const [activeEndpoint, setActiveEndpoint] = useState("get-all-policies");
  const [showApiUsePanel, setShowApiUsePanel] = useState(false);

  const currentEndpoint = apiEndpoints[activeEndpoint];

  const handleUseApi = () => {
    setShowApiUsePanel(true);
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
          baseUrl={currentEndpoint.baseUrl}
          path={currentEndpoint.path}
          queryParams={currentEndpoint.queryParams}
          headerParams={currentEndpoint.headerParams}
          bodyParams={currentEndpoint.bodyParams}
          responseExample={currentEndpoint.responseExample}
          onUseApi={handleUseApi}
        />
      </div>
      {showApiUsePanel && (
        <ApiUsePanel 
          endpoint={currentEndpoint.title}
          method={currentEndpoint.method}
          baseUrl={currentEndpoint.baseUrl}
          path={currentEndpoint.path}
          onClose={() => setShowApiUsePanel(false)}
        />
      )}
    </div>
  );
};

export default Index;
