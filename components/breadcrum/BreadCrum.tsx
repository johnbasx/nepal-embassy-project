import { HomeIcon } from '@heroicons/react/solid';
import { classNames } from '@utils/helpers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { capitalizeFirst } from '@utils/humanizeWord';

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

const BreadCrums = ({
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
        const param: string = pathnameNestedRoutes[idx]
          .replace('[', '')
          .replace(']', '');

        // const paramsConverted = param.replace('-', ' ');

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
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center px-2 pt-3 space-x-1">
          <li>
            <div>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <HomeIcon
                  className="flex-shrink-0 w-5 h-5"
                  aria-hidden="true"
                />
                <span className="sr-only">Home</span>
              </a>
            </div>
          </li>
          {breadcrumbs.map((crumb, idx) => (
            <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
          ))}
        </ol>
      </nav>
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
        <Link href={href}>
          <span
            className={classNames(
              'text-2xs inline-flex cursor-pointer max-w-20 truncate text-ellipsis overflow-hidden',
              last
                ? 'text-blue-600 hover:text-blue-700 font-semibold'
                : 'text-gray-500 font-normal hover:text-gray-700'
            )}
            aria-current={text ? 'page' : undefined}
          >
            {text}
          </span>
        </Link>
      </div>
    </li>
  );
}

export default BreadCrums;
