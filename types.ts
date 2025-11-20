import React from 'react';

export enum ToolCategory {
  CODER = 'CODER',
  WRITER = 'WRITER',
  OFFICE = 'OFFICE'
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: ToolCategory;
  path: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface CsvDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string; // Base64 string
  isError?: boolean;
  groundingMetadata?: any;
}

export interface AiCodeResponse {
  code?: string;
  explanation: string;
}