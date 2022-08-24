import getContentfulVars from './getContentfulVars';

export default (contentId, selectedPath = [], variant) => {
  const [CONTENTFUL_CURRENT_SPACE_ID, CONTENTFUL_ENVIRONMENT] = getContentfulVars();
  const reversed = [...selectedPath].reverse();
  const previousEntries = selectedPath
    ? `?previousEntries=${reversed
        .filter((node) => node.id && node.id !== contentId)
        .map((node) => node.id)
        .join(',')}`
    : '';
  const variantPath = variant === 'asset' ? 'assets' : 'entries';

  return `https://app.contentful.com/spaces/${CONTENTFUL_CURRENT_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/${variantPath}/${contentId}${previousEntries}`;
};
