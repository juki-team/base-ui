import { cleanRequest, consoleError, consoleInfo, type ContentsResponseType } from '@juki-team/commons';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { authorizedRequest } from '../../../helpers';
import { jukiApiManager } from '../../../settings';
import { Button, T } from '../../atoms';
import { HelpSection } from '../HelpSection/HelpSection';
import type { ErrorBoundaryProps } from './types';

export class ErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean, errorPersist: boolean }> {
  constructor(props: { children: ReactNode, reload: () => void }) {
    super(props);
    
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, errorPersist: false };
  }
  
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI
    consoleError('getDerivedStateFromError', { error });
    return { hasError: true };
  }
  
  async componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    const token = jukiApiManager.getToken();
    const location = window?.location;
    try {
      const { url, ...options } = jukiApiManager.API_V1.log({
        body: {
          location,
          token,
          errorName: error?.name,
          errorMessage: error?.message,
          errorStack: error?.stack,
          errorInfo,
        },
      });
      const response = cleanRequest<ContentsResponseType<{}>>(await authorizedRequest(url, options));
      if (response.success) {
        consoleInfo('Error reported');
      } else {
        consoleError('error reported failed', { error, errorInfo, location, token, response });
      }
    } catch (errorOnLog) {
      consoleError('error on log error', { error, errorInfo, location, token, errorOnLog });
    }
  }
  
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="jk-col extend stretch jk-pg-lg">
          <div className="bc-we jk-br-ie jk-pg-md">
            <div className="jk-col">
              <div style={{ width: '50vw', height: '20vh' }}>
                <img src="https://images.juki.pub/assets/juki-image-surprised.png" alt="Juki surprised image" />
              </div>
            </div>
            <div className="jk-col gap">
              <h2>Oops, there is an error!</h2>
              {this.state.errorPersist ? (
                <Button onClick={this.props.reload}>
                  <T>reload page</T>
                </Button>
              ) : (
                <Button onClick={() => this.setState({ hasError: false, errorPersist: true })}>
                  <T>try again</T>
                </Button>
              )}
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
