const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className="loader border-t-2 rounded-full border-yellow-500 bg-yellow-300 animate-spin
aspect-square w-10 flex justify-center items-center text-yellow-700"
      >
        $
      </div>
    </div>
  );
};

export default LoadingScreen;
