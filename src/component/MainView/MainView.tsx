import CodeEditor from 'component/CodeEditor';
import React from 'react';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import 'react-reflex/styles.css';
import './styles.css';

const MainView = () => {
  const [text, setText] = React.useState('');

  return (
    <div className="flex__container">
      <ReflexContainer orientation="vertical">
        {/* main container */}
        <ReflexElement size={1000}>
          <div className="left-pane">1</div>
        </ReflexElement>
        {/* element to the left questions */}
        <ReflexSplitter className="resizer" />
        {/* elements to the right -> nested container */}
        <ReflexElement>
          {/* element -> 2 container */}
          <ReflexContainer orientation="horizontal">
            {/* container containing 2-> elements */}
            <ReflexElement>
              <CodeEditor text={text} setText={setText} />
            </ReflexElement>
            <ReflexSplitter className="resizer__horizontal" />
            <ReflexElement className="right__down__pane">
              Right Pane (Fixed)
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
      </ReflexContainer>
    </div>
  );
};

export default MainView;
