declare module 'busboy' {
  import { EventEmitter } from 'node:events';

  type BusboyOptions = {
    headers?: Record<string, string | string[] | undefined>;
    limits?: {
      files?: number;
      fileSize?: number;
    };
  };

  const Busboy: {
    new (options: BusboyOptions): EventEmitter & {
      on(event: 'field', listener: (name: string, val: string) => void): any;
      on(event: 'file', listener: (name: string, file: any, info: { filename: string; mimeType: string }) => void): any;
      on(event: 'error', listener: (err: Error) => void): any;
      on(event: 'finish', listener: () => void): any;
    };
  };

  export default Busboy;
}
