import {
  BaseClientSideWebPart,
} from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IElectionBodiesFormProps } from '../../models/ElectionBodiesModel';
import ElectionBodiesForm from './ElectionBodiesForm';

export default class ElectionBodiesWebPart extends BaseClientSideWebPart<IElectionBodiesFormProps> {

  public render(): void {
    this.renderReactComponent<IElectionBodiesFormProps>(
      this.domElement,
      ElectionBodiesForm,
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
