export const LoadingSpinner = () => {
  return (
    <div
      className="text-secondary inline-block h-40 w-40 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export const LoadingPage = () => {
  return (
    <div className="right-0 top-0 flex h-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};
