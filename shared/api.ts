/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface UserMe {
  id: string;
  name: string;
  role?: "student" | "instructor" | "admin" | "parent";
}

export interface ProgressEntry {
  course: string;
  value: number;
}

export interface RecommendationsResponse {
  items: { id: string; title: string; reason: string }[];
}

export interface DiscussionsPost {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface AssignSubmission {
  id: string;
  filename: string;
  submittedAt: string;
  status: string;
}
