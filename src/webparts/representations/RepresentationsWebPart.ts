import {
    BaseClientSideWebPart,
  } from '@microsoft/sp-webpart-base';
  import * as React from 'react';
  import * as ReactDom from 'react-dom';
	import RepresentationsForm from './RepresentationsForm';
	import { IRepresentationsFormProps } from '../../models/RepresentationsModel';
  
  export default class RepresentationsWebPart extends BaseClientSideWebPart<IRepresentationsFormProps> {
  
    public render(): void {
      this.renderReactComponent<IRepresentationsFormProps>(
        this.domElement,
        RepresentationsForm,
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
  