import { consoleError } from '@juki-team/commons';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { Button, T } from '../../atoms';
import { HomeIcon } from '../../atoms/server';
import { safeReportError } from '../../helpers';
import { HelpSection } from '../HelpSection/HelpSection';
import type { ErrorBoundaryProps } from './types';

const ImageSurprised = () => {
  const Image = useUIStore(store => store.components.Image);
  return (
    <Image
      // style={{ width: '50vw', height: '20vh' }}
      fill
      src="https://images.juki.pub/assets/juki-image-surprised.png"
      alt="Juki surprised image"
    />
  );
};

export function RootLink() {
  
  const { Link } = useUIStore(store => store.components);
  
  return (
    <Link href="/" className="link jk-row" key="home">
      <HomeIcon size="small" />
      &nbsp;<T className="tt-se">go to home</T>
    </Link>
  );
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean, errorPersist: boolean }> {
  constructor(props: { children: ReactNode, reload?: () => void, background?: boolean }) {
    super(props);
    
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, errorPersist: false };
  }
  
  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    consoleError('getDerivedStateFromError', { error });
    return { hasError: true };
  }
  
  async componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    await safeReportError(error, errorInfo);
  }
  
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      
      if (this.props.background) {
        return null;
      }
      
      return (
        <div className="jk-col extend stretch jk-pg-lg">
          <div className="bc-we jk-br-ie jk-pg-md">
            <div className="jk-col">
              <div style={{ width: '50vw', height: '20vh' }}>
                <ImageSurprised />
              </div>
            </div>
            <div className="jk-col gap">
              <h2><T className="tt-se ta-cr">Oops, there is an error!</T></h2>
              {this.state.errorPersist ? (
                <Button onClick={this.props.reload}>
                  <T className="tt-se">reload page again</T>
                </Button>
              ) : (
                <Button onClick={() => this.setState({ hasError: false, errorPersist: true })}>
                  <T className="tt-se">reload page</T>
                </Button>
              )}
              <RootLink />
            </div>
            <div className="jk-divider" />
            <div className="jk-col gap">
              <div className="fw-bd"><T className="tt-se">supported browsers</T>:</div>
              <div>
                <ul>
                  <li>Chrome 64+</li>
                  <li>Edge 79+</li>
                  <li>Firefox 67+</li>
                  <li>Opera 51+</li>
                  <li>Safari 12+</li>
                </ul>
              </div>
              <div>
                <T className="tt-se">if your browser is not supported, update it or contact us</T>
              </div>
            </div>
            <div className="jk-divider" />
            <div className="jk-col"><HelpSection /></div>
          </div>
        </div>
      );
    }
    
    // Return children components in case of no error
    
    return this.props.children;
  }
}
