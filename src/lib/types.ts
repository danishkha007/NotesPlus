export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'admin' | 'student';
  history?: string[]; // Array of note IDs
}

export interface Stream {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
  streamId: string;
  description: string;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  streamId: string;
  fileUrl: string;
  fileType: 'pdf' | 'doc' | 'video';
  downloadCount: number;
  category: string;
  tags: string[];
  createdAt?: any; // Firebase Timestamp
  subjectName?: string;
  streamName?: string;
  streamSlug?: string;
  subjectSlug?: string;
}

export interface BreadcrumbItem {
  name: string;
  href?: string;
}
