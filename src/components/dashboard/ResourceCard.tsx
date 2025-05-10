
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
  category: string;
}

const ResourceCard = ({ title, description, url, category }: ResourceCardProps) => {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <FileText className="h-4 w-4" />
          <span>{category}</span>
        </div>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">Click to view or download this resource.</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full gap-2">
          <a href={url} target="_blank" rel="noopener noreferrer">
            Access Resource
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ResourceCard;
