import { classNames } from '@utils/helpers';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';
import { HiChevronRight } from 'react-icons/hi';

export const _defaultGetTextGenerator = (
  param: string,
  query: ParsedUrlQuery
) => null;
export const _defaultGetDefaultTextGenerator = (path: string, href: string) =>
  path;

// Pulled out the path part breakdown because its
// going to be used by both `asPath` and `pathname`
export const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split('?')[0];
  return pathWithoutQuery.split('/').filter((v) => v.length > 0);
};

const GenerateBreadCrums = ({
  getTextGenerator = _defaultGetTextGenerator,
  getDefaultTextGenerator = _defaultGetDefaultTextGenerator,
}) => {
  const router = useRouter();

  const breadcrumbs = React.useMemo(
    function generateBreadcrumbs() {
      const asPathNestedRoutes = generatePathParts(router.asPath);
      const pathnameNestedRoutes = generatePathParts(router.pathname);

      const crumblist = asPathNestedRoutes.map((subpath, idx) => {
        // Pull out and convert "[post_id]" into "post_id"
        const param = pathnameNestedRoutes[idx]
          .replace('[', '')
          .replace(']', '');

        const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/');
        return {
          href,
          textGenerator: getTextGenerator(param, router.query),
          text: getDefaultTextGenerator(subpath, href),
        };
      });

      return [{ href: '/', text: 'Home' }, ...crumblist];
    },
    [
      router.asPath,
      router.pathname,
      router.query,
      getTextGenerator,
      getDefaultTextGenerator,
    ]
  );

  return (
    <>
      {breadcrumbs.map((crumb, idx) => (
        <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
      ))}
    </>
  );
};

export interface BreadCrumProps {
  text: string;
  last: boolean;
  href: string;
  textGenerator?: any;
}
function Crumb({
  text: defaultText,
  textGenerator,
  href,
  last = false,
}: BreadCrumProps) {
  const [text, setText] = React.useState(defaultText);

  useEffect(() => {
    // If `textGenerator` is nonexistent, then don't do anything
    if (!Boolean(textGenerator)) return setText(defaultText);

    async function fetchData() {
      const currText = await textGenerator();
      setText(currText);
    }

    fetchData();
  }, [textGenerator, defaultText]);

  return (
    <li key={text}>
      <div className="flex items-center">
        <HiChevronRight
          className="flex-shrink-0 w-5 h-5 text-gray-400"
          aria-hidden="true"
        />
        <a
          href={href}
          className={classNames(
            'ml-4 text-sm',
            last
              ? 'text-blue-600 hover:text-blue-700 font-semibold'
              : 'text-gray-500 font-medium hover:text-gray-700'
          )}
          aria-current={text ? 'page' : undefined}
        >
          {text}
        </a>
      </div>
    </li>
  );
}

export default GenerateBreadCrums;
