export function chunk(array: any[], chunkSize: number) {
    if (chunkSize < 1) {
      return [];
    }
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
  
    return chunks;
  }