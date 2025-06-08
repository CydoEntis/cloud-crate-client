import { ChevronLeft, Settings } from "lucide-react";
import PageHeader from "~/components/PageHeader";
import { Button } from "~/components/ui/button";

const FilesPage = () => {
  return (
    <section>
      <PageHeader
        title="Placeholder Bucket Name"
        description="This is just placeholder for now"
        actions={
          <Button variant="outline" className="rounded-lg">
            <Settings className="text-indigo-600" />
          </Button>
        }
      ></PageHeader>
    </section>
  );
};

export default FilesPage;
