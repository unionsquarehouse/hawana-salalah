export default function SectionBackground({ position = "middle" }) {
  // Different blur positions based on section position
  const getPositionClasses = () => {
    switch(position) {
      case "top":
        return (
          <>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand rounded-full blur-3xl opacity-20 dark:opacity-20"></div>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-brand-hover rounded-full blur-3xl opacity-20 dark:opacity-20"></div>
          </>
        );
        
      case "bottom":
        return (
          <>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-hover rounded-full blur-3xl opacity-20 dark:opacity-20"></div>
            <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-brand rounded-full blur-3xl opacity-20 dark:opacity-20"></div>
          </>
        );
      default: // middle
        return (
          <>
            <div className="absolute top-1/2 -translate-y-1/2 -left-24 w-96 h-96 bg-brand rounded-full blur-3xl opacity-20 dark:opacity-20"></div>
            <div className="absolute top-1/2 -translate-y-1/2 right-1/4 w-72 h-72 bg-brand-hover rounded-full blur-3xl opacity-20 dark:opacity-20"></div>
          </>
        );
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {getPositionClasses()}
    </div>
  );
}
