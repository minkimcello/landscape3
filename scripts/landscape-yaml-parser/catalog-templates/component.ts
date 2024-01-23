import { Entity } from '@backstage/catalog-model';
import { LandscapeItem } from '../types';

export function componentTemplate(item: LandscapeItem): Entity {
  const {
    name,
    description,
    homepage_url,
    project: cncfStatus,
    crunchbase: crunchbase_url,
    category,
    subcategory
  } = item;
  const accepted = item.extra?.accepted;

  // https://github.com/backstage/backstage/blob/master/docs/architecture-decisions/adr002-default-catalog-file-format.md#name
  const entityName = name.replace(/\ /g, '-').replace(/[^a-zA-Z0-9_\-\.]/g, '');

  // We can deconstruct these properties for every item because of the stats that were generated.
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
          url: `${crunchbase_url}`
        }
      ],
      annotations: {
        "landscape3.io/accepted": `${accepted}`,
        "landscape3.io/category": category,
        "landscape3.io/subcategory": subcategory,
        "landscape3.io/cncfStatus": `${cncfStatus}`,
      },
      // TODO: these annotations are hard-coded in but we could auto-generate these for every available field
    },
    spec: {
      type: "service",
      lifecycle: "production",
      owner: "CNCF",
    },
  }
}
