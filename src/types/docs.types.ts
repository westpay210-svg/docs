export interface ApiEndpoint {
  id: string;
  title: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  description: string;
  parameters?: Parameter[];
  requestBody?: RequestBody;
  responses: Response[];
  codeExamples: CodeExample[];
}

export interface Parameter {
  name: string;
  type: string;
  required: boolean;
  location: 'header' | 'query' | 'path';
  description: string;
  example?: string;
}

export interface RequestBody {
  type: string;
  description: string;
  schema: any;
  example: any;
}

export interface Response {
  status: number;
  description: string;
  schema?: any;
  example: any;
}

export interface CodeExample {
  language: string;
  code: string;
  title?: string;
}

export interface DocSection {
  id: string;
  title: string;
  description?: string;
  subsections?: DocSection[];
  endpoints?: ApiEndpoint[];
}