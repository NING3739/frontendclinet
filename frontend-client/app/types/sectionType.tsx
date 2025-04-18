export interface CreateNewSectionPayload {
  seo_id: number;
  name: string;
  description: string;
  icon: string;
  type_id: number;
  parend_id: number;
}

export interface UpdateSectionPayload {
  seo_id: number;
  name: string;
  description: string;
  icon: string;
  type_id: number;
  parend_id: number;
  section_id: number;
}

export interface Section {
  id: number;
  name: {
    chinese: string;
    english: string;
  };
  slug: string;
  description: {
    chinese: string;
    english: string;
  };
  icon: string;
  type: string;
  children: Section[];
}
