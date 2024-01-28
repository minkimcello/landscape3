import { Entity, EntityLink } from '@backstage/catalog-model';
import { CncfProject } from 'cncf-common';

function getMaturityData(item: CncfProject): {
  sandbox_date: string;
  incubation_date: string | undefined;
  graduation_date: string | undefined;
} {
  return {
    sandbox_date: item.extra.accepted,
    incubation_date: item.extra.incubating,
    graduation_date: item.extra.graduated,
  }
}

function getOptionalLinks(item: CncfProject): EntityLink[] {
  const links = [] as EntityLink[];
  if (item.twitter) {
    // see ./generated/landscaep_stats_analysis.json#cncfProjectsKeysAnalysis.twitter
    links.push({
      title: "Twitter",
      url: item.twitter
    });
  }

  if (item.extra.slack_url) {
    // see ./generated/landscaep_stats_analysis.json#cncfProjectsKeysAnalysis.extra.slack_url
    // although non cncf projects has a key for discord_url, cncf projects uses slack_url for all of their communication URLs even if it's discord
    links.push({
      title: "Slack/Discord",
      url: item.extra.slack_url,
    })
  }
  return links;
}

export function componentTemplate(item: CncfProject): Entity {
  // We can deconstruct these properties for every item because of the stats that were generated.
  const {
    name,
    category,
    subcategory,
    description,
    project: status, // sandbox | incubating | graduated
    logo,
    homepage_url,
    crunchbase: crunchbase_url,
    extra: {
      accepted,
    }
  } = item;

  // https://github.com/backstage/backstage/blob/master/docs/architecture-decisions/adr002-default-catalog-file-format.md#name
  const entityName = name.replace(/\ /g, '-').replace(/[^a-zA-Z0-9_\-\.]/g, '');

  const tags = item.extra?.summary_tags?.split(',')
    .map(tag => tag.trim()
      .replace(/[^a-zA-Z0-9:+#]/g, '')
      .toLowerCase())
    .filter(tag => tag !== ""); // strimzi has an empty string as a tag

  const optionalLinks = getOptionalLinks(item);
  const maturity = getMaturityData(item);

  // See "cncfProjectsSummary" in './generated/landscape_stats.json'
  return {
    apiVersion: "backstage.io/v1alpha1",
    kind: "Component",
    metadata: {
      name: entityName,
      description,
      links: [
        {
          title: "Homepage",
          url: homepage_url,
        },
        {
          title: "Crunchbase",
          url: crunchbase_url
        },
        ...optionalLinks,
      ],
      tags,
      annotations: {
        // serverless-devs-serverless and virtual-kubelet-serverless are missing repo_url
        "backstage.io/source-location": item.repo_url ? `$url:${item.repo_url}` : "",
      },
    },
    spec: {
      type: "service",
      lifecycle: "production",
      owner: "CNCF",
      accepted,
      category,
      subcategory,
      status,
      logo,
      maturity,
    },
  }
}
