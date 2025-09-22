import { Button } from "@/shared/components/ui/button";
import AdminUsersPageHeader from "./AdminUsersPageHeader";

type AdminUsersErrorStateProps = {
  error: Error | unknown;
};

function AdminUsersError({ error }: AdminUsersErrorStateProps) {
  return (
    <div className="space-y-6 p-6">
      <AdminUsersPageHeader />
      <div className="rounded-md bg-card p-4 border border-accent">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-300">Failed to load users</h3>
            <p className="mt-1 text-sm text-red-300">
              {error instanceof Error ? error.message : "Something went wrong. Please try again."}
            </p>
            <div className="mt-3">
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="text-sm !border-red-300 text-red-300 hover:!text-red-300 hover:!bg-red-300/10 px-3 py-1 rounded-md transition-colors"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsersError;
