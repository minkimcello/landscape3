export interface Landscape {
  landscape?: (LandscapeEntity)[] | null;
}
export interface LandscapeEntity {
  category?: null;
  name: string;
  subcategories?: (SubcategoriesEntity)[] | null;
}
export interface SubcategoriesEntity {
  subcategory?: null;
  name: string;
  items?: (ItemsEntity)[] | null;
}
export interface ItemsEntity {
  item?: null;
  name: string;
  homepage_url: string;
  repo_url?: string | null;
  logo: string;
  twitter?: string | null;
  crunchbase?: string | null;
  project?: string | null;
  extra?: Extra | null;
  description?: string | null;
  allow_duplicate_repo?: boolean | null;
  joined?: string | null;
  url_for_bestpractices?: string | null;
  organization?: string | Organization;
  project_org?: string | null;
  open_source?: boolean | null;
  enduser?: boolean | null;
  stock_ticker?: string | null;
  second_path?: (string)[] | null;
  additional_repos?: (AdditionalReposEntity)[] | null;
  branch?: string | null;
  unnamed_organization?: boolean | null;
}
export interface Extra {
  training_certifications?: string | null;
  training_type?: string | null;
  blog_url?: string | null;
  youtube_url?: string | null;
  github_discussions_url?: string | null;
  accepted?: string | null;
  incubating?: string | null;
  graduated?: string | null;
  cncf_tags?: (string)[] | null;
  dev_stats_url?: string | null;
  artwork_url?: string | null;
  stack_overflow_url?: string | null;
  slack_url?: string | null;
  summary_personas?: string | null;
  summary_tags?: string | null;
  summary_use_case?: string | null;
  summary_business_use_case?: string | null;
  summary_release_rate?: string | null;
  summary_intro_url?: string | null;
  clomonitor_name?: string | null;
  audits?: (AuditsEntity)[] | null;
  archived?: string | null;
  parent_project?: string | null;
  summary_integrations?: string | null;
  mailing_list_url?: string | null;
  annual_review_url?: string | null;
  annual_review_date?: string | null;
  summary_integration?: string | null;
  chat_channel?: string | null;
  url_for_bestpractices?: string | null;
  summary_languages?: string | null;
  discord_url?: string | null;
  blog_jp_url?: string | null;
  docker_url?: string | null;
  helm_chart_url?: string | null;
  operator_chart_url?: string | null;
  kubernetes_url?: string | null;
  gitter_url?: string | null;
  devstats?: string | null;
  specification?: boolean | null;
}
export interface AuditsEntity {
  date: string;
  type: string;
  url: string;
  vendor: string;
}
export interface Organization {
  name: string;
}
export interface AdditionalReposEntity {
  repo_url: string;
}
