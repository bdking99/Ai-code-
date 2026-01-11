export enum FileType {
  PYTHON = 'python',
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  HTML = 'html',
  CSS = 'css',
  JSON = 'json',
  MARKDOWN = 'markdown',
  TEXT = 'text',
  SQL = 'sql',
  BASH = 'bash'
}

export interface GeneratedFile {
  id: string;
  filename: string;
  extension: string;
  content: string;
  timestamp: number;
}

export interface GenerationRequest {
  prompt: string;
  filename: string;
  type: FileType;
}

export const FileTypeExtensions: Record<FileType, string> = {
  [FileType.PYTHON]: '.py',
  [FileType.JAVASCRIPT]: '.js',
  [FileType.TYPESCRIPT]: '.ts',
  [FileType.HTML]: '.html',
  [FileType.CSS]: '.css',
  [FileType.JSON]: '.json',
  [FileType.MARKDOWN]: '.md',
  [FileType.TEXT]: '.txt',
  [FileType.SQL]: '.sql',
  [FileType.BASH]: '.sh'
};