import { ChevronLeft, Settings } from "lucide-react";
import { Button } from "~/components/ui/button";

const FilesPage = () => {
  return (
    <section>
      <header className="p-4 border-b border-gray-300">
        <Button variant="ghost" className="text-purple-600 hover:text-purple-800 cursor-pointer">
          <ChevronLeft />
          Back to bucket
        </Button>
        <div className="mt-4 flex justify-between items-center">
          <h3 className="text-4xl font-bold">Bucket Name</h3>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-lg">
              <Settings className="text-indigo-600"/>
            </Button>
          </div>
        </div>
        <p className="pt-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi tempore velit non incidunt natus est debitis
        </p>
      </header>
    </section>
  );
};

export default FilesPage;
