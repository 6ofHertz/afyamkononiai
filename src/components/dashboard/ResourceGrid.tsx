import { useState, useEffect } from "react";
import ResourceCard from "./ResourceCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { RESOURCES } from "@/lib/resource-data"; // Removed local data import
import { supabase } from "@/integrations/supabase/client"; // Import Supabase client
import { Button } from "@/components/ui/button"; // Import Button component

interface Resource {
  id: string;
  title: string;
  description?: string;
  category: string;
  url?: string;
  content?: string;
  language?: string;
  created_at?: string;
}

interface ResourceGridProps {
  isAdminView?: boolean; // Optional prop to indicate admin view
  onEditResource?: (resource: Resource) => void; // Optional handler for edit action
  onDeleteResource?: (resource: Resource) => void; // Optional handler for delete action
}

const ResourceGrid: React.FC<ResourceGridProps> = ({ isAdminView = false, onEditResource, onDeleteResource }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  const [resources, setResources] = useState<Resource[]>([]); // State for resources from Supabase
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch resources from Supabase on component mount or when admin actions might require refresh
  useEffect(() => {
    const fetchResources = async () => {
      const { data, error } = await supabase
        .from('resources') // Fetch from the 'resources' table
        .select('*'); // Select all fields

      if (error) {
        setError(error.message);
        setLoading(false);
        console.error('Error fetching resources:', error);
      } else {
        setResources(data || []);
        setLoading(false);
      }
    };

    fetchResources();
  }, [isAdminView]); // Refetch if isAdminView changes (though unlikely to change within component)

  const categories = ["all", ...Array.from(new Set(resources.map(resource => resource.category)))]; // Use fetched resources for categories
  
  const filteredResources = resources.filter(resource => { // Use fetched resources for filtering
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || resource.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search resources..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {loading && <p>Loading resources...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && ( // Render only when not loading and no error
        filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="relative group">
                <ResourceCard 
                  title={resource.title}
                  description={resource.description}
                  url={resource.url}
                  category={resource.category}
                />
                {isAdminView && ( // Conditionally render action buttons for admin view
                  <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onEditResource && (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => onEditResource(resource)}
                      >
                        Edit
                      </Button>
                    )}
                    {onDeleteResource && (
                       <Button 
                         variant="destructive" 
                         size="sm" 
                         onClick={() => onDeleteResource(resource)}
                       >
                         Delete
                       </Button>
                     )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No resources found matching your criteria.</p>
          </div>
        )
      )}
    </div>
  );
};

export default ResourceGrid;
