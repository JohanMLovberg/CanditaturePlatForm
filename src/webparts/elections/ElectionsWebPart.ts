import {
  BaseClientSideWebPart,
} from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import ElectionsForm from './ElectionsForm';
import { IElectionsFormProps } from '../../models/ElectionsModel';

export default class ElectionsWebPart extends BaseClientSideWebPart<IElectionsFormProps> {  
  public render(): void {
    this.renderReactComponent<IElectionsFormProps>( 
      this.domElement, 
      ElectionsForm,
      {
        description: this.properties.description,
        context: this.context
      }
    );
  }

  private renderReactComponent<T>(
    domElement: HTMLElement,
    Component: React.ComponentClass<T> | React.StatelessComponent<T>,
    props: T
  ): void {
    const element = React.createElement(Component, props);
    ReactDom.render(element, domElement);
  }
}