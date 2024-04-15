export default function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ) {
    let timeout: ReturnType<typeof setTimeout>;
  
    return function executedFunction(this: ThisParameterType<T>, ...args: Parameters<T>) {
      const later = () => {
        timeout = null as any;
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  