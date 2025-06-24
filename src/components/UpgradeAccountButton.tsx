function UpgradeAccountButton() {
  return (
    <div
      className="p-4 rounded-xl space-y-3 bg-indigo-50 border border-primary h-48 cursor-pointer"
      style={{
        backgroundImage: `url('/public/Cloudy.svg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-4 justify-center items-center">
        <h3 className="text-lg font-bold text-gray-700  tracking-tight leading-5 text-center">Upgrade to Pro</h3>
        <p className="text-sm text-gray-700 font-semibold  tracking-tighter leading-4 text-center">
          Upgrade to a premium account and get premium features
        </p>
      </div>
    </div>
  );
}

export default UpgradeAccountButton;
