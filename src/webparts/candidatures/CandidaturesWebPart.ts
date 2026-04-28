import {
  BaseClientSideWebPart,
} from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ICandidaturesFormProps } from '../../models/CandidaturesModel';
import CandidaturesForm from './CandidaturesForm';

export default class CandidaturesWebPart extends BaseClientSideWebPart<ICandidaturesFormProps> {

  public render(): void {
    this.renderReactComponent<ICandidaturesFormProps>(
      this.domElement,
      CandidaturesForm,
      {
        description: this.properties.description,
        context: this.context
      }
    );
  }
  private renderReactComponent<T>(
    domElement: HTMLElement,
    Component: React.ComponentType<T>,
    props: T
  ): void {
    const element = React.createElement(Component, props);
    ReactDom.render(element, domElement);
  }
}
