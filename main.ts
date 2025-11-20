type ErrorResult = {
  isOk: false;
  error: string
}

function throwError(message: string): void { 
    throw new Error(message)
}

function returnErrorObject(message: string): ErrorResult {
  return {
    isOk: false,
    error: message
  };
}

function measureTime(fn: () => void, iterations: number): number {
  const start = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  
  return performance.now() - start;
}

function runBenchmark(iterations: number): void {
  console.log(`Rodando benchmark com ${iterations.toLocaleString()} iterações...`);
  
  const throwErrorTime = measureTime(() => {
    try {
        throwError("Algo deu errado")
    } catch(e) {}
  }, iterations);

  
  const objectTime = measureTime(() => {
    const result = returnErrorObject("Algo deu errado");
  }, iterations);
  

  const throwErrorOverObjectRatio = throwErrorTime / objectTime 
  
  console.log("\nResultados:");
  console.log(`Error return: ${objectTime.toFixed(2)}ms`);
  console.log(`* Média: ${(objectTime / iterations)}ms`)
  console.log(`Exception throw: ${throwErrorTime.toFixed(2)}ms`);
  console.log(`* Média: ${(throwErrorTime / iterations)}ms`)
  console.log(`\nRetornar um objeto é ${throwErrorOverObjectRatio.toFixed(2)}x mais rápido do que disparar uma exceção`);
}

const tenThousand = 10_000
console.log('--- Aquecimento ---');
runBenchmark(tenThousand);

const oneMillion = 1_000_000
console.log('\n--- Benchmark completo ---');
runBenchmark(oneMillion);
