import React from 'react';
import BorderBoxContainer, { TextProps } from './BorderBoxContainer';
import BorderBoxClient from './BorderBoxClient';

interface BorderBoxProps {
  texts: TextProps[];
  children: React.ReactNode;
}

const BorderBox: React.FC<BorderBoxProps> = (props) => {

  // I really don't like this but gotta do it anyways for the best possible server rendered goodies.
  // Here the first the BorderBoxContainer is rendered on server and then BorderBoxClient takes over on client
  // https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#supported-pattern-passing-server-components-to-client-components-as-props
  return (
    <BorderBoxClient>
      <BorderBoxContainer {...props} />
    </BorderBoxClient>
  );
};

export default React.memo(BorderBox);
