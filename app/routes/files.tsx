import { ChevronLeft, Settings } from "lucide-react";
import { ImageUpload } from "~/components/ImageUpload";
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
      />
      <ImageUpload />
    </section>
  );
};

export default FilesPage;
