
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { apiEndpoints } from "../data/apiData";

interface SidebarItemProps {
  title: string;
  method: string;
  active?: boolean;
  onClick: () => void;
}

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

const SidebarItem = ({ title, method, active, onClick }: SidebarItemProps) => {
  return (
    <div
      className={`sidebar-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <span>{title}</span>
      <span className={`method-tab ${method.toLowerCase()}-tag`}>
        {method}
      </span>
    </div>
  );
};

const SidebarSection = ({ title, children }: SidebarSectionProps) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="sidebar-accordion mb-2">
      <button
        className="flex w-full items-center justify-between p-3 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="font-medium">{title}</span>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {expanded && <div className="sidebar-accordion-content">{children}</div>}
    </div>
  );
};

interface SidebarProps {
  activeEndpoint: string;
  setActiveEndpoint: (endpoint: string) => void;
}

export default function Sidebar({ activeEndpoint, setActiveEndpoint }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEndpoints, setFilteredEndpoints] = useState<Record<string, any>>({});

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEndpoints(apiEndpoints);
      return;
    }

    const filtered: Record<string, any> = {};
    Object.entries(apiEndpoints).forEach(([key, endpoint]) => {
      if (
        endpoint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        endpoint.method.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        filtered[key] = endpoint;
      }
    });
    setFilteredEndpoints(filtered);
  }, [searchTerm]);

  // Group endpoints by category
  const groupedEndpoints: Record<string, any[]> = {};
  Object.entries(filteredEndpoints).forEach(([key, endpoint]) => {
    const category = endpoint.category || "Other";
    if (!groupedEndpoints[category]) {
      groupedEndpoints[category] = [];
    }
    groupedEndpoints[category].push({ id: key, ...endpoint });
  });

  return (
    <div className="bg-background border-r w-72 h-screen flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center text-white">
            <span>I</span>
          </div>
          <span className="font-medium">insurify-api</span>
        </div>
        <ThemeToggle />
      </div>
      
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            type="text"
            placeholder="Search endpoints..."
            className="w-full rounded-md bg-secondary py-2 pl-9 pr-3 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {Object.keys(groupedEndpoints).length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No endpoints found
          </div>
        ) : (
          Object.entries(groupedEndpoints).map(([category, endpoints]) => (
            <SidebarSection key={category} title={category}>
              {endpoints.map((endpoint) => (
                <SidebarItem
                  key={endpoint.id}
                  title={endpoint.title}
                  method={endpoint.method}
                  active={activeEndpoint === endpoint.id}
                  onClick={() => setActiveEndpoint(endpoint.id)}
                />
              ))}
            </SidebarSection>
          ))
        )}
      </div>
    </div>
  );
}
