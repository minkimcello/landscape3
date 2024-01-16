export interface Landscape {
  landscape: Category[];
}

export interface Category {
  category: never;
  name: string;
  subcategories: SubCategory[];
}

interface SubCategory {
  subcategory: never;
  name: string;
  items: Item[];
}

interface ExtraDetails {
  accepted?: string;
  annual_review_date?: string;
  annual_review_url?: string;
  archived?: string;
  artwork_url?: string;
  audits?: {
    date: string;
    type: string;
    url: string;
    vendor: string;
  }[];
  blog_jp_url?: string;
  blog_url?: string;
  chat_channel?: string;
  clomonitor_name?: string;
  cncf_tags?: string[];
  dev_stats_url?: string;
  devstats?: string;
  discord_url?: string;
  docker_url?: string;
  github_discussions_url?: string;
  gitter_url?: string;
  graduated?: string;
  helm_chart_url?: string;
  incubating?: string;
  kubernetes_url?: string;
  mailing_list_url?: string;
  operator_chart_url?: string;
  parent_project?: string;
  slack_url?: string;
  specification?: boolean;
  stack_overflow_url?: string;
  summary_business_use_case?: string;
  summary_integration?: string;
  summary_integrations?: string;
  summary_intro_url?: string;
  summary_languages?: string;
  summary_personas?: string;
  summary_release_rate?: string;
  summary_tags?: string;
  summary_use_case?: string;
  training_certifications?: string;
  training_type?: string;
  url_for_bestpractices?: string;
  youtube_url?: string;
}

interface Item {
  item: never;
  name: string;
  logo: string;
  homepage_url: string;
  
  additional_repos?: {
    repo_url: string;
  }[];
  allow_duplicate_repo?: boolean;
  branch?: string;
  crunchbase?: string;
  description?: string;
  enduser?: boolean
  joined?: string;
  open_source?: boolean;
  organization?: {
    name: string;
  } | string;
  project?: string;
  project_org?: string;
  repo_url?: string;
  second_path?: string[];
  stock_ticker?: string;
  twitter?: string;
  unnamed_organization?: boolean;
  url_for_bestpractices?: string;
  extra?: ExtraDetails;
}

export interface LandscapeItem extends Item {
  category: string;
  subcategory: string;
}

export interface StatsCategoryBreakdown {
  [key:string]: number;
}

export interface CategoryStats {
  count: number;
  commonKeys: string[];
  uniqueKeys: string;
  categoryBreakdown: StatsCategoryBreakdown;
  subcategoryBreakdown: StatsCategoryBreakdown;
}
