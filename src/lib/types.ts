export type Item = {
  id: string;
  category: string;
  title: string;
  inserted_at: string;
  content?: string;
  is_complete?: boolean;
};

export type Feature = {
  name: string;
  description: string;
  icon: React.ComponentType<any>;
};
