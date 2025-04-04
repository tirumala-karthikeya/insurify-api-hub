
import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

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
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <SidebarSection title="Policy Management">
          <SidebarItem
            title="Get All Policies"
            method="GET"
            active={activeEndpoint === "get-all-policies"}
            onClick={() => setActiveEndpoint("get-all-policies")}
          />
          <SidebarItem
            title="Get Policy by ID"
            method="GET"
            active={activeEndpoint === "get-policy-by-id"}
            onClick={() => setActiveEndpoint("get-policy-by-id")}
          />
          <SidebarItem
            title="Create Policy"
            method="POST"
            active={activeEndpoint === "create-policy"}
            onClick={() => setActiveEndpoint("create-policy")}
          />
          <SidebarItem
            title="Update Policy"
            method="PUT"
            active={activeEndpoint === "update-policy"}
            onClick={() => setActiveEndpoint("update-policy")}
          />
          <SidebarItem
            title="Delete Policy"
            method="DELETE"
            active={activeEndpoint === "delete-policy"}
            onClick={() => setActiveEndpoint("delete-policy")}
          />
        </SidebarSection>
        
        <SidebarSection title="Claims Management">
          <SidebarItem
            title="Get Claims Information"
            method="GET"
            active={activeEndpoint === "get-claims-information"}
            onClick={() => setActiveEndpoint("get-claims-information")}
          />
          <SidebarItem
            title="Update Claims Information"
            method="PUT"
            active={activeEndpoint === "update-claims-information"}
            onClick={() => setActiveEndpoint("update-claims-information")}
          />
          <SidebarItem
            title="Create Claims Information"
            method="POST"
            active={activeEndpoint === "create-claims-information"}
            onClick={() => setActiveEndpoint("create-claims-information")}
          />
        </SidebarSection>
        
        <SidebarSection title="Premium Management">
          <SidebarItem
            title="Get Premium Data"
            method="GET"
            active={activeEndpoint === "get-premium-data"}
            onClick={() => setActiveEndpoint("get-premium-data")}
          />
          <SidebarItem
            title="Update Premium Data"
            method="PUT"
            active={activeEndpoint === "update-premium-data"}
            onClick={() => setActiveEndpoint("update-premium-data")}
          />
          <SidebarItem
            title="Create Premium Data"
            method="POST"
            active={activeEndpoint === "create-premium-data"}
            onClick={() => setActiveEndpoint("create-premium-data")}
          />
        </SidebarSection>
        
        <SidebarSection title="Coverage Management">
          <SidebarItem
            title="Get Coverage Data"
            method="GET"
            active={activeEndpoint === "get-coverage-data"}
            onClick={() => setActiveEndpoint("get-coverage-data")}
          />
        </SidebarSection>
      </div>
    </div>
  );
}
