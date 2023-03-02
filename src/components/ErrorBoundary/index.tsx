import { ContentsResponseType } from '@juki-team/commons';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '../';
import { settings } from '../../config';

import { consoleWarn } from '../../helpers';
import { HelpSection } from '../../integrated-components';
import { authorizedRequest, cleanRequest } from '../../services';

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI
    console.error(error);
    return { hasError: true };
  }
  
  async componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    const token = localStorage.getItem(settings.TOKEN_NAME) || '';
    const location = window?.location;
    try {
      const { url, ...options } = settings.getAPI().log({ body: { error, errorInfo, location, token } });
      const response = cleanRequest<ContentsResponseType<{}>>(
        await authorizedRequest(url, options));
      if (response.success) {
        consoleWarn('Error reported');
      } else {
        console.error({ error, errorInfo, location, token, response });
      }
    } catch (errorOnLog) {
      console.error({ error, errorInfo, location, token, errorOnLog });
    }
  }
  
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="jk-col extend stretch jk-pad-lg">
          <div className="bc-we jk-br-ie jk-pad-md">
            <div className="jk-col gap">
              <h2>Oops, there is an error!</h2>
              <Button onClick={() => this.setState({ hasError: false })}>
                Try again?
              </Button>
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
