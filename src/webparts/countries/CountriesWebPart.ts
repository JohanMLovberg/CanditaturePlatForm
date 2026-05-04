import {
  BaseClientSideWebPart,
} from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import CountriesForm from './CountriesForm';
import { ICountriesFormProps } from '../../models/CountriesModel';

export default class ElectionsWebPart extends BaseClientSideWebPart<ICountriesFormProps> {  
  public render(): void {
    this.renderReactComponent<ICountriesFormProps>( 
      this.domElement, 
      CountriesForm,
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