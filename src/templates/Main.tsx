import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 antialiased text-gray-700">
    {props.meta}

    <div className="max-w-screen-md mx-auto">
      <div className="pt-16 pb-8">
        <div className="text-3xl font-bold text-gray-900">
          {AppConfig.title}
        </div>
        <div className="text-xl">{AppConfig.description}</div>
      </div>

      <div className="py-5 text-xl content">{props.children}</div>
    </div>
  </div>
);

export { Main };
